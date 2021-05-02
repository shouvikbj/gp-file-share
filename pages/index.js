import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://gpfileshare.pythonanywhere.com/";

const Home = () => {
  const router = useRouter();

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [dataList, setDataList] = useState([]);

  const authStatus = () => {
    var userEmail = Cookies.get("gfs");
    if (userEmail) {
      setUser(userEmail);
    } else {
      router.push("/login");
    }
  };

  const loadAllReceivedFilesList = () => {
    fetch(`${API}/api/${Cookies.get("gfs")}/get`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDataList(data.files);
      });
  };

  const deleteFile = (fileId) => {
    var r = confirm("Sure, you want to delete this file?");
    if (r == true) {
      fetch(`${API}/api/${Cookies.get("gfs")}/${fileId}/delete`, {
        method: "POST",
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          if (resp.status === "ok") {
            toast(resp.message, { type: "info" });
          } else {
            toast(resp.message, { type: "error" });
          }
        });
    }
  };

  useEffect(() => {
    authStatus();
    loadAllReceivedFilesList();
    setInterval(loadAllReceivedFilesList, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>GP File Share | Home</title>
      </Head>
      <Navigation />
      <div className="container">
        <h3>Home Page</h3>
        <br />
        <div className="row">
          <div className="col-md-4 col-sm-0"></div>
          <div className="col-md-4 col-sm-12">
            {dataList.map((data, index) => {
              return (
                <div key={data.id} style={{ width: "100%" }}>
                  <div className="card shadow" style={{ borderRadius: "10px" }}>
                    <div className="mt-3 ml-3">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        style={{ borderRadius: "50px" }}
                        onClick={() => {
                          deleteFile(data.id);
                        }}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                    </div>
                    <div className="card-body">
                      <Link href={`${API}${data.received_file}`} download>
                        <a style={{ textDecoration: "None" }}>
                          {data.file_name}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
          <div className="col-md-4 col-sm-0"></div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Home;
