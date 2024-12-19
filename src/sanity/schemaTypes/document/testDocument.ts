import { defineType } from "sanity";

const testDocument = defineType({
  type: "document",
  name: "testDocument",
  title: "Test Document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
});

export default testDocument;
