"use client";

import Button from "./Button";
import { FC, useState } from "react";
import { buttonVariants } from "./Button";
import { signIn } from "next-auth/react";
import { toast } from "./Toast";
import Link from "next/link";
//import toast, { Toaster } from "react-hot-toast";

interface DashboradButtonProps {}

const DashboardButton: FC<DashboradButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
      {" "}
      Go To Dashboard
    </Link>
  );
};

export default DashboardButton;
