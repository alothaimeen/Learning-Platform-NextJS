"use client";

import { BarChart, Compass, Layout, List, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";


const guestRoutes = [
  {
    icon: Layout,
    label: "Басты бет",
    href: "/",
  },
  {
    icon: Compass,
    label: "Курстар",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Курстар",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Аналитика",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      <a
        href="https://wa.me/+77026739869"
        className="flex items-center justify-center space-x-2 p-2 text-sm font-medium text-primary hover:text-primary-dark bg-primary/10 rounded-lg hover:bg-primary/20 transition"
      >
        <Phone className="w-4 h-4" />
        <span>+7 (702) 673-98-69</span>
      </a>
      <div className="mt-6 space-y-2">
        <span className="block text-sm font-medium text-black hover:text-gray-700 transition cursor-pointer">
          Пайдаланушы келісімі
        </span>
        <span className="block text-sm font-medium text-black hover:text-gray-700 transition cursor-pointer">
          Пайдалы сілтемелер
        </span>
        <span className="block text-sm font-medium text-black hover:text-gray-700 transition cursor-pointer">
          Құпиялылық саясаты
        </span>
        <span className="block text-sm font-medium text-black hover:text-gray-700 transition cursor-pointer">
          FAQ (Жиі қойылатын сұрақтар)
        </span>
      </div>
    </div>
  );
};
