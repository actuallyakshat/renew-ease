"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/GlobalContext";
import { Currency } from "@prisma/client";
import { useEffect, useState } from "react";

export default function EditProfileForm() {
  const { clientUser: user } = useGlobalStore();

  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    user?.currency || Currency.INR
  );
  const [allowSave, setAllowSave] = useState(false);

  useEffect(() => {
    if (
      user?.currency != selectedCurrency ||
      user.email != email ||
      user.name != name
    ) {
      setAllowSave(true);
    } else {
      setAllowSave(false);
    }
  }, [user, name, email, selectedCurrency]);

  return (
    <form className="mt-6 max-w-lg flex flex-col gap-5">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="john.doe@example.com"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={user?.email || ""}
        />
      </div>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          type="text" // Corrected to text type for name input
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          defaultValue={user?.name || ""}
        />
      </div>
      <div className="space-y-2">
        <Label>Currency</Label>
        <Select
          value={selectedCurrency}
          onValueChange={(value) => setSelectedCurrency(value as Currency)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Currency.INR}>INR</SelectItem>
            <SelectItem value={Currency.USD}>USD</SelectItem>
            <SelectItem value={Currency.EUR}>EUR</SelectItem>
            <SelectItem value={Currency.GBP}>GBP</SelectItem>
            <SelectItem value={Currency.JPY}>JPY</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={!allowSave}>Save Changes</Button>
    </form>
  );
}
