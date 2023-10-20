import { FC } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import RequestAPIKey from "@/components/RequestAPIKey";
import APIDashboard from "@/components/APIDashboard";

export const Metatdata: Metadata = {
  title: "TextHub | Dashboard",
  description: "Dashbaord page for TextHub. ",
};

const Page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKey = await db.aPIKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto mt-16 ">
      {" "}
      {apiKey ? <APIDashboard /> : <RequestAPIKey />}{" "}
    </div>
  );
};

export default Page;
