// src/Components/Routers/PageRoute.js
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Ui_elements/Loader"; // Assuming this is correct; adjust if needed
import { routes, componentMap } from "../../config/routes";

// Lazy load layouts and wrapper
const MinimalLayout = lazy(componentMap.MinimalLayout);
const MainLayout = lazy(componentMap.MainLayout);
const Authorized = lazy(componentMap.Authorized);

// Recursive function to render routes
const renderRoutes = (routeList, basePath = "") =>
  routeList.map((route) => {
    // Only add a leading slash if the route.path isn’t empty and basePath isn’t already providing it
    const path = route.path === ""
      ? basePath
      : basePath === ""
      ? route.path // Top-level route, no leading slash needed yet
      : `${basePath}/${route.path}`; // Nested route, append without extra slashes

    const Component = route.component ? lazy(componentMap[route.component]) : null;

    return (
      <Route key={path} path={path} element={Component ? <Component /> : null}>
        {route.children && renderRoutes(route.children, path)}
      </Route>
    );
  });

const PageRoute = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      }
    >
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<Authorized />}>
          <Route element={<MainLayout />}>
            {renderRoutes(routes.mainRoutes)}
          </Route>
        </Route>

        {/* Public Routes */}
        <Route element={<MinimalLayout />}>
          {renderRoutes(routes.authRoutes)}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PageRoute;