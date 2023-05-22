import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useDetails = (arr=[]) => {
  const [details, setDetails] = useState(arr);

  const addDetail = (detail) => {
    const newDetail = { id: uuidv4(), ...detail };
    setDetails((prevDetails) => [...prevDetails, newDetail]);
  };

  const removeFromDetails = (id) => {
    setDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
  };

  const clearDetails = () => {
    setDetails([]);
  };

  return { details, addDetail, removeFromDetails, clearDetails };
};

export default useDetails;
