import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosSecure from "./useAxiosSecure";

const useClasses = ( status='') => {
    const axiosSecure = useAxiosSecure();

    const { isPending: classPending, data: classes = [], refetch } = useQuery({
        queryKey: ['allClasses', status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?status=${status}`);
            return res.data;
        },
    });

    return [classes, refetch, classPending];
};

export default useClasses;