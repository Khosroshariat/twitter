import { auth } from "@/firebase";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function signin() {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function guestSignin() {
      await signInWithEmailAndPassword(auth, "guest1111222200000@test.com", "123456")
  }

  return (
    <>
      <button
        className="border px-6 py-1 rounded-3xl text-white font-bold hover:bg-white hover:bg-opacity-30"
        onClick={() => dispatch(openLoginModal())}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex items-center justify-center"
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px]
          border border-gray-600 rounded-lg flex justify-center"
        >
          <div className=" w-[90%] mt-8 flex flex-col">
            <h1 className="text-3xl font-bold mt-4">Sign in to your account</h1>

            <input
              className="bg-transparent border border-gray-700 h-10 p-6 rounded-md mt-8"
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="bg-transparent border border-gray-700 h-10 p-6 rounded-md mt-8"
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />

            <button 
            className="w-full py-1.5 bg-white text-black font-bold rounded-md mt-12"
            onClick={signin}
            >
              Sign In
            </button>
            <h4 className="text-center mt-4">or</h4>
            <button 
            className="w-full py-1.5 bg-white text-black font-bold rounded-md mt-4"
            onClick={guestSignin}
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
