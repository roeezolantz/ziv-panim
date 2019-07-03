import React from 'react';
import './App.css';
import AddNewPerson from "./components/AddNewPerson";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import RTL from './components/rtl';

const theme = createMuiTheme({
    direction: 'rtl',
});

const App = () => {
    return (
        // <RTL>
            <center style={{direction: "rtl" }}>
                <ThemeProvider theme={theme}>
                    <AddNewPerson></AddNewPerson>
                </ThemeProvider>
            </center>
        // </RTL>
    )
}

export default App;
