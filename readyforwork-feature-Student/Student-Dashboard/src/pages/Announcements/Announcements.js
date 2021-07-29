import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { StartPage } from "../StartPage";
import moment from "moment";
export const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const getAnnouncements = () => {
    api
      .get("/announcements")
      .then((res) => {
        let announcementsData = res.data.announcements
          // .filter(({ isDeleted }) => isDeleted === false)
          .map((u) => {
            return { select: false, id: u._id, ...u };
          });
        return setAnnouncements(announcementsData);
      })

      .catch((err) => {
        console.log(err);
        return setAnnouncements([]);
      });
  };

  useEffect(getAnnouncements, []);
  return (
    <>
      <StartPage
        content="Dashboard"
        contents="Announcements"
        contenttitle="Announcements"
      />

      <div className="row">
        <div className="col-lg-12">
          <div>
            <div className="table-responsive">
              <table className="table project-list-table table-nowrap align-middle table-borderless">
                {announcements &&
                  announcements.map((announcement, i) => (
                    <tbody key={i}>
                      <tr>
                        <td>
                          <img
                            src={
                              announcement?.track?.image ||
                              `${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`
                            }
                            alt=""
                            className="avatar-sm"
                          />
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            <Link to="#" className="text-dark">
                              {announcement?.track?.name}
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">
                            {announcement?.title}
                          </p>
                        </td>
                        <td>
                          {" "}
                          {moment(announcement.createdDate).format(
                            "DD/MM/YYYY"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Announcements;
