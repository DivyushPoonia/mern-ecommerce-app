import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { LuShoppingBasket } from "react-icons/lu";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AdminMenuItem({ title, children, navigate }) {
  return (
    <button
      className="flex items-center text-xl font-normal px-4 my-4 mx-5 hover:text-gray-500"
      onClick={navigate}
    >
      <div className="px-2">{children}</div>
      <div className="flex "> {title}</div>
    </button>
  );
}

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="flex-col">
      <button
        className="flex items-center px-2 py-2 ml-2 mr-6 mt-3 text-2xl"
        onClick={() => navigate("/admin/dashboard")}
      >
        <div className="px-2">
          <RiAdminLine />
        </div>
        <div className="flex font-bold"> Admin Panel</div>
      </button>
      <div className="flex flex-col py-6">
        <AdminMenuItem
          title={"Dashboard"}
          navigate={() => navigate("/admin/dashboard")}
        >
          <RxDashboard />
        </AdminMenuItem>
        <AdminMenuItem
          title={"Products"}
          navigate={() => navigate("/admin/products")}
        >
          <LuShoppingBasket />
        </AdminMenuItem>
        <AdminMenuItem
          title={"Orders"}
          navigate={() => navigate("/admin/orders")}
        >
          <BsCartCheck />
        </AdminMenuItem>
      </div>
    </div>
  );
}

export default AdminSidebar;
