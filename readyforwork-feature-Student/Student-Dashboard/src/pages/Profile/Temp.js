import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { green } from "@material-ui/core/colors";
import api from "../../api";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
const initialState = {
  templateName: "Default",
};
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
const Temp = () => {
  const [templates, setTemplates] = useState([]);
  console.log("templates", templates);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const getTemplates = () => {
    api
      .get("/users/resume/templates")
      .then((res) => {
        let templatesData = res.data.templates
          // .filter(({ isDeleted }) => isDeleted === false)
          .map((u) => {
            return { select: false, id: u._id, ...u };
          });
        return setTemplates(templatesData);
      })

      .catch((err) => {
        console.log(err);
        return setTemplates([]);
      });
  };

  useEffect(getTemplates, []);
  const createData = (data) => {
    return api
      .post("/create-pdf", data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validator.current.allValid()) {
    //   validator.current.showMessages();
    //   return forceUpdate(update + 1);
    // }
    let payload = {
      templateName: "Default",
    };
    return createData(payload);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="container">
      <h5>Select Templates</h5>
      <div className="row">
        {templates &&
          templates.map((template, i) => (
            <div className="col-md-4">
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
                }}
              >
                <div
                  className="card card-body flex-fill"
                  onClick={handleSubmit}
                >
                  <img
                    className="img-fluid"
                    style={{ height: "350px" }}
                    src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
                  />
                </div>
              </div>
              <div className="text-center">
                <GreenRadio
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <p>{template?.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Temp;
