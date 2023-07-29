import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { SparklesIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Chip from "../chip";
import clsx from "clsx";
import { IconSparkles } from "@tabler/icons-react";
import { Poppins } from "@next/font/google";
const poppins = Poppins({ weight: "800", subsets: ["latin"] });
const poppinsLight = Poppins({ weight: "500", subsets: ["latin"] });

function LearnMore({ href }: { href: string }) {
  return (
    <a href={href} target="_blank">
      <span className="text-cyan-500 hover:text-cyan-400 hover:cursor-pointer">Learn More</span>
    </a>
  );
}

const features = [
  {
    name: "File Processing",
    description: (
      <div>
        Bring the study material you already have, we'll handle the rest. <LearnMore href="" />
      </div>
    ),
    icon: DocumentTextIcon,
    key: 0,
  },

  {
    name: "Flashcards",
    description: (
      <div>
        Create flashcards from your study material for easy review. <LearnMore href="" />
      </div>
    ),
    icon: SparklesIcon,
    key: 1,
  },
];

function FeaturesSection() {
  return (
    <div className="bg-none py-24 sm:py-32" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-500">Boost your productivity</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Set sail for success.</p>
          <p className={clsx("mt-6 text-md leading-8 text-neutral-500", poppinsLight.className)}>
            StudySail allows you to be the best version of your educational self by allowing you to utilize your study
            material in a more productive way.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="flex flex-col justify-center items-center lg:grid max-w-xl grid-cols-1 lg:gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-8">
            {features.map((feature) => (
              <div key={feature.key} className="relative md:pl-16  border-cyan-500 p-4 rounded-md  ">
                <div className="text-xl font-semibold leading-7 text-white flex items-center  gap-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>{feature.name}</div>
                </div>
                <div className={clsx("mt-6 text-[17px] leading-8 text-neutral-500", poppinsLight.className)}>
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
