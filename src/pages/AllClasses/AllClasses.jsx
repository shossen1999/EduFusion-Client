import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import useClasses from "../../Hooks/useClasses";
import useWebDetail from "../../Hooks/useWebDetail";

const AllClasses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const pageSize = 10;

    const [webDetail, isPending] = useWebDetail()
    const status = 'accepted'

    const [classes, refetch, classPending] = useClasses(currentPage, pageSize, search, status);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchValue); 
        setCurrentPage(1);
    };

    useEffect(() => {
        refetch();
    }, [search, currentPage, refetch]); 

    const totalPages = Math.ceil(webDetail.acceptedClassCount / 10);

    if (classPending || isPending) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="p-6">
            {/* Uncomment and adjust the search form if needed */}
            
            <form onSubmit={handleSearch} className="my-10 max-w-md mx-auto flex items-center gap-2">
                <Input
                    type="text"
                    label="Search by class name..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </form>
           

            {/* No Classes Message */}
            {classes.length === 0 && (
                <div className="text-center mt-8">
                    <h2 className="text-2xl font-bold text-blue-600">No classes found.</h2>
                </div>
            )}

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map((aClass, idx) => (
                    <div
                        key={idx}
                        className="card bg-base-100 shadow-xl border border-gray-200 overflow-hidden max-w-[380px] mx-auto"
                    >
                        <figure className="px-10 pt-10">
                            <img
                                src={aClass.image}
                                alt={aClass.title}
                                className="rounded-2xl w-full h-[180px] object-cover"
                            />
                        </figure>
                        <div className="card-body p-6">
                            <h2 className="text-xl font-bold mb-2">
                                <span className="font-bold">Name:</span> {aClass.title}
                            </h2>
                            <p className="text-[14px] mb-2">
                                <span className="font-bold">Instructor:</span> {aClass.name}
                            </p>
                            <p className="text-[14px] mb-2">
                                <span className="font-bold">Price:</span> ${aClass.price}
                            </p>
                            <p className="text-[14px] mb-2">
                                <span className="font-bold">Enrolled Students:</span> {aClass.total_enrollment}
                            </p>
                          
                            <div className="flex-1 h-full flex items-center justify-center">
                                    <Link className="w-full" to={`/classDetails/${aClass._id}`}>
                                        <button className="px-4 py-2 rounded-full bg-[#7b7b7b] btn-block text-white font-bold hover:bg-cyan-700">
                                            Enroll
                                        </button>
                                    </Link>
                                </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Uncomment and adjust pagination if needed */}
            
            <div className="flex items-center gap-4 justify-center my-10">
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </IconButton>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                >
                    <ArrowRightIcon className="h-6 w-6" />
                </IconButton>
            </div>
           
        </div>
    );
};

export default AllClasses;
