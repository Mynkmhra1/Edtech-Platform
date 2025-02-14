import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";

export const Aboutus = () => {
  return (
    <div className="relative">
      {/* Section 1 */}
      <div className="bg-richblack-700 min-w-full relative z-10 pb-72">
        <div className="flex flex-col pt-52 items-center w-[60%] mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">
            Driving Innovation in Online Education for a
          </h1>
          <span className="text-4xl font-bold text-blue-100">Brighter Future</span>
          <p className="text-pure-greys-50 text-sm">
            Studynotion is at the forefront of driving innovation in online education.
            We're passionate about creating a brighter future by offering cutting-edge courses,
            leveraging emerging technologies, and nurturing a vibrant learning community.
          </p>
        </div>

        {/* Image Section with Overflow Effect */}
        <div className="flex flex-row items-center min-w-full justify-center gap-6 mt-10 absolute left-1/2 -translate-x-1/2 -bottom-44 z-20">
          <img src={img1} alt="About Us 1" className="w-1/4 rounded-lg shadow-lg" />
          <img src={img2} alt="About Us 2" className="w-1/4 rounded-lg shadow-lg" />
          <img src={img3} alt="About Us 3" className="w-1/4 rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Next Section */}
      <div className="bg-gray-900 p-10 h-96  flex items-center justify-center mt-28">
        <p className="text-white w-2/3 font-bold text-center  text-2xl ">
          We are passionate about revolutionizing the way we learn. Our innovative platform
          <span className="text-blue-100"> combines technology,</span>
          <span className="text-pink-500"> expertise,</span> and community to create an<span className="text-yellow-25"> unparalleled educational experience.</span>
        </p>
      </div>
    </div>
  );
};
