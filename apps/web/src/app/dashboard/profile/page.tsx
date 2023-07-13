import { UserProfile } from "@clerk/nextjs";
import clsx from "clsx";
import { Poppins } from "@next/font/google";
const poppins = Poppins({ weight: "800", subsets: ["latin"] });

export default function Profile() {
  return (
    <div className="px-4 w-full">
      <div className="flex lg:flex-1 mt-4 justify-between items-center">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <h2 className={clsx("text-2xl sm:text-3xl", poppins.className)}>
            <span className="text-black">Study</span>
            <span className="text-cyan-500">Sail</span>
          </h2>
        </a>
        <a
          href="/dashboard"
          className="rounded-md  bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Go to Dashboard
        </a>
      </div>
      <div className="flex justify-center w-full my-8">

      <UserProfile />
      </div>
    </div>
  );
}
