import { Poppins } from "@next/font/google";
import clsx from "clsx";
const poppins = Poppins({ weight: "800", subsets: ["latin"] });
const poppinsLight = Poppins({ weight: "500", subsets: ["latin"] });
import { IconCheck, IconPoint } from "@tabler/icons-react";
import Chip from "../chip";

interface PricingTier {
  title: string;
  price: string;
  available: boolean;
  features: PricingTierFeature[];
}

interface PricingTierFeature {
  title: string;
  available: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    title: "Free",
    price: "Free",
    available: true,
    features: [
      { title: "3 Stored Documents", available: true },
      { title: "AI Generated Flashcards", available: true },
      { title: "Audio Transcription", available: false },
    ],
  },
  { title: "First Mate", price: "4.99/mo", available: false, features: [] },
  { title: "Captain", price: "9.99/mo", available: false, features: [] },
];

export default function Pricing() {
  return (
    <div className="p-8 text-white decoration-white " id="pricing">
      <p className="mt-2  font-bold tracking-tight text-6xl text-center mb-8">Pricing</p>{" "}
      <div className="flex xl:flex-row flex-col justify-evenly items-center  w-full ">
        {pricingTiers.map((tier) => (
          <div className="bg-neutral-900 p-6 xl:flex-[0.3] xl:max-w-full sm:max-w-[600px] text-center rounded-md h-[300px] w-11/12 sm:w-10/12 my-2 text-3xl">
            <div className="flex justify-between">
                <div className="text-cyan-500">{tier.title}</div>
                {!tier.available ? (
                  <div className="max-w-[125px]">
                    <Chip title={"Coming Soon"} />
                  </div>
                ) : (
                  <div className="max-w-[75px]">
                    <Chip title={"Beta "} />
                  </div>
                )}
            </div>
            <div className={clsx("text-slate-300 text-lg font-sans font-normal", poppinsLight.className)}>
              {tier.price}
            </div>
            <div className="pt-2">
              {tier.features.map((feature) => (
                <div className="flex items-center  gap-x-2 py-4">
                  {feature.available ? (
                    <IconCheck className="text-green-500 w-4 h-4" />
                  ) : (
                    <IconPoint className="text-slate-200 w-4 h-4" />
                  )}
                  <div className={clsx("text-slate-300 text-base font-sans font-normal", poppinsLight.className)}>
                    {feature.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
