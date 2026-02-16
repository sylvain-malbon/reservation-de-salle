// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
function AuthLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <Outlet />
    </div>
  );
}
export default AuthLayout;
