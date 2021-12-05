import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import almofariz from '../../assets/images/almofariz.jpg';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop: '2rem'
    }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <Grid
            className={classes.gridContainer}
            container
            direction={'column'}
            spacing={1}
        >
            <Grid item>
                <Typography variant="h4">Manipulados</Typography>
            </Grid>
            <Grid item>
                <img src={almofariz} alt="Almofariz"></img>
            </Grid>
            <Grid item>
                <Typography color="textSecondary" gutterBottom>
                    Escolha a opção no menu do lado esquerdo para começar!
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Home;
