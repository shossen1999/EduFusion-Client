import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
// import app from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import app from './../firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // prodiver

  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // prodiver

  // signUp signIn signIn Out

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignInUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signOutUser = () => {
    setLoading(true);
    signOut(auth);
  };

  // signUp signIn signIn Out

  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('current user', currentUser);
        if(currentUser){
            const userInfo = {email : currentUser.email}
            //get token and store client
            axiosPublic.post('/jwt', userInfo)
            .then(res => {
                // console.log(res.data)
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token)
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            // TODO : Remove token(if token store in the client side : Local Storage, chasing, in memory)
            localStorage.removeItem('access-token')
            setLoading(false);
        }
    });
    return () => {
        return unsubscribe();
    }
} ,[axiosPublic])

  const authInfo = { user, loading, signUpUser, signInUser, googleSignInUser, updateUserProfile, signOutUser };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
