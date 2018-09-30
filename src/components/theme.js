import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

export default createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink
    },

    typography: {
        // Use the system font instead of the default Roboto font.
    },

    overrides: {
        MuiDrawer: {
            paperAnchorDockedLeft: {
                borderRight: 'none'
            },
        },
    }
});