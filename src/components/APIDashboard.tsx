import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDistance } from "date-fns";
import { FC } from "react";
import { timeStamp } from "console";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Table from "./Table";
import ApiKeyOptions from "./ApiKeyOptions";

const APIDashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const APIKeys = await db.aPIKey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeAPIKey = await APIKeys.find((APIKeys) => APIKeys.enabled);

  if (!activeAPIKey) notFound();

  const userRequest = await db.aPIRequest.findMany({
    where: {
      apiKeyID: {
        in: APIKeys.map((key) => key.id),
      },
    },
  });

  const serializableRequests = userRequest.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading> Welcome back, {user.user.name} </LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph> API key: </Paragraph>
        <Input className="w-fit truncate" readOnly value={activeAPIKey.key} />
        <ApiKeyOptions
          apiKeyId={activeAPIKey.id}
          apiKeyKey={activeAPIKey.key}
        />
      </div>
      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default APIDashboard;
