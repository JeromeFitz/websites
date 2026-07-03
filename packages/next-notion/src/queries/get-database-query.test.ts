import { addDays, format } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getDataSourceIdMock, queryMock } = vi.hoisted(() => ({
  getDataSourceIdMock: vi.fn<(database_id: string) => Promise<string>>(),
  queryMock: vi.fn<(args: Record<string, unknown>) => Promise<Record<string, unknown>>>(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@jeromefitz/next-config", () => ({
  envClient: { IS_DEV: false },
  envServer: { NOTION__DATABASE__PAGES: "db_pages_default" },
}));
vi.mock("../helper", () => ({
  getDataSourceId: getDataSourceIdMock,
  notion: { dataSources: { query: queryMock } },
}));

const { getDatabaseQuery, getDatabaseQueryByDateRange } = await import("./get-database-query.js");

function segmentInfo(segment: string, slug: string) {
  return {
    catchAll: slug.split("/").filter(Boolean),
    hasMeta: true,
    isIndex: false,
    segment,
    segmentCount: slug.split("/").filter(Boolean).length,
    slug,
  };
}

describe("getDatabaseQuery", () => {
  beforeEach(() => {
    getDataSourceIdMock.mockReset();
    queryMock.mockReset();
  });

  it("resolves the data source for the given database_id before querying", async () => {
    getDataSourceIdMock.mockResolvedValue("ds_custom");
    queryMock.mockResolvedValue({ has_more: false, next_cursor: null, results: [] });

    await getDatabaseQuery({
      database_id: "db_custom",
      segmentInfo: segmentInfo("blog", "/blog/my-post"),
    });

    expect(getDataSourceIdMock).toHaveBeenCalledWith("db_custom");
    expect(queryMock).toHaveBeenCalledWith(
      expect.objectContaining({ data_source_id: "ds_custom" }),
    );
  });

  it("falls back to the default database_id when none is provided", async () => {
    getDataSourceIdMock.mockResolvedValue("ds_default");
    queryMock.mockResolvedValue({ has_more: false, next_cursor: null, results: [] });

    await getDatabaseQuery({ segmentInfo: segmentInfo("blog", "/blog/my-post") });

    expect(getDataSourceIdMock).toHaveBeenCalledWith("db_pages_default");
  });

  it("paginates through has_more pages and concatenates results", async () => {
    getDataSourceIdMock.mockResolvedValue("ds_custom");
    queryMock
      .mockResolvedValueOnce({
        has_more: true,
        next_cursor: "cursor-1",
        results: [{ id: "page-1" }],
      })
      .mockResolvedValueOnce({
        has_more: false,
        next_cursor: null,
        results: [{ id: "page-2" }],
      });

    const result = await getDatabaseQuery({ segmentInfo: segmentInfo("blog", "/blog") });

    expect(queryMock).toHaveBeenCalledTimes(2);
    expect(queryMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ start_cursor: "cursor-1" }),
    );
    expect(result.results).toEqual([{ id: "page-1" }, { id: "page-2" }]);
  });

  it("does not paginate for the events segment even when has_more is true", async () => {
    getDataSourceIdMock.mockResolvedValue("ds_events");
    queryMock.mockResolvedValue({
      has_more: true,
      next_cursor: "cursor-1",
      results: [{ id: "event-1" }],
    });

    const result = await getDatabaseQuery({ segmentInfo: segmentInfo("events", "/events") });

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(result.results).toEqual([{ id: "event-1" }]);
  });
});

describe("getDatabaseQueryByDateRange", () => {
  beforeEach(() => {
    getDataSourceIdMock.mockReset();
    queryMock.mockReset();
  });

  it("builds a date-range filter from the slug and queries the resolved data source", async () => {
    getDataSourceIdMock.mockResolvedValue("ds_events");
    queryMock.mockResolvedValue({ has_more: false, next_cursor: null, results: [] });

    await getDatabaseQueryByDateRange({
      database_id: "db_events",
      segmentInfo: segmentInfo("events", "/events/2024/01/01/to/2024/02/01"),
    });

    const expectedFrom = format(new Date("2024-01-01T00:00:00.000Z"), "yyyy-MM-dd");
    const expectedTo = format(addDays(new Date("2024-02-01T23:59:59.999Z"), 1), "yyyy-MM-dd");

    expect(getDataSourceIdMock).toHaveBeenCalledWith("db_events");
    expect(queryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data_source_id: "ds_events",
        filter: {
          and: [
            { date: { on_or_after: expectedFrom }, property: "Date" },
            { date: { on_or_before: expectedTo }, property: "Date" },
          ],
        },
      }),
    );
  });
});
