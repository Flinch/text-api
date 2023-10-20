import { FC } from "react";
import type { Metadata } from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import DocumentationTabs from "@/components/DocumentationTabs";

export const metadata: Metadata = {
  title: "TextHub | Documentation",
  description: "Learn more about how to use our API on this page",
};

interface DocumentationProps {}

const Documentation: FC<DocumentationProps> = ({}) => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <div>
          {" "}
          <LargeHeading>How to Make a Request</LargeHeading>
          <Paragraph>api/v1/TextHub</Paragraph> <br />
          <DocumentationTabs />
        </div>
      </div>
    </div>
  );
};

export default Documentation;
