import { Users, BookOpen, AlertCircle, TrendingUp } from "lucide-react";
import ExcelUpload from "@/components/ExcelUpload";
import CreateAnnouncement from "@/components/CreateAnnouncement";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  let stats = {
    total_teachers: 0,
    total_students: 0,
    total_classes: 0,
    total_materials: 0,
    latest_announcements: []
  };

  try {
    const res = await fetch("http://localhost:8000/api/dashboard", { cache: 'no-store' });
    const json = await res.json();
    if (json.success) {
      stats = {
        total_teachers: json.data.total_teachers,
        total_students: json.data.total_students,
        total_classes: json.data.total_classes,
        total_materials: json.data.total_assignments,
        latest_announcements: json.data.latest_announcements
      };
    }
  } catch (err) {
    console.error("Dashboard Bridge Error:", err);
  }

  const { total_teachers, total_students, total_classes, total_materials, latest_announcements } = stats;

  return (
    <div className="space-y-6 text-right animate-fade-in-up">
      <div className="flex justify-between items-center bg-gradient-to-r from-amber-500/20 to-transparent p-6 rounded-2xl border border-amber-500/20">
        
        <CreateAnnouncement />

        <div>
          <h1 className="text-2xl font-bold mb-1">مرحباً بالسيد المدير</h1>
          <p className="text-slate-400">نظرة عامة على نشاط المؤسسة اليوم</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "الأساتذة", count: total_teachers.toString(), icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "التلاميذ", count: total_students.toString(), icon: Users, color: "text-amber-400", bg: "bg-amber-400/10" },
          { title: "الأقسام", count: total_classes.toString(), icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { title: "الدروس المضافة", count: total_materials.toString(), icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10" },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-lg font-semibold mb-4 border-b border-white/5 pb-2">آخر الإعلانات المنشورة</h2>
          <div className="space-y-4">
            {latest_announcements.map((item: any) => (
              <div key={item.id} className="flex items-start justify-end gap-4 p-4 rounded-xl bg-black/20 hover:bg-black/40 transition-colors">
                <div className="text-right flex-1">
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.content || "بدون محتوى"}</p>
                  <p className="text-xs text-amber-500 mt-2">{new Date(item.published_at || item.created_at).toLocaleDateString("ar-MA")}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
            ))}
            {latest_announcements.length === 0 && <p className="text-sm text-slate-500 text-center">لم تقم بنشر أي إعلان بعد</p>}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ExcelUpload />
        </div>
      </div>
    </div>
  );
}
