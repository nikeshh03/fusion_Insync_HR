import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
}

export function ChartCard({ title, icon: Icon, iconColor, children }: ChartCardProps) {
  return (
    <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
      <div className="flex items-center gap-2 mb-6">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="h-[300px]">
        {children}
      </div>
    </div>
  );
}