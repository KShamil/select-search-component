import { useState } from "react";
import useDebounce from '../hooks';

function Home() {
  const [query, setQuery] = useState<string>("");

  const makeRequest = useDebounce((query: string) => {
    console.log("make request with query", query);
  },500)

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    makeRequest(value);
    setQuery(value);
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-start p-[50px]">
        <input
          type="text"
          value={query}
          onChange={handleChangeEvent}
          className="px-2 py-3 w-[300px] border rounded-sm"
        />
      </div>
    </>
  );
}

export default Home;