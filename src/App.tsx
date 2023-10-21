import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routes";
import { ArticlesProvider } from './context/articles/context.tsx'

const App = () => {
  return (
    <div>
      <ArticlesProvider>
      <RouterProvider router={router} />
      </ArticlesProvider>
       
    </div>
  );
};
export default App;