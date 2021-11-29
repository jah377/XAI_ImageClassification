import { React, useContext } from 'react';

import { StepContext } from "../context/StepContext"

export default function StagesOverview(props) {
    const [state, setState] = useContext(StepContext);

    const stages = props.stages

    return (
        <div>
            {stages[state.step]}
        </div>
    );
}