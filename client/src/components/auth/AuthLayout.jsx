import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div>
        <div className="w-full min-h-screen flex text-3xl font-semibold">
            <div className="w-1/2 bg-slate-500 lg:flex items-center justify-center">
                   <h1 className="">Welcome to my Ecommerce Website </h1>
            </div>
            <div className="w-1/2 flex items-center justify-center ">
                    <Outlet/>
            </div>

        </div>
      
    </div>
  )
}

export default AuthLayout
