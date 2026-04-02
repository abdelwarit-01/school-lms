import Link from "next/link";
import { Bell, Book, Home, Settings, LogOut, MessageSquare } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row-reverse font-sans selection:bg-amber-500/30">
      
      {/* Sidebar (Right side for Arabic) */}
      <aside className="w-full md:w-64 bg-slate-900/50 border-l border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5 flex items-center justify-end gap-3">
          <span className="font-bold text-lg tracking-tight">نور الصفا</span>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-sm shadow-lg">
            NE
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard/admin" className="flex items-center justify-end gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-amber-500 font-medium transition-colors">
            الرئيسية <Home className="w-5 h-5" />
          </Link>
          <div className="flex items-center justify-end gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-not-allowed opacity-50" title="قريباً">
            المقررات والدروس <Book className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-end gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-not-allowed opacity-50" title="قريباً">
            التواصل <MessageSquare className="w-5 h-5" />
          </div>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center justify-end gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            الإعدادات <Settings className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center justify-end gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            تسجيل الخروج <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-slate-900/20 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">محمد العلوي</p>
              <p className="text-xs text-slate-400">أستاذ الرياضيات</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-amber-500 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
