import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const AddClass = () => {
    const { user } = useAuth();

    const handleAddClass = event => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const price = form.price.value;
        const description = form.description.value;
        const image = form.image.value;
        const name = user?.displayName;
        const email = user?.email;

        const newClass = {
            title, name, email, price, description, image
        };

        fetch('https://edu-fusion-server.vercel.app/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })
        .then(res => res.json())
        .then(data => {
            if (data?.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Class Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                // form.reset();
                // Redirect to "My Classes" page
                // window.location.href = '/myClass';
            }
        })
        .catch(error => {
            console.error('Error adding class:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add class',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    return (
        <div className="bg-[#F4F3F0] p-24">
            <Helmet>
                <title>Add Class</title>
            </Helmet>
            <h2 className="text-3xl font-extrabold">Add Class</h2>

            <form onSubmit={handleAddClass} className="card-body">
                {/* Form Row 1 */}
                <div className="md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name="title" placeholder="Class Title" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" name="price" placeholder="Class Price" className="input input-bordered w-full" required />
                    </div>
                </div>

                {/* Form Row 2 */}
                <div className="md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name="description" placeholder="Class Description" className="w-full input input-bordered" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="text" name="image" placeholder="Image URL" className="input input-bordered w-full" required />
                    </div>
                </div>

                {/* Form Row 3 */}
                <div className="md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" value={user?.displayName} className="input input-bordered w-full" readOnly />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" value={user?.email} className="input input-bordered w-full" readOnly />
                    </div>
                </div>

                <input className="btn btn-block bg-black text-white mt-8" type="submit" value="Add Class" />
            </form>
        </div>
    );
};

export default AddClass;