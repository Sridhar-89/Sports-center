import { Disclosure, Menu } from "@headlessui/react";

import { Link } from 'react-router-dom';

const Appbar = () => {
  return (
    <Disclosure as="nav" className="bg-white shadow-2xl">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img className="h-12 mr-10 rounded" src="src/assets/logo.png" alt="Logo" />
                <span className="font-bold text-xl">SPORTS HUB</span> {/* Updated: Changed NEWS to HUB */}
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="h-8 w-8 rounded-full hover:bg-blue-600 flex items-center justify-center focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Menu.Button>
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/login"  
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign In  {/* Updated: Changed "Sign In" to "Log In" */}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/register"  
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign Up  {/* Updated: Changed "Sign Up" to "Register" */}
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Appbar;
