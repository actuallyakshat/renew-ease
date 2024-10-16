import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="z-[100] top-0 bg-background fixed flex h-screen w-full items-center justify-center">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  );
}
