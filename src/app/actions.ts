"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "المرجو إدخال جميع المعلومات" };
  }

  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "المعلومات خاطئة، المرجو التأكد من البريد أو كلمة السر." };
    }

    // Create a session cookie with the professional Laravel Token
    const cookieStore = await cookies();
    cookieStore.set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    // Store user info (role) for UI persistence if needed
    cookieStore.set("user_role", result.user.role, { path: "/" });

    // Redirect based on role (Laravel roles are lowercase)
    const role = result.user.role.toLowerCase();
    if (role === "admin") {
      redirect("/dashboard/admin");
    } else if (role === "teacher") {
      redirect("/dashboard/teacher");
    } else {
      redirect("/dashboard/student");
    }
  } catch (err) {
    return { error: "عذراً، حدث خطأ في الاتصال بالخادم. تأكد من تشغيل الـ Backend." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_role");
  redirect("/login");
}
