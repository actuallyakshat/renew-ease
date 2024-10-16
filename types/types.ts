import { Subscription, User } from "@prisma/client";

interface userWithSubscriptions extends User {
  Subscriptions: Subscription[];
}

export type {userWithSubscriptions}