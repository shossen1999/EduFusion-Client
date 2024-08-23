import { useContext } from 'react';
// import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
// import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useTeacher = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isTeacher} = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
            return res.data?.teacher;
        }
    })
    return [isTeacher]
};

export default useTeacher;