import { useEffect, useState } from "react";
import "./App.css";
import { SearchSelect } from "./components/SearchSelect";
import { Flex } from "@chakra-ui/react";
import axios from "axios";

export interface IData {
  userid: number;
  id: number;
  title: string;
  body: string;
}

const getData = async (url: string) => {
  const result = await axios.get(url);
  return result.data;
};

function App() {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData("https://jsonplaceholder.typicode.com/posts");
      setData(res);
      return data;
    };
    fetchData();
  }, [data]);

  return (
    <Flex w="full" justifyContent="center" alignItems="center">
      <SearchSelect options={data} />
    </Flex>
  );
}

export default App;
