import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function AdminLayout() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("sbartisan_admin_authenticated") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password })
      });
      const result = await response.json();
      if (result.success && result.token) {
        sessionStorage.setItem("sbartisan_admin_authenticated", "true");
        sessionStorage.setItem("sbartisan_admin_token", result.token);
        sessionStorage.setItem("sbartisan_admin_user", JSON.stringify(result.admin));
        setIsAuthenticated(true);
        setError("");
      } else {
        setError(result.message || "Invalid credentials. Access Denied.");
      }
    } catch (err) {
      console.error("Login connection error:", err);
      setError("Failed to connect to authentication server.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sbartisan_admin_authenticated");
    sessionStorage.removeItem("sbartisan_admin_token");
    sessionStorage.removeItem("sbartisan_admin_user");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const navigationItems: SidebarItem[] = [
    {
      label: "DASHBOARD",
      href: "/admin/dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      label: "PRODUCTS",
      href: "/admin/products",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      label: "CATEGORIES",
      href: "/admin/categories",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      label: "INQUIRIES",
      href: "/admin/inquiries",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "BLOGS",
      href: "/admin/blogs",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      label: "SETTINGS",
      href: "/admin/settings",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0A0A] text-[#EAE5D9] font-sans antialiased flex items-center justify-center p-6 selection:bg-[#CBB593] selection:text-[#0B0A0A]">
        <div className="w-full max-w-md bg-[#121110] border border-[#23211F] p-8 space-y-8 shadow-2xl relative">
          {/* Decorative corner lines */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CBB593]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#CBB593]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#CBB593]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#CBB593]" />
          
          <div className="text-center space-y-2 select-none">
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-[#CBB593] block">
              SB Artisan
            </span>
            <h2 className="font-serif text-2xl font-light text-white tracking-wide">
              Registry Desk Access
            </h2>
            <p className="text-[10px] text-[#8C8273] tracking-wider uppercase font-light">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 font-sans text-xs">
            {error && (
              <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-[11px] font-light text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none w-full font-sans transition-colors rounded-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-[#1E1D1C] border border-[#2C2B29] focus:border-[#CBB593] p-3 text-xs text-white placeholder:text-[#6E6B64] focus:outline-none w-full font-sans transition-colors rounded-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#CBB593] text-[#0B0A0A] hover:bg-[#DDC9AC] font-sans text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-none border-none cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-[9px] uppercase tracking-[0.18em] text-[#8C8273] hover:text-white transition-colors duration-300 font-sans hover:underline"
            >
              &larr; Return to SB Artisan Showroom
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0A0A] text-[#EAE5D9] font-sans antialiased flex flex-col lg:flex-row selection:bg-[#CBB593] selection:text-[#0B0A0A]">
      
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[#121110] border-b border-[#23211F] sticky top-0 z-30">
        <div className="space-y-0.5">
          <h1 className="font-serif text-sm tracking-[0.2em] text-white uppercase font-light">
            SB Artisan
          </h1>
          <p className="text-[8px] tracking-[0.2em] text-[#8C8273] uppercase font-light">
            Registry Panel
          </p>
        </div>
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="p-1 border border-[#2C2B29] text-[#8C8273] bg-transparent focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* 1. PERSISTENT SIDEBAR */}
      <aside 
        className={cn(
          "w-64 bg-[#121110] border-r border-[#23211F] shrink-0 p-6 flex flex-col justify-between h-[calc(100vh-62px)] lg:h-screen sticky lg:top-0 transition-all duration-300 z-20",
          "fixed lg:relative inset-x-0 bottom-0 top-[62px] lg:top-0 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="space-y-12">
          {/* Logo Header (Desktop only) */}
          <div className="space-y-1 hidden lg:block select-none">
            <h1 className="font-serif text-lg tracking-[0.2em] text-white uppercase font-light">
              SB Artisan
            </h1>
            <p className="text-[9px] tracking-[0.25em] text-[#8C8273] uppercase font-light">
              SB Artisan Registry Panel
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "w-full flex items-center gap-3.5 px-3 py-2.5 rounded-none text-[10px] tracking-widest transition-all duration-300 border-l-2",
                    isActive 
                      ? "text-white bg-[#1E1D1C] border-[#CBB593] font-medium" 
                      : "text-[#8C8273] border-transparent hover:text-white hover:bg-[#1E1D1C]/60"
                  )}
                >
                  <span className={cn("shrink-0", isActive ? "text-[#CBB593]" : "text-[#8C8273] group-hover:text-white")}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back Link & Logout */}
        <div className="pt-6 space-y-2 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 border border-red-950/20 hover:border-red-900/40 text-red-400/90 hover:text-red-400 hover:bg-red-950/15 text-[9px] tracking-[0.2em] uppercase font-light transition-all duration-300 rounded-none bg-transparent cursor-pointer"
          >
            Sign Out
          </button>
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 py-3 border border-[#2C2B29] text-[9px] tracking-[0.2em] uppercase font-light text-[#8C8273] hover:text-[#CBB593] hover:border-[#CBB593] transition-all duration-300 rounded-none bg-transparent"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Exit Registry</span>
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CMS CHILD ROUTE SLOT */}
      <div className="flex-grow min-h-[calc(100vh-62px)] lg:min-h-screen overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}
export type { SidebarItem };
