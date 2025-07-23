"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  
  const teacherIdFromEnv = process.env.NEXT_PUBLIC_TEACHER_ID;

  return (
    <>
      {/* --- DEBUG BOX --- */}
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', padding: '15px', background: 'yellow', color: 'black', border: '2px solid red', zIndex: 9999, fontSize: '14px', fontFamily: 'monospace' }}>
        <p><strong>--- DEBUG INFO ---</strong></p>
        <p><strong>ID from Clerk:</strong> [{userId}]</p>
        <p><strong>ID from Vercel:</strong> [{teacherIdFromEnv}]</p>
        <p><strong>Do they match?:</strong> {userId === teacherIdFromEnv ? "YES" : "NO"}</p>
      </div>
      {/* --- END DEBUG BOX --- */}

      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}
