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
  h1: ({ children }) => <h1 className="text-slate-200 text-3xl font-semibold py-2">{children}</h1>,
  h3: ({ children }) => <h3 className="text-slate-200 text-xl font-semibold py-2">{children}</h3>,
  p: ({ children }) => <p className="py-2">{children}</p>,
  ImageWithCaption: ({ src, alt, caption }) => (
    <div className="py-4">
      <img src={src} alt={alt} className="rounded-md" />
      <div className="text-md font-light pt-1">{caption}</div>
    </div>
  ),
  
};

export default function Post({ params }: { params: any }) {
  const slug = params.doc;


  const post = allPosts.find((post) => post.slug === slug);
  // return (<div className="text-white">{JSON.stringify(post)}</div>)
  if (!post) return redirect("/");
  const Component = useMDXComponent(post.body.code);

  return (
    <div className="mx-auto px-6 pt-8">
      <h1 className="mb-8  text-4xl text-black font-bold capitalize text-left">
        {post.title}
      </h1>

      <Component components={mdxComponents} />
    </div>
  );
  return <div></div>;
}
