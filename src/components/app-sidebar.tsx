"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserFromCookie } from "@/utlis/getUserFromCookie";
import { User } from "@/types";



const data = {
  user: {
    name: "medicare",
    email: "medicate@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Medicare-Pro", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Admin",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      roles: ["super_admin"], // admin add roles
      items: [
        { title: "Add Doctor", url: "/dashboard/admin/add-doctor" },
        { title: "View All Doctors", url: "/dashboard/admin/view-all-doctors" },
        { title: "Subscriptions Overview", url: "/dashboard/admin/subscriptions-overview" },
        // { title: "Add Subscriptions", url: "/dashboard/admin//subscriptions/add-new-plan" },
      ],
    },
    {
      title: "Doctor Panel",
      url: "/doctor",
      icon: Bot,
      roles: ["doctor"],
      items: [
        { title: "Add Assistants", url: "/dashboard/doctor/add-assistants" },
        { title: "View All Assistants", url: "/dashboard/doctor/all-assistants" },
        // { title: "Edit", url: "/edit" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user: User | null = getUserFromCookie();
  const userRole = user?.role ?? null;

  const allowedItems = data.navMain.filter((item) =>
    userRole ? item.roles?.includes(userRole) : false
  );
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={allowedItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
