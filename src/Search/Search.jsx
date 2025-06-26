import useDebounce from "../Hooks/useDebounce";


function Search({updateSearchTerm}) {

  const debouncedCallback = useDebounce((e)=> updateSearchTerm(e.target.value));

  return (
    <div className="flex items-center justify-center">
        <input className="flex justify-center text-gray-200 items-center bg-gray-800 px-2 py-1 rounded-md w-105 h-9"
            type="text"
            placeholder="Enter File Name"
            onChange={debouncedCallback}
        />
    </div>
    
  );
}

export default Search;
