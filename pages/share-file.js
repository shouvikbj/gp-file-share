import Head from "next/head";
import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpfileshare.pythonanywhere.com/";

const Share = () => {
  const handleTransfer = (event) => {
    event.preventDefault();
    toast("Transfering...", { type: "default" });
    var form = document.getElementById("transfer-form");
    fetch(`${API}/api/${Cookies.get("gfs")}/transfer`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          toast(data.message, { type: "info" });
          form.reset();
        } else {
          toast(data.message, { type: "error" });
        }
      });
  };

  return (
    <>
      <Head>
        <title>GP File Share | Share File</title>
      </Head>
      <Navigation />
      <div className="container">
        <h3>Share File(s)</h3>
        <br />
        <div className="row">
          <div className="col-md-4 col-sm-0"></div>
          <div className="col-md-4 col-sm-12">
            <form
              id="transfer-form"
              encType="multipart/form-data"
              onSubmit={handleTransfer}
            >
              <div className="form-group">
                <label>Receiver's Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="receiver"
                  name="receiver"
                  placeholder="Enter receiver's Id"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  name="files[]"
                  placeholder="Enter Password"
                  accept="image/video/*"
                  multiple
                  required
                />
              </div>
              <button
                style={{ float: "right" }}
                type="submit"
                className="btn btn-primary"
              >
                Transfer
              </button>
            </form>
          </div>
          <div className="col-md-4 col-sm-0"></div>
        </div>
      </div>
    </>
  );
};

export default Share;
