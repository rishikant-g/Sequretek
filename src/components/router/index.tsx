import React, { Suspense, lazy } from "react";
import { Navigate, Routes as PageRouter, Route } from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./Routes";

import Page from "../router/Page";
import Loader, { SmallLoader } from "../common/Loader";
import PrivateLayout from "../layout/PrivateLayout";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../provider/authProvider";

const PublicLayout = lazy(() => import("../layout/PublicLayout"));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // You can show a spinner or anything else here
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const Routes: React.FC = () => {
  interface IRouteProps {
    path: string;
    component: React.FC;
    title: string;
    role?: string[];
    children?: IRouteProps[];
  }

  const renderRoutes = (routes: IRouteProps[]) => {
    return routes.map((route: IRouteProps, i: number) => {
      return (
        <Route
          key={i}
          path={route.path}
          element={<Page component={<route.component />} title={route.title} />}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return (
    <>
      <ToastContainer position="top-center" className="Toastify__custom" />
      <div id="mx-global-loader"></div>

      <Suspense fallback={<SmallLoader />}>
        <PageRouter>
          <Route path="/" element={<PublicLayout />}>
            {renderRoutes(PUBLIC_ROUTES)}
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PrivateLayout />
              </ProtectedRoute>
            }
          >
            {renderRoutes(PRIVATE_ROUTES)}
          </Route>
        </PageRouter>
      </Suspense>
    </>
  );
};

export default Routes;
