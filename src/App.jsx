import React from 'react';
import './App.css';
import processImage from "./proccessImage";
import verifyFaces from "./verify";
import WebcamJS from "./WebcamJS";
import getPersonIdByUPN from "./getFaceIdByUPN";

const App = () => {
    let Webcam = new WebcamJS().getWebcam();
    let personalNumber;
    const [currPhoto, setCurrPhoto] = React.useState({
        base64: "",
        faceId: "",
        upn: ""
    });

    React.useEffect(() => {
        Webcam.set({
            width: 320,
            height: 240,
            image_format: 'jpg',
        });
        Webcam.attach('#my_camera');

        personalNumber = document.getElementById("peronalNumber");
        personalNumber.focus();
        personalNumber.addEventListener("change", handlePersonalNumberChange);
        personalNumber.addEventListener("focusout", focusPersonalNumber);
    }, []);

    const take_snapshot = () => {
        // take snapshot and get image data
        Webcam.snap(function (data_uri) {
            // display results in page
            setCurrPhoto({
                ...currPhoto,
                base64 : data_uri
            });
            // currPhoto.base64 = data_uri
            // document.getElementById('results').innerHTML =
            //     '<img id="imageprev" src="'+data_uri+'"/>';
        });
    }

    const handlePersonalNumberChange = (evt) => {
        const personalNumberFullStr = evt.target.value;
        if (personalNumberFullStr && personalNumberFullStr.length > 14) {
            const personalNumberStr = personalNumberFullStr.slice(7, 14);
            evt.target.value = personalNumberStr;
            setCurrPhoto({
                ...currPhoto,
                upn : personalNumberStr
            });
            // currPhoto.upn = personalNumberStr;

            setTimeout(async () => {
                take_snapshot();
                const faceId = await processImage(currPhoto, setCurrPhoto);
                const personId = await getPersonIdByUPN(personalNumberStr)
                const isVerify = await verifyFaces(faceId, personId);
                const backgroundColor = isVerify ? "#7be655" : "#f35858";
                document.body.style.backgroundColor = backgroundColor;

                evt.target.value = "";
            }, 2000)

            return;
        }
        evt.target.value = "";
        alert("AGAIN");
    }

    const focusPersonalNumber = () => {
        personalNumber.focus();
    }

    return (

        <center style={{direction: "rtl" }}>
            מספר אישי:
            <input type="text"
                   name="peronalNumber"
                   id="peronalNumber"/>

            <br/><br/>
            <div id="my_camera"></div>
        </center>
    )
}

export default App;
