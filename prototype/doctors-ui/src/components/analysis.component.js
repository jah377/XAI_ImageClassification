import React, { useContext, useEffect } from "react";
import { StepContext } from "../context/StepContext";
import { render } from "@testing-library/react";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AnalysisDisplayService from "../services/analysis.service";
import FileUploadService from "../services/file-upload-service";

export default function Analysis(props) {

    let prefixImage = "data:image/png;base64" // necessary to decode the base64 string and display an actual image

    let layerStyle = { // base style for layered images
        "opacity": 1,
        "display": "block"
    }

    let setResponse = (response) => {
        let layers = response.explanations
        console.log(response)
        // enhancing the images with information needed in the frontend (active, style for opacity)
        layers = layers.map(layer => {
            return {
                ...layer,
                "active": true,
                "style": layerStyle,
                "image": `${prefixImage}, ${layer.image}`
            }
        })
        setValue({ "layers": layers, "baseImage": response.baseImage})
    }

    const [context, setContext] = useContext(StepContext);
    const [value, setValue] = React.useState({
        "layers": []
    });

    // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
    useEffect(() => {
            console.log("Fetching Analysis")
            AnalysisDisplayService.fetchData(context['uploadId'], setResponse)
    }, [])

    const handleOpacity = (newOpacity, layer) => {
        let copyLayer = layer
        let copyLayers = value.layers
        let index = copyLayers.indexOf(copyLayer)

        copyLayer.style = { ...copyLayer.style, "opacity": newOpacity }
        copyLayers[index] = copyLayer
        setValue({ ...value, "layers": copyLayers })
    };

    const toggleVisibility = (checked, layer) => {
        let copyLayer = layer
        let copyLayers = value.layers
        let index = copyLayers.indexOf(copyLayer)

        if (copyLayer.active)
            copyLayer.style = { ...copyLayer.style, "display": "none" }
        else
            copyLayer.style = { ...copyLayer.style, "display": "block" }
        copyLayer.active = checked
        copyLayers[index] = copyLayer
        setValue({ ...value, "layers": copyLayers })
    }

    render()
    return (
        <div>
            <h1>Analysis</h1>
            <Box className="analysis-view">
                <Box id="layers">
                    {value.layers.map((layer, index) => { // iterating through all images and displaying them
                        return <img className="layer" key={`image-layer-${index}`} src={layer.image} style={layer.style} />
                    })}
                    {value.baseImage && value.baseImage.image && (
                        <img className="baseImage" key="baseImage" src={`${prefixImage}, ${value.baseImage.image}`} />
                    )}
                </Box>
                <Box id="sliders">
                    {value.layers.map((layer, index) => { // iterating through all images and displaying their name and editing functions (slider)
                        return <Paper className="editing-container" >
                            <Typography key={`slider-name-${index}`} id={`slider-name-${index}`} gutterBottom>
                                {layer.name}
                            </Typography>
                            <Box className="editing-functions">
                                <Checkbox
                                    key={`checkbox-image-${index}`}
                                    onChange={(_, checked) => toggleVisibility(checked, layer)}
                                    checked={layer.active}
                                    icon={<VisibilityOffIcon />}
                                    checkedIcon={<VisibilityIcon />} />
                                <Slider
                                    className="slider"
                                    key={`slider-image-${index}`} // unique key, since we are iterating through an array
                                    aria-labelledby={`slider-name-${index}`} // making the connection between Label (typography and the slider)
                                    onChange={(_, opacity) => { handleOpacity(opacity, layer) }} // change-handler (updating and rerendering images with new opacity)
                                    min={0}
                                    step={0.01}
                                    max={1}
                                    value={layer.style.opacity} // the value (opacity) we are manipulation with this slider
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        </Paper>
                    }
                    )}
                </Box>
            </Box   >
        </div>
    );
}
