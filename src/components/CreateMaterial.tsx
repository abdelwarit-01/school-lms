"use client";
import { useState, useTransition } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { addMaterial } from "@/app/actions/content";

export default function CreateMaterial({ classes }: { classes: { id: string, name: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await addMaterial({
        title: formData.get("title")?.toString() || "",
        className: formData.get("className")?.toString() || "",
        type: formData.get("type")?.toString() || "LESSON",
      });
      setIsOpen(false);
    });
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-slate-950 font-medium rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]">
        رفع درس جديد <UploadCloud className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-right">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-fade-in-up">
        <h2 className="text-xl font-bold mb-4">إضافة مقرر جديد</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">اسم الدرس أو التمرين</label>
            <input name="title" required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-right focus:ring-2 focus:ring-blue-500 outline-none" placeholder="مثال: المعادلات من الدرجة الثانية..." />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">القسم المستهدف</label>
              <select name="className" required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none text-right">
                {classes.map(c => (
                  <option key={c.id} value={c.name} className="bg-slate-900">{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">نوع المقرر</label>
              <select name="type" required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none text-right">
                <option value="LESSON" className="bg-slate-900">درس</option>
                <option value="EXERCISE" className="bg-slate-900">سلسلة تمارين</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">ملف الدرس (قريباً)</label>
            <div className="w-full border-2 border-dashed border-white/10 rounded-lg p-4 text-center text-slate-500 bg-white/5 cursor-not-allowed">
              ميزة رفع الملفات ستكون متاحة لاحقاً
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              إلغاء
            </button>
            <button type="submit" disabled={isPending} className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-black font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : "نشر المقرر"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
