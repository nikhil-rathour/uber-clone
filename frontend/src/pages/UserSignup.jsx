import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSignup = () => {
  const [firstname, setFisrtname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext)

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const hendelSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    setIsLoading(true);

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if(response.status === 200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        toast.success('Registration successful!');
        navigate("/home")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('User already exists');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }

    setFisrtname("");
    setLastname("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 sm:p-6">
      {/* Header with back button */}
      <div className="flex justify-between items-center">
        <Link to="/login" className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10">
          <img
            className="mx-auto w-32 sm:w-40 md:w-48 h-auto"
            src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
            alt="Logo"
          />
        </div>

        {/* Signup Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
                Create an account
              </h3>
              
              <form onSubmit={hendelSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    value={firstname}
                    onChange={(e) => setFisrtname(e.target.value)}
                    type="text"
                    required
                    className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="First name"
                  />
                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    required
                    className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Last name"
                  />
                </div>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white font-medium py-3 sm:py-4 px-4 rounded-lg text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-800 active:bg-gray-900"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm sm:text-base text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login"
              className="text-blue-500 font-medium hover:text-blue-600 underline"
            >
              Log In
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-xs sm:text-sm text-gray-500 leading-relaxed">
            By clicking Create Account, you agree to our{' '}
            <span className="text-blue-500 cursor-pointer hover:text-blue-600">Terms of Service</span> and{' '}
            <span className="text-blue-500 cursor-pointer hover:text-blue-600">Privacy Policy</span>.
          </p>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default UserSignup