// import React from "react";
// import { Link } from "react-router-dom";

// const Notfound = () => {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//       <p>The requested page could not be found.</p>
//       <Link to="/" className="ml-6 text-blue-300 hover:text-black">
//         Home
//       </Link>
//     </div>
//   );
// };

// export default Notfound;
import React from "react";
// import "./src/index.css";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const Backtohome = () => {
    navigate("/home");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500">
      <h1 className="text-4xl">404 - Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <button
        onClick={Backtohome}
        id="backToHomeButton"
        className="bg-gray-200 border border-black p-2 mt-4 hover:text-green-500 rounded-xl"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
