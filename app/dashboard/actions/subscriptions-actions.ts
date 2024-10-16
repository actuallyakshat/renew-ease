"use server";

import prisma from "@/db";
import { Frequency } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface createSubscriptionProps {
  name: string;
  amount: number;
  startDate: Date;
  isRecurring: boolean;
  userId: string;
  selectedFrequency: Frequency
}
interface updateSubscriptionProps {
  name: string;
  amount: number;
  startDate: Date;
  isRecurring: boolean;
  selectedFrequency: Frequency
  id?: number
}

export async function createSubscription({
  name,
  amount,
  startDate,
  isRecurring,
  userId,
  selectedFrequency
}: createSubscriptionProps) {
  try {
    const newSubscription = await prisma.subscription.create({
      data: {
        name,
        amount,
        startDate,
        isRecurring,
        userId,
        frequency: selectedFrequency
      },
    });
    revalidatePath("/dashboard");
    return { success: true, data: newSubscription };
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return { success: false, error: err.message };
  }
}

export async function deleteSubscription({
  subscriptionId,
}: {
  subscriptionId: number;
}) {
  try {
    const newSubscription = await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, data: newSubscription };
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return { success: false, error: err.message };
  }
}

export async function updateSubscription({
  id,
  name,
  amount,
  startDate,
  isRecurring,
  selectedFrequency
}: updateSubscriptionProps){
  try{
    if(!id) return {success: false, data: null, message: "No subscription id provided"}
    const existingSubscription = await prisma.subscription.findUnique({
      where: {
        id: id
      }
    })

    if(!existingSubscription) {
      return {success: false, data: null, message: "Subscription not found"}
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id: id },
      data: {
        frequency: selectedFrequency,
        amount: amount,
        name: name,
        startDate: startDate,
        isRecurring: isRecurring,
      }
    });

    revalidatePath('/dashboard')
    return { success: true, data: updatedSubscription, message: "Subscription updated successfully" };
  }
  catch (error){
      const err = error as Error;
      console.error(err)
      return {success: false, data: null, message: err.message}
    }
}
