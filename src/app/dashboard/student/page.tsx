import { AlertCircle, Download, FileText, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("auth_session_id")?.value;

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: { class: true }
  });

  if (!student) return <div>لا يمكن العثور على التلميذ</div>;

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 3
  });

  const materials = student.classId ? await prisma.material.findMany({
    where: { classId: student.classId },
    include: { teacher: true },
    orderBy: { createdAt: "desc" },
    take: 10
  }) : [];

  const lessons = materials.filter((m: any) => m.type === "LESSON");
  const exercises = materials.filter((m: any) => m.type === "EXERCISE");

  return (
    <div className="space-y-6 text-right animate-fade-in-up">
      <div className="flex justify-between items-center bg-gradient-to-r from-emerald-500/20 to-transparent p-6 rounded-2xl border border-emerald-500/20">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">
            القسم: {student.class?.name || "غير محدد"}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">أهلاً بك، {student.name}</h1>
          <p className="text-slate-400">هذا هو فضاء التلميذ الخاص بك</p>
        </div>
      </div>

      {/* Announcements specific to student */}
      {announcements.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-start justify-end gap-3 text-right">
            <div className="flex-1">
              <h3 className="font-semibold text-amber-500 flex justify-end items-center gap-2">
                آخر إعلان من الإدارة <AlertCircle className="w-4 h-4" />
              </h3>
              <p className="font-medium text-slate-200 mt-2">{announcements[0].title}</p>
              <p className="text-sm text-slate-300 mt-1">{announcements[0].content}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Lessons */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-lg font-semibold mb-4 border-b border-white/5 pb-2 flex justify-end items-center gap-2">
            الدروس الخاصة بقسمك <BookOpen className="w-5 h-5 text-blue-400" />
          </h2>
          <div className="space-y-3">
            {lessons.map((lesson: any) => (
              <div key={lesson.id} className="flex justify-between items-center p-4 rounded-xl bg-black/20 hover:bg-black/30 transition-colors group">
                <button className="flex items-center gap-2 text-xs px-3 py-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20 transition">
                  مشاهدة <Download className="w-4 h-4" />
                </button>
                <div className="text-right">
                  <p className="font-medium text-slate-200">{lesson.title}</p>
                  <p className="text-xs text-slate-400">الأستاذ: {lesson.teacher.name}</p>
                </div>
              </div>
            ))}
            {lessons.length === 0 && <p className="text-sm text-slate-500 text-center">لا توجد دروس حالياً</p>}
          </div>
        </div>

        {/* Latest Exercises */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-lg font-semibold mb-4 border-b border-white/5 pb-2 flex justify-end items-center gap-2">
            تمارين للمراجعة <FileText className="w-5 h-5 text-emerald-400" />
          </h2>
          <div className="space-y-3">
            {exercises.map((ex: any) => (
              <div key={ex.id} className="flex justify-between items-center p-4 rounded-xl bg-black/20 hover:bg-black/30 transition-colors group">
                <button className="flex items-center gap-2 text-xs px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20 transition">
                  مشاهدة <Download className="w-4 h-4" />
                </button>
                <div className="text-right">
                  <p className="font-medium text-slate-200">{ex.title}</p>
                  <div className="flex justify-end gap-2 text-xs text-slate-400">
                    <span>{ex.createdAt.toLocaleDateString("ar-MA")}</span> • <span>الأستاذ: {ex.teacher.name}</span>
                  </div>
                </div>
              </div>
            ))}
            {exercises.length === 0 && <p className="text-sm text-slate-500 text-center">لا توجد تمارين حالياً</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
