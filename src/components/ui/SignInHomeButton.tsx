"use client";

import Button from "./Button";
import { FC, useState } from "react";
import { buttonVariants } from "./Button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { ChromeIcon } from "lucide-react";
import Icons from "@/components/Icons";
//import toast, { Toaster } from "react-hot-toast";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Unable to sign in with google. Please try again");
    }
  };
  return (
    <>
      <Button
        onClick={signInWithGoogle}
        isLoading={isLoading}
        className={buttonVariants({ variant: "signInHome" })}
      >
        Sign In{" "}
      </Button>
    </>
  );
};

export default SignInButton;
