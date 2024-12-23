import React, { Suspense } from "react";
import { SmallLoader } from "../common/Loader";
import { Outlet } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  return (
    <>
      <div className="mx-container post-login">
        <div className="mx-container-inner">
          <Suspense fallback={<SmallLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};
export default PrivateLayout;
