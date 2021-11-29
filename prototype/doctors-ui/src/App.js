import { Fragment, React } from "react";
import "./App.css";

import UploadImages from "./components/file-upload-component";
import HorizontalNonLinearStepper from "./components/top-menu.component";

import { StepContextProvider } from "./context/StepContext";
import StagesOverview from "./components/stages-overview.component"

function App() {

  const stageElements = [<UploadImages />, <h1>TODO Preview</h1>, <h1>TODO Analysis</h1>, <h1>TODO Report</h1>]
  const stageNames = [
    'Upload Image',
    'Preview Image',
    'Analysis',
    'Report',
  ];


  return (
    <StepContextProvider>
      <div className="container">
        <Fragment>
          <HorizontalNonLinearStepper stageNames={ stageNames}/>
          <div className="content">
            <StagesOverview stages={stageElements} />
          </div>
        </Fragment>
      </div>
    </StepContextProvider>
  );
}

export default App;