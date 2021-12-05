import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { getOrcamentoAll, getManipuladoAll } from '../../utils/api';
import ItemArquivo from './ItemArquivo/ItemArquivo';
import Orcamento from '../Orcamento/Orcamento';
import Manipulado from '../Manipulado/Manipulado';
import { styles } from './styles';

const useStyles = makeStyles((theme) => styles);

const Arquivo = () => {
    const classes = useStyles();

    const [toggleManip, setToggleManip] = useState(true);
    const [editing, setEditing] = useState(false);
    const [orcamentos, setOrcamentos] = useState([]);
    const [loadedOrcamento, setLoadedOrcamento] = useState({});
    const [manipulados, setManipulados] = useState([]);
    const [loadedManipulado, setLoadedManipulado] = useState({});

    useEffect(() => {
        const getOrcamentos = async () => {
            const orcamentosData = await getOrcamentoAll();
            setOrcamentos(orcamentosData);
        };
        const getManipulados = async () => {
            const manipuladosData = await getManipuladoAll();
            setManipulados(manipuladosData);
        };
        toggleManip ? getManipulados() : getOrcamentos();
    }, [editing, toggleManip, setManipulados, setOrcamentos]);

    const handleChangeToggle = () => {
        setToggleManip(!toggleManip);
    };

    return (
        <Grid
            className={classes.gridContainer}
            container
            direction={'column'}
            spacing={1}
        >
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Orçamento</Grid>
                <Grid item>
                    <Switch
                        checked={toggleManip} // relevant state for your case
                        onChange={handleChangeToggle} // relevant method to handle your change
                        value="Orçamento" // some value you need
                    />
                </Grid>
                <Grid item>Manipulado</Grid>
            </Grid>

            {editing ? (
                <>
                    {toggleManip ? (
                        <Manipulado
                            loadedManipulado={loadedManipulado}
                            editing={editing}
                        />
                    ) : (
                        <Orcamento
                            loadedOrcamento={loadedOrcamento}
                            editing={editing}
                        />
                    )}
                </>
            ) : (
                <ItemArquivo
                    toggleManip={toggleManip}
                    manipulados={manipulados}
                    orcamentos={orcamentos}
                    setManipulados={setManipulados}
                    setOrcamentos={setOrcamentos}
                    setLoadedManipulado={setLoadedManipulado}
                    setLoadedOrcamento={setLoadedOrcamento}
                    setEditing={setEditing}
                />
            )}
        </Grid>
    );
};

export default Arquivo;
