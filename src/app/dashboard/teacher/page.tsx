import { Users, BookOpen, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import CreateMaterial from "@/components/CreateMaterial";

export default async function TeacherDashboard() {
  const cookieStore = await cookies();
  const teacherId = cookieStore.get("auth_session_id")?.value;

  const classes = await prisma.class.findMany();
  const materials = await prisma.material.findMany({
    where: { teacherId },
    include: { class: true },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  const lessonCount = materials.filter((m: any) => m.type === "LESSON").length;
  const examCount = materials.filter((m: any) => m.type === "EXERCISE").length;

  return (
    <div className="space-y-6 text-right animate-fade-in-up">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500/20 to-transparent p-6 rounded-2xl border border-blue-500/20">
        
        <CreateMaterial classes={classes} />

        <div>
          <h1 className="text-2xl font-bold mb-1">فضاء الأستاذ</h1>
          <p className="text-slate-400">تابع أقسامك وأضف الدروس والمقررات بسهولة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "أقسامي المتاحة", count: classes.length.toString(), icon: Users, color: "text-indigo-400", bg: "bg-indigo-400/10" },
          { title: "دروسي", count: lessonCount.toString(), icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "تمارين مرفوعة", count: examCount.toString(), icon: FileText, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-sm text-slate-400">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-lg font-semibold mb-4 border-b border-white/5 pb-2">الأقسام بالمؤسسة</h2>
          <div className="space-y-3">
            {classes.map((cls: any) => (
              <div key={cls.id} className="flex justify-between items-center p-3 rounded-lg bg-black/20 hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <button className="text-xs px-3 py-1 bg-white/10 rounded text-slate-300 hover:text-white hover:bg-white/20 transition">تصفح</button>
                <div className="flex items-center gap-3">
                  <span>{cls.name}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex flex-col items-center justify-center text-blue-400"><Users className="w-4 h-4"/></div>
                </div>
              </div>
            ))}
            {classes.length === 0 && <p className="text-sm text-slate-500 text-center">لا توجد أقسام مسجلة بعد</p>}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-lg font-semibold mb-4 border-b border-white/5 pb-2">آخر الدروس المضافة</h2>
          <div className="space-y-3">
            {materials.map((m: any) => (
              <div key={m.id} className="flex justify-between items-center p-3 rounded-lg bg-black/20">
                 <span className="text-xs text-slate-500">{m.createdAt.toLocaleDateString('ar-MA')}</span>
                <div className="text-right">
                  <p className="font-medium text-slate-200">{m.title} <span className="text-xs px-2 py-0.5 rounded bg-white/5 mx-2">{m.type === "LESSON"? "درس":"تمرين"}</span></p>
                  <p className="text-xs text-slate-400">{m.class.name}</p>
                </div>
              </div>
            ))}
            {materials.length === 0 && <p className="text-sm text-slate-500 text-center">لم تقم بإضافة أي درس بعد</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
