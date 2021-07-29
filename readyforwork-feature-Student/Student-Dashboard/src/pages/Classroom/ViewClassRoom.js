import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";
import api from "../../api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const ViewClassRoom = (props) => {
  const [list, setList] = useState([]);
  // console.log("list", list);
  const { history, match } = props;
  const { id } = match.params;
  const getListData = () => {
    api
      .get(`/users/course/${id}/lessons`)
      .then((res) => {
        let listData = res.data;

        return setList(listData);
      })
      .catch((err) => {
        console.log(err);
        return setList([]);
      });
  };

  useEffect(getListData, []);
  const [value, setValue] = React.useState(4);
  const classes = useStyles();
  return (
    //https://youtu.be/0riHps91AzE

    //Make the youtube
    <div className="container">
      <div className="d-flex">
        <h3 className="mb-sm-3 font-size-18 px-2">{list?.course?.name}</h3>

        <span className="font-size-15">
          {list?.course?.rating}
          <span>.0</span>
        </span>
        <span className="text-center">
          <Rating
            name="simple-controlled"
            value={list?.course?.rating ? list?.course?.rating : 4}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </span>
      </div>
      <div className="px-2">
        <h4 className="mb-sm-3 font-size-18">What you will Learn?</h4>
        <p className="font-size-15">{list?.course?.description}</p>
      </div>
      {list?.lessons &&
        list?.lessons.map((lesson, i) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {lesson?.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography gutterBottom>{lesson?.description}</Typography>
                {/* <Typography>{lesson?.url}</Typography> */}

                <iframe
                  width={560}
                  height={315}
                  src={lesson?.url}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                <div className="">
                  {lesson &&
                    lesson.images.map((image, i) => (
                      <img
                        className="img-fluid img-thumbnail"
                        style={{ width: "304px", height: "236px" }}
                        src={
                          image
                            ? process.env.REACT_APP_IMG_PUBLIC_URL + image
                            : ""
                        }
                      />
                    ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Lesson 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Tools.pdf</Typography>
          <span className="float-end">
            <i className="bx bx-download"></i>
          </span>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default ViewClassRoom;
