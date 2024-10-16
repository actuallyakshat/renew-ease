import { Frequency } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SelectFrequency({
  selectedFrequency,
  setSelectedFrequency,
}: {
  selectedFrequency: Frequency;
  setSelectedFrequency: React.Dispatch<React.SetStateAction<Frequency>>;
}) {
  return (
    <div className="form-div">
      <Label>Frequency</Label>
      <Select
        value={selectedFrequency}
        onValueChange={(value) => setSelectedFrequency(value as Frequency)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Frequency.DAILY}>Daily</SelectItem>
          <SelectItem value={Frequency.WEEKLY}>Weekly</SelectItem>
          <SelectItem value={Frequency.MONTHLY}>Monthly</SelectItem>
          <SelectItem value={Frequency.QUARTERLY}>Queterly</SelectItem>
          <SelectItem value={Frequency.YEARLY}>Yearly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
