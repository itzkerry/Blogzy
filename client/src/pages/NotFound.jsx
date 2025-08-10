import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-950 text-center px-6">
      {/* Big 404 text */}
      <h1 className="text-7xl font-bold text-sky-600 dark:text-sky-400 mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Back button */}
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white text-lg rounded-lg shadow-md 
                   hover:bg-sky-600 transition-all duration-300 dark:bg-sky-600 dark:hover:bg-sky-500"
      >
        <ArrowLeft size={20} />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
