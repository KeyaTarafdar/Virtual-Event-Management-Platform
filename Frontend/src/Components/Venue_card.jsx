import { useNavigate } from "react-router-dom";

const Venue_card = ({ name, location, navigateTo = "/venuedetails" }) => {
  const navigate = useNavigate();

  return (
    <div className="pb-1 bg-gradient-to-br from-blue-400 to-blue-900 overflow-hidden rounded-lg shadow-lg">
      <div className="p-3">
        <h2 className="text-2xl font-medium text-center font-serif text-white">
          {name}
        </h2>
        <p className="mt-4 text-xl text-gray-300 font-medium text-center">
          {location}
        </p>
      </div>
      <div className="pt-2 pb-2 flex justify-center">
        <button
          className="btn2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center gap-2"
          onClick={() => navigate(navigateTo)}
        >
          Show
          <svg
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Venue_card;
