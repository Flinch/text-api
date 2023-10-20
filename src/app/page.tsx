import Paragraph from "../components/ui/Paragraph";
import LargeHeading from "@/components/ui/LargeHeading";
import Button from "@/components/ui/Button";
import Image from "next/image";
import type { Metadata } from "next";
import SignInButton from "@/components/ui/SignInButton";
import SignInHomeButton from "@/components/ui/SignInHomeButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardButton from "@/components/ui/DashboardButton";

export const metadata: Metadata = {
  title: "TextHub",
  description: "A Hub for all your text related needs",
};
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-start items-center">
          <LargeHeading
            size="large"
            className="three-d text-black dark:text-light-gold"
          >
            {" "}
            Text/API
          </LargeHeading>
          <Paragraph className="max-w-xl lg:text-center">
            With our API service, you can easily compare two pieces of text to
            find out how similar they are.
          </Paragraph>

          {!session ? (
            <>
              <Paragraph className="max-w-xl lg:text-center">
                {" "}
                Sign in with your google account below to get started
              </Paragraph>

              <SignInHomeButton />
            </>
          ) : (
            <DashboardButton />
          )}
        </div>
      </div>
    </div>
  );
}
