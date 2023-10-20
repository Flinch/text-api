"use client";
import { FC, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Key } from "lucide-react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import CopyButton from "./ui/CopyButton";
import { createAPIKey } from "@/helpers/create-api-key";
import { Input } from "./ui/Input";
import Button from "./ui/Button";

interface RequestAPIKeyProps {}

const RequestAPIKey = ({}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setAPIKey] = useState<string | null>("");

  const createNewAPIKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generatedAPIkey = await createAPIKey();
      console.log(generatedAPIkey);
      setAPIKey(generatedAPIkey);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div className="container md:max-w-3xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading> Request your API key</LargeHeading>
        <Paragraph> You haven&apos;t requested an API key yet </Paragraph>
      </div>

      <form
        onSubmit={createNewAPIKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        {" "}
        <div className="relative rounded-sm shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              valueToCopy={apiKey}
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300 "
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ? apiKey : ""}
            placeholder="Request an API key to display it here"
          />
        </div>
        <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            {" "}
            Request Key{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestAPIKey;
