import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  const notfoundImage404 = 'https://outscal.io/_next/image?url=%2Fimages%2F404.jpg&w=1080&q=75';

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 px-4">
        <p className="text-4xl font-bold mb-4">Oops! Page Not Found</p>
        <img src={notfoundImage404} alt="Not Found" className="w-3/4 md:w-1/2 mb-8 rounded-lg shadow-lg mx-auto" />
        <Link 
          to="/" 
          className="inline-block px-8 py-4 rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-gray-900 text-lg font-semibold transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
        >
          Go to Home
        </Link>
      </div>
      {/* <footer className="mt-8 text-sm text-gray-400">
        <p>© 2024 Your Company Name</p>
      </footer> */}
    </div>
  );
};

export default Error;