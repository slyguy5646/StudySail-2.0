import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect, Dispatch } from 'react';

interface BannerProps {
    visible: boolean
    setVisible: Dispatch<boolean>
}


export default function Banner({visible, setVisible}: BannerProps) {


    return (
        <div  className="relative isolate flex items-center gap-x-6 overflow-hidden bg-cyan-500 py-2.5 px-6 sm:px-3.5 sm:before:flex-1">
  
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                <p className="text-sm leading-6 text-gray-900">
                    <strong className="font-semibold">New features!</strong>
                    {/* <svg
                        viewBox="0 0 2 2"
                        className="mx-2 inline h-0.5 w-0.5 fill-current"
                        aria-hidden="true"
                    >
                        <circle cx={1} cy={1} r={1} />
                    </svg> */}
                    
                </p>
                <a
                    href="#"
                    className="flex-none rounded-full bg-gray-900 py-1 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                    Read more <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
            <div className="flex flex-1 justify-end">
                <button
                    type="button"
                    className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                    onClick={() => {
                        setVisible(false)
                        
                    }}
                >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon
                        className="h-5 w-5 text-gray-900"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
}
