import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TeachOnEduFusion = () => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState('');
    const [requestArray, setRequestArray] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchTeacherRequest();
    }, [user?.email, triggerFetch]);

    const fetchTeacherRequest = () => {
        if (!user?.email) return;
        
        axiosSecure.get(`/teacherRequest?email=${user.email}`)
            .then(res => {
                if (res.data.length > 0) {
                    const [req] = res.data;
                    populateForm(req);
                    setStatus(req.status);
                }
                setRequestArray(res.data);
            })
            .catch(error => console.error('Error fetching teacher request:', error));
    };

    const populateForm = (request) => {
        setValue("experience", request.experience);
        setValue("title", request.title);
        setValue("category", request.category);
    };

    const onSubmit = (data) => {
        const teacherData = prepareTeacherData(data);

        if (status) {
            updateTeacherRequest(teacherData);
        } else {
            createTeacherRequest(teacherData);
        }
    };

    const prepareTeacherData = (data) => ({
        ...data,
        status: 'pending',
        photoURL: user.photoURL
    });

    const updateTeacherRequest = (teacher) => {
        const id = requestArray[0]._id;
        axiosSecure.put(`/teacherRequest/${id}`, teacher)
            .then(res => handleResponse(res, 'modifiedCount'))
            .catch(error => console.error('Error updating teacher request:', error));
    };

    const createTeacherRequest = (teacher) => {
        axiosSecure.post('/teacherRequest', teacher)
            .then(res => handleResponse(res, 'insertedId'))
            .catch(error => console.error('Error submitting teacher request:', error));
    };

    const handleResponse = (res, responseKey) => {
        if (res.data[responseKey]) {
            swal("Request sent!", { icon: "success" });
            setTriggerFetch(!triggerFetch);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6"
             style={{ backgroundImage: `url(https://thumbs.dreamstime.com/b/modern-abstract-motion-banner-dark-background-colourful-light-76877365.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-10 rounded-lg shadow-xl max-w-lg w-full">
                {requestArray.length > 0 && requestArray[0].status === 'accepted' ? (
                    <AcceptedRequest />
                ) : (
                    <TeacherRequestForm
                        user={user}
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        requestArray={requestArray}
                        status={status}
                    />
                )}
            </div>
        </div>
    );
};

const AcceptedRequest = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">Your request has been accepted.</h1>
    </div>
);

const TeacherRequestForm = ({ user, register, handleSubmit, onSubmit, requestArray, status }) => (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-3xl font-medium mb-6 text-center text-cyan-600">Want to become teacher?</h2>

        <ProfilePicture imgSrc={user?.photoURL} />
        
        <div className="grid grid-cols-2 gap-4">
            <InputField label="Name" value={user?.displayName || ''} readOnly={true} register={register} name="userName" />
            <InputField label="Email" value={user?.email || ''} readOnly={true} register={register} name="email" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <SelectField label="Experience" name="experience" options={experienceOptions} register={register} />
            <InputField label="Title" placeholder="Title" register={register} name="title" />
        </div>

        <SelectField label="Category" name="category" options={categoryOptions} register={register} />

        <SubmitButton disabled={requestArray.length && status !== 'rejected'} status={status} />
    </form>
);

const ProfilePicture = ({ imgSrc }) => (
    <div className="mb-4 text-center">
        <img src={imgSrc} alt="User" className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 shadow-md" />
    </div>
);

const InputField = ({ label, value, readOnly = false, register, name, placeholder }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-1">{label}:</label>
        <input
            {...register(name, { required: true })}
            type="text"
            defaultValue={value}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`w-full p-2 border border-gray-300 rounded-lg ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    </div>
);

const SelectField = ({ label, name, options, register }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-1">{label}:</label>
        <select {...register(name, { required: true })} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value=''>Select {label}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const SubmitButton = ({ disabled, status }) => (
    <button
        disabled={disabled}
        type="submit"
        className={`w-full py-2 mt-4 rounded-full font-semibold transition-colors duration-300 ${disabled ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'}`}
    >
        {status !== 'rejected' ? 'Submit for Review' : 'Request Another'}
    </button>
);

const experienceOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Experienced', value: 'experienced' },
    { label: 'Mid-level', value: 'mid-level' }
];

const categoryOptions = [
    { label: 'Web Development', value: 'web development' },
    { label: 'Artificial Intelligence', value: 'artificial intelligence' },
    { label: 'Robotics Engineering', value: 'robotics engineering' },
    { label: 'Digital Marketing', value: 'digital marketing' },
    { label: 'Graphic Design', value: 'graphic design' },
    { label: 'Data Analysis', value: 'data analysis' },
    { label: 'Project Management', value: 'project management' },
    { label: 'Ethical Hacking', value: 'Ethical Hacking' },
    { label: 'BlockChain', value: 'BlockChain' },
    { label: 'App Development', value: 'App Development' },
    { label: 'Game Development', value: 'Game Development' },
    { label: 'BioChemistry', value: 'BioChemistry' },
    { label: 'Microbiology', value: 'MicroBiology' },
    
];

export default TeachOnEduFusion;
