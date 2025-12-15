"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

import {
  Bell,
  Moon,
  Sun,
  Search,
  User,
} from "lucide-react";

export default function Header() {
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();

  const userName = "Dhiraj Patil"; // later from auth
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="w-full h-16 border-b bg-background flex items-center justify-between px-6">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        {/* Show title only when sidebar collapsed */}
        {state === "collapsed" && (
          <h1 className="text-lg font-semibold tracking-wide">
            Society-365
          </h1>
        )}
      </div>

      {/* CENTER SEARCH */}
      <div className="hidden md:flex w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        {/* Dark / Light Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* PROFILE DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-semibold"
            >
              {initials}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
