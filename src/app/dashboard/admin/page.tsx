
'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
    const [doctorCount, setDoctorCount] = useState(0);
  const [recentDoctors, setRecentDoctors] = useState(0);

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const response = await fetch("../api/doctors");
        const data = await response.json();
        setDoctorCount(data);
      } catch (error) {
        console.error("Error fetching doctor count:", error);
      }
    };
    const fetchRecentDoctors = async () => {
      try {
        const response = await fetch("../api/doctors/recent");
        const data = await response.json();
        setRecentDoctors(data.count);
      } catch (error) {
        console.error("Error fetching recent doctors:", error);
      }
    };

    fetchDoctorCount();
    fetchRecentDoctors();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Medicare Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Panel</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Doctors</CardTitle>
          <p className="text-2xl font-bold">{doctorCount === null ? 'Loading...' : doctorCount}</p>
          <p className="text-sm text-muted-foreground">{recentDoctors} Doctors joined in the last weeks</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <p className="text-2xl font-bold">14,685</p>
          <p className="text-sm text-green-500">1.3% Up from past week</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <p className="text-2xl font-bold">$89,000</p>
          <p className="text-sm text-red-500">4.3% Down from yesterday</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expiring (7 Days)</CardTitle>
          <p className="text-2xl font-bold">1,460</p>
          <p className="text-sm text-green-500">1.8% Up from yesterday</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expired</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0</p>
        </CardContent>
      </Card>
    </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
