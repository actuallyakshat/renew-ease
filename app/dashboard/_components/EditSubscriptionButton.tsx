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
import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateSubscription } from "../actions/subscriptions-actions";
import MarkRecurring from "./MarkRecurring";
import SelectFrequency from "./SelectFrequencyButton";
import { SelectStartDate } from "./SelectStartDate";

export default function EditSubscriptionButton({
  subscription,
}: {
  subscription: Subscription;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [name, setName] = useState(subscription.name);
  const [amount, setAmount] = useState(subscription.amount);
  const [selectedFrequency, setSelectedFrequency] = useState(
    subscription.frequency
  );
  const [isRecurring, setIsReccuring] = useState(subscription.isRecurring);
  const [startDate, setStartDate] = useState(subscription.startDate);

  async function handleSubmit() {
    if (!name.trim() || !amount || !selectedFrequency || !startDate) {
      toast.error("Please fill all the necessary fields.");
      return;
    }
    try {
      toast.loading("Updating subscription", { id: "update-subscription" });
      const response = await updateSubscription({
        id: subscription.id,
        name: name.trim(),
        amount: amount,
        startDate: startDate,
        isRecurring: isRecurring,
        selectedFrequency: selectedFrequency,
      });
      if (response.success) {
        toast.success("Subscription created successfully.", {
          id: "update-subscription",
        });
        setIsOpen(false);
      } else {
        toast.error(response.message, { id: "update-subscription" });
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message, { id: "update-subscription" });
    }
  }

  useEffect(() => {
    if (
      name.trim() == subscription.name &&
      selectedFrequency == subscription.frequency &&
      isRecurring == subscription.isRecurring &&
      startDate == subscription.startDate
    ) {
      setAllowSubmit(false);
    } else {
      setAllowSubmit(true);
    }
  }, [subscription, name, amount, selectedFrequency, isRecurring, startDate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full hover:bg-accent">
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Subscription</DialogTitle>
          <DialogDescription>
            Feel free to update the details about your subscription.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Subscription Name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={subscription.name}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              defaultValue={subscription.amount}
            />
          </div>
          <div>
            <SelectFrequency
              selectedFrequency={selectedFrequency}
              setSelectedFrequency={setSelectedFrequency}
            />
          </div>
          <SelectStartDate date={startDate} setDate={setStartDate} />
          <MarkRecurring
            defaultChecked={subscription.isRecurring}
            setIsReccuring={setIsReccuring}
          />
          <Button disabled={!allowSubmit}>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
