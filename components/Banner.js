


import LoginModal from "./modals/LoginModal";
import SignupModal  from "./modals/SignupModal";

export default function Banner() {
  return (
    <div className="flex justify-around items-center fixed w-full h-[80px] bg-[#1d9bf0] bottom-0">
      <div className="hidden text-white md:inline">
        <h1 className="font-bold text-xl">Don't miss what's happening!</h1>
        <span>People on Twitter are the first to know.</span>
      </div>

      <div className="space-x-2">
        <LoginModal />
        <SignupModal />
      </div>
    </div>
  );
}
