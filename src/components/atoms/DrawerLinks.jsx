import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import TimelineIcon from '@material-ui/icons/Timeline';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class DrawerLinks extends React.Component {
    render() {
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <List subheader={<ListSubheader> Menu </ListSubheader>}>
                    <ListItem button component={Link} to='/calendar/reservation'>
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary='Calendrier' />
                    </ListItem>
                    <ListItem button component={Link} to='/calendar/trips'>
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary='Voyages' />
                    </ListItem>
                </List>
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(DrawerLinks);
