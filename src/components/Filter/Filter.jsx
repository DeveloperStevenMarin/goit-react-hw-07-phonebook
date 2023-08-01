import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/reducer'; // Asegúrate de que la ruta sea correcta

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter); // Asegúrate de acceder a la propiedad 'filter' en el estado 'contacts'

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
