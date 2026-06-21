import { getPropertyTypeData } from "next-notion/utils";

// @todo(types) any
function getSlugPreview(properties: any) {
  return getPropertyTypeData(properties, "Slug.Preview");
}

export { getPropertyTypeData, getSlugPreview };
