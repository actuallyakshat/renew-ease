import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

export default function MarkRecurring({
  defaultChecked,
  setIsReccuring,
}: {
  defaultChecked: boolean;
  setIsReccuring: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-2 pl-0.5">
      <Checkbox
        id="reccuring-checkbox"
        defaultChecked={defaultChecked}
        onCheckedChange={(newValue) => setIsReccuring(newValue === true)}
      />

      <Label htmlFor="reccuring-checkbox">Reccuring?</Label>
    </div>
  );
}
