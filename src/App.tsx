import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { fetchEmployees, deleteEmployee } from './services/employeeService';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import AnalyticsPanel from './components/AnalyticsPanel';
import AttritionAnalysis from './components/AttritionAnalysis';
import SettingsPanel from './components/settings/SettingsPanel';
import AuthForm from './components/auth/AuthForm';
import { useAuth } from './lib/auth/AuthContext';
import { Header } from './components/layout/Header';
import type { Employee } from './types/employee';

const App = () => {
  const { user, loading: authLoading } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'attrition' | 'analytics' | 'settings'>('dashboard');

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadEmployees();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        await loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard employees={employees} />;
      case 'attrition':
        return <AttritionAnalysis />;
      case 'settings':
        return <SettingsPanel />;
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <EmployeeForm
                employee={editingEmployee}
                onSuccess={() => {
                  loadEmployees();
                  setEditingEmployee(undefined);
                }}
                onCancel={editingEmployee ? () => setEditingEmployee(undefined) : undefined}
              />
            </div>
            <div className="lg:col-span-7">
              <EmployeeList
                employees={employees}
                onEdit={setEditingEmployee}
                onDelete={handleDelete}
                onSelect={setSelectedEmployee}
              />
              {selectedEmployee && (
                <AnalyticsPanel employeeData={selectedEmployee} />
              )}
            </div>
          </div>
        );
      default:
        return <div>Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        employeeCount={employees.length}
      />

      <main className="max-w-9xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;