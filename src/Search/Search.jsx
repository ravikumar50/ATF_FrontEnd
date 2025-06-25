import useDebounce from "../Hooks/useDebounce";


function Search({updateSearchTerm}) {

  const debouncedCallback = useDebounce((e)=> updateSearchTerm(e.target.value));

  return (
    <div className="flex items-center justify-center gap-3">
        <div className="text-white font-semibold text-xl">Search</div>
        <input className="flex justify-center items-center bg-gray-800 px-2 py-1 rounded-md w-60"
            type="text"
            placeholder="Enter File Name"
            onChange={debouncedCallback}
        />
    </div>
    
  );
}

export default Search;
