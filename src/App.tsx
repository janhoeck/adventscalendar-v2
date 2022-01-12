import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import footerImage from './assets/images/footer.png';
import { CalendarView } from './views/calendar/CalendarView';
import DayView from './views/day/DayView';

const useStyles = makeStyles<Theme>(
    (theme) => ({
        root: {
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            height: 'auto',
            textAlign: 'center',
        },
        headline: {
            fontFamily: 'ReindeerChristmas',
            fontSize: '4rem',
        },
        content: {
            flex: 1,
            overflow: 'auto',
        },
        innerContent: {
            padding: `${theme.spacing(3)}px 5vw`,
            maxWidth: 1600,
            margin: '0 auto',
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(2),
            },
        },
        footer: {
            height: '20vh',
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${footerImage})`,
            backgroundPosition: 'center',
        },
    }),
    { name: 'App' }
);

export const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.headline} color='textPrimary'>
                    (Adventskalender)
                </Typography>
            </div>
            <div className={classes.content}>
                <div className={classes.innerContent}>
                    <Switch>
                        <Route exact path='/' render={() => <CalendarView />} />
                        <Route exact path='/day/:day' render={() => <DayView />} />
                    </Switch>
                </div>
            </div>
            <div className={classes.footer} />
        </div>
    );
};
