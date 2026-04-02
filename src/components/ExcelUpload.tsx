"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, Loader2, CheckCircle2 } from "lucide-react";
import { bulkAddStudents } from "@/app/actions/admin";

export default function ExcelUpload() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        // Expected columns: Name, ID, Class
        const students = jsonData.map((row: any) => ({
          name: row["الإسم"] || row["Name"] || row["name"],
          id: String(row["رقم التلميذ"] || row["ID"] || row["id"]),
          className: row["القسم"] || row["Class"] || row["class"] || "بدون قسم"
        })).filter(s => s.name && s.id && s.id !== "undefined");

        if (students.length === 0) {
          setErrorMsg("لم يتم العثور على بيانات صحيحة. المرجو التأكد من أسماء الأعمدة (الإسم, رقم التلميذ, القسم)");
          setLoading(false);
          return;
        }

        const res = await bulkAddStudents(students);
        if (res?.success) {
          setSuccessMsg(`تمت إضافة ${res.count} تلميذ بنجاح. المودباس الافتراضي هو PASS متبوعة برقم التلميذ.`);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("حدث خطأ أثناء قراءة الملف. تأكد أنه ملف Excel صالح.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-2 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
        <FileSpreadsheet className="w-8 h-8" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-1">إضافة التلاميذ عبر Excel</h3>
        <p className="text-sm text-slate-400">حمل ملف Excel يحتوي على الأعمدة: (الإسم, رقم التلميذ, القسم)</p>
      </div>

      {errorMsg && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl w-full">{errorMsg}</p>}
      {successMsg && <p className="text-emerald-400 text-sm bg-emerald-400/10 p-3 rounded-xl w-full flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> {successMsg}</p>}

      <label className="relative flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl cursor-pointer transition-all w-full max-w-sm group">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />}
        <span className="font-medium">{loading ? "جاري الإضافة..." : "اختر ملف Excel"}</span>
        <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleFileUpload} disabled={loading} />
      </label>
      
      <p className="text-xs text-slate-500 mt-2">
        المودباس الافتراضي سيكون هو `PASS` ثم رقم التلميذ. مثلاً: PASS202401
      </p>
    </div>
  );
}
