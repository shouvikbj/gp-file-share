import Head from "next/head";
import { useRouter } from "next/router";
import LoginSignupNavigation from "../components/LoginSignupNavigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpfileshare.pythonanywhere.com/";

const Login = () => {
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
    var form = document.getElementById("signup-form");
    fetch(`${API}/api/login`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          toast(data.message, { type: "success" });
          toast("Redirecting to Home..", { type: "info" });
          Cookies.set("gfs", data.user.email, { expires: 365 });
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          toast(data.message, { type: "error" });
        }
      });
  };
  return (
    <>
      <Head>
        <title>GP File Share | Login</title>
      </Head>
      <LoginSignupNavigation />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-0"></div>
          <div className="col-md-4 col-sm-12">
            <form id="signup-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <button
                style={{ float: "right" }}
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
          <div className="col-md-4 col-sm-0"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
