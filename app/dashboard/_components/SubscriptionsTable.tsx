import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subscription } from "@prisma/client";
import { Ellipsis } from "lucide-react";

function sortSubscriptionsByAmount(
  subscriptions: Subscription[]
): Subscription[] {
  return subscriptions.sort((a, b) => {
    return b.amount - a.amount;
  });
}

export default function SubscriptionsTable({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  const subscriptionsSortedByAmount = sortSubscriptionsByAmount(subscriptions);

  return (
    <Table>
      <TableCaption>A list of your subscriptions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead className="w-full">Name</TableHead>
          <TableHead className="min-w-[120px] text-right">Amount</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Recurring</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptionsSortedByAmount.map((subscription, index) => (
          <TableRow key={subscription.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{subscription.name}</TableCell>
            <TableCell className="text-right">
              ₹ {subscription.amount}
            </TableCell>
            <TableCell>
              {new Date(subscription.startDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {convertToCapitalCase(subscription.frequency)}
            </TableCell>
            <TableCell>{subscription.isRecurring ? "Yes" : "No"}</TableCell>
            <TableCell className="text-right h-full flex justify-end items-center">
              <SubscriptionMenu subscription={subscription} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteSubscriptionButton from "./DeleteSubscriptionButton";
import EditSubscriptionButton from "./EditSubscriptionButton";

function SubscriptionMenu({ subscription }: { subscription: Subscription }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Ellipsis className="stroke-[1px] stroke-[#212121]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage Subscription</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <EditSubscriptionButton subscription={subscription} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteSubscriptionButton subscriptionId={subscription.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function convertToCapitalCase(text: string): string {
  const newString = text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return newString;
}
