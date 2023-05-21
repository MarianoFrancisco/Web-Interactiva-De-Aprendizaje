// import { useEffect } from 'react';
// import useAxiosPrivate from "./useAxiosPrivate";
// import useGames from './useGame';

// const DETAIL_URL = '/detail';

// const useDetails = () => {
//     const axiosPrivate = useAxiosPrivate();
//     const {getGame} = useGames();
//     const [details, setDetails] = useState([]);
    
//     const getDetail = (id) => {
//         axiosPrivate
//             .get(`${DETAIL_URL}/view-detail/${id}`)
//             .then((res) => setDetails(res.data))
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const editDetail = (id, updatedDetail) => {
//         axiosPrivate
//             .patch(`${DETAIL_URL}/edit-detail/${id}`, updatedDetail)
//             .then((res) => {
//                 getDetail();
//                 return res.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     useEffect(() => {
//         // getDetail();
//     }, []);

//     return {
//         details,
//         getDetail,
//         editDetail
//     };
// };

// export default useDetails;

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useDetails = (arr=[]) => {
  const [details, setDetails] = useState(arr);

  const addDetail = (detail) => {
    const newDetail = { id: uuidv4(), ...detail };
    setDetails((prevDetails) => [...prevDetails, newDetail]);
  };

  const removeDetail = (id) => {
    setDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
  };

  const clearDetails = () => {
    setDetails([]);
  };

  return { details, addDetail, removeDetail, clearDetails };
};

export default useDetails;
