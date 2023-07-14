"use client";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  RectangleGroupIcon,
  PaperClipIcon,
  LinkIcon,
  PuzzlePieceIcon,
  MapPinIcon,
  FolderIcon
} from "@heroicons/react/20/solid";
import { IconFolderOpen } from "@tabler/icons-react";
import clsx from "clsx";
import React, { useState, useEffect, useContext } from "react";
import { FontContext } from "@/app/(headerGroup)/page";
import Chip from "../chip";
import Image from "next/image";
import cover from "../../../public/examplecover.png";
import { RectangleStackIcon } from "@heroicons/react/24/solid";

const pointsOfInterest = [
  {
    name: "One place",
    description:
      " Effortlessly access your study material and StudySail content all consolidated in one convenient, centralized location.",
    icon: RectangleStackIcon,
  },
  {
    name: (
      <div className="flex items-center">
        Organize
        <Chip title={"Coming Soon"} />
      </div>
    ),
    description: "Effortlessly manage your study material and sort by class or subject",
    icon: FolderIcon,
  },
  // {
  //   name: <div className="flex items-center">All the platforms</div>,
  //   description:
  //     "Enjoy a consistent learning experience on Windows, macOS, Linux, and web browsers with our seamlessly compatible, cross-platform app.",
  //   icon: RectangleGroupIcon,
  // },
];

export default function AppDisplay() {
  const { heavyFont, lightFont } = useContext(FontContext);

  return (
    <div className="overflow-hidden bg-black  py-24 sm:py-32" id="flashcards">
      <div className="mx-auto max-w-[100rem] ">
        <div className="mx-auto flex flex-col items-center justify-between px-4 sm:px-10 lg:flex-row">
          <div className="sm:min-w-[500px] lg:pr-8  lg:pt-4">
            <div className="lg:max-w-lg">
              <h2
                className={clsx(
                  "text-base font-semibold leading-7 text-cyan-500 decoration-white",
                  heavyFont.className
                )}
              >
                Web
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your study material on steroids
              </p>
              <p
                className={clsx(
                  "mt-6 text-md leading-8 text-neutral-500",
                  lightFont.className
                )}
              >
                Notes are great but what if you could enhance them? Now you can with StudySail.
              </p>
              <div
                className={clsx(
                  "mt-10 max-w-xl space-y-8 text-base leading-7 text-white lg:max-w-none",
                  lightFont.className
                )}
              >
                {pointsOfInterest.map((poi) => (
                  <div
                    key={JSON.stringify(poi.name)}
                    className="hover:cursor-pointer hover:bg-neutral-900 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-3 font-semibold text-white">
                      <poi.icon className=" h-8 w-8 text-cyan-600  " />
                      <div>{poi.name}</div>
                    </div>{" "}
                    <div className="pl-11 text-neutral-500">
                      {poi.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Image
            src={cover}
            alt="Product screenshot"
            className="  mt-10 aspect-auto h-full w-full max-w-5xl  rounded-xl border-2 border-cyan-500 sm:max-w-4xl"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
