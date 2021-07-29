import { useState, useEffect } from "react";

const useSearch = ({ searchQuery: searchVal, retrieve: users }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (user, allValues) => {
      if (!allValues) allValues = [];
      for (var key in user) {
        if (typeof user[key] === "object") crawl(user[key], allValues);
        else allValues.push(user[key] + " ");
      }
      return allValues;
    };
    const fetchData = async () => {
      // const { data: users } = await retrieve();
      setOrigData(users);
      setFilteredData(users);
      const searchInd = !users ? null : users.map((user) => {
        const allValues = crawl(user);
        return { allValues: allValues.toString() };
      });
      if(searchInd) setSearchIndex(searchInd);
      if(users) setLoading(false);
    };
    fetchData();
  }, [users]);

  useEffect(() => {
    if (searchVal.trim()) {
      const reqData = searchIndex.map((user, index) => {
        if (user.allValues.toLowerCase().indexOf(searchVal.trim().toLowerCase()) >= 0) return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter((user) => {
          if (user) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  return { filteredData, loading };
};

export default useSearch;
