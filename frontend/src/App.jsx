import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./_components/Home"
import YourFormBuilder from './_components/FormBuilder/FormBuilder';
import NotFound from './_components/NotFound';
import Signup from './_components/Authentication/Signup';
import Login from './_components/Authentication/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form-builder",
    element: <YourFormBuilder />,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </Provider>
  );
}

export default App;
