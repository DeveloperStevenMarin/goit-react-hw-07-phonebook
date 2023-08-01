import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/reducer'; 

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search contacts..."
      />
    </div>
  );
}
