import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter()

  async function handleSignup() {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(Math.random() * 6)}.png`
    })

    router.reload()
  }

  async function guestSignin() {
    await signInWithEmailAndPassword(auth, "guest1111222200000@test.com", "123456")
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      // console.log(currentUser);
      // handle redux actions
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="bg-white px-5 py-1 rounded-3xl font-bold hover:bg-[#cbd2d7]"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex items-center justify-center"
      >
        <div
          className="w-[90%] h-[550px] bg-black text-white md:w-[560px] md:h-[600px]
            border border-gray-600 rounded-lg flex justify-center"
        >
          <div className=" w-[90%] mt-8 flex flex-col">
            <button className="w-full py-1.5 bg-white text-black font-bold rounded-md"
            onClick={guestSignin}
            >
              Sign In as Guest
            </button>
            <h4 className="text-center mt-4">or</h4>
            <h1 className="text-3xl font-bold mt-4">Create your account</h1>

            <input
              className="bg-transparent border border-gray-700 h-10 p-6 rounded-md mt-8"
              placeholder="Full Name"
              required
              onChange={e => setName(e.target.value)}
            />
            <input
              className="bg-transparent border border-gray-700 h-10 p-6 rounded-md mt-8"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="bg-transparent border border-gray-700 h-10 p-6 rounded-md mt-8"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full py-1.5 bg-white text-black font-bold rounded-md mt-12"
              onClick={handleSignup}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
