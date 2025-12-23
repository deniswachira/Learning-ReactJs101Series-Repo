import React from 'react'
import { Link, useNavigate } from 'react-router'
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../features/slice/AuthSlice';

const Navbar: React.FC = () => {

     const dispatch = useDispatch();
    const navigate = useNavigate();

    //get the auth state from redux store to conditionally render login/register or user profile/logout
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

    // Autogenerate profile letter from user.first_name and user.last_name
    // Use ui-avatars.com to generate a profile avatar based on the user's initials
    // const profilePicture = user?.first_name && user?.last_name
    //     ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name + ' ' + user.last_name)}&background=4ade80&color=fff&size=128`
    //     : `https://ui-avatars.com/api/?name=U&background=4ade80&color=fff&size=128`;

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate("/login");
    };
    // console.log("🚀 ~ Navbar ~ isAuthenticated:", isAuthenticated)


    return (
        <div className="navbar bg-white shadow-md sticky top-0 z-50 py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-white rounded-lg z-10 mt-3 w-52 p-2 shadow-lg border">
                        <Link to="/"><li><a className="text-gray-700 hover:text-green-800 hover:bg-gray-50 rounded-md transition-colors duration-200">Home</a></li></Link>
                        <Link to="/meals"><li><a className="text-gray-700 hover:text-green-800 hover:bg-gray-50 rounded-md transition-colors duration-200">Meal</a></li></Link>
                        <Link to="/about"><li><a className="text-gray-700 hover:text-green-800 hover:bg-gray-50 rounded-md transition-colors duration-200">About</a></li></Link>
                        <Link to="/contact"><li><a className="text-gray-700 hover:text-green-800 hover:bg-gray-50 rounded-md transition-colors duration-200">Contact</a></li></Link>
                        <Link to="register"><li><a className="text-gray-700 btn bg-green-800 hover:text-green-800 hover:bg-gray-50 rounded-md transition-colors duration-200">Register</a></li></Link>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-semibold text-green-800 hover:bg-transparent">Mathe's Eatery</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <Link to="/"><li><a className="text-gray-600 hover:text-green-800 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Home</a></li></Link>
                    <Link to="/meals"><li><a className="text-gray-600 hover:text-green-800 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Meal</a></li></Link>
                    <Link to="/about"><li><a className="text-gray-600 hover:text-green-800 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">About</a></li></Link>
                    <Link to="/contact"><li><a className="text-gray-600 hover:text-green-800 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Contact</a></li></Link>
                    <Link to="/register"><li><a className="text-white btn bg-orange-400 btn-outline hover:bg-orange-700 font-medium px-4 py-2 rounded-md transition-all duration-300">Register</a></li></Link>
                </ul>
            </div>
            <div className="navbar-end">
                {!isAuthenticated ? (
                    <Link to="/login">
                        <a className="btn bg-green-800 hover:bg-green-900 text-white border-green-800 hover:border-green-900 px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            Login
                        </a>
                    </Link>) : (
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost flex items-center">
                            <div className="flex items-center">
                                <span className="text-dark">Hey,{user?.last_name}</span>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="profile" src={profilePicture} />
                                        </div>
                                    </div> */}
                            </div>
                        </button>
                        <ul className="dropdown-content bg-neutral-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-slate-950 hover:text-gray-300"
                                >
                                    {/* <FaSignOutAlt className="text-xl text-green-600 mr-3" /> */}
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )
                }


            </div>
        </div>
    )
}

export default Navbar


