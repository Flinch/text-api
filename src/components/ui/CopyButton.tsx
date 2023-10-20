"use client";

import { extend } from "lodash";
import { ButtonHTMLAttributes, FC } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  className,
  valueToCopy,
  ...props
}) => {
  return (
    <Button
      {...props}
      type="button"
      isLoading={false}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
      }}
      variant="link"
      className={cn("", className)}
    >
      {" "}
      <Copy className="h-6 w-6 pr-2" />
    </Button>
  );
};

export default CopyButton;
