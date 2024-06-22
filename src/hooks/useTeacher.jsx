import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
    queryKey: [email, 'isTeacher'],
    enabled: !loading && !!email, // Only enable the query if not loading and email exists
    queryFn: async () => {
      if (email) {
        const res = await axiosSecure.get(`/users/teacher/${email}`);
        console.log(res.data);
        return res.data?.teacher;
      }
      return null; // Return null or some default value if email is not available
    },
  });

  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
