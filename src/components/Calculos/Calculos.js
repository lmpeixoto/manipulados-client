import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

import { styles } from './styles.js';
import {
    calcHonorarios,
    calcMateriasPrimasTotal,
    calcMateriaisEmbalagemTotal,
    calcOrcamentoTotal
} from '../../utils/calcs';

const useStyles = makeStyles((theme) => styles);

const Calculos = ({
    editing,
    formaFarmaceutica,
    setFormaFarmaceuticaPreco,
    materiasPrimas,
    setMateriasPrimasPreco,
    materiaisEmbalagem,
    setMateriaisEmbalagemPreco,
    quantidade,
    handleEditSaveButton,
    handleSaveButton,
    totais,
    setTotais,
    completed
}) => {
    useEffect(() => {
        const calculateTotals = async () => {
            if (
                formaFarmaceutica &&
                materiasPrimas &&
                materiaisEmbalagem &&
                quantidade
            ) {
                const matPrimTotal = calcMateriasPrimasTotal(materiasPrimas);
                setMateriasPrimasPreco(matPrimTotal);
                const matEmbTotal = calcMateriaisEmbalagemTotal(
                    materiaisEmbalagem
                );

                setMateriaisEmbalagemPreco(matEmbTotal);
                const calcHonorTotal = calcHonorarios(
                    formaFarmaceutica,
                    quantidade
                );

                setFormaFarmaceuticaPreco(calcHonorTotal);
                const orcamentoTotal = calcOrcamentoTotal(
                    calcHonorTotal,
                    matPrimTotal,
                    matEmbTotal
                );

                setTotais(orcamentoTotal);
            }
        };

        calculateTotals();
    }, [
        formaFarmaceutica,
        quantidade,
        materiasPrimas,
        materiaisEmbalagem,
        setFormaFarmaceuticaPreco,
        setMateriaisEmbalagemPreco,
        setMateriasPrimasPreco,
        setTotais
    ]);

    const classes = useStyles();

    return (
        <>
            {formaFarmaceutica &&
            materiasPrimas &&
            materiaisEmbalagem &&
            quantidade &&
            totais ? (
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Preço</Typography>
                    </Grid>
                    <Card className={classes.cards}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                <span>Preço:</span> {totais[0]}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                <span>IVA:</span> {totais[1]}
                            </Typography>
                        </CardContent>
                        <div className={classes.cardsIcons}>
                            {editing ? (
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    onClick={handleEditSaveButton}
                                >
                                    Atualizar <SaveIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    onClick={handleSaveButton}
                                    disabled={!completed}
                                >
                                    Guardar <SaveIcon />
                                </IconButton>
                            )}
                        </div>
                    </Card>
                </Grid>
            ) : null}
        </>
    );
};

export default Calculos;
