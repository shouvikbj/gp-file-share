import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();

  const logoutUser = () => {
    var choice = confirm("Want to Logout?");
    if (choice == true) {
      Cookies.remove("gfs");
      toast("Logged out!", { type: "success" });
      router.push("/login");
    }
  };

  return (
    <div>
      <div className="jumbotron jumbotron-fluid bg-primary">
        <div className="container">
          <h2 className="lead text-center text-white">
            <Link href="/">
              <a className="navbar-brand">
                <span>GP File Share</span>
              </a>
            </Link>
          </h2>
          <br />
          <button
            className="btn btn-outline-default btn-sm text-warning"
            style={{ float: "right", borderRadius: "50px" }}
            onClick={logoutUser}
          >
            <i className="material-icons">power_settings_new</i>
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
