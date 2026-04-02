import Link from "next/link";
import { ArrowRight, BookOpen, Users, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 font-sans selection:bg-amber-500/30">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20">
            NE
          </div>
          <span className="text-xl font-semibold tracking-tight">Nour Essafa</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-medium hover:text-amber-400 transition-colors">
            دخول (Connexion)
          </Link>
          <Link href="/dashboard" className="px-5 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all hover:scale-105 active:scale-95">
            الفضاء الرقمي
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          المنصة التعليمية الرقمية الجديدة 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-amber-100 to-slate-400 text-transparent bg-clip-text">
          مجموعة مدارس <br className="hidden md:block"/> نور الصفا
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          بوابتك للحصول على الدروس، التمارين، وآخر أخبار المدرسة مباشرة من بيتك. 
          تعليم عصري يواكب طموحات أبنائنا.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 z-10">
          <Link href="/dashboard" className="group flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full font-bold transition-all hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:-translate-y-1">
            البدء الآن
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-all hover:-translate-y-1">
            تعرف على البرنامج
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full z-10 text-right">
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors group cursor-default">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">الدروس والتمارين</h3>
            <p className="text-slate-400 text-sm leading-relaxed">التبادل السلس للمقررات بين الأساتذة والتلاميذ في أي وقت.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors group cursor-default">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">تواصل مباشر</h3>
            <p className="text-slate-400 text-sm leading-relaxed">منصة تجمع الإدارة، الأساتذة، والتلاميذ في مكان واحد.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors group cursor-default">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">آخر الأخبار</h3>
            <p className="text-slate-400 text-sm leading-relaxed">إعلانات الإدارة والأنشطة المدرسية تصلكم حصرياً عبر حسابكم.</p>
          </div>

        </div>
      </main>
    </div>
  );
}
