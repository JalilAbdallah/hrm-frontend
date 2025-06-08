// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Shield } from 'lucide-react';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    role: 'investigator',
    password: '',
    confirmPassword: ''
  });

  const roles = [
    { label: 'Investigator', value: 'investigator' },
    { label: 'Legal Advisor', value: 'legal_advisor' },
    { label: 'Data Analyst', value: 'data_analyst' },
    { label: 'Case Manager', value: 'case_manager' },
    { label: 'Administrator', value: 'admin' }
  ];

  const handleSubmit = () => {
    console.log('Register submitted:', formData);
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4 lg:hidden">
          <Shield className="w-8 h-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">HRM</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Our Mission</h2>
        <p className="text-gray-600">Create an account to start protecting rights</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <InputText
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full"
            />
          </div>
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <InputText
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full"
            />
          </div>
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <InputText
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization
          </label>
          <InputText
            value={formData.organization}
            onChange={(e) => setFormData({...formData, organization: e.target.value})}
            placeholder="Your organization"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <Dropdown
            value={formData.role}
            options={roles}
            onChange={(e) => setFormData({...formData, role: e.value})}
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Password
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Enter your password"
            className="w-full"
            toggleMask
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <Password
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            placeholder="Confirm your password"
            className="w-full"
            feedback={false}
            toggleMask
          />
        </div>

        <Button
          label="Create Account"
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-600 border-blue-600 hover:bg-blue-700"
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?
          <span
            onClick={onSwitchToLogin}
            className="ml-2 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;