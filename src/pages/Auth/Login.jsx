import React from 'react';

const Login = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Member Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email or Mobile</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue outline-none" placeholder="Enter your credentials" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue outline-none" placeholder="••••••••" />
          </div>
          <button className="w-full bg-brand-blue text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
