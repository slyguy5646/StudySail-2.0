"use client";
import { Poppins } from "@next/font/google";
import clsx from "clsx";
import "../globals.scss"
import Header from "@/components/Header";
import React, { useState, useEffect, useContext, createContext, useRef } from "react";

import AppDisplay from "@/components/about/WebClient";
import Mobile from "@/components/about/Mobile";
import FeaturesSection from "@/components/about/Features";
import { IconArrowDown } from "@tabler/icons-react";
import { TypeAnimation } from "react-type-animation";
import { useUser } from "@clerk/nextjs";
import Pricing from "@/components/about/Pricing";
const poppins = Poppins({ weight: "800", subsets: ["latin"] });
const poppinsLight = Poppins({ weight: "500", subsets: ["latin"] });





export default function Home() {
  const { isSignedIn } = useUser();
  return (

      <div className="selection:bg-cyan-500">
        {/* <Header /> */}

        <div className="wrapper ">
          <div className="">
            <div className="outer min-h-[500px] absolute   left-0 table h-1/2 w-full -mt-2 ">
              <div className="middle table-cell align-middle">
                <div className="inner">
                  <div>
                    <div className="flex flex-col gap-y-4">
                      <div className="w-full flex justify-center">
                        <div className="w-fit  flex justify-center items-center rounded-full bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-700 p-[2px]">
                          <a
                            href="#"
                            className="flex-none rounded-full bg-gray-900 py-1 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                          >
                            Our all new AI Quizlet Integration is out! <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                      <h1
                        className={clsx(
                          `px-4 lg:px-12 text-center text-6xl text-white transition-opacity duration-200 ease-in-out lg:text-8xl`,
                          poppins.className
                        )}
                      >
                        <span className="text-white ">
                          {/* <span className=" underline decoration-cyan-500"> */}
                          Your study material with {/* </span>{" "} */}
                          {/* tools for the{" "} */}
                          <span className=" text-cyan-500 selection:text-white">super powers</span>
                        </span>
                      </h1>
                    </div>

                    <div className="flex w-full justify-center">
                      <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a
                          href={isSignedIn ? "/dashboard" : "/sign-up"}
                          className="rounded-md  bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {isSignedIn ? "Dashboard" : "Get started"}
                        </a>
                        <button
                          // href="#"
                          onClick={() => {
                            const element = document.getElementById("flashcards");
                            if (element) {
                              // 👇 Will scroll smoothly to the top of the next section
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="text-sm font-semibold leading-6 text-white"
                        >
                          Learn more <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className=" invisible">Extra Infomation </div> */}
          <div className="ocean h-[3rem] bg-black sm:h-[5rem] overflow-x-hidden">
            <div className="wave absolute w-[10000px] h-[100%] opacity-80"></div>
            <div className="wave absolute w-[10000px] h-[100%] opacity-80"></div>
            <div className="wave absolute w-[10000px] h-[100%] opacity-80"></div>
          </div>
        </div>
        <div
          className={clsx("below_content bg-black bg-opacity-90 pt-12 text-xl font-bold text-black", poppins.className)}
        >
          <div className="">
            <FeaturesSection />
            <AppDisplay />
            <Pricing />
          </div>
        </div>
      </div>
  );
}
// {thing /***/ && (

// )}
