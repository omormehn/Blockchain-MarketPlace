import './searchBar.css'
import { IoSearch } from "react-icons/io5";
const SearchBar = ({searchQuery, setSearchQuery}) => {
  return (
    <div className=" ">
      <div className="searchBar rounded-2xl border-[3px] py-3 px-4">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none outline-none bg-transparent xs:w-[14rem] md:w-[24rem] lg:w-60 xl:w-full"
          />
        </div>
        <div>
          <IoSearch size={23} className='cursor-pointer'/>
        </div>
      </div>
    </div>
  );
}

export default SearchBar