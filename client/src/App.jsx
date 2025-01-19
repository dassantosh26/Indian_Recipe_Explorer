/** @format */

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { DishProvider } from "./context/DishContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import Lottie from "lottie-react";
import loading from "./assets/Animation - 1737216947427.json";
import EditDish from "./components/EditDish";
import AddDishForm from "./components/AddDishForm";
// Lazy loading components
const Home = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./pages/Home")), 2000)
    )
);
const DishList = lazy(() => import("./pages/DishList"));
const DishDetailsPage = lazy(() => import("./pages/DishDetailsPage"));
const DishSuggester = lazy(() => import("./components/DishSuggester"));
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const Loader = () => (
  <div className="flex items-center justify-center h-[60vh]">
    <Lottie animationData={loading} className="w-60" loop />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/addDish",
        element: <AddDishForm />,
      },
      {
        path: "/dishList",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <DishList />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/suggester",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <DishSuggester />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/dish/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <DishDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/edit-dish/:id",
        element: <EditDish />,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <DishProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <RouterProvider router={appRouter} />
      </DishProvider>
    </AuthProvider>
  );
}

export default App;
