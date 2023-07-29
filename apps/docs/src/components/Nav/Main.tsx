"use client";

import * as React from "react";
import { SideBarSection } from "./SidebarConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { IconPlus, IconFileDescription, IconChevronDown, IconTrash } from "@tabler/icons-react";
import { allPosts } from "contentlayer/generated";

import DocumentRow from "./DocRow";
import { deSlugify, groupByCategory, slugify } from "@/utils/contentUtils";

interface OptionsBarProps {
  config: SideBarSection[];
  router: AppRouterInstance;
  currentPage: string;
  documents: any[];
}

function MainOptionsBar({ config, router, currentPage, documents }: OptionsBarProps) {
  return (
    <aside className="col-span-1 hidden h-[100dvh] border-r border-r-slate-200 pb-12 dark:border-r-neutral-700 md:inline">
      <div className="px-8 lg:py-6 ">
        <p className="flex items-center text-3xl font-bold ">
          <a href="/">
            <span className=" invisible text-2xl text-black dark:text-white lg:visible flex items-center gap-x-2">
              <IconFileDescription className="h-7 w-7 flex-shrink-0" />

              <div>StudySail</div>
            </span>
            <p className="text-slate-400 text-sm font-normal pt-2 text-center hidden lg:flex">
              Official documentation
            </p>
          </a>
        </p>
      </div>
      <div className="space-y-4 ">
        <div className="space-y-4">
          <div className="px-6 py-2">
            <div className=" w-full">
              {groupByCategory(allPosts)
                .filter((category) => category[0] != "misc")
                .map((category, index) => (
                  <div className="pb-6">
                    <h2 className="capitalize overflow-none mb-2 text-ellipsis whitespace-nowrap px-2 text-lg font-semibold tracking-tight text-black dark:text-white">
                      {deSlugify(category[0])}
                    </h2>
                    {category[1].map((post, index) => (
                      <DocumentRow
                        key={index}
                        item={{ title: post.title, slug: post.slug }}
                        router={router}
                        icon={post.icon}
                        currentPage={currentPage}
                      />
                    ))}
                  </div>
                ))}
              <div className="pb-6">
                <h2 className="capitalize overflow-none mb-2 text-ellipsis whitespace-nowrap px-2 text-lg font-semibold tracking-tight text-black dark:text-white">
                  Misc.
                </h2>
                {allPosts
                  .filter((post) => post.category == "misc")
                  .map((post, index) => (
                    <DocumentRow
                      key={index}
                      item={{ title: post.title, slug: post.slug }}
                      router={router}
                      icon={post.icon}
                      currentPage={currentPage}
                    />
                  ))}
              </div>
            </div>

            {/* {JSON.stringify(groupByCategory(allPosts))} */}
          </div>
          {/* <div className="px-6 py-2">
            <div className="flex justify-between items-center">
              <h2 className="overflow-none mb-2 text-ellipsis whitespace-nowrap px-2 text-lg font-semibold tracking-tight text-black dark:text-white">
                Classes
              </h2>
              <IconPlus onClick={() => router.push("/dashboard/add-new")} className="mr-2 h-4 w-4 flex-shrink-0 hover:cursor-pointer" />
            </div>

            {documents.map((document, index) => (
              <DocumentRow
                key={index}
                item={{ title: document.title, docId: document.id }}
                router={router}
                currentPage={currentPage}
              />
            ))}
            <button
              onClick={() => {
                router.push("/dashboard/add-new");
              }}
              className={`${" bg-transparent"} inline-flex h-9 w-full items-center justify-start truncate whitespace-nowrap rounded-md px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-neutral-900  dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:bg-transparent`}
            >
              <IconPlus className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="w-full overflow-hidden text-ellipsis text-left">
                Add New
              </span>
            </button>
          </div> */}
        </div>
        {/* {config.map((section, index) => (
          <div className="space-y-4" key={index}>
            <div className="px-6 py-2">
              <h2 className="overflow-none mb-2 text-ellipsis whitespace-nowrap px-2 text-lg font-semibold tracking-tight text-black dark:text-white">
                {section.title}
              </h2>
            </div>
          </div>
        ))} */}
      </div>
      {/* {notesConfig && (
        <>
          <div className="space-y-4 ">
            <div className="space-y-4">
              <div className="px-6 py-2">
                <NotesPicker config={notesConfig} currentPage={currentPage} router={router} />
              </div>
            </div>
          </div>
        </>
      )} */}
    </aside>
  );
}

export default MainOptionsBar;
