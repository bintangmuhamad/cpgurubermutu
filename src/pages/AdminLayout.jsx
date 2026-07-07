import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
const navItems = [
  {
    to: "/admin",
    end: true,
    label: "Dashboard",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    to: "/admin/kelola-game",
    label: "Kelola Game",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <circle cx="8" cy="12" r="1.5" fill="currentColor" />
        <circle cx="16" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: "/admin/penilaian-ahli",
    label: "Penilaian Ahli",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    to: "/admin/data-guru",
    label: "Data Guru",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // TODO: sesuaikan dengan logic auth kamu
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] flex">
{/* MOBILE SIDEBAR */}
<div
  className={`
    fixed inset-0 z-50 md:hidden transition-all duration-300
    ${sidebarOpen ? "visible" : "invisible"}
  `}
>
  {/* Overlay */}
  <div
    onClick={() => setSidebarOpen(false)}
    className={`
      absolute inset-0 bg-black/40 transition-opacity
      ${sidebarOpen ? "opacity-100" : "opacity-0"}
    `}
  />

  {/* Drawer */}
  <div
    className={`
      absolute left-0 top-0 h-full w-[260px]
      bg-white p-5 border-r border-[#f0edfb]
      flex flex-col
      transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#C026D3] flex items-center justify-center text-white">
          🛡️
        </div>

        <span className="font-bold text-gray-900">
          Admin Panel
        </span>
      </div>

      <button
        onClick={() => setSidebarOpen(false)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <X size={20} />
      </button>
    </div>

    {/* Menu */}
    <div className="flex flex-col gap-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
              isActive
                ? "bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white"
                : "text-gray-500 hover:bg-[#f9f8ff]"
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-red-500 hover:bg-red-50 mt-auto"
    >
      Logout
    </button>
  </div>
</div>
     {/* SIDEBAR */}
      <div
  className="
  hidden
  md:flex
  w-[230px]
  bg-white
  p-5
  border-r
  border-[#f0edfb]
  flex-col
  flex-shrink-0
"
>

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-9">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#C026D3] flex items-center justify-center text-white text-base">
            🛡️
          </div>
          <span className="text-[16px] font-bold text-gray-900 tracking-tight">
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white shadow-[0_4px_14px_rgba(124,58,237,0.3)]"
                    : "text-gray-500 hover:bg-[#f9f8ff] hover:text-gray-900"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all mt-auto"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          Logout
        </button>
      </div>

{/* MOBILE TOPBAR */}
<div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#f0edfb] px-4 py-3 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#C026D3] flex items-center justify-center text-white">
      🛡️
    </div>
    <span className="font-bold text-gray-900">
      Admin Panel
    </span>
  </div>

  <button
    onClick={() => setSidebarOpen(true)}
    className="p-2 rounded-lg hover:bg-gray-100"
  >
    <Menu size={22} />
  </button>
</div>
      {/* CONTENT */}
      <div className="flex-1 pt-20 md:pt-8 p-3 md:p-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}