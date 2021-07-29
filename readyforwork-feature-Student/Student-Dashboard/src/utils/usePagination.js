import { useState, useEffect } from "react";

function usePagination(data, itemsPerPage) {
  itemsPerPage = parseInt(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  function current() {
    const begin = Math.ceil(currentPage - 1) * itemsPerPage;
    let end = begin + itemsPerPage;
    if(end >= data.length) {
      end = data.length; 
    } 
    return {begin, end}
  }

  function entries() {
    const {begin, end} = current();
    return `Showing ${begin+1} to ${end} of ${data.length} entries`;
  }

  function currentData() {
    const {begin, end} = current();
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }
  // Showing 1 to 10 of 46 entries
  // Showing ${begin} to ${end} of ${data.length} entries

  return { next, prev, jump, currentData, currentPage, maxPage, entries };
}

export default usePagination;
