import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { logoutUser } from "../../store/auth-slice/auth";
import { useDispatch } from "react-redux";

function AdminHeader({ toggleSideBar }) {
  const dipatch = useDispatch();
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <button className="md:hidden block" onClick={() => toggleSideBar()}>
        <IoMenu />
      </button>
      <div className="flex flex-1 justify-end ">
        <button className="bg-black w-20 h-5 rounded-sm flex items-center  justify-evenly px-1 py-3">
          <MdLogout style={{ color: "white" }} />
          <span
            className="text-white text-sm flex"
            onClick={() => dipatch(logoutUser())}
          >
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
