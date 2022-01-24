import React, { useEffect } from "react";

import { Button, Stack } from "@mui/material";

import PDFReport from "./pdf-report.component";
import SourceCodeProRegular from "../fonts/Source_Code_Pro/SourceCodePro-Regular.ttf"
import { StepContext } from "../context/StepContext";
import SplitButton from "./buttons/dropdown-button.component";

import {
    StyleSheet,
    Font,
    PDFViewer,
    PDFDownloadLink,
} from "@react-pdf/renderer";

export default function Report() {

    const [context] = React.useContext(StepContext)

    const styles = StyleSheet.create({
        viewer: {
            width: window.innerWidth * 0.5, //the pdf viewer will take up all of the width and height
            height: window.innerHeight * 0.8,
            fontFamily: "SourceCodePro",
            fontWeight: "normal",
            fontStyle: "normal",
            fontSize: 14
        },
        downloadButton: {
            textDecoration: "inherit",
            color: "white"
        }
    })

    const pdfStyles = StyleSheet.create({
        page: {
            // fontFamily: "SourceCodePro",
            // fontWeight: "normal",
            // fontStyle: "normal",
            fontSize: 14,
        },
        pageLayout: {
            paddingVertical: "5%",
            paddingHorizontal: "7%"
        },

        section: {
            margin: 10,
            padding: 10,
        },
        description: {
            fontSize: 9,
            color: "grey"
        },

        header1: {
            fontSize: "20",
            textAlign: "left",
            paddingBottom: "3%",
        },

        header2: {
            fontSize: "19",
            textAlign: "left",
            paddingBottom: "3%",
        },

        headerDescription: {
            fontSize: 9,
            color: "lightgrey"
        },

        patientInformationHeader: {
            color: "white",
            backgroundColor: "#1976d2",
            flexDirection: "row",
            justifyContent: "space-between",

            element: {
                padding: "4%"
            }
        },

        patientInformation: {
            paddingVertical: "2%",
            // paddingHorizontal: "5%",
            textAlign: "justify"
        },

        sideBySide: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignContent: "stretch",

        },

        notes: {
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "space-evenly",
        },

        elementListing: {
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "space-evenly",
            borderRadius: "5px",
            border: "1px solid #A7A7A7;",
            marginHorizontal: "5%",

            child: {
                marginHorizontal: "10%",
                marginTop: "2%",
                marginBottom: "2%",
                justifyContent: "center",
                alignItems: "center"
            }
        },

        klScoreContainer: {
            marginHorizontal: "5%",
            marginVertical: "2%",

            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2%",
            borderRadius: "5px",
            border: "1px solid #A7A7A7;",
            width: "auto"
        },

        klScore: {
            fontWeight: "bold",
            fontSize: 25,
            marginTop: "0.5%",
        },

        klScoreDescription: {
            paddingLeft: "5%",
            paddingTop: "5%",
            fontSize: 9,
            color: "grey"
        },

        images: {
            padding: "5%",
            flexDirection: "row",
            justifyContent: "space-around"
        },

    })

    useEffect(() => {
        Font.register({
            family: "SourceCodePro",
            format: "truetype",
            src: SourceCodeProRegular,
            fontStyle: "normal",
            fontWeight: "normal"
        })
    }, [])

    const patientNotes = {
        "appointmentDate": "2022-01-23",
        "firstName": "Katrin",
        "lastName": "Grunert",
        "dateOfBirth": "1995-04-13",
        "physicianName": "Dr. Geralt",
        "medicalNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }

    const report = <PDFReport styles={pdfStyles} content={context} />

    return (
        <div className="reportContainer">
            <Stack className="report" flexDirection="row" alignItems="center" justifyContent="space-between">
                {/* TODO make this a button group and go back to each individual step */}
                <SplitButton />
                <h1>Preview</h1>
                <PDFDownloadLink style={styles.downloadButton} document={report} fileName={`${patientNotes.appointmentDate}_${patientNotes.lastName}_${patientNotes.firstName}`}>
                    {({ blob, url, loading, error }) => <Button variant="contained">Download Report</Button>}
                </PDFDownloadLink>
            </Stack>
            <PDFViewer showToolbar={true} style={styles.viewer}>
                {report}
            </PDFViewer>
        </div>
    )
}