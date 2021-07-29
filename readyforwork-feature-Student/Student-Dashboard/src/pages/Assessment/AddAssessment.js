import React, { useState, useEffect } from "react";

import api from "../../api";
import { useDispatch } from "react-redux";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, Radio, Paper } from "@material-ui/core/";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing(3),
    width: "60%",
    margin: "0 auto",
  }),
  button: {
    pointerEvents: "none",
    boxShadow: "none",
  },
  questionMeta: {
    marginLeft: 10,
    display: "inline",
  },
  footer: {
    marginTop: "40px",
  },
  radio: {
    "&$checked": {
      color: "#54CEE2",
    },
  },
  checked: {},
}));

export const AddAssessment = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const getListData = () => {
    api
      .get("/users/weeklyAssessment")
      .then((res) => {
        let listData = res.data.assessment.map((u) => {
          return { select: false, id: u._id, ...u };
        });
        return setList(listData);
      })
      .catch((err) => {
        console.log(err);
        return setList([]);
      });
  };

  useEffect(getListData, []);

  const createData = (data) => {
    return api
      .post("/assessment/add", data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  };

  const handleChange = (i) => (event) => {
    event.persist();
    let quiz = [...list];
    console.log("quiz", quiz);
    let quizObject = { ...quiz[i] };

    quizObject.selectedAns = event.target.value;
    quiz[i] = quizObject;
    console.log("quizobject", quizObject);

    setList(quiz);
  };
  const redirectToAssessments = () => {
    props.history.push("/my-assessments");
  };

  const handleSubmit = (event) => {
    event.persist();

    let quiz = [...list];
    let res = quiz.every(({ selectedAns = "" }) => selectedAns.trim() !== "");
    if (!res) {
      return dispatch(errorAlert("Please Select All Answers"));
    }
    createData({ answers: quiz });
    redirectToAssessments();
  };

  const classes = useStyles();
  return (
    <div>
      <section>
        <div>
          <Paper className={classes.root} elevation={4}>
            {loading ? (
              <>
                <Skeleton variant="rect" width="100%" height={30} />
                <div style={{ display: "flex" }}>
                  {[1, 2, 3, 4].map((v) => (
                    <div
                      key={v}
                      style={{ margin: "2px 10px 0 0", width: "24%" }}
                    >
                      <Skeleton variant="rect" width="100%" height={20} />
                    </div>
                  ))}
                </div>
              </>
            ) : error ? (
              <p>{error}</p>
            ) : list && list.length === 0 ? (
              <Skeleton variant="rect" width="100%" height={118} />
            ) : (
              <>
                <div>
                  {list &&
                    list?.map(({ question: que, selectedAns = null }, i) => {
                      return (
                        <div key={i}>
                          <Typography
                            //   variant="headline"
                            component="h5"
                            align="left"
                          >
                            #{i + 1} : {que.question}
                          </Typography>
                          <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {que &&
                              que?.answers.map((opt, index) => (
                                <div key={index} style={{ margin: "1px" }}>
                                  <Radio
                                    disableRipple
                                    classes={{
                                      root: classes.radio,
                                      checked: classes.checked,
                                    }}
                                    checked={
                                      selectedAns
                                        ? selectedAns === opt._id
                                        : false
                                    }
                                    // onChange={handleChange}
                                    onChange={handleChange(i)}
                                    value={opt._id}
                                    name="radio-button-demo"
                                    aria-label="A"
                                  />
                                  {opt.text}
                                </div>
                              ))}
                          </div>
                          {!(i + 1 === list.length) && (
                            <hr style={{ marginBottom: "20px" }} />
                          )}
                        </div>
                      );
                    })}
                </div>
                <div className={classes.footer}>
                  <div className="text-center pt-5">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-primary btn-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </Paper>
        </div>
      </section>
    </div>
  );
};
export default AddAssessment;
