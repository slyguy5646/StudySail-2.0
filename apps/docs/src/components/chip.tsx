import React, { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

function Chip({ title, className, children }: ChipProps) {
  return (
    <div
      className={cn(
        "m-1 ml-2 my-2 flex items-center justify-center rounded-full border border-cyan-500 bg-cyan-500 bg-opacity-40 px-2 py-1 text-base font-medium text-white",
        className
      )}
    >
      <div className="max-w-full flex-initial text-xs font-normal leading-none">
        {title ? <div>{title}</div> : <div>{children}</div>}
      </div>
    </div>
  );
}

export default Chip;
