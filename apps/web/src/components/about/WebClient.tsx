"use client";
import { FolderIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { useState, useEffect, useContext, ReactNode, ReactElement } from "react";
import Chip from "../chip";
import Image, { StaticImageData } from "next/image";
import cover from "../../../public/examplecover.png";
import oneplace from "../../../public/oneplace.png";
import filestorage from "../../../public/filestorage.png";
import flashcards from "../../../public/flashcards.png";
import studyflashcards from "../../../public/studyflashcards.png";
import { RectangleStackIcon, BoltIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { Poppins } from "@next/font/google";
import { ScrollArea } from "../ui/scroll-area";
const poppins = Poppins({ weight: "800", subsets: ["latin"] });
const poppinsLight = Poppins({ weight: "500", subsets: ["latin"] });

interface POI {
  name: string | React.JSX.Element;
  caption: string;
  icon: typeof RectangleStackIcon;
  image: StaticImageData;
}
const pointsOfInterest: POI[] = [
  {
    name: "One place",
    caption:
      " Effortlessly access your study material and StudySail content all consolidated in one convenient, centralized location.",
    icon: RectangleStackIcon,
    image: oneplace,
  },
  {
    name: <div className="flex items-center">File Storage</div>,
    caption: "Never worry about where your study material is kept again with StudySail's file storage",
    icon: FolderIcon,
    image: filestorage,
  },
  {
    name: <div className="flex items-center">Generate Flashcards</div>,
    caption:
      "Generate custom flashcards with the click of a button directly from your uploaded study material. No tedious work required.",
    icon: BoltIcon,
    image: flashcards,
  },
  {
    name: <div className="flex items-center">Study Flashcards</div>,
    caption: "Study your custom flashcards directly in StudySail or copy them for external use.",
    icon: BookOpenIcon,
    image: studyflashcards,
  },
 
  // {
  //   name: <div className="flex items-center">All the platforms</div>,
  //   description:
  //     "Enjoy a consistent learning experience on Windows, macOS, Linux, and web browsers with our seamlessly compatible, cross-platform app.",
  //   icon: RectangleGroupIcon,
  // },
];

export default function AppDisplay() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState<number>(0);

  return (
    <div className="overflow-hidden bg-black  py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-[100rem] ">
        <div className="mx-auto flex flex-col items-center justify-between px-4 sm:px-10 lg:flex-row">
          <div className="sm:min-w-[500px] lg:pr-8  lg:pt-4">
            <div className="lg:max-w-lg">
              <h2
                className={clsx("text-base font-semibold leading-7 text-cyan-500 decoration-white", poppins.className)}
              >
                Web
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your study material on steroids
              </p>
              <p className={clsx("mt-6 text-md leading-8 text-neutral-500", poppinsLight.className)}>
                Study guides and notes are great but what if you could enhance them and utilize them in a more significant way?
              </p>
              <div className="flex justify-center">
                <div
                  className={clsx(
                    "mt-10  space-y-2 text-base leading-7 text-white lg:max-w-none",
                    poppinsLight.className
                  )}
                >
                  {/* <ScrollArea className="h-[275px] grid grid-cols-2" type="always"> */}
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    {pointsOfInterest.map((poi, index) => (
                      <div
                        key={JSON.stringify(poi.name)}
                        // onMouseEnter={() => setCurrentFeatureIndex(index)}
                        // onMouseLeave={() => setCurrentFeatureIndex(0)}
                        onClick={() => setCurrentFeatureIndex(index)}
                        className={`flex items-center justify-start hover:cursor-pointer hover:bg-neutral-800 ${
                          currentFeatureIndex == index ? "bg-neutral-800" : ""
                        } p-4 rounded-xl`}
                      >
                        <div className="flex items-center gap-3 font-semibold text-white">
                          <poi.icon className=" h-8 w-8 text-cyan-600  " />
                          <div>{poi.name}</div>
                        </div>{" "}
                        {/* <div className="pl-11 text-neutral-500">
                            {poi.caption}
                          </div> */}
                      </div>
                    ))}
                  </div>
                  {/* </ScrollArea> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div> */}
          <Image
            src={pointsOfInterest[currentFeatureIndex].image}
            alt="Product screenshot"
            className="  mt-10 aspect-auto h-full w-full max-w-5xl  rounded-xl border border-slate-300 sm:max-w-4xl"
            width={2432}
            height={1442}
          />
          {/* </div> */}
        </div>
      </div>
      <div className="flex justify-center lg:justify-end px-4 xl:px-12">
        <div
          className={clsx(
            "mt-4 text-sm text-center lg:text-right sm:max-w-4xl max-w-5xl lg:max-w-[50%]  text-neutral-500",
            poppinsLight.className
          )}
        >
          {pointsOfInterest[currentFeatureIndex].caption}
        </div>
      </div>
    </div>
  );
}
