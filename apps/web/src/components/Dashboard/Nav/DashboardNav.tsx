"use client";

import * as React from "react";
import { useState, useEffect, useContext } from "react";

import { useRouter, usePathname } from "next/navigation";
import { createContext } from "react";

import { IconMenu2 } from "@tabler/icons-react";
import { sideBarConfig } from "./SidebarConfig";
import MainOptionsBar from "./Main";
import BurgerOptions from "./Burger";

import NavAvatar from "@/components/NavAvatar";
import { UserProfile, useUser } from "@clerk/nextjs";
import { Document } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ErrorDialogueContext = createContext<{
  universalErrorOpen: boolean;
  setUniversalErrorOpen: Function;
}>({
  universalErrorOpen: false,
  setUniversalErrorOpen: () => {},
});

export const BurgerMenuContext = createContext(false);

interface IDocumentsContext {
  loadedDocuments: Document[];
  setLoadedDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

export const DocumentsContext = createContext<IDocumentsContext>({ loadedDocuments: [], setLoadedDocuments: () => {} });

export default function Main({ children, documents }: { children: React.ReactNode; documents: Document[] }) {
  const { user } = useUser();
  const [currentPage, setCurrenPage] = useState<string>("Home");

  const [universalErrorOpen, setUniversalErrorOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const [loadedDocuments, setLoadedDocuments] = useState<Document[]>(documents);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname != null) {
      let name = pathname.split("/");

      setCurrenPage(name.pop() ?? "");
    }
  }, [pathname]);

  const handleResize = () => {
    if (window.innerWidth >= 768 && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <DocumentsContext.Provider value={{ loadedDocuments, setLoadedDocuments }}>
      <div className={``}>
        <div className="flex">
          <div className="grid  h-[100dvh] w-full grid-cols-5 overflow-hidden xl:grid-cols-6">
            {" "}
            <MainOptionsBar
              config={sideBarConfig}
              router={router}
              currentPage={currentPage}
              documents={loadedDocuments}
            />
            <BurgerOptions
              config={sideBarConfig}
              router={router}
              currentPage={currentPage}
              open={mobileMenuOpen}
              setOpen={setMobileMenuOpen}
              documents={loadedDocuments}
            />
            <div className=" col-span-5 w-full md:col-span-4  xl:col-span-5 ">
              <div className="h-[100dvh] overflow-auto">
                <div className="h-full px-8 py-6">
                  <div className="space-between flex items-center pb-4 ">
                    <button
                      type="button"
                      className="-m-2.5 inline items-center justify-center rounded-md p-2.5 text-black md:hidden"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open main menu</span>
                      <IconMenu2 className="h-6 w-6 text-black dark:text-white" aria-hidden="true" />
                    </button>
                    <div className="ml-auto mr-4">
                      <h3 className="hidden text-sm font-semibold text-black dark:text-white md:inline">
                        {/* {getGreeting()} */}
                      </h3>
                    </div>

                    <NavAvatar pfp_url={user?.profileImageUrl} />
                  </div>

                  <ErrorDialogueContext.Provider
                    value={{
                      universalErrorOpen: universalErrorOpen,
                      setUniversalErrorOpen: setUniversalErrorOpen,
                    }}
                  >
                    <BurgerMenuContext.Provider value={mobileMenuOpen}>
                      <div className="">{children}</div>
                    </BurgerMenuContext.Provider>
                  </ErrorDialogueContext.Provider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentsContext.Provider>
  );
}

export function useDocuments(){
  return useContext(DocumentsContext);
}