import React from "react";
import ChangePasswordForm from "./ChangePassword";

const UpdatePassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="App max-w-md w-full px-8 py-9 bg-red-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-9">
          Update Password
        </h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
};
export default UpdatePassword;
