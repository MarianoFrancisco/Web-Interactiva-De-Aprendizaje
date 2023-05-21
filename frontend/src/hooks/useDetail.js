import { useEffect } from 'react';
import useAxiosPrivate from "./useAxiosPrivate";

const DETAIL_URL = '/detail';
const useDetails = () => {
    const axiosPrivate = useAxiosPrivate();
    const [details, setDetails] = useState([]);
    const getDetail = (id) => {
        axiosPrivate
            .get(`${DETAIL_URL}/view-detail/${id}`)
            .then((res) => setDetails(res.data))
            .catch((err) => {
                console.log(err);
            });
    };

    const editDetail = (id, updatedDetail) => {
        axiosPrivate
            .patch(`${DETAIL_URL}/edit-detail/${id}`, updatedDetail)
            .then((res) => {
                getDetail();
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteDetail = (id) => {
        axiosPrivate
            .delete(`${DETAIL_URL}/delete-detail/${id}`)
            .then((res) => {
                getDetail();
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDetail();
    }, []);

    return {
        details,
        getDetail,
        editDetail,
        deleteDetail,
    };
};

export default useDetails;