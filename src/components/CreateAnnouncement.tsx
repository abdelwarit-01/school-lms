"use client";
import { useState, useTransition } from "react";
import { Plus, Loader2 } from "lucide-react";
import { addAnnouncement } from "@/app/actions/content";

export default function CreateAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await addAnnouncement(
        formData.get("title")?.toString() || "", 
        formData.get("content")?.toString() || ""
      );
      setIsOpen(false);
    });
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.6)]">
        إضافة بلاغ جديد <Plus className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg text-right shadow-2xl">
        <h2 className="text-xl font-bold mb-4">إنشاء بلاغ جديد للإدارة</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">عنوان البلاغ</label>
            <input name="title" required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-right focus:ring-2 focus:ring-amber-500 outline-none" placeholder="مثال: عطلة العيد..." />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">التفاصيل</label>
            <textarea name="content" required rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-right focus:ring-2 focus:ring-amber-500 outline-none" placeholder="اكتب تفاصيل الإعلان هنا..."></textarea>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              إلغاء
            </button>
            <button type="submit" disabled={isPending} className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : "نشر البلاغ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
