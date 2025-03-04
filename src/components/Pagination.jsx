import React from 'react';

const Pagination = ({ pageNumber, info, updatePageNumber }) => {
  const pageChange = (data) => {
    updatePageNumber(data.selected + 1);  // Update page number in parent
  };

  return (
    <div>
      <button onClick={() => pageChange({ selected: pageNumber - 1 })}>Prev</button>
      <button onClick={() => pageChange({ selected: pageNumber + 1 })}>Next</button>
    </div>
  );
};

export default Pagination;
