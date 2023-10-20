import { FC, HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const LargeHeadingVariants = cva(
  "text-black dark:text-white lg:text-left text-center font-extrabold leading-tight",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        small: "text-2xl md:text-3xl lg:text-4xl",
        large: "text-5xl md:text-6xl lg:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface LargeHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof LargeHeadingVariants> {}

const LargeHeading = forwardRef<HTMLHeadingElement, LargeHeadingProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(LargeHeadingVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

LargeHeading.displayName = "LargeHeading";

export default LargeHeading;
