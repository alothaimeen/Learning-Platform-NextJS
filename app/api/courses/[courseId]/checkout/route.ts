import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Bypass Stripe and simulate enrollment success
    await db.purchase.create({
      data: {
        userId: user.id,
        courseId: course.id,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "You are now enrolled in the course!",
    });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
