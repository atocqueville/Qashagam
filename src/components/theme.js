import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#e53935',
        }
    },

    typography: {
        fontFamily: 'Roboto',
        display2: {
            fontSize: '1rem',
            textTransform: 'capitalize'
        },
        display3: {
            fontSize: '1.5rem'
        },
        display4: {
            fontSize: '2rem',
            color: '#000'
        }
    },

    overrides: {
        MuiDrawer: {
            paperAnchorDockedLeft: {
                borderRight: 'none'
            },
        },
        MuiDialogActions: {
            root: {
                justifyContent: 'space-between'
            }
        },
        MuiInput:{
            root: {
                width: '220px'
            }
        }
    }
});