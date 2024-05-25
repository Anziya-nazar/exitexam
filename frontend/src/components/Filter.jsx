
import React from 'react';

const Filter = ({ setFilter }) => {
  return (
    <div className="filter">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      <button onClick={() => setFilter('ongoing')}>Ongoing</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  );
};

export default Filter;
