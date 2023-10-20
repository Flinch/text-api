"use client";
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Code from "@/components/Code";
import { nodejs, python } from "@/helpers/documentation-code";
import SimpleBar from "simplebar-react";

interface DocumentationTabsProps {}

const DocumentationTabs: FC<DocumentationTabsProps> = ({}) => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs"> NodeJS</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <Code
          animationDelay={150}
          animated={false}
          show
          Language="javascript"
          code={nodejs}
        />
      </TabsContent>
      <TabsContent value="python">
        {" "}
        <Code
          animationDelay={150}
          animated={false}
          show
          Language="Python"
          code={python}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
