
'use client';

import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Home className="h-5 w-5 text-primary" />
        <span>/</span>
        <Link href="/dashboard" className="hover:text-primary font-medium">
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 h-9 bg-muted/50 focus:bg-background" />
        </div>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
