"use client";

import * as React from "react";
import { useState, useEffect, Dispatch } from "react";
import { Dialog } from "@headlessui/react";
import { SideBarSection } from "./SidebarConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { IconBallAmericanFootball, IconFileDescription, IconPlus, IconSailboat, IconX } from "@tabler/icons-react";
import Image from "next/image";
import puppo from "@/puppo.png";
import DocumentRow from "./DocRow";
import { allPosts } from "contentlayer/generated";
import { groupByCategory, deSlugify } from "@/utils/contentUtils";

interface BurgerOptionsProps {
  open: boolean;
  setOpen: Dispatch<boolean>;

  config: SideBarSection[];
  router: AppRouterInstance;
  currentPage: string;
  documents: any[];
}

function BurgerOptions({ open, setOpen, documents, config, router, currentPage }: BurgerOptionsProps) {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={open} //mobileMenuOpen
      onClose={setOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel
        className={`fixed inset-y-0 left-0 z-50 w-full overflow-y-auto border-r ${"dark:border-r-neutral-700 border-r-slate-200 bg-background text-black"} px-4 py-6  sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
      >
        <div className="flex items-center justify-between px-8">
          <button type="button" className="-m-2.5 rounded-md text-white" onClick={() => setOpen(false)}>
            <span className="sr-only">Close menu</span>
            <IconX className={`h-6 w-6 dark:text-white text-black`} aria-hidden="true" />
          </button>
          <a href="#" className="-m-1.5">
            <span className="sr-only">StudySail</span>
            <div className="flex items-center text-3xl font-bold ">
              <a href="/">
                <div className="flex gap-x-2  text-2xl text-black dark:text-white">
                  <IconFileDescription className="h-7 w-7 flex-shrink-0" />

                  <div>StudySail</div>
                </div>
              </a>
            </div>
          </a>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 ">
            <div className="space-y-2 px-6 py-6">
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
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default BurgerOptions;
