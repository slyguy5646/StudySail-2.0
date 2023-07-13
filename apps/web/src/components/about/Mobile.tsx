import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { FontContext } from "@/app/(headerGroup)/page";
import clsx from "clsx";
import {
  PuzzlePieceIcon,
  PaperClipIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";
import Chip from "../chip";
import Image from "next/image";
import cover from "../../../public/mobilecover.png";
// import "react-device-frameset/styles/marvel-devices.min.css";

const pointsOfInterest = [
  {
    name: "Integrations with your school's LMS",
    description:
      "Use your existing account for your school's LMS to access school specific information and utilize StudySail tools.",
    icon: PuzzlePieceIcon,
  },
  {
    name: <div className="flex items-center">Simple UI</div>,
    description:
      "Most mobile apps are cluttered with ads and unecessary information. Get the data you want and nothing else with StudySail.",
    icon: PaperClipIcon,
  },
  {
    name: (
      <div className="flex items-center">
        AI Tools <Chip title={"Coming Soon"} />
      </div>
    ),
    description:
      "Use the power of AI to help with note taking or format study material for easy review.",
    icon: RectangleGroupIcon,
  },
];

export default function Mobile() {
  const { heavyFont, lightFont } = useContext(FontContext);

  return (
    <div className="overflow-hidden bg-black  py-24 sm:py-32">
      <div className="mx-auto max-w-[100rem] ">
        <div className="mx-auto flex flex-col items-center justify-between px-4 sm:px-10 lg:flex-row">
          {/* <DeviceFrameset device="iPhone X" color="black">
          </DeviceFrameset> */}
          <div className="mockup-phone border-primary">
            <div className="camera"></div>
            <div className="display w-80">
              <Image
                src={cover}
                alt="Product screenshot"
                className="   aspect-auto h-full w-full max-w-5xl border-black border-3 rounded-xl   sm:max-w-4xl "
              />
              <div className="artboard artboard-demo phone-1">Hi.</div>
            </div>
          </div>
          <div className="sm:min-w-[500px] lg:pr-8  lg:pt-4">
            <div className="lg:max-w-lg">
              <h2
                className={clsx(
                  "text-base font-semibold leading-7 text-cyan-500",
                  heavyFont.className
                )}
              >
                Mobile
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything in the palm of your hand.
              </p>
              <p
                className={clsx(
                  "mt-6 text-lg leading-8 text-neutral-500",
                  lightFont.className
                )}
              >
                Get assignment information, feedback, and more all while on the
                go.
              </p>
              <div
                className={clsx(
                  "mt-10 max-w-xl space-y-8 text-base leading-7 text-white lg:max-w-none",
                  lightFont.className
                )}
              >
                {pointsOfInterest.map((poi) => (
                  <div key={JSON.stringify(poi.name)}>
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
        </div>
      </div>
    </div>
  );
}
