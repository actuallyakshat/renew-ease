"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteSubscription } from "../actions/subscriptions-actions";
import { toast } from "sonner";

export default function DeleteSubscriptionButton({
  subscriptionId,
}: {
  subscriptionId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    try {
      toast.loading("Deleting...", { id: "delete-subscription" });
      const response = await deleteSubscription({ subscriptionId });
      if (response.success) {
        toast.success("Subscription deleted successfully", {
          id: "delete-subscription",
        });
        setIsOpen(false);
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Something went wrong", { id: "delete-subscription" });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full hover:bg-accent">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are about to delete a subscription. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 items-center justify-center">
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button className="w-full" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
