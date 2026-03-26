'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { User, LogOut, Settings, Moon, Sun, LayoutDashboard } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  if (!session?.user) {
    return (
      <a
        href="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 hover:border-apex-500/50 text-sm text-dark-200 hover:text-white transition-all"
      >
        <User className="w-3.5 h-3.5" />
        Login
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-dark-800 transition-colors"
      >
        {session.user.image ? (
          <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-apex-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            {(session.user.name?.[0] || 'U').toUpperCase()}
          </div>
        )}
        <span className="text-sm text-dark-200 hidden sm:block max-w-[100px] truncate">
          {session.user.name || 'Trader'}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-dark-800 border border-dark-700 shadow-xl z-50 py-1">
            <div className="px-3 py-2 border-b border-dark-700">
              <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
              <p className="text-xs text-dark-400 truncate">{session.user.email || 'Telegram user'}</p>
            </div>

            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-colors" onClick={() => setOpen(false)}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </a>

            <button onClick={() => { toggleTheme(); }} className="flex items-center gap-2 px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-colors w-full text-left">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>

            <a href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-colors" onClick={() => setOpen(false)}>
              <Settings className="w-4 h-4" /> Settings
            </a>

            <div className="border-t border-dark-700 mt-1 pt-1">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-dark-700 hover:text-red-300 transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
