import {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {registerUser} from '../../store/auth-slice/auth';
import { useSelector, useDispatch} from 'react-redux';

function Register() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  }) 

  function handleChange(e)
  {
    const {name, value} = e.target;
    setFormData((prev)=>{
        setFormData({...prev, [name]:value})
    })
  }

  function handleSubmit(e)
  {
    e.preventDefault(); 
    dispatch(registerUser(formData))
    .then((response)=>{
      if(response?.payload?.success) navigate('/auth/login')
    }
  );
  }

  return (

      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-1/2 border-gray-200 border-2 rounded-3xl shadow-md shadow-gray-200">
              <h1 className="text-4xl font-bold  text-gray-900 md:text-3xl text-center">
                  Create an account
              </h1>
              <form className=" md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                      <input type="fullname" name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5" placeholder="Please enter full name" onChange={handleChange}/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5" placeholder="Please enter email" onChange={handleChange} />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" placeholder="Please enter password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"  onChange={handleChange}/>
                  </div>
                
                  <button type="submit" className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Create an account</button>
                  <p className="text-sm font-light text-gray-500">
                      Already have an account? 
                      <Link to={"/auth/login"} className="font-medium text-violet-600 hover:underline "> Login here </Link>
                     
                  </p>
              </form>
          </div>
  )
}

export default Register
