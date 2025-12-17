import React, { useContext } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthProvider';

function Header(props) {
  const [, setUserData, refetch] = useContext(AuthContext);

  const logoutHandler = () => {
    // In the future: clear auth token or session
    setUserData([]); 
    props.changeUser('');
  };

  return (
    <header className="w-full bg-gray-800 py-4 px-6 shadow-lg">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500 rounded-full shadow-md">
            <FiUser className="text-2xl text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-300 font-medium">Welcome back</p>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
              {props.data?.firstName || 'Admin'}
            </h1>
          </div>
        </div>

        <button
          onClick={logoutHandler}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200
                   group hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiLogOut className="text-xl text-gray-300 group-hover:text-white transition-colors" />
          <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
