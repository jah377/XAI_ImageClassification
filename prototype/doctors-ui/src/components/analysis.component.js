import React, { useContext, useEffect } from "react";
import { StepContext } from "../context/StepContext";
import { render } from "@testing-library/react";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import AnalysisDisplayService from "../services/analysis.service";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Card, Tooltip } from "@mui/material";

export default function Analysis(props) {

    let prefixImage = "data:image/png;base64" // necessary to decode the base64 string and display an actual image


    let setResponse = (response) => {
        let layers = response.explanations
        // enhancing the images with information needed in the frontend (active, style for opacity)
        layers = layers.map(layer => {
            return {
                ...layer,
                "active": true,
                "style": { // base style for layered images
                    "opacity": layer.name === "Heatmap" ? 0.3 : 1.0,
                    "display": "block"
                },
                "image": `${prefixImage}, ${layer.image}`
            }
        })

        setValue({
            ...value,
            "layers": layers,
            "selectedLayerIndex": 0,
            "baseImage": response.baseImage,
            "klScore": response.klScore,
            "loading": false
        })
    }

    const [context, setContext] = useContext(StepContext);
    const [value, setValue] = React.useState({
        "layers": [],
        "loading": false
    });

    // useEffect is being run before and after each render of the site, to limit the API call only to when no data is in the frontend, the if-clause is introduced
    useEffect(() => {
        if (value.layers.length == 0) {
            setValue({ ...value, loading: true })
            // AnalysisDisplayService.fetchData(context['uploadId'], setResponse)
            AnalysisDisplayService.fetchData("test", setResponse)
        }
    })

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

    const selectExplanationLayer = (event) => {
        setValue({ ...value, "selectedLayerIndex": event.target.value })
    }

    return (
        <div>
            <h1>Analysis</h1>
            {value.loading && (
                <Stack spacing={1}>
                    {/* <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    <Skeleton animation="wave" variant="text" /> */}
                    {/* <CircularProgress /> */}
                    <Skeleton animation="wave" variant="rectangular" width={224} height={224} />
                    <Skeleton animation="wave" variant="rectangular" width={228} height={75} />
                    <Skeleton animation="wave" variant="rectangular" width={228} height={75} />
                    <Skeleton animation="wave" variant="rectangular" width={228} height={75} />
                </Stack>
            )}
            {!value.loading && (
                <Box className="analysis-view">
                    <Box id="layers">
                        {value.baseImage && value.baseImage.image && (
                            <img className="layer baseImage" key="baseImage" src={`${prefixImage}, ${value.baseImage.image}`} />
                        )}
                        {value.layers.length > 0 && value.layers[value.selectedLayerIndex].description && value.layers[value.selectedLayerIndex].description !== "" &&
                            <Tooltip title={value.layers[value.selectedLayerIndex].description}>
                                <img className="layer" src={value.layers[value.selectedLayerIndex].image} style={value.layers[value.selectedLayerIndex].style} />
                            </Tooltip>
                        }
                        {value.layers.length > 0 && (!value.layers[value.selectedLayerIndex].description || value.layers[value.selectedLayerIndex].description === "") &&
                            <img className="layer" src={value.layers[value.selectedLayerIndex].image} style={value.layers[value.selectedLayerIndex].style} />
                        }
                    </Box>
                    <Box id="sliders">
                        {value.layers.length > 0 &&
                            <Box>
                                <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
                                    <Tooltip title={
                                        <React.Fragment>
                                            <Typography color="inherit">Predicted KL Score</Typography>
                                            This is the KL score that the smart assistant calculated when assessing the XRay image
                                        </React.Fragment>
                                    }>
                                        <Card className="klScoreCard">
                                            <h2>KL Sore</h2>
                                            <h2>{value.klScore}</h2>
                                        </Card>
                                    </Tooltip>
                                    <Box>
                                        <FormControl sx={{ width: 250 }}>
                                            <InputLabel id="demo-simple-select-label">Explanation</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={value.selectedLayerIndex}
                                                label="Explanations"
                                                onChange={selectExplanationLayer}
                                            >
                                                {value.layers.map((layer, index) => {
                                                    return <MenuItem key={`select-explanation-${index}`} value={index}> {layer.name} </MenuItem>
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                        <Box className="editing-functions">
                                            <Checkbox
                                                onChange={(_, checked) => toggleVisibility(checked, value.layers[value.selectedLayerIndex])}
                                                checked={value.layers[value.selectedLayerIndex].active}
                                                icon={<VisibilityOffIcon />}
                                                checkedIcon={<VisibilityIcon />} />
                                            <Slider
                                                className="slider"
                                                onChange={(_, opacity) => { handleOpacity(opacity, value.layers[value.selectedLayerIndex]) }} // change-handler (updating and rerendering images with new opacity)
                                                min={0}
                                                step={0.01}
                                                max={1}
                                                value={value.layers[value.selectedLayerIndex].style.opacity} // the value (opacity) we are manipulation with this slider
                                                valueLabelDisplay="auto"
                                            />
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        }
                    </Box>
                </Box >
            )}
        </div>
    );
}
