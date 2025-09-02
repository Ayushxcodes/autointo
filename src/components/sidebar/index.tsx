"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
import Image from "next/image";

type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();

  return (
    <nav className="dark:bg-black h-screen flex flex-col justify-between py-4 px-2 overflow-auto">
      {/* Top section */}
      <div className="flex flex-col items-center gap-8 flex-1 overflow-auto">
        <Link className="flex font-bold" href="/">
          <Image
                    src="/fuzzieLogo.png"
                    width={15}
                    height={15}
                    alt="Auto_logo"
                    className="shadow-sm"
                  />
        </Link>

        {/* Menu items */}
        <TooltipProvider>
          <ul className="flex flex-col items-center gap-4">
            {menuOptions.map((menuItem) => (
              <Tooltip key={menuItem.name} delayDuration={0}>
                <TooltipTrigger>
                  <Link
                    href={menuItem.href}
                    className={clsx(
                      "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer transition-colors",
                      {
                        "dark:bg-[#2F006B] bg-[#EEE0FF]":
                          pathName === menuItem.href,
                      }
                    )}
                  >
                    <menuItem.Component
                      className={clsx(
                        "text-muted-foreground group-hover:text-primary transition-colors",
                        {
                          "text-black dark:text-white":
                            pathName === menuItem.href,
                        }
                      )}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p className="text-foreground">{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </ul>
        </TooltipProvider>

        <Separator className="my-0 w-8" />

        {/* Middle icons (no scrollbars now) */}
        <div className="flex flex-col items-center gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full border-[1px]">
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border-[1px] dark:border-t-[2px] dark:border-t-[#353346]">
            <LucideMousePointerClick
              className="dark:text-white text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform -translate-x-1/2 -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border-[1px] dark:border-t-[2px] dark:border-t-[#353346]">
            <GitBranch className="text-muted-foreground" size={18} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform -translate-x-1/2 -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border-[1px] dark:border-t-[2px] dark:border-t-[#353346]">
            <Database className="text-muted-foreground" size={18} />
          </div>
        
        </div>
      </div>

      {/* Bottom section (mode toggle always visible) */}
      <div className="flex items-center justify-center mt-6">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MenuOptions;
