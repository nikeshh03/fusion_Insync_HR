import React, { useState } from 'react';
import { Lock, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import { FormField } from '../form/FormField';

export default function SettingsPanel() {
  const { user, updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await updatePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Security Settings */}
      <div className="settings-card">
        <div className="settings-section">
          <h3 className="settings-heading">
            <Lock className="h-5 w-5 text-purple-400" />
            Security Settings
          </h3>
          
          <form onSubmit={handlePasswordReset} className="space-y-4 mt-4">
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-800 text-red-300 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-900/50 border border-green-800 text-green-300 rounded-lg">
                {success}
              </div>
            )}
            
            <FormField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="input-dark"
            />
            
            <FormField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input-dark"
            />
            
            <FormField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-dark"
            />
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="settings-card">
        <div className="settings-section">
          <h3 className="settings-heading">
            <Bell className="h-5 w-5 text-green-400" />
            Notification Preferences
          </h3>
          
          <div className="space-y-4 mt-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-purple-500" />
              <span>Email notifications for employee updates</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-purple-500" />
              <span>Performance review reminders</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-purple-500" />
              <span>Training completion alerts</span>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="settings-card">
        <div className="settings-section">
          <h3 className="settings-heading">
            <Shield className="h-5 w-5 text-blue-400" />
            Privacy Settings
          </h3>
          
          <div className="space-y-4 mt-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-purple-500" />
              <span>Share analytics data</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-purple-500" />
              <span>Allow data collection for AI improvements</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}