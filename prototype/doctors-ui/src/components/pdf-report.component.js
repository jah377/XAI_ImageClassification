import React from "react";

import {
    Document,
    Page,
    Text,
    Image,
    View,
} from "@react-pdf/renderer";

export default function PDFReport(props) {

    const dateToString = (input) => {
        let date = input.toLocaleString("nl-NL").split(" ")[0]
        let a = date.split("-")
        let dd = a[0].padStart(2, '0')
        let mm = a[1].padStart(2, '0')
        let yyyy = a[2]
        return dd + '-' + mm + '-' + yyyy
    }

    const patientNotes = props.content.patientNotes
    const xRayNotes = props.content.xRayNotes

    patientNotes.appointmentDate = patientNotes.appointmentDate ? dateToString(patientNotes.appointmentDate) : ""
    patientNotes.dateOfBirth = patientNotes.dateOfBirth ? dateToString(patientNotes.dateOfBirth) : ""


    const styles = props.styles

    const images = props.content.images

    const explanations = images.explanations.filter(e => { return e.active })
    const klScores = props.content.klScores
    klScores.distributions = klScores.distributions.sort((k, l) => { return k.score - l.score })
    const visualization = props.content.klScores.visualization

    const klScore = props.content.klScore

    const patientInfoHeader = <View style={styles.patientInformationHeader} >
        <View style={styles.patientInformationHeader.element}>
            <Text style={styles.headerDescription}>Patient</Text>
            <Text>{patientNotes.lastName}, {patientNotes.firstName}</Text>
        </View>
        <View style={styles.patientInformationHeader.element}>
            <Text style={styles.headerDescription}>Date of Birth</Text>
            <Text>{patientNotes.dateOfBirth} </Text>
        </View>
        <View style={styles.patientInformationHeader.element}>
            <Text style={styles.headerDescription}>Appointment Date</Text>
            <Text>{patientNotes.appointmentDate} </Text>
        </View>
        <View style={styles.patientInformationHeader.element}>
            <Text style={styles.headerDescription}>Physician</Text>
            <Text>{patientNotes.physicianName} </Text>
        </View>
    </View >

    const header = <View style={{
        margin: "1%",
        paddingVertical: "2%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ECECEC",
        borderRadius: "5px",
        border: "1px solid #A7A7A7;"
    }}>
        <Text style={{ fontSize: 18 }}>Quin</Text>
        <Text>Stadhouderskade 55, 1072 AB Amsterdam</Text>
        <Text>+31 882 554 444</Text>
        <Text style={{ fontSize: 20, paddingTop: "2%" }}>Kellgren-Lawrence Score - Smart Assist Report</Text>

    </View>

    return (
        < Document title={`${patientNotes.appointmentDate}_${patientNotes.lastName}_${patientNotes.firstName}`
        } id={`${patientNotes.appointmentDate}_${patientNotes.lastName}_${patientNotes.firstName}`}>

            <Page
                size="A4"
                style={styles.page}
                wrap>

                {header}

                {/* PATIENT INFORMATION */}
                {patientInfoHeader}

                {/* XRAY NOTES */}
                <View style={styles.pageLayout}>
                    <Text style={styles.header1}>Clinician Evaluation</Text>

                    <View style={styles.sideBySide}>

                        <View style={styles.notes}>
                            <View style={styles.klScoreContainer}>
                                <Text style={styles.description}>Kellgren-Lawrence Score</Text>
                                <Text style={styles.klScore}>{xRayNotes.KL} </Text>
                            </View>

                            <View style={styles.elementListing}>
                                <View style={styles.elementListing.child}>
                                    <Text style={styles.description}>Osteophyte Formation</Text>
                                    <Text>{xRayNotes.osteophyte}</Text>
                                </View>

                                <View style={styles.elementListing.child}>
                                    <Text style={styles.description}>Joint Space Width</Text>
                                    <Text>{xRayNotes.jointSpace}</Text>
                                </View>

                                <View style={styles.elementListing.child}>
                                    <Text style={styles.description}>Subchondral Sclerosis</Text>
                                    <Text>{xRayNotes.sclerosis}</Text>
                                </View>

                                <View style={styles.elementListing.child}>
                                    <Text style={styles.description}>Deformation</Text>
                                    <Text>{xRayNotes.deformation}</Text>
                                </View>

                            </View>
                        </View>

                        <Image
                            style={{
                                width: images.baseImage.width,
                                height: images.baseImage.height
                            }}
                            src={`data:image/png;base64,${images.baseImage.image}`}
                        />
                    </View>

                    <View style={{
                        paddingTop: "5%"
                    }}>
                        <View style={styles.patientInformation}>
                            <Text style={styles.description}>Medical Notes</Text>
                            <Text>{patientNotes.medicalNotes}</Text>
                        </View>

                        <View style={styles.patientInformation} wrap={false}>
                            <Text style={styles.description}>X Ray Notes</Text>
                            <Text>{xRayNotes.notes} </Text>
                        </View>
                    </View>
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                {/* PATIENT INFORMATION */}
                {header}
                {patientInfoHeader}
                <View style={styles.pageLayout}>

                    <Text style={styles.header1}>Smart Assist Evaluation</Text>

                    <View>
                        <View style={styles.sideBySide}>

                            <View style={styles.notes}>
                                <View style={styles.klScoreContainer}>
                                    <Text style={styles.description}>Predicted Kellgren-Lawrence Score</Text>
                                    <Text style={styles.klScore}>{klScore} </Text>
                                </View>

                                <View style={styles.elementListing}>
                                    {klScores.distributions.map((dist, i) => {
                                        return <View key={`${i}-score-dist`} style={styles.elementListing.child}>
                                            <Text key={`${i}-score-dist-desc`} style={styles.description}>KL Score {dist.score}</Text>
                                            <Text key={`${i}-score-dist-text`}>{(dist.prob).toFixed(3)}% </Text>
                                        </View>
                                    })}
                                </View>

                            </View>

                            <View style={styles.notes}>
                                <Text style={styles.klScoreDescription}>Probability Distribution of KL Score</Text>
                                <Image
                                    style={{
                                        width: "90%"
                                    }}
                                    src={visualization}
                                />
                            </View>
                        </View>

                        <View style={styles.xray}>
                            <Text style={styles.description}>Analysis Notes</Text>
                            <Text>{xRayNotes.analysis_notes}</Text>
                        </View>


                    </View>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                {/* PATIENT INFORMATION */}
                {header}
                {patientInfoHeader}
                <View style={styles.pageLayout}>
                    <Text style={styles.header2}>Observations</Text>

                    {/* IMAGE DISPLAY */}
                    {explanations.map((explanation, index) => {
                        return <View
                            key={`{${index}_explanationsContainer}`}
                            style={styles.images}
                            wrap={false}>
                            <View key={`{${index}_baseImageContainer}`}>
                                <Text key={`{${index}_baseImageDescription}`} style={styles.description}>Original Image</Text>
                                <Image
                                    key={`{${index}_baseImage}`}
                                    style={{
                                        width: images.baseImage.width,
                                        height: images.baseImage.height
                                    }}
                                    src={`data:image/png;base64,${images.baseImage.image}`}
                                />
                            </View>
                            <View key={`{${index}_analysisContainer}`}>
                                <Text key={`{${index}_analysisDescription}`} style={styles.description}>Analysis - {explanation.name} </Text>
                                <View>
                                    <Image
                                        key={`{${index}_analysisBase}`}
                                        style={{
                                            width: images.baseImage.width,
                                            height: images.baseImage.height
                                        }}
                                        src={`data:image/png;base64,${images.baseImage.image}`}
                                    />
                                    <Image
                                        key={`{${index}_analysisOverlay}`}
                                        style={{
                                            opacity: explanation.style.opacity,
                                            width: explanation.width,
                                            height: explanation.height,
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                        }}
                                        src={explanation.image}
                                    />
                                </View>
                            </View>
                        </View>
                    })}
                </View>
            </Page>
        </Document >
    )
}