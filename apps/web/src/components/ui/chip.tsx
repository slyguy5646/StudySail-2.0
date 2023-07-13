import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  title: string;
  chipStyles: string;
}

function Chip({ title, chipStyles }: ChipProps) {
  return (
    <div
      className={cn(
        `m-1 ml-2 flex items-center justify-center rounded-full border bg-opacity-40 px-2 py-1 text-base font-medium`,
        chipStyles
      )}
    >
      <div className="max-w-full flex-initial text-xs font-normal leading-none">
        {title}
      </div>
    </div>
  );
}

export default Chip;
