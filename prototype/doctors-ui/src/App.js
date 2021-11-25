import React from "react";
import "./App.css";

import UploadImages from "./components/file-upload-component";
import HorizontalNonLinearStepper from "./components/top-menu.component";

function App() {

  const stepElements = [<UploadImages />, <h1>TODO Preview</h1>, <h1>TODO Analysis</h1>, <h1>TODO Report</h1>]


// TODO look up contexts/ useContext 
  return (
    <div className="container">
      <HorizontalNonLinearStepper/>
      <div className="content">
        <UploadImages />
      </div>
    </div>
  );
}

export default App;