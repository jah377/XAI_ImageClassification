import { React, createContext, useState } from "react";

const StepContext = createContext([{}, () => ({})]);

const StepContextProvider = (props) => {
    const [state, setState] = useState({ step: 0});
    return (
        <StepContext.Provider value={[state, setState]}>
            {props.children}
        </StepContext.Provider>
    );
};

export { StepContext, StepContextProvider };