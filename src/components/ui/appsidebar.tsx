"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Home,
  Grid,
  Layers,
  User,
  LogOut,
  UserCheck,
  Wrench,
  FileText,
  File,
  CreditCard,
  Book,
  Bell,
  ChevronDown,
} from "lucide-react";
import { SidebarFooter } from "@/components/ui/sidebar";
import { buttonVariants } from "@/components/ui/button";

const user = {
  name: "Dhiraj Patil", // replace with dynamic user info
};

export function AppSidebarFooter() {
  const { state } = useSidebar();
  const initials = getUserInitials(user.name);

 return (
    <SidebarFooter className="border-t p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 w-full">
            {/* Circle with initials */}
            <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-semibold text-sm">
              {initials}
            </div>

            {/* Name visible only when expanded */}
            {state === "expanded" && (
              <span className="font-medium">{user.name}</span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="w-40">
          <DropdownMenuItem asChild>
            <a href="/profile" className="flex items-center gap-2">
              <User size={16} /> Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/logout" className="flex items-center gap-2 text-red-500">
              <LogOut size={16} /> Logout
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );

}

function getUserInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function AppSidebar() {
  const { state } = useSidebar();
 
  return (
    <Sidebar collapsible="icon">
      
      {/* HEADER */}
      <SidebarHeader className="border-b">
  <div className="flex items-center gap-2 px-3 h-12">

    {/* Logo – ALWAYS visible */}
    <div className="w-8 h-8 shrink-0 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
      S
    </div>

    {/* Text – ONLY when expanded */}
    {state === "expanded" && (
      <span className="text-base font-semibold whitespace-nowrap">
        Society-365
      </span>
    )}

  </div>
</SidebarHeader>




      <SidebarContent>
        <SidebarMenu className="space-y-2">

          {/* DASHBOARD */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-3 py-3">
                <Home size={20} />
                {state === "expanded" && <span>Dashboard</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* MASTER */}
          {state === "expanded" ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Grid size={20} />
                      <span>Master</span>
                    </div>
                    <ChevronDown size={16} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent>
                <div className="ml-8 space-y-1">
                  <SidebarMenuButton asChild>
                    <Link href="/Building">Building Master</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link href="/flour">Floor Master</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link href="/flats">Flat Master</Link>
                  </SidebarMenuButton>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="justify-center py-3">
                    <Grid size={20} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/master/building-master">Building Master</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/master/floor-master">Floor Master</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/master/flat-master">Flat Master</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}

          {/* USERS */}
          {state === "expanded" ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <User size={20} />
                      <span>Users</span>
                    </div>
                    <ChevronDown size={16} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent>
                <div className="ml-8 space-y-1">
                  <SidebarMenuButton asChild>
                    <Link href="/users/create-user">Create User</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link href="/users/give-access">Give Access</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link href="/users/create-role">Create Role</Link>
                  </SidebarMenuButton>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="justify-center py-3">
                    <User size={20} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/users/create-user">Create User</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/users/give-access">Give Access</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/users/create-role">Create Role</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}

           {/* RESIDENTIAL */}
          {state === "expanded" ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <FileText size={20} />
                      <span>Residential</span>
                    </div>
                    <ChevronDown size={16} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent className="ml-8 space-y-1">
                <SidebarMenuButton asChild>
                  <Link href="/residential/create-residential"> Create Residential</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/residential/documents-kyc"> Documents & KYC Verification</Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="justify-center py-3">
                    <FileText size={20} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/residential/create-residential"> Create Residential</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/residential/documents-kyc"> Documents & KYC Verification</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}



           {/* SERVICE */}
          {state === "expanded" ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Wrench size={20} />
                      <span>Service</span>
                    </div>
                    <ChevronDown size={16} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent className="ml-8 space-y-1">
                <SidebarMenuButton asChild>
                  <Link href="/service/add-provider"> Add Service Provider</Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="justify-center py-3">
                    <Wrench size={20} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/service/add-provider">Add Service Provider</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}

          {/* PARKING */}
          {state === "expanded" ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Layers size={20} />
                      <span>Parking</span>
                    </div>
                    <ChevronDown size={16} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent className="ml-8 space-y-1">
                <SidebarMenuButton asChild>
                  <Link href="/parking/parking-setting">Parking Setting</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/parking/assign-parking">Assign Parking Slot</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/parking/parking-status">Parking Status</Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="justify-center py-3">
                    <Layers size={20} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/parking/parking-setting">Parking Setting</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/parking/assign-parking">Assign Parking Slot</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/parking/parking-status">Parking Status</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
 
           {/* ACCOUNT */}
          {state === "expanded" ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} />
                      <span>Account</span>
                    </div>
                    <ChevronDown size={16} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent className="ml-8 space-y-1">
                <SidebarMenuButton asChild>
                  <Link href="/account/bank"> Add Bank</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/account/payments">Payments</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/account/rent-setting"> Rent Setting</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/account/maintenance-setting"> Maintenance Setting</Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="justify-center py-3">
                    <CreditCard size={20} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link href="/account/bank"> Add Bank</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/payments"> Payments</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/rent-setting"> Rent Setting</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/maintenance-setting"> Maintenance Setting</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}

{/* ANNOUNCEMENTS MODULE */}
{state === "expanded" ? (
  <Collapsible>
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <span>Announcements</span>
          </div>
          <ChevronDown size={16} />
        </SidebarMenuButton>
      </CollapsibleTrigger>
    </SidebarMenuItem>

    <CollapsibleContent>
      <div className="ml-8 space-y-1">
        <SidebarMenuButton asChild>
          <Link href="/announcements/add-notice">Add Notice</Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link href="/announcements/add-events">Add Events</Link>
        </SidebarMenuButton>
      </div>
    </CollapsibleContent>
  </Collapsible>
) : (
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="justify-center py-3">
          <Bell size={20} />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-52">
        <DropdownMenuItem asChild>
          <Link href="/announcements/add-notice">Add Notice</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/announcements/add-events">Add Events</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
)}

         {/* REPORTS MODULE */}
{state === "expanded" ? (
  <Collapsible>
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Book size={20} />
            <span>Reports</span>
          </div>
          <ChevronDown size={16} />
        </SidebarMenuButton>
      </CollapsibleTrigger>
    </SidebarMenuItem>

    <CollapsibleContent>
      <div className="ml-8 space-y-1">
        <SidebarMenuButton asChild>
          <Link href="/report/monthly-rent">Monthly Rent</Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link href="/report/other-report1">Report 2</Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link href="/report/other-report2">Report 3</Link>
        </SidebarMenuButton>
      </div>
    </CollapsibleContent>
  </Collapsible>
) : (
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="justify-center py-3">
          <Book size={20} />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-52">
        <DropdownMenuItem asChild>
          <Link href="/report/monthly-rent">Monthly Rent</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/report/other-report1">Report 2</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/report/other-report2">Report 3</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
)}

         

        </SidebarMenu>
      </SidebarContent>

    {/* FOOTER */}
      <AppSidebarFooter />

    </Sidebar>
  );
}
