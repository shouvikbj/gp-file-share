import Head from "next/head";
import { useRouter } from "next/router";
import LoginSignupNavigation from "../components/LoginSignupNavigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpfileshare.pythonanywhere.com/";

const Signup = () => {
  const router = useRouter();

  const handleSignup = (event) => {
    event.preventDefault();
    var form = document.getElementById("signup-form");
    fetch(`${API}/api/signup`, {
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
          toast("Redirecting to Login..", { type: "info" });
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          toast(data.message, { type: "error" });
        }
      });
  };

  return (
    <>
      <Head>
        <title>GP File Share | Signup</title>
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
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter name"
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
                onClick={handleSignup}
              >
                Create Account
              </button>
            </form>
          </div>
          <div className="col-md-4 col-sm-0"></div>
        </div>
      </div>
    </>
  );
};

export default Signup;
