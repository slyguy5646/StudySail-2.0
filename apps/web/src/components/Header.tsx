"use client";
// import React, { useState, useEffect } from 'react';
import { BookOpenIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Poppins } from "@next/font/google";
const poppins = Poppins({ weight: "800", subsets: ["latin"] });

import { IconSailboat } from "@tabler/icons-react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useContext } from "react";
import { FontContext } from "@/app/(headerGroup)/page";
import Banner from "./banner";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavAvatar from "./NavAvatar";


function Header() {
  const { lightFont, heavyFont } = useContext(FontContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const navigation = [
    { name: "About", id: "about" },
    { name: "Flashcards", id: "flashcards" },
    // { name: "Mobile", id: "#" },
    // { name: "Roadmap", id: "/roadmap" },
  ];
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log(visible);
  }, [visible]);
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        {/* {visible && <Banner visible={visible} setVisible={setVisible} />} */}
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h2 className={clsx("text-2xl sm:text-3xl", poppins.className)}>
                <span className="text-white">Study</span>
                <span className="text-cyan-500">Sail</span>
              </h2>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className={clsx("text-sm", poppinsLight.className)}> */}
          <div className="hidden lg:flex lg:justify-evenly gap-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                // href={item.href}
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    // 👇 Will scroll smoothly to the top of the next section
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={clsx(
                  "group text-white transition-all duration-300 ease-in-out",
                  lightFont.className
                )}
              >
                <span className="bg-gradient-to-r from-cyan-500 to-cyan-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
          {/* </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
            {/* <a href="app.studysail.com/auth" target="_blank" className="text-sm font-semibold leading-6 text-white">
              Launch App <span aria-hidden="true">&rarr;</span>
            </a> */}
            {isSignedIn ? (
                <a
                  href="/dashboard"
                  className="rounded-md  bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Go to Dashboard
                </a>
              
            ) : (
              <div>
                <a
                  href="/sign-in"
                  className="rounded-md  bg-black  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm "
                >
                  Log In
                </a>
                <a
                  href="/sign-up"
                  className="rounded-md  bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">StudySail</span>
                <IconSailboat className="h-10 w-10 text-white outline-none"></IconSailboat>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-neutral-700">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const element = document.getElementById(item.id);
                        if (element) {
                          // 👇 Will scroll smoothly to the top of the next section
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="-mx-3 text-left block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-neutral-900 w-full"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-neutral-900"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}

export default Header;
