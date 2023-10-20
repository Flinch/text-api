"use client";

import { FC, useEffect } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { useState } from "react";
import { useTheme } from "next-themes";

interface CodeProps {
  code: string;
  animated: boolean;
  show: boolean;
  Language: Language;
  animationDelay: number;
}

const lightTheme = themes.nightOwlLight;
const darkTheme = themes.nightOwl;

export const Code: FC<CodeProps> = ({
  code,
  Language,
  show,
  animated,
  animationDelay,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState<string>(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalID = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalID);
          }
        }, 15);
        return () => clearInterval(intervalID);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  const lines = text.split(/\r\n|\r|\n/).length;
  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight code={code} theme={theme} language={Language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
          }
          style={{ maxHeight: show ? lines * 24 : 0, opacity: show ? 1 : 0 }}
        >
          {tokens.map((line, i) => {
            const { key, ...props } = getLineProps({ line, key: i });
            return (
              <div
                key={`line-${i}`}
                style={{ position: "relative" }}
                {...props}
              >
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, i });
                  return <span key={index} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
