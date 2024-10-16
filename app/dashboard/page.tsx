import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import SubscriptionsTable from "./_components/SubscriptionsTable";
import StatsCards from "./_components/StatsCards";
import AddSubscriptionButton from "./_components/AddSubscriptionButton";

export default async function Dashboard() {
  const user = await currentUser();

  const userDetails = await prisma.user.findUnique({
    where: {
      clerkId: user!.id,
    },
    include: {
      Subscriptions: true,
    },
  });

  if (!userDetails) return;

  console.log(userDetails);

  return (
    <div>
      <div className="max-w-screen-xl pt-10 px-5 w-full mx-auto">
        <h1 className="font-extrabold text-2xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground pt-1">
          An overview of all your current subscriptions
        </p>
        <div className="w-full flex items-center justify-end">
          <AddSubscriptionButton
            currency={userDetails.currency}
            userId={userDetails.clerkId}
          />
        </div>
        <StatsCards user={userDetails} />
        <div className="mt-10">
          <h2 className="font-extrabold text-2xl">Your Subscriptions</h2>
          <p className="mt-1 mb-10 text-sm text-muted-foreground">
            A list of all your subscriptions
          </p>
          <SubscriptionsTable subscriptions={userDetails.Subscriptions} />
        </div>
      </div>
    </div>
  );
}
