'use client'
import React from 'react';
import { Home, Folder, LayoutTemplate, Clock, Link2, Plug, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



const navItems = [
  { name: 'Dashboard', icon: <Home />, href: '/dashboard' },
  { name: 'Projects', icon: <Folder />, href: '/projects' },
  { name: 'Templates', icon: <LayoutTemplate />, href: '/templates' },
  { name: 'History', icon: <Clock />, href: '#' },
  { name: 'Webhooks', icon: <Link2 />, href: '#' },
  { name: 'Connections', icon: <Plug />, href: '#' },
  { name: 'Settings', icon: <Settings />, href: '#' },
];

export default function SideBar() {
    const pathname = usePathname()




  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="text-2xl font-bold text-blue-600 mb-6">Flowzy</div>
      <nav className="space-y-5">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex text-[18px] font-semibold items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 ${item.href === pathname ? 'bg-[#eff6ff] border border-blue-200' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}