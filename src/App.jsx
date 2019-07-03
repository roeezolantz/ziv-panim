import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './App.css';
import processImage from "./proccessImage";
import verifyFaces from "./verify";
import WebcamJS from "./WebcamJS";
import getPersonIdByUPN from "./getFaceIdByUPN";
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import mazpen from "./Mazpenlogo.png";
import logo from "./logo.png";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {

    },
    title: {
        flexGrow: 1,
    },
    card: {
        width: "50%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const App = () => {
    let Webcam = new WebcamJS().getWebcam();
    let personalNumber;
    const [currPhoto, setCurrPhoto] = React.useState({
        base64: "",
        faceId: "",
        upn: ""
    });

    const [statusColor, setstatusColor] = React.useState("#ffc220");
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("אפשר להעביר חוגר עכשיו");

    React.useEffect(() => {
        Webcam.set({
            width: 320*1.8,
            height: 240*1.8,
            image_format: 'jpg',
        });
        Webcam.attach('#my_camera');

        personalNumber = document.getElementById("peronalNumber");
        personalNumber.focus();
        personalNumber.addEventListener("change", handlePersonalNumberChange);
        personalNumber.addEventListener("focusout", focusPersonalNumber);
        window.document.body.style.backgroundColor = "#f5f5f5";
        document.getElementById("my_camera").style.width = null;
    }, []);

    const take_snapshot = async () => {
        return new Promise((resolve, reject) => {

            // take snapshot and get image data
            Webcam.snap(function (data_uri) {
                // display results in page
                setCurrPhoto({
                    ...currPhoto,
                    base64: data_uri
                });

                resolve(data_uri);
                // currPhoto.base64 = data_uri
                // document.getElementById('results').innerHTML =
                //     '<img id="imageprev" src="'+data_uri+'"/>';
            });
        });
    }

    const handlePersonalNumberChange = async (evt) => {
        setIsLoading(true);
        setMessage("חוגר בבדיקה");

        const personalNumberFullStr = evt.target.value;
        if (personalNumberFullStr && personalNumberFullStr.length > 14) {
            const personalNumberStr = personalNumberFullStr.slice(7, 14);
            evt.target.value = personalNumberStr;
            setCurrPhoto({
                ...currPhoto,
                upn: personalNumberStr
            });

            const data_uri = await take_snapshot();
            const faceId = await processImage(data_uri, currPhoto, setCurrPhoto);
            const personId = await getPersonIdByUPN(personalNumberStr);
            const isVerify = await verifyFaces(faceId, personId);
            const backgroundColor = isVerify ? "#7be655" : "#f35858";

            setIsLoading(false);
            setMessage(isVerify ? "אפשר לעבור עכשיו, יום טוב" : "החוגר לא נקלט. ניתן לנסות שוב או לגשת לאחראי");

            document.body.style.backgroundColor = backgroundColor;
            setstatusColor(backgroundColor);
            evt.target.value = "";

            setTimeout(() => {
                document.body.style.backgroundColor = "#f5f5f5";
                setstatusColor("#ffc220");
                setMessage("אפשר להעביר חוגר עכשיו");
            }, 2000);

            return;
        }
        evt.target.value = "";
        setMessage("לא קלטנו את הכרטיס טוב. אפשר שוב?");
        setIsLoading(false);
    }

    const focusPersonalNumber = () => {
        personalNumber.focus();
    }

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        <img src={mazpen} alt="Logo" style = {{width:"4em", height:"4em"}}/>
                        <img src={logo} alt="Logo" style = {{width:"4em", height:"4em"}}/>
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{position: "absolute", top: "-100px"}}>
                מספר אישי:
                <input type="text"
                       name="peronalNumber"
                       id="peronalNumber"/>
            </div>

            <div style={{
                display: "flex",
                direction: "rtl",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%"
            }}>
                <div style={{display: "flex", justifyContent: "center",alignItems: "center", flexDirection: "row", marginTop: "3em"}}>
                    <Card className={classes.card}>
                        <CardContent>

                            <Typography variant="h5" component="h2">
                                <center>
                                    {message}
                                    {isLoading &&
                                    <CircularProgress style = {{marginRight:"1em"}}/>}
                                </center>
                            </Typography>

                        </CardContent>
                    </Card>
                </div>

                <div style={{flex: 1, display: "flex", justifyContent: "center", marginTop: "2em"}}>
                    <Card className={classes.card}>
                        <CardContent>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 0}}
                                 id="my_camera"></div>
                        </CardContent>
                    </Card>
                </div>
           </div>
        </div>

    )
}

export default App;
