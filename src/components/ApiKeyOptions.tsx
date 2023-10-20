"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdowMenu";

import { FC, useState } from "react";
import Button from "./ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { createAPIKey } from "@/helpers/create-api-key";
import { useRouter } from "next/navigation";
import { revokeApiKey } from "@/helpers/revoke-api-key";

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const router = useRouter();

  const createNewApiKey = async () => {
    console.log("creating new");
    try {
      await revokeApiKey({ keyId: apiKeyId });
      await createAPIKey();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Error creating this API key. Please try again");
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey({ keyId: apiKeyId });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Error revoking this API key. Please try again");
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button
          variant="ghost"
          className="flex gap-2 items-center"
          isLoading={false}
        >
          <p>
            {" "}
            {isCreatingNew
              ? "Creating New Key"
              : isRevoking
              ? "Revoking New Key"
              : "Options"}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className="animaite-spin w-4 h-4 " />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey);
            toast.success("Copied!");
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
