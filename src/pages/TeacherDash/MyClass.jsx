import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyClass = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  const { data: myClassesData = [], refetch } = useQuery({
    queryKey: ["allMyClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${email}`);
      return res.data;
    },
  });
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/class/${id}`)
        .then(res => {
          console.log(res.data)
          if(res.data.deletedCount > 0){
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your class has been deleted.",
              icon: "success"
            });
          }
        })
      }
    });
  };



  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center">My Classes</h1>
      
      {
        myClassesData.map(item => <div key={item._id} className="flex gap-10 border border-gray-700 p-4 mt-5 items-center">
        <div>
            <img className="max-w-60 max-h-40" src={item.image} alt="" />
        </div>
        <div>
            <h3 className="text-2xl font-semibold">Title : {item.title}</h3>
            <div className="flex gap-5 text-lg">
                <p>Name : {item.name}</p>
                <p>Email : {item.email}</p>
            </div>
            <div className="flex gap-5">
            <p>Price : ${item.price}</p>
            <p>Status : {item.status}</p>
            </div>
            <p>Description : {item.description}</p>
        </div>
        <div className="flex flex-col items-center gap-5">
            <Link to={`/dashboard/update-class/${item._id}`}><button className="btn btn-ghost btn-sm bg-orange-500 text-white hover:text-black">Update</button></Link>
            <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-sm bg-red-600 text-white hover:text-black">Delete</button>
            {
              item.status === "approved" ? <Link to={`/dashboard/teacher-class/${item._id}`}><button className="btn btn-ghost btn-sm bg-orange-500 text-white hover:text-black">Details</button></Link> : <button disabled className="btn btn-ghost btn-sm bg-orange-500 text-white hover:text-black">Details</button>
            }
        </div>
      </div>)
      }
    </div>
  );
};

export default MyClass;
