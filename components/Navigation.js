import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <div className="container navigation">
        <div className="row">
          <div className="col-6 text-center">
            <Link href="/">
              <a className="btn btn-outline-primary left-button">Home</a>
            </Link>
          </div>
          <div className="col-6 text-center">
            <Link href="/share-file">
              <a className="btn btn-outline-primary right-button">
                Share File(s)
              </a>
            </Link>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Navigation;
