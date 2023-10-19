import React from 'react'
import SigninForm from './SigninForm';

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
    <div className="App max-w-xl w-full px-6 py-10 bg-white rounded-lg shadow-md">
      <h1 className="App text-3xl font-bold text-center text-blue-800 mb-10">
        Sign in
      </h1>
      <SigninForm />
    </div>
  </div>
);
};

export default Signin;