import { beforeEach, describe, expect, it, vi } from "vitest";

const { retrieveMock } = vi.hoisted(() => ({
  retrieveMock: vi.fn<(args: { database_id: string }) => Promise<unknown>>(),
}));

vi.mock("@jeromefitz/next-config/env.server", () => ({
  envServer: { NOTION_API_KEY: "test-key" },
}));

vi.mock("@notionhq/client", () => ({
  Client: vi.fn<() => { databases: { retrieve: typeof retrieveMock } }>(function MockClient() {
    return { databases: { retrieve: retrieveMock } };
  }),
}));

const { getDataSourceId } = await import("./helper.js");

describe("getDataSourceId", () => {
  beforeEach(() => {
    retrieveMock.mockReset();
  });

  it("returns the first data source id for a database", async () => {
    retrieveMock.mockResolvedValue({
      data_sources: [{ id: "ds_123", name: "Pages" }],
    });

    await expect(getDataSourceId("db_abc")).resolves.toBe("ds_123");
    expect(retrieveMock).toHaveBeenCalledWith({ database_id: "db_abc" });
  });

  it("throws when the database has no data sources", async () => {
    retrieveMock.mockResolvedValue({ data_sources: [] });

    await expect(getDataSourceId("db_abc")).rejects.toThrow(
      "No data source found for Notion database db_abc",
    );
  });

  it("throws when the response is a partial database object", async () => {
    retrieveMock.mockResolvedValue({ object: "database", id: "db_abc" });

    await expect(getDataSourceId("db_abc")).rejects.toThrow(
      "No data source found for Notion database db_abc",
    );
  });
});
