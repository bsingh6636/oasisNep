import { Link, useRouteError } from "react-router-dom";
 export const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
    <div className="text-center space-y-6 px-4">
      <h1 className="text-9xl font-bold mb-6 animate-bounce">404</h1>
      <p className="text-4xl mb-10">Page Not Found</p>
      <Link 
        to="/" 
        className="inline-block px-8 py-4 rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-gray-900 text-lg font-semibold transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl" 
        style={{ cursor: 'pointer' }}
      >
        Go to Home
      </Link>
    </div>
  </div>
  );
};
