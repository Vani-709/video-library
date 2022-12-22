import db from "../../firebase";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ReactPlayer from "react-player";
import { Player } from "video-react";
import { storage } from "../../firebase";
import trackPathForAnalytics from "../track";
import { analytics } from "../../firebase";
import Video from "../UI/Video";
import { logEvent } from "firebase";
import { collection, query, where, getDocs } from "firebase";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

const Firestore = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const [info, setInfo] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPage, setVideoPage] = useState(false);
  const [showBasic, setShowBasic] = useState(false);

  useEffect(() => {
    Fetchdata();
  }, []);

  const Fetchdata = () => {
    console.log("we are here");
    analytics.logEvent("imageaccessed", {
      count: info.length,
      user: currentUser,
    });
    db.collection("vlib")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setInfo((arr) => [...arr, data]);
        });
      });
  };

  async function handleLogout() {
    setError("");
    setVideoPage(false);

    try {
      await logout();
      analytics.logEvent("loggedOut", {
        user: currentUser,
      });
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const videoHandler = (data) => {
    setVideoPage(true);
    setVideoUrl(data);
    analytics.logEvent("playVideoclicked", {
      video: data,
      user: currentUser,
    });
  };

  const backHandler = () => {
    analytics.logEvent("backButtonVideoPressed", {
      user: currentUser,
    });
    setVideoPage(false);
  };
  return (
    <>
      {!videoPage && (
        <>
          <div>
            <Navbar bg="secondary" variant="dark">
              <Container>
                <Navbar.Brand href="/">Video Library</Navbar.Brand>
                <Nav className="me-auto">
                  <button
                    class="btn btn-dark my-2 my-sm-0"
                    type="submit"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </Nav>
              </Container>
            </Navbar>

            <div className="page text-center m-0 mt-2">
              <div className="img-container">
                {info.map((data) => (
                  <img
                    key={data.id}
                    src={data.imgurl}
                    alt="image not available"
                    id={data.id}
                    onClick={videoHandler.bind(this, data.videoref)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {videoPage && (
        <>
          <Navbar bg="secondary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Video Library</Navbar.Brand>
              <Nav className="me-auto">
                <button
                  class="btn btn-dark my-2 my-sm-0 mr-2"
                  type="submit"
                  onClick={backHandler}
                >
                  Back
                </button>
                <button
                  class="btn btn-dark my-2 my-sm-0"
                  type="submit"
                  onClick={handleLogout}
                >
                  LogOut
                </button>
              </Nav>
            </Container>
          </Navbar>
          <div className="card card-video mt-5" style={{ maxWidth: "600px" }}>
            <div className="card-body  align-items-center justify-content-center p-3 border border-dark video-play" >
              <Video src={videoUrl} style={{ maxHeight: "600px" }}cls="imgVideo" con="true" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Firestore;
