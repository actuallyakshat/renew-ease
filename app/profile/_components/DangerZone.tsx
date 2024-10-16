"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function DangerZone() {
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);
  return (
    <div className="flex flex-col">
      <button
        className="max-w-lg w-full"
        onClick={() => setShowDeleteButton(!showDeleteButton)}
      >
        <div className="flex w-full gap-6 py-3 items-center">
          <hr className="max-w-lg flex-1" />
          <h2 className="text-sm text-muted-foreground">
            {showDeleteButton ? "Collapse" : "Show"} Danger Zone
          </h2>
          <hr className="max-w-lg flex-1" />
        </div>
      </button>

      {showDeleteButton && (
        <Button
          variant={"destructive"}
          className="w-full max-w-lg mt-2 bg-red-700 hover:bg-red-800 "
        >
          Delete Account
        </Button>
      )}
    </div>
  );
}
