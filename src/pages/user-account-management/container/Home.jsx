import { handleGoogleSignIn } from "../../../utils/googleAuth";
import Logo from "/logo.webp"
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  return (
    <section className='w-full flex flex-col md:flex-row sm:flex-row justify-center items-center h-screen'>
        <div className='w-full h-screen md:h-[70vh] sm:h-[70vh] flex justify-center items-center'>
            <h1 className='text-orange'>Photo Collage</h1>
        </div>
        <div className='w-full h-screen md:h-[30vh] sm:h-[30vh] flex justify-center items-center'>
            <div className='w-full flex-row justify-center items-center align-middle'>
                {/* Logo */}
              <div className='w-full flex-row justify-center items-center align-middle'>
                <div className='flex justify-center items-center'>
                    <img className='w-[58px] md:w-[42px] sm:w-[42px]' src={Logo} alt="Logo" />
                    <p className='font-karla align-middle items-center text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[24px] sm:leading-[28px] md:leading-[32.73px] lg:leading-[36px] text-left decoration-skip-ink-none'>Vibesnap</p>
                </div>
                <p className='font-kumbh text-[16px] sm:text-[18px] font-normal text-center decoration-skip-ink-none mt-1.5'>Moments That Matter, Shared Forever</p>
              </div>

              {/* GAuth Button */}
              <button onClick={handleGoogleSignIn} className='bg-[#292929] w-[60%] mx-auto cursor-pointer mt-4 flex justify-center items-center p-4 gap-4 rounded-[26px] opacity-100'>
                <FcGoogle />
                <p className='font-karla text-[16px] font-bold leading-[22.4px] text-[#FFFFFF]'>Continue with Google</p>
              </button>
            </div>
        </div>
    </section>
  )
}

export default Home
