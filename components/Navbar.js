// import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
