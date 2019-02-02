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
        useNextVariants: true,
        fontFamily: 'Roboto'
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
        MuiFormControl: {
            root: {
                minWidth: '210px'
            }
        },
        MuiInput:{
            root: {
                width: '220px'
            }
        }
    }
});

// AIzaSyBaxeLcr4CO3PoiJ3yDTWBoG8xmiAdmnG8