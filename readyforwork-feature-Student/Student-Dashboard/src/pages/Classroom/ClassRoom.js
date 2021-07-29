import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import api from "../../api";
import { Link } from "react-router-dom";
const ClassRoom = () => {
  const [value, setValue] = React.useState(4);
  const [list, setList] = useState([]);

  const getListData = () => {
    api
      .get("/users/courses")
      .then((res) => {
        let course = res.data.courses
          // .filter(({ isDeleted }) => isDeleted === false)
          .map((u) => {
            return { select: false, id: u._id, ...u };
          });
        return setList(course);
      })

      .catch((err) => {
        console.log(err);
        return setList([]);
      });
  };

  useEffect(getListData, []);
  return (
    <div className="container">
      <div className="row my-4">
        <div className="col">
          <div className="jumbotron">
            <div className="container-fluid">
              <div className="row">
                {list &&
                  list?.map((course, i) => (
                    <Link
                      to={`/courses/${course?._id}/lesson`}
                      className="col-sm d-flex btn"
                      key={i}
                    >
                      {console.log(course)}

                      <div
                        className="card  flex-fill"
                        style={{
                          boxShadow:
                            "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt={course.name}
                          src={
                            course.image
                              ? process.env.REACT_APP_IMG_PUBLIC_URL +
                                course.image
                              : ""
                          }
                        />
                        <div className="p-2">
                          <h3>{course?.name}</h3>
                          <h6 className="text-muted">
                            {course.description
                              ? course.description
                              : "You will learn special tools and Social Marketing"}
                          </h6>
                          <div className="d-flex">
                            <span className="font-size-15">
                              <span>{course.rating ? course.rating : 4}</span>
                            </span>
                            <span className="text-center">
                              <Rating
                                name="simple-controlled"
                                value={course.rating ? course.rating : 4}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
