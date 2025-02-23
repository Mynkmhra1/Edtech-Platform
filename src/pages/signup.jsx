import Template from "../component/core/auth/template";
import signupImg from "../assets/Images/signup.webp";
import { useSelector } from "react-redux";

function Signup({ setIsLoggedIn }) {
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="flex justify-center items-center min-h-screen">
      {!loading ? (
        <Template
          title="Lets buid a community to froster the learning that let us grow together"
          description1="Build skills for today, tomorrow, and beyond."
          description2="Education to future-proof your career."
          image={signupImg}
          formType="signup"
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <h1 className="text-white text-4xl">.......Loading</h1>
      )}
    </div>
  );
  
}

export default Signup;