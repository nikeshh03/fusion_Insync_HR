import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Users
} from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import { IconButton } from '../ui/IconButton';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  employeeCount: number;
}

export function Header({ activeTab, setActiveTab, employeeCount }: HeaderProps) {
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attrition', label: 'Attrition', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-10xl mx-auto">
        {/* Main Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              HR Analytics Platform
            </h1>
          </div>

          <div className="flex items-center space-x-6">
              {/* Left side stats */}
              <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                <BarChart3 className="h-5 w-5" />
                <span>{employeeCount} Employees</span>
              </div>

              {/* Right side settings */}
              <div className="flex items-center space-x-4 ml-auto">
                <IconButton 
                  icon={Settings} 
                  label="Settings" 
                  onClick={() => setActiveTab('settings')}
                  className={activeTab === 'settings' ? 'text-white bg-zinc-800' : ''}
                />
                <IconButton icon={Bell} label="Notifications" />
                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-zinc-600 dark:text-zinc-400">{user?.email}</span>
                <IconButton icon={LogOut} label="Sign Out" onClick={signOut} />
              </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 py-2 flex space-x-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`nav-link ${activeTab === id ? 'active' : ''}`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}