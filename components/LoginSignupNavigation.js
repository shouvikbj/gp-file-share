import Link from "next/link";

const LoginSignupNavigation = () => {
  return (
    <>
      <div className="container navigation">
        <div className="row">
          <div className="col-6 text-center">
            <Link href="/login">
              <a className="btn btn-outline-info left-button">Login</a>
            </Link>
          </div>
          <div className="col-6 text-center">
            <Link href="/signup">
              <a className="btn btn-outline-info right-button">Signup</a>
            </Link>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default LoginSignupNavigation;
