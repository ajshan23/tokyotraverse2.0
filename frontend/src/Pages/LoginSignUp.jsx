import React, { useEffect, useState } from "react";
import avatar from "../assets/login2.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import bg from "../assets/avatarback.png";
import axios from "axios"
const LoginSignUp = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleSubmit = () => {
    login ? handleLogin() : handleSignup();
  };
  const handleLogin = async () => {
    if ([password, email].some((field) => field.trim() === "")) {
      toast.error("All fields are required");
      return null;
    }
    setLoading(true);
    
    await axios.post("http://localhost:5000/api/v1/users/login",{ password: password, email: email })
      .then((response) =>{
       
        if (response.data.success) {
          console.log(response.data);
          localStorage.setItem("accessToken", response.data.data.accessToken);
          navigate("/")
        } else {
          if (response.data.statusCode === 400) {
            toast.error("wrong email or password");
          }
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        alert("Wrong email or password");
        setLoading(false);
      }).finally(()=>{
        setPassword("");
        setCpass("");
        setEmail("");
        setUsername("");
        setLoading(false);
      })
    

    
   
  };
  const handleSignup = async () => {
    if (
      [username, password, cpass, email].some((field) => field.trim() === "")
    ) {
      alert("All fields are required");
      return null;
    }
    if (password !== cpass) {
      alert("password and confirm password is not matching");
      setPassword("");
      setCpass("");
      return null;
    }
    setLoading(true);
    await axios.post("http://localhost:5000/api/v1/users/register",{
      username: username,
      password: password,
      email: email,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          
          localStorage.setItem("accessToken", response.data.data.accessToken);
    
          navigate("/")
        } else {
          alert(response.data.error);
        }
      })
      .catch((err) => {
        if (err.statuscode === 409) {
          alert("username or password already exists");
        }
        alert("username or password already exists");
        setLoading(false);
      }).finally(()=>{
        setPassword("");
        setCpass("");
        setEmail("");
        setUsername("");
        setLoading(false);  
      })
  };
  useEffect(() => {
    let check = localStorage.getItem("accessToken");
    if (check) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full bg-red-600 flex justify-center pt-10 md:pt-0 md:items-center bg-opacity-80">
        <div className="w-full  scale-95 md:scale-100 md:w-[863px] h-[488px] bg-white rounded flex flex-row items-center md:pl-7 md:pr-7">
          <img src={avatar} alt="" className="hidden md:flex w-[357px] h-[433px]" />
          <div className="scale-90 md:scale-100 md:px-10 flex flex-col w-full h-full justify-center items-start">
            <div className="loginsignup text-[#F01F26] text-3xl font-semibold font-lexend mb-3">
              {!login ? "Sign Up" : "Login"}
            </div>
            <div className="flex flex-col items-center w-full">
            <div className="h-[1px] w-full bg-[#F01F26]"></div>
            <div className="flex flex-col items-start justify-center pt-[6px]">
              {!login ? (
                <>
                  <div className="text-sm text-gray-500 pt-[5px]">
                    Username:
                  </div>
                  <div className="w-full md:w-[334px] h-[35px] border border-[#F01F26] mt-[2px]">
                    <input
                      type="text"
                      className="w-full h-full bg-transparent outline-none px-3"
                      placeholder="Enter Your Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </>
              ) : null}
              <div className="text-sm text-gray-500 pt-[5px]">E-mail:</div>
              <div className="w-[100%]  md:w-[334px] h-[35px] border border-[#F01F26] mt-[2px]">
                <input
                  type="text"
                  className="w-full h-full bg-transparent outline-none px-3"
                  placeholder="Enter Your eamil"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-500  mt-[8px]">password:</div>
              <div className="w-[334px] h-[35px] border border-[#F01F26] mt-[8px]">
                <input
                  type="password"
                  className="w-full h-full bg-transparent outline-none px-3"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {login ? (
                <div className="w-full md:w-[334px] text-end text-sm text-gray-500 flex justify-end mb-">
                  Password <div className="text-red-600">?</div>
                </div>
              ) : null}
              {!login ? (
                <>
                  <div className="text-sm text-gray-500  mt-[1px]">
                    Confirm password:
                  </div>
                  <div className="w-full md:w-[334px] h-[35px] border border-[#F01F26] mt-[8px]">
                    <input
                      type="password"
                      className="w-full h-full bg-transparent outline-none px-3"
                      placeholder="Confirm Your Password"
                      value={cpass}
                      onChange={(e) => setCpass(e.target.value)}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className="w-full md:w-[334px] h-[35px] text-white text-center bg-[#F01F26] font-bold font-lexend text-xl mt-4 mb-2">
              <button className="w-full h-full" onClick={handleSubmit}>
                {loading ? (
                  <ClipLoader color="white" />
                ) : !login ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="flex text-sm">
              Dont Have An Account?
              <div
                className="text-red-600 font-semibold cursor-pointer"
                onClick={() => setLogin(!login)}
              >
                {login ? "Sign Up" : "Login"}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
