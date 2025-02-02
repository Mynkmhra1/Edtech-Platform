import Template from "../component/core/auth/template";
import loginImg from "../assets/Images/login.webp";

function Login({ setIsLoggedIn }) {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
    // <div>
    //   <p>hii buddy</p>
    // </div>
  );
}

export default Login;