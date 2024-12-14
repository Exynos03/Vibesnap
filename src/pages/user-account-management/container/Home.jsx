import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn } from "../../../utils/googleAuth";
import Logo from "/logo.webp";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import getCookie from "../../../cookies/getCookies";
import Image from "/vibesnap_collage.jpg";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("sessionData")) navigate("/profile");
  }, []);

  const handleGAuth = async () => {
    const res = await handleGoogleSignIn();
    if (res?.existingUser) navigate("/feed");
    else navigate("/profile");
  };

  return (
    <section className="w-full flex flex-col md:flex-row justify-center items-center h-screen bg-white">
      {/* Collage Image Section */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full">
        <img src={Image} alt="Collage" className="w-full h-full object-cover" />
      </div>

      {/* Bottom Content Section */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full flex flex-col justify-center items-center bg-white rounded-tl-[12px] rounded-tr-[12px] md:rounded-none shadow-lg">
        {/* Logo Section */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center mb-2">
            <img
              className="w-[48px] md:w-[58px] lg:w-[64px] mr-2"
              src={Logo}
              alt="Logo"
            />
            <p className="font-karla text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[28px] md:leading-[32px] lg:leading-[36px]">
              Vibesnap
            </p>
          </div>
          <p className="font-kumbh text-[16px] md:text-[18px] lg:text-[20px] text-center">
            Moments That Matter, Shared Forever
          </p>
        </div>

        {/* Google Authentication Button */}
        <button
          onClick={handleGAuth}
          className="bg-[#292929] w-[80%] md:w-[70%] lg:w-[60%] mt-4 flex justify-center items-center py-3 px-6 gap-4 rounded-[26px] text-white shadow-md hover:opacity-90 transition-opacity"
        >
          <FcGoogle className="text-[20px] md:text-[24px]" />
          <span className="font-karla text-[16px] md:text-[18px] font-bold">
            Continue with Google
          </span>
        </button>
      </div>
    </section>
  );
};

export default Home;
