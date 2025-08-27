"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const sections = [
  { name: "Tutors", path: "/dashboard/admin/tutors" },
  { name: "Students", path: "/dashboard/admin/students" },
  { name: "Enrollments", path: "/dashboard/admin/enrollments" },
  { name: "Events", path: "/dashboard/admin/events" },
  { name: "Transactions", path: "/dashboard/admin/transactions" },
  { name: "Courses", path: "/dashboard/admin/courses" },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.name} className="rounded-lg border bg-card shadow-sm p-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{section.name}</h2>
            <Button asChild variant="outline" size="lg">
              <Link href={section.path}>Manage {section.name}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 