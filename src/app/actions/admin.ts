"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function bulkAddStudents(students: { name: string, id: string, className: string }[]) {
  for (const s of students) {
    try {
      // Find or create the class
      let targetClass = await prisma.class.findUnique({
        where: { name: s.className }
      });

      if (!targetClass) {
        targetClass = await prisma.class.create({
          data: { name: s.className }
        });
      }

      await prisma.user.upsert({
        where: { email: s.id },
        update: {
          name: s.name,
          classId: targetClass.id
        },
        create: {
          email: s.id, // Using email as Student ID
          name: s.name,
          password: `PASS${s.id}`, // Default password
          role: "STUDENT",
          classId: targetClass.id
        }
      });
    } catch(e) {
      console.error(e);
    }
  }

  revalidatePath("/dashboard/admin");
  return { success: true, count: students.length };
}

export async function getClassesList() {
  return await prisma.class.findMany();
}
