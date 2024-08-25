import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useWebDetail = () => {
    const axiosPublic = useAxiosPublic()
    const { data: webDetail = [], isPending } = useQuery({
        queryKey: ['webDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get('/webDetails')
            return res.data
        }
    })

    return [webDetail, isPending]
};

export default useWebDetail;