import { Post } from "contentlayer/generated";

export function slugify(str: string) {
  return str.toLowerCase().split(" ").join("-");
}

export function deSlugify(str: string) {
  return str.split("-").join(" ");
}

export function groupByCategory(arr: Post[]) {
  const groups: { [key: string]: Post[] } = {};
  arr.forEach((post) => {
    const categoryArr = groups[post.category];
    groups[post.category] = [...(categoryArr ?? []), post];
  });

  return Object.entries(groups);
}
