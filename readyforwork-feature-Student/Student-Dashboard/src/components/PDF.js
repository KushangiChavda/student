import React from "react";

import Pdf from "react-to-pdf";
import Temp from "../pages/Profile/Temp";

const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      <div>
        <Pdf targetRef={ref} filename="div-blue.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Resume</button>}
        </Pdf>
        <div
          style={{ width: 500, height: 500 }}
          ref={ref}
        />

<p>dfdsfd</p>hellllllo
        {/* <Temp/> */}
      </div>
    </>
  );
};
export default PDF;