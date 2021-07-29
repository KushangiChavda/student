import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box } from "@material-ui/core/";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import PDF from "../../components/PDF";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Template1 = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const [user, setUser] = useState([]);
  console.log("user>>>", user);
  const dispatch = useDispatch();
  const getUserProfileById = (userId) => {
    api
      .get(`/userProfile`)
      .then((res) => {
        // dispatch(successAlert(res.data.message))
        const { ...user } = res.data.profile;
        return setUser((prev) => ({
          ...user,
        }));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return history.push({ pathname, state: "404" });
        }
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };
  useEffect(() => {
    getUserProfileById();
    // eslint-disable-next-line
  }, []);
  const classes = useStyles();
  return (
    <>
      <div className="container">
        <div className="row">
          <aside className="col l4 m12 s12 sidebar z-depth-1" id="sidebar">
            <div className="row">
              <div className="heading">
                <div className="feature-img">
                  <img
                    src="http://demo.deviserweb.com/cv/assets/images/profile-img.jpg"
                    className="img-fluid"
                    alt
                  />
                  <div className="col mb-3">

                  <i class="fa fa-envelope"></i>
                    <h3>Email</h3>
                    <p>sdcd@gmail.com</p>
                  </div>
                    <div className="col mb-3">
                    <h4>Skills</h4>
                    <p>sdcd</p>
                    <p>dcsdccf</p>
                  </div>
                </div>
              </div>

              {/* SKILLS */}
            </div>
          </aside>

          <section className="col s12 m12 l8 section">
            <div className="row">
              <div className="section-wrapper z-depth-1">
                <div className="section-icon col s12 m12 l2">
                  <i className="fa fa-suitcase" />
                </div>
                <div
                  className="custom-content col s12 m12 l10 wow fadeIn a1 animated"
                  data-wow-delay="0.1s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.1s",
                    animationName: "fadeIn",
                  }}
                >
                  <h2>Projects</h2>
                  <div
                    className="custom-content-wrapper wow fadeIn a2 animated"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "fadeIn",
                    }}
                  >
                    <h3>
                      UI/UX Designer <span>@Academy</span>
                    </h3>
                    <span>JAN 2013 - DEC 2013 </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <div
                    className="custom-content-wrapper wow fadeIn a3 animated"
                    data-wow-delay="0.3s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeIn",
                    }}
                  >
                    <h3>
                      Creative Director <span>@DeviserWeb</span>
                    </h3>
                    <span>JAN 2013 - DEC 2013 </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <div
                    className="custom-content-wrapper wow fadeIn a4 animated"
                    data-wow-delay="0.4s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.4s",
                      animationName: "fadeIn",
                    }}
                  >
                    <h3>
                      Graphics Designer <span>@Creative Wrold</span>
                    </h3>
                    <span>JAN 2013 - DEC 2013 </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* ========================================
                   Education 
                  ==========================================*/}
              <div className="section-wrapper z-depth-1">
                <div className="section-icon col s12 m12 l2">
                  <i className="fa fa-graduation-cap" />
                </div>
                <div
                  className="custom-content col s12 m12 l10 wow fadeIn a1 animated"
                  data-wow-delay="0.1s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.1s",
                    animationName: "fadeIn",
                  }}
                >
                  <h2>Education </h2>
                  <div
                    className="custom-content-wrapper wow fadeIn a2 animated"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "fadeIn",
                    }}
                  >
                    <h3>
                      Art &amp; Multimedia <span>@Oxford University</span>
                    </h3>
                    <span>JAN 2013 - DEC 2013 </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <div
                    className="custom-content-wrapper wow fadeIn a3 animated"
                    data-wow-delay="0.3s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeIn",
                    }}
                  >
                    <h3>
                      Post Graduation <span>@Lorem</span>
                    </h3>
                    <span>JAN 2013 - DEC 2013 </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <div
                    className="custom-content-wrapper wow fadeIn a4 animated"
                    data-wow-delay="0.4s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.4s",
                      animationName: "fadeIn",
                    }}
                  >
                    <h3>
                      TTMP Degree <span>@Creative School</span>
                    </h3>
                    <span>JAN 2013 - DEC 2013 </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
            
          </section>
        </div>
      </div>
    </>
  );
};

export default Template1;
