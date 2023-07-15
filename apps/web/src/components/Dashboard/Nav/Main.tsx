"use client";

import * as React from "react";
import { SideBarSection } from "./SidebarConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { IconPlus, IconFileDescription, IconChevronDown, IconTrash } from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DocumentRow from "../Documents/DocumentRow";
import { Document } from "@prisma/client";

interface OptionsBarProps {
  config: SideBarSection[];
  router: AppRouterInstance;
  currentPage: string;
  documents: Document[];
}

function MainOptionsBar({ config, router, currentPage, documents }: OptionsBarProps) {
  return (
    <aside className="col-span-1 hidden h-[100dvh] border-r border-r-slate-200 pb-12 dark:border-r-neutral-700 md:inline">
      <div className="px-8 py-6">
        <p className="flex items-center text-3xl font-bold ">
          <a href="/">
            <span className=" invisible text-2xl text-black dark:text-white lg:visible">StudySail</span>
          </a>
        </p>
      </div>
      <div className="space-y-4 ">
        <div className="space-y-4">
          <div className="px-6 py-2">
            <div className="flex justify-between items-center">
              <h2 className="overflow-none mb-2 text-ellipsis whitespace-nowrap px-2 text-lg font-semibold tracking-tight text-black dark:text-white">
                Documents
              </h2>
              <IconPlus
                onClick={() => router.push("/dashboard/add-new")}
                className="mr-2 h-4 w-4 flex-shrink-0 hover:cursor-pointer"
              />
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
              <span className="w-full overflow-hidden text-ellipsis text-left">Add New</span>
            </button>
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
