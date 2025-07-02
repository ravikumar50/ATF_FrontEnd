import { SlidersHorizontal } from "lucide-react"; // optional icon library

function Search({ updateSearchTerm, placeholder }) {
  const debouncedCallback = (e) => {
    updateSearchTerm(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center text-gray-200 px-4 py-2 rounded-md h-10 bg-gray-100 border border-gray-600 focus-within:border-blue-500 transition-colors duration-200"> 
        {/* Icon */}
        <SlidersHorizontal className="mr-2 text-gray-400 w-5 h-5" />
        {/* Input */}
        <input
          className="w-full bg-transparent text-gray-800 outline-none placeholder-gray-600 font-medium"
          type="text"
          placeholder={placeholder || "Search..."}
          onChange={debouncedCallback}
        />
      </div>
    </div>
  );
}

export default Search;
