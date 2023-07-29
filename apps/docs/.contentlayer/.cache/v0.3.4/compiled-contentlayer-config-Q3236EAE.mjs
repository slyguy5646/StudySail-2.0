// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    category: {
      type: "",
      description: "The heading this doc should go under",
      required: true
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `${doc.title.toLowerCase().split(" ").join("-")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src",
  documentTypes: [Post]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-Q3236EAE.mjs.map
