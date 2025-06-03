
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  BarChartBig,
  Bookmark,
  Trophy,
  ListTodo,
  BookCopy,
  Sword,
  PenSquare,
  Briefcase,
  Settings2,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/progress', label: 'My Progress', icon: BarChartBig },
  { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/dashboard/dsa-topics', label: 'DSA Topics', icon: ListTodo },
  { href: '/dashboard/courses', label: 'Courses', icon: BookCopy },
  { href: '/dashboard/challenges', label: 'Challenges', icon: Sword },
  { href: '/dashboard/blogs', label: 'Daily Blogs', icon: PenSquare },
  { href: '/dashboard/career-paths', label: 'Career Paths', icon: Briefcase },
];

const bottomNavItems = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings2 },
  { href: '/auth', label: 'Logout', icon: LogOut }, // Assuming logout redirects to auth page
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold font-headline text-primary">VisART</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-sidebar-border space-y-2">
        {bottomNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
               pathname === item.href && item.label !== 'Logout' // Don't highlight logout as active
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
