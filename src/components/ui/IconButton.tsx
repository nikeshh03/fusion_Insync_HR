import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function IconButton({ icon: Icon, label, onClick, className = '' }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white
      transition-all duration-200 ${className}`}
      title={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}