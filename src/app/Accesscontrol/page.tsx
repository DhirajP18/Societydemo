"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronRight } from "lucide-react";

/* ---------------- TYPES ---------------- */
type Role = "Admin" | "Manager" | "Security" | "Resident";

type Module = {
  id: string;
  name: string;
  children: { id: string; name: string }[];
};

/* ---------------- DATA ---------------- */
const ROLES: Role[] = ["Admin", "Manager", "Security", "Resident"];

const MODULES: Module[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    children: [{ id: "overview", name: "Overview" }, { id: "stats", name: "Statistics" }],
  },
  {
    id: "master",
    name: "Master",
    children: [
      { id: "building", name: "Building Master" },
      { id: "floor", name: "Floor Master" },
      { id: "flat", name: "Flat Master" },
    ],
  },
  {
    id: "users",
    name: "User Management",
    children: [
      { id: "create-user", name: "Create User" },
      { id: "give-access", name: "Give Access" },
      { id: "create-role", name: "Create Role" },
    ],
  },
  {
    id: "residential",
    name: "Residential",
    children: [
      { id: "create-residential", name: "Create Residential" },
      { id: "documents-kyc", name: "Documents & KYC Verification" },
    ],
  },
  {
    id: "service",
    name: "Service",
    children: [
      { id: "add-service", name: "Add Service Provider" },
      { id: "service-list", name: "Service Provider List" },
    ],
  },
  {
    id: "parking",
    name: "Parking",
    children: [
      { id: "parking-setting", name: "Parking Setting" },
      { id: "assign-slot", name: "Assign Parking Slot" },
      { id: "parking-status", name: "Parking Status" },
    ],
  },
  {
    id: "account",
    name: "Account",
    children: [
      { id: "add-bank", name: "Add Bank" },
      { id: "payments", name: "Payments" },
      { id: "rent-status", name: "Rent Status" },
      { id: "maintenance-setting", name: "Maintenance Setting" },
    ],
  },
  {
    id: "announcements",
    name: "Announcements",
    children: [
      { id: "notice", name: "Add Notice" },
      { id: "event", name: "Add Event" },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    children: [
      { id: "upload-documents", name: "Add Documents" },
      { id: "download-documents", name: "Check Documents" },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    children: [
      { id: "monthly-rent", name: "Monthly Rent" },
      { id: "maintenance-report", name: "Maintenance Report" },
      { id: "other-report", name: "Other Report" },
    ],
  },
];

/* ---------------- PAGE ---------------- */
export default function AccessControlPage() {
  const [role, setRole] = useState<Role | "">("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  /* ---------- HELPERS ---------- */
  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleModule = (module: Module) => {
    const childIds = module.children.map((c) => c.id);
    const allSelected = childIds.every((id) => permissions.includes(id));

    setPermissions((prev) => {
      if (allSelected) return prev.filter((p) => !childIds.includes(p));
      const merged = [...prev];
      childIds.forEach((id) => {
        if (!merged.includes(id)) merged.push(id);
      });
      return merged;
    });
  };

  const savePermissions = () => {
    if (!role) {
      toast({
        title: "Select Role",
        description: "Please choose a role first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Permissions Saved",
      description: `Access updated for ${role}`,
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Access Control</h1>
        <p className="text-sm text-muted-foreground">
          Assign module access based on roles
        </p>
      </div>

      {/* ROLE SELECT */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Select Role</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger className="w-full md:w-72">
              <SelectValue placeholder="Choose role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* TREE VIEW */}
      {role && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Module Permissions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {MODULES.map((module) => {
              const childIds = module.children.map((c) => c.id);
              const isChecked = childIds.every((id) => permissions.includes(id));
              const isExpanded = expanded.includes(module.id);

              return (
                <div key={module.id} className="rounded-lg border dark:border-gray-800">
                  {/* MODULE HEADER */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleExpand(module.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span className="font-semibold">{module.name}</span>
                    </div>

                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleModule(module)}
                    />
                  </div>

                  {/* SUB MENUS */}
                  {isExpanded && (
                    <div className="pl-10 pr-4 pb-3 space-y-2 animate-in slide-in-from-top-2">
                      {module.children.map((child) => (
                        <div key={child.id} className="flex items-center gap-3">
                          <Checkbox
                            checked={permissions.includes(child.id)}
                            onCheckedChange={() => togglePermission(child.id)}
                          />
                          <span className="text-sm">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* SAVE */}
            <div className="flex justify-end pt-4">
              <Button className="bg-green-600 hover:bg-green-700" onClick={savePermissions}>
                Save Permissions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
