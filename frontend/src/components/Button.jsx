const Button = ({ label, onPress }) => {
  return (
    <div>
      <button
        onClick={onPress}
        className="w-full min-w-24 px-3 py-1.5 text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs lg:text-sm lg:px-5 lg:py-2.5 me-2 mb-2">
        {label}
      </button>
    </div>
  );
};

export default Button;
