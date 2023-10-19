import React from 'react'
import SignupForm from './SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="App max-w-xl w-full px-6 py-8 bg-white rounded-md shadow-md border-2 border-gray-300">
    <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
      Sign up 
    </h1>
    <SignupForm />
  </div>
</div>

  );
};
export default Signup;
