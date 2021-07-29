import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Calendar, momentLocalizer } from "react-big-calendar";
import dates from "react-big-calendar/lib/utils/dates";
// import DateFnsUtils from "@date-io/date-fns"; // choose your lib
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, Modal, IconButton } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import api from "../../api";
import moment from "moment";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
const localizer = momentLocalizer(moment);
const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 90,
    height: 90,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const myEventsList = [
  {
    title: "Long Event",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "DTS STARTS",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "DTS ENDS",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "Some Event",
    start: new Date(),
    end: new Date(),
  },
];

const MentorCard = ({
  _id,
  firstName,
  lastName,
  profile,
  designation,
  availables,
  skills,
  track,
  ...props
}) => {
  const [availability, setAvailability] = useState(myEventsList);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(new Date());
  const [slot, setSlot] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSlot(null);
  };

  const formateDate = (d) => {
    let date = d ? new Date(d) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    dt = dt < 10 ? "0" + dt : dt;
    month = month < 10 ? "0" + month : month;
    return `${year} ${month} ${dt}`;
  };

  Number.prototype.toDate = function () {
    return new Date(this);
  };

  Date.prototype.getCurrentMonth = function () {
    var time = new Date(this.getTime())
      .setMonth(this.getMonth() + 1)
      .toDate()
      .setDate(0)
      .toDate()
      .getDate();
    var leftDays = time > this.getDate() ? time - this.getDate() : 0;
    let res = [new Date(this.getTime())];
    if (leftDays === 0) {
      return res;
    }
    return res.concat(
      String(Array(leftDays))
        .split(",")
        .map(function () {
          return new Date(this.setDate(this.getDate() + 1));
        }, this)
    );
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (slot && slot.description.trim() === "") {
      dispatch(errorAlert("Please enter Description"));
      return;
    }
    let payload = {
      mentorId: _id,
      bookedTime: {
        difference: slot.difference,
        start: slot.start,
        end: slot.end,
        startDate: slot.startDate,
        endDate: slot.endDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
      description: slot.description,
      track: track,
    };
    api
      .post("/users/mentor/book", payload)
      .then(function (res) {
        dispatch(successAlert(res.data.message));
        return history.push("/");
      })
      .catch(function (err) {
        dispatch(errorAlert(err?.response?.data?.message));

        console.log(err);
      });
  };

  useEffect(() => {
    let times = [];
    var MonthStartDate =
      new Date(active).setDate(1) > new Date().getTime()
        ? new Date(active).setDate(1).toDate()
        : new Date();
    var currentMonth = new Date(MonthStartDate).getCurrentMonth();
    // console.log(currentMonth, new Date(MonthStartDate))
    availables.forEach((avail) => {
      avail.day.forEach((day) =>
        avail.times.forEach((time) => {
          currentMonth.forEach((date) => {
            var start = new Date(formateDate(date) + " " + time.start);
            var end = new Date(formateDate(date) + " " + time.end);
            if (start.getTime() < new Date().getTime()) {
              return false;
            }
            if (day.value === start.getDay() && day.value === end.getDay()) {
              times.push({
                ...time,
                title: `${firstName || ""} ${lastName || ""} - ${
                  time.start
                } to ${time.end}`,
                start,
                end,
                startTime: time.start,
                endTime: time.end,
                day,
              });
            }
          });
        })
      );
    });
    // console.log(times)
    setAvailability(times);
  }, [availables, active]);

  return (
    <div className="col-sm-6 col-lg-4 mb-3">
      <div
        className="card mb-3 h-100"
        style={{
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
        }}
      >
        <div className="card-body">
          <div className="container d-flex justify-content-center mb-3">
            <SmallAvatar
              alt={(firstName || "") + (lastName || "")}
              src={process.env.REACT_APP_IMG_PUBLIC_URL + profile}
            />
          </div>
          <h5 className="card-title text-center">
            {firstName || ""} {lastName || ""}
          </h5>
          <p className="card-text">
            <b>Designation:</b>&nbsp;
            <span className="card-text">
              {designation || "Full Stack developer"}
            </span>
          </p>
          <p className="card-text">
            <b>Skills:</b>&nbsp;
            <span className="card-text">{skills.join(", ")}</span>
          </p>
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary border-primary"
                // onClick={() => handleBook(_id)}
                onClick={() => handleOpen(_id)}
              >
                View Availability
              </button>
            </div>
          </div>
          {slot && (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Confirm Booking</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div className="card" style={{ height: "95%" }}>
                    <div className="p-5 d-flex justify-content-center align-items-center">
                      <div>
                        <div>
                          <b>Mentor Name</b>:{" "}
                          <span>
                            {firstName || ""} {lastName || ""}
                          </span>
                        </div>
                        <div>
                          <b>Start Time</b>: <span>{slot.startTime}</span>
                        </div>
                        <div>
                          <b>End Time</b>: <span>{slot.endTime}</span>
                        </div>
                        <div>
                          <b>Meeting Date</b>:{" "}
                          <span>{formateDate(slot.start)}</span>
                        </div>
                        <div>
                          <b>Meeting Day</b>: <span>{slot.day.title}</span>
                        </div>
                        <div>
                          <b>Meeting Duration</b>:{" "}
                          <span>{slot.difference}</span>
                        </div>
                        {/* <div>
                          <input
                            type="text"
                            onChange={(e) =>
                              setSlot({ ...slot, description: e.target.value })
                            }
                            value={slot.description}
                          />
                        </div> */}
                        {console.log(slot)}
                      </div>
                    </div>
                  </div>
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Description"
                  type="text"
                  fullWidth
                  onChange={(e) =>
                    setSlot({ ...slot, description: e.target.value })
                  }
                  value={slot.description}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Booked
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {/* {slot && (
            <Modal open={open} onClose={handleClose} modal={false}>
              <div className="p-5" style={{ height: "100%" }}>
                <div className="d-flex justify-content-center flex-column align-items-end">
                  <IconButton onClick={handleClose}>
                    <CloseIcon color="secondary" />
                  </IconButton>
                </div>
                <div className="card" style={{ height: "95%" }}>
                  <div className="p-5 d-flex justify-content-center align-items-center">
                    <div>
                      <div>
                        <b>Mentor Name</b>:{" "}
                        <span>
                          {firstName || ""} {lastName || ""}
                        </span>
                      </div>
                      <div>
                        <b>Start Time</b>: <span>{slot.startTime}</span>
                      </div>
                      <div>
                        <b>End Time</b>: <span>{slot.endTime}</span>
                      </div>
                      <div>
                        <b>Meeting Date</b>:{" "}
                        <span>{formateDate(slot.start)}</span>
                      </div>
                      <div>
                        <b>Meeting Day</b>: <span>{slot.day.title}</span>
                      </div>
                      <div>
                        <b>Meeting Duration</b>: <span>{slot.difference}</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          onChange={(e) =>
                            setSlot({ ...slot, description: e.target.value })
                          }
                          value={slot.description}
                        />
                      </div>
                      {console.log(slot)}
                    </div>
                  </div>
                  <div className="p-5 d-flex justify-content-center align-items-center">
                    <b>Are you sure want to book this slot?</b>{" "}
                    <button
                      className="btn btn-primary d-inline mx-2"
                      onClick={() => alert("slot booked")}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )} */}
          {!slot && (
            <Modal open={open} onClose={handleClose} modal={false}>
              <div className="p-5" style={{ height: "100%" }}>
                <div className="d-flex justify-content-center flex-column align-items-end">
                  <IconButton onClick={handleClose}>
                    <CloseIcon color="secondary" />
                  </IconButton>
                </div>
                <div className="card" style={{ height: "95%" }}>
                  <Calendar
                    localizer={localizer}
                    events={availability}
                    // view="day"
                    onView={(event) => console.log("onView", event)}
                    selectable={false}
                    onNavigate={(date) => setActive(new Date(date))}
                    onSelectEvent={(data) =>
                      setSlot({ ...data, description: "" })
                    }
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export const RequestMentor = () => {
  const [data, setData] = useState(null);

  const getList = () => {
    api
      .get("/users/mentor")
      .then((req) => {
        setData(req.data.mentors);
      })
      .catch((err) => {
        setData([]);
        console.log("Error", err);
      });
  };

  useEffect(getList, []);

  return (
    <div className="container">
      <div className="row">
        {!data ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No Data Found!</p>
        ) : (
          data.map((mentor, index) => <MentorCard key={index} {...mentor} />)
        )}
      </div>
    </div>
  );
};

export default RequestMentor;
