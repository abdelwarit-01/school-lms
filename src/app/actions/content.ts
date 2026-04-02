"use server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addAnnouncement(title: string, content: string) {
  const cookieStore = await cookies();
  const authorId = cookieStore.get("auth_session_id")?.value;
  if (!authorId) return { error: "لم يتم العثور على الحساب" };

  await prisma.announcement.create({
    data: {
      title,
      content,
      authorId
    }
  });

  revalidatePath("/dashboard/admin");
  return { success: true };
}

export async function addMaterial(data: { title: string, className: string, type: string }) {
  const cookieStore = await cookies();
  const teacherId = cookieStore.get("auth_session_id")?.value;
  if (!teacherId) return { error: "لم يتم العثور على الحساب" };

  // Find class
  const classItem = await prisma.class.findUnique({
    where: { name: data.className }
  });

  if (!classItem) return { error: "القسم غير موجود في النظام" };

  await prisma.material.create({
    data: {
      title: data.title,
      type: data.type,
      classId: classItem.id,
      teacherId
    }
  });

  revalidatePath("/dashboard/teacher");
  return { success: true };
}
