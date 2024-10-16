import { Card, CardTitle } from "@/components/ui/card";
import { formatIndianNumber } from "@/lib/utils";
import { userWithSubscriptions } from "@/types/types";
import { Subscription } from "@prisma/client";

const getNextUpcomingRenewal = (subscriptions) => {
  if (!subscriptions || subscriptions.length === 0) return null;

  const currentDate = new Date();

  // Helper function to calculate the next renewal date
  const getNextRenewalDate = (sub) => {
    const { frequency, startDate } = sub;
    const nextRenewalDate = new Date(startDate); // Ensure it's a Date object

    while (nextRenewalDate <= currentDate) {
      switch (frequency) {
        case "WEEKLY":
          nextRenewalDate.setDate(nextRenewalDate.getDate() + 7); // Add 7 days for weekly renewal
          break;
        case "MONTHLY":
          nextRenewalDate.setMonth(nextRenewalDate.getMonth() + 1); // Add 1 month
          break;
        case "QUARTERLY":
          nextRenewalDate.setMonth(nextRenewalDate.getMonth() + 3); // Add 3 months
          break;
        case "YEARLY":
          nextRenewalDate.setFullYear(nextRenewalDate.getFullYear() + 1); // Add 1 year
          break;
        default:
          throw new Error("Invalid frequency type"); // Handles any unknown frequency cases
      }
    }
    return nextRenewalDate;
  };

  // Filter only recurring subscriptions and calculate the next renewal date
  const upcomingSubscriptions = subscriptions
    .filter((sub) => sub.isRecurring && sub.startDate)
    .map((sub) => ({
      ...sub,
      nextRenewalDate: getNextRenewalDate(sub),
    }))
    .filter((sub) => sub.nextRenewalDate > currentDate); // Only keep future renewals

  // Sort by the nearest renewal date
  upcomingSubscriptions.sort(
    (a, b) => a.nextRenewalDate.getTime() - b.nextRenewalDate.getTime() // Use getTime() for date comparison
  );

  // Return the next upcoming subscription
  return upcomingSubscriptions.length > 0 ? upcomingSubscriptions[0] : null;
};

export default function StatsCards({ user }: { user: userWithSubscriptions }) {
  const subscriptions = user.Subscriptions;
  const totalAmount = getTotalAnnualExpenditure({ subscriptions });

  const amountToDisplay = formatIndianNumber(totalAmount);

  const nextRenewal = getNextUpcomingRenewal(user?.Subscriptions);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-4 lg:grid-cols-3">
      <Card className="card">
        <CardTitle className="card-title">Total Subscriptions</CardTitle>
        <h3 className="stat">{user?.Subscriptions?.length}</h3>
      </Card>

      <Card className="card">
        <CardTitle className="card-title">Total Amount</CardTitle>
        <h3 className="stat">
          {amountToDisplay}{" "}
          <span className="text-base font-light">{user.currency}/year</span>
        </h3>
      </Card>

      <Card className="card">
        <CardTitle className="card-title">Next Renewal</CardTitle>
        <h3 className="stat">{nextRenewal?.name || "-"}</h3>
      </Card>
    </div>
  );
}

function getTotalAnnualExpenditure({
  subscriptions,
}: {
  subscriptions: Subscription[];
}): number {
  let totalAnnualExpenditure = 0;

  subscriptions.forEach((subscription) => {
    const { amount, isRecurring, frequency } = subscription;

    if (!isRecurring) {
      totalAnnualExpenditure += amount; // Add one-time payment to the total
    } else {
      switch (frequency) {
        case "DAILY":
          totalAnnualExpenditure += amount * 365;
          break;
        case "MONTHLY":
          totalAnnualExpenditure += amount * 12;
          break;
        case "WEEKLY":
          totalAnnualExpenditure += amount * 52;
          break;
        case "QUARTERLY":
          totalAnnualExpenditure += amount * 4;
          break;
        case "YEARLY":
          totalAnnualExpenditure += amount;
          break;
        default:
          totalAnnualExpenditure += 0;
      }
    }
  });

  return totalAnnualExpenditure;
}
