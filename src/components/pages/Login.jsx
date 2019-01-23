import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Login extends React.Component {
    render() {

        return(
            <div>
                <Typography> LOGIN PAGE </Typography>
                <Button variant='contained' color='primary' component={Link} to='/signup'> S'INSCRIRE </Button>
            </div>
        );
    }
}

export default Login;
