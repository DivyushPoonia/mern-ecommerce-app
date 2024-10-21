import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { getToast } from "../../components/common/toastNotification";
import { loginUser } from "../../store/auth-slice/auth";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const notify = () => getToast("error", "Orr Pooonia ji");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((response) => {
      if (response?.payload?.success) {
        getToast("success", response?.payload?.message);
      } else {
        getToast("error", response?.payload?.message);
      }
    });
  }

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-1/2 border-gray-200 border-2 rounded-3xl shadow-md shadow-gray-200">
      <h1 className="text-4xl font-bold  text-gray-900 md:text-3xl text-center">
        Login
      </h1>
      <Form className=" md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
            placeholder="Please enter email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Please enter password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Login
        </button>
        <p className="text-sm font-light text-gray-500">
          Don't have an account?
          <Link
            to={"/auth/register"}
            className="font-medium text-violet-600 hover:underline "
          >
            {" "}
            Register{" "}
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
