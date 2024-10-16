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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Frequency } from "@prisma/client";

import React from "react";
import { toast } from "sonner";
import { createSubscription } from "../actions/subscriptions-actions";
import MarkRecurring from "./MarkRecurring";
import SelectFrequency from "./SelectFrequencyButton";
import { SelectStartDate } from "./SelectStartDate";

export default function AddSubscriptionButton({
  currency,
  userId,
}: {
  currency: string;
  userId: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [isRecurring, setIsReccuring] = React.useState<boolean>(true);
  const [selectedFrequency, setSelectedFrequency] = React.useState<Frequency>(
    Frequency.MONTHLY
  );

  async function handleSubmit() {
    if (!name || !name.trim() || !amount || !startDate || !selectedFrequency)
      return;

    try {
      toast.loading("Adding subscription...", { id: "add-subscription" });
      const response = await createSubscription({
        name,
        amount,
        startDate,
        isRecurring,
        userId,
        selectedFrequency,
      });

      if (response.success) {
        setIsOpen(false);
        toast.success("Subscription created successfully", {
          id: "add-subscription",
        });
      }
    } catch (error: unknown) {
      toast.error("Error creating subscription", { id: "add-subscription" });
      console.error(error);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="font-semibold px-6 mt-2 py-2 text-sm border rounded-lg underline-offset-4 hover:bg-zinc-50 transition-colors">
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subscription</DialogTitle>
            <DialogDescription>
              Add a new record to your subscriptions list
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="form-div">
              <Label>Name</Label>
              <Input
                placeholder="Subscription Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-div">
              <Label>Amount</Label>
              <Input
                placeholder={`Amount in ${currency}`}
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <SelectFrequency
              selectedFrequency={selectedFrequency}
              setSelectedFrequency={setSelectedFrequency}
            />
            <SelectStartDate date={startDate} setDate={setStartDate} />
            <MarkRecurring
              setIsReccuring={setIsReccuring}
              defaultChecked={true}
            />

            <Button className="mt-2">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
