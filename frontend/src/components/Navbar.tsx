import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActiveRoute = (route : string) => {
    return location.pathname === route;
  };
  
  const isLoginPage = location.pathname === '/login';
  
  if(isLoginPage) return 
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold">
                Library Management
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/reports"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    isActiveRoute('/reports') ? 'bg-gray-900 text-white' : ''
                  }`}
                >
                  Reports
                </Link>
                <Link
                  to="/maintenance"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    isActiveRoute('/maintenance') ? 'bg-gray-900 text-white' : ''
                  }`}
                >
                  Maintenance
                </Link>
                <Link
                  to="/transactions"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    isActiveRoute('/transactions') ? 'bg-gray-900 text-white' : ''
                  }`}
                >
                  Transactions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;