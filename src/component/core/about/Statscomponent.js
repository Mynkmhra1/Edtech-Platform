
const stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "User Engagement" },
    { count: "50+", label: "Awards" }   
  ];
  
  export const Statscomponent = () => {
    return (
      <div className="bg-richblack-800 py-20">
        <div className="flex flex-wrap justify-center gap-x-20  mx-auto">
          {stats.map((data, index) => (
            <div key={index} className="flex flex-col items-center  w-1/6 ">
              <p className="text-4xl text-white font-bold leading-relaxed">{data.count}</p>
              <p className=" text-pure-greys-300 font-bold">{data.label}</p>
            </div>      
          ))}
        </div>
      </div>
    );
  };
  