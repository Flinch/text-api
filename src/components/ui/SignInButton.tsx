"use client";

import Button from "./Button";
import { FC, useState } from "react";
import { buttonVariants } from "./Button";
import { signIn } from "next-auth/react";
import { toast } from "./Toast";
//import toast, { Toaster } from "react-hot-toast";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error signing in",
        message: "Please try again later.",
        type: "error",
      });
    }
  };
  return (
    <Button
      onClick={signInWithGoogle}
      isLoading={isLoading}
      className={buttonVariants({ variant: "ghost" })}
    >
      {" "}
      Sign In{" "}
    </Button>
  );
};

export default SignInButton;
