"use client";
import React from "react";
import { Switch } from "@nextui-org/react";
import Icons from "../Icons";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FC } from "react";
import { MoonIcon } from "@/lib/MoonIcon";
import { SunIcon } from "@/lib/SunIcon";

interface ThemeToggleV2Props {}

const ThemeTogglev2: FC<ThemeToggleV2Props> = () => {
  const { theme, setTheme } = useTheme();

  const ToggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Switch
      isSelected={theme === "light" ? true : false}
      size="lg"
      onChange={() => {
        ToggleTheme();
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      color="success"
    />
  );
};

export default ThemeTogglev2;
