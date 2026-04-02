"use client";
import Link from "next/link";
import { ArrowLeft, KeyRound, User } from "lucide-react";
import { useState, useTransition } from "react";
import { loginAction } from "@/app/actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-amber-500/30">
      
      <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-4 h-4" /> العودة للرئيسية
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-white/5 border border-white/10 p-2 shadow-2xl shadow-amber-500/10 mb-6 flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="School Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">تسجيل الدخول</h2>
        <p className="text-slate-400">الفضاء الرقمي لمجموعة مدارس نور الصفا</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/5 border border-white/10 py-8 px-4 shadow sm:rounded-3xl sm:px-10 backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-right">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 text-right">
                البريد الإلكتروني (أو رقم التلميذ)
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <input id="email" name="email" type="text" required
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-white/10 rounded-xl shadow-sm bg-black/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all sm:text-sm text-right"
                  placeholder="name@school.com أو 202401" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 text-right">
                كلمة السر
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input id="password" name="password" type="password" required
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-white/10 rounded-xl shadow-sm bg-black/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all sm:text-sm text-right"
                  placeholder="••••••••" />
              </div>
            </div>

            <div>
              <button type="submit" disabled={isPending} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-500 transition-all disabled:opacity-50">
                {isPending ? "جاري الدخول..." : "دخول"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
