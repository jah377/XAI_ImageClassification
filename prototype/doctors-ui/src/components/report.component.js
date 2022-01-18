import React, { useEffect } from "react";

import { Button, Card } from "@mui/material";
import PDFReport from "./pdf-report.component";
import SourceCodeProRegular from "../fonts/Source_Code_Pro/SourceCodePro-Regular.ttf"

import {
    StyleSheet,
    Font,
    PDFViewer,
    PDFDownloadLink,
} from "@react-pdf/renderer";

export default function Report() {

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
            fontFamily: "SourceCodePro",
            // fontWeight: "normal",
            // fontStyle: "normal",
            fontSize: 14,
        },
        section: {
            margin: 10,
            padding: 10,
        },
        description: {
            fontSize: 9,
            color: "grey"
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
            padding: "5%",
            textAlign: "justify"
        },

        doctorsEvaluation: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },

        xRayNotes: {
            // padding: "5%",
            flexDirection: "row",
            justifyContent: "space-around",
            borderRadius: "5px",
            border: "1px solid #A7A7A7;",

            child: {
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "2%",
                marginBottom: "2%",
            }
        },

        physicianKlScore: {
            marginTop: "2%",
            marginBottom: "2%",
            // backgroundColor: "lightgrey",
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
            marginTop: "0.5%"
        },

        smartAssistantPage: {
            header: {
                paddingTop: "3%",
                paddingLeft: "5%",
                fontSize: "20"
            }
        },

        klScoreContainer: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },

        baseImage: {
            width: 224,
            height: 224
        },

        images: {
            padding: "5%",
            flexDirection: "row",
            justifyContent: "space-around"
        },

        overlay: {
            width: 224,
            height: 224,
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0.3
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

    return (
        <div className="reportContainer">
            <h1>Report Preview</h1>
            <Button variant="contained">Go back</Button>
            <Button variant="contained">
                <PDFDownloadLink style={styles.downloadButton} document={<PDFReport styles={pdfStyles} />} fileName={`${patientNotes.appointmentDate}_${patientNotes.lastName}_${patientNotes.firstName}`}>
                    {_ => "Download Report"}
                </PDFDownloadLink>
            </Button>
            <div>
                {/* <PDFDownloadLink document={<PDFReport />} fileName={`${patientNotes.appointmentDate}_${patientNotes.lastName}_${patientNotes.firstName}`} /> */}
                <PDFViewer showToolbar={true} style={styles.viewer}>
                    <PDFReport styles={pdfStyles} />
                </PDFViewer>
            </div>
        </div>
    )
}