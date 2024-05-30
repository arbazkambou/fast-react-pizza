import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="inline-block rounded-full px-4 py-2 bg-yellow-100 placeholder:text-stone-400 font-semibold uppercase text-sm sm:w-64 sm:focus:w-72 focus:outline-none transition-all duration-300 focus:ring-yellow-600 focus:ring-offset-2"
      />
    </form>
  );
}

export default SearchOrder;
