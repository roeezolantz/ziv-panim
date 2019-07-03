import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Camera, { Webcam } from './Camera';
import addNewPerson from '../services/addNewPerson';
import addFaceToPerson from '../services/addFaceToPerson';

const AddNewPerson = () => {

    const [ soldierName, setSoldierName ] = useState("");
    const [ ID, setID ] = useState("");
    const [ error, setError ] = useState({
        soldierName: false,
        ID: false
    });
    const [ isFirstTime, setIsFirstTime ] = useState(false)

    const handleOnClick = async () => {
        setIsFirstTime(false)
        Webcam.snap(async function (data_uri) {
            const personId = await addNewPerson(soldierName, ID);
            await addFaceToPerson(personId, data_uri);
            alert('added')
        });
    }

    React.useEffect(() => {
        let soldierNameError = false;
        let IDError = false;
        if (soldierName.length < 2)
            soldierNameError = true;
        try {
            let numericId = parseInt(ID);
            if (!numericId || numericId < 100000 || numericId > 99999999)
                IDError = true;
        } catch (ex) {
            IDError = true;
        }
        if (!isFirstTime) {
            console.log("soldierNameError", soldierNameError, "IDError", IDError)
            setError({
                soldierName: soldierNameError,
                ID: IDError
            })
        }
        setIsFirstTime(false)
    }, [soldierName, ID])

    return (
        <div dir="rtl" style={{ marginTop: '100px' }}>
            <b>ברוך הבא!</b>
            <Camera onShootCallback />
            <br></br>
            <p>* נא להסתכל למצלמה ולא להיות מוזרים</p>
            <TextField
                error={error.soldierName}
                id="outlined-name"
                label="שם"
                value={soldierName}
                onChange={e => setSoldierName(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="בלי חארטות.."
            />
            <TextField
                error={error.ID}
                id="outlined-name"
                label="מספר אישי"
                value={ID}
                onChange={e => setID(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="בלי s יא חביבי"
                style={{marginRight: "1em"}}
            />
            <div style={{marginTop: '1em'}}>
                <Button variant="contained" color="primary" onClick={handleOnClick}>
                    זכור אותי!
                </Button>
            </div>
        </div>
    )
}

export default AddNewPerson;
