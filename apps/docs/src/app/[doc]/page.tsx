// app/page.tsx
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { redirect } from "next/navigation";
import Image from "next/image";
import A from "@/components/Docs/Anchor";

import { Metadata } from "next";
import StringToTabler from "@/components/StringToTabler";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    date: publishedTime,

    slug,
  } = post;

  return {
    title,

    openGraph: {
      title,

      type: "article",
      publishedTime,
      url: `https://docs.studysail.com/${slug}`,
    },
  };
}

const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  // Add a custom component.
  a: ({ href, children }) => (
    <A target="_blank" href={href as string}>
      {children}
    </A>
  ),
  h1: ({ children }) => <h1 className="text-cyan-500 text-3xl font-semibold py-2">{children}</h1>,
  h3: ({ children }) => <h3 className="text-cyan-500 text-xl font-semibold py-2">{children}</h3>,
  p: ({ children }) => <p className="py-2">{children}</p>,
  ImageWithCaption: ({ src, alt, caption }) => (
    <div className="py-4">
      <img src={src} alt={alt} className="rounded-md dark:border-neutral-700 border-slate-200 border" />
      <div className="text-md font-light pt-1">{caption}</div>
    </div>
  ),

  Step: ({ title, number }) => (
    <div className="flex gap-x-4 items-center">
      <div className="w-12 h-12 text-2xl font-bold flex text-center justify-center items-center rounded-full border-2 border-cyan-500">
        {number}
      </div>
      <div className="text-2xl font-semibold">{title}</div>
    </div>
  ),
  Video: () => (
    <video width="320" height="240" controls>
      <source
        src="https://firebasestorage.googleapis.com/v0/b/blog-files-d9a40.appspot.com/o/flashcardgeneration.mov?alt=media&token=21d4f05b-dcd1-4846-8055-dda3eddb045b"
        type="video/mov"
      />
      {/* <source src="movie.ogg" type="video/ogg" /> */}
    </video>
  ),
};

export default function Post({ params }: { params: any }) {
  const slug = params.doc;

  const doc = allPosts.find((doc) => doc.slug === slug);
  // return (<div className="text-white">{JSON.stringify(post)}</div>)
  if (!doc) return redirect("/");
  const Component = useMDXComponent(doc.body.code);

  return (
    <div className="mx-auto px-6 pt-8">
      <div className="flex gap-x-4 items-center mb-8">
        <StringToTabler iconTitle={doc.icon} className="w-10 h-10" />
        <h1 className="  text-4xl text-black dark:text-white font-bold capitalize text-left">{doc.title}</h1>
      </div>

      <Component components={mdxComponents} />
    </div>
  );
  return <div></div>;
}
