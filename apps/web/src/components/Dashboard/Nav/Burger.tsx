"use client";

import * as React from "react";
import { useState, useEffect, Dispatch } from "react";
import { Dialog } from "@headlessui/react";
import { SideBarSection } from "./SidebarConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import {
  IconBallAmericanFootball,
  IconSailboat,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import puppo from "@/puppo.png";
import { Document } from "@prisma/client";

interface BurgerOptionsProps {
  open: boolean;
  setOpen: Dispatch<boolean>;

  config: SideBarSection[];
  router: AppRouterInstance;
  currentPage: string;
  documents: Document[];
}

function BurgerOptions({
  open,
  setOpen,

  config,
  router,
  currentPage,
}: BurgerOptionsProps) {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={open} //mobileMenuOpen
      onClose={setOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel
        className={`fixed inset-y-0 left-0 z-50 w-full overflow-y-auto border-r ${"border-r-slate-200 bg-white text-black"} px-4 py-6  sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
      >
        <div className="flex items-center justify-between px-8">
          <button
            type="button"
            className="-m-2.5 rounded-md text-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <IconX className={`h-6 w-6 text-black`} aria-hidden="true" />
          </button>
          <a href="#" className="-m-1.5">
            <span className="sr-only">PuppoPool</span>
            <p className="flex items-center text-3xl font-bold ">
              <a href="/">
                <span className="  text-2xl text-black dark:text-white">
                  PuppoPool
                </span>
              </a>
            </p>
          </a>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 ">
            <div className="space-y-2 px-6 py-6">
              {config.map((section, index) => (
                <div className="space-y-4" key={index}>
                  <div className=" py-2">
                    <h2
                      className={`overflow-none mb-2 text-ellipsis whitespace-nowrap px-2 text-lg font-semibold tracking-tight `}
                    >
                      {section.title}
                    </h2>
                    {section.items.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => {
                          router.push(item.href);
                          setOpen(false);
                        }}
                        className={`${" hover:bg-slate-100"} ${
                          item.title.toLowerCase() == currentPage
                            ? `${" bg-slate-100"}`
                            : " bg-transparent"
                        } inline-flex h-9 w-full items-center justify-start truncate whitespace-nowrap rounded-md px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800  dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:bg-transparent`}
                      >
                        {item.icon}
                        <span className="w-full overflow-hidden text-ellipsis text-left">
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {/* {notesConfig && <NotesPicker setOpen={setOpen} config={notesConfig} currentPage={currentPage} router={router} />} */}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default BurgerOptions;
