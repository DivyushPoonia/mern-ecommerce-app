import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  let [isSideBarVisible, setSidebarVisible] = useState(true);
  function toggleSideBar() {
    console.log(isSideBarVisible);
    setSidebarVisible(!isSideBarVisible);
  }

  return (
    <div className="w-full min-h-screen flex">
      <div className={`flex ${isSideBarVisible ? "block" : "hidden"}`}>
        <AdminSidebar />
      </div>
      <div className="w-full flex flex-1 flex-col">
        <AdminHeader toggleSideBar={toggleSideBar} />
        <main className="bg-blue-100 min-h-screen flex flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
