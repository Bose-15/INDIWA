import React from 'react';

const Register = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Join the Network</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number (+91)</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Referral Code</label>
            <input type="text" className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none" />
          </div>
          <div className="md:col-span-2 pt-4">
            <button className="w-full bg-gradient-to-r from-brand-blue to-blue-500 text-white py-3 rounded-md font-bold shadow-lg hover:shadow-xl transition-all">
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
