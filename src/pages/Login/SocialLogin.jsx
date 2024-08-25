import { useLocation, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleLogin} = useAuth();
    const axiosPublic = useAxiosPublic();

    // navigation systems
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location?.state || "/";

    const handleSocialLogin = socialProvider => {
        socialProvider().then((result) => {
            const userInfo ={
                email : result.user?.email,
                name : result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then( res => {
                console.log(res.data);
                navigate(from);


            })
           
        });
    }

    return (
        < >
            <div className="divider">
                Continue With
            </div>
            <div className="flex justify-around">
                <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="btn btn-primary btn-sm btn-outline"><FcGoogle></FcGoogle>    Sign In With Google</button>
              
            </div>

        </>
    );
};

export default SocialLogin;