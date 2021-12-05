import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    AppBar,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PageviewIcon from '@material-ui/icons/Pageview';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Home, Orcamento, Manipulado, Arquivo } from '../../components';
import './Navigator.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

const onClickHandler = () => {
    console.log('clicked!');
};

export default function ClippedDrawer() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Manipulados
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem
                                button
                                onClick={onClickHandler}
                                component={Link}
                                to={'/'}
                            >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Início" />
                            </ListItem>
                            <ListItem
                                button
                                onClick={onClickHandler}
                                component={Link}
                                to={'/orcamento'}
                            >
                                <ListItemIcon>
                                    <VisibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Orçamento" />
                            </ListItem>
                            <ListItem
                                button
                                onClick={onClickHandler}
                                component={Link}
                                to={'/manipulado'}
                            >
                                <ListItemIcon>
                                    <ReceiptIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manipulado" />
                            </ListItem>
                            <ListItem
                                button
                                onClick={onClickHandler}
                                component={Link}
                                to={'/arquivo'}
                            >
                                <ListItemIcon>
                                    <PageviewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Arquivo" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Route path="/" exact component={Home} />
                    <Route path="/orcamento" exact component={Orcamento} />
                    <Route path="/manipulado" exact component={Manipulado} />
                    <Route path="/arquivo" exact component={Arquivo} />
                </main>
            </div>
        </Router>
    );
}
