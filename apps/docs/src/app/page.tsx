import Image from "next/image";
import { allPosts } from "contentlayer/generated";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { deSlugify } from "@/utils/contentUtils";
import Link from "next/link";
import StringToTabler from "@/components/StringToTabler";

export default function Home() {
  return (
    <div>
      <h1 className="mb-8  text-4xl text-black font-bold capitalize text-left">Docs</h1>
      <div className="flex flex-col gap-y-4">
        {allPosts.map((doc) => {
          
          return (
            <Card>
              <CardHeader>
                <div className="flex gap-x-4 items-center">
                  <StringToTabler iconTitle={doc.icon}/>

                  <CardTitle>
                    <Link href={`/${doc.slug}`} className="hover:underline decoration-cyan-500">{doc.title}</Link>
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
