import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import nextId from 'react-id-generator';

import FATORES from '../../data/fatores.json';
import { styles } from './styles.js';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const useStyles = makeStyles((theme) => styles);

const MateriasPrimas = ({ fatores, materiasPrimas, setMateriasPrimas }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [materiaPrima, setMateriaPrima] = useState({
        id: '',
        nome: '',
        preco: '',
        qtd: '',
        fator: '',
        valor: ''
    });
    const [removeConfirmDialogOpen, setRemoveConfirmDialogOpen] = useState(
        false
    );
    const [editConfirmDialogOpen, setEditConfirmDialogOpen] = useState(false);

    let materiasPrimasAfterRemove = [];

    const resetMateriaPrimaValues = () => {
        setMateriaPrima({
            id: '',
            nome: '',
            preco: '',
            qtd: '',
            fator: '',
            valor: ''
        });
    };

    const handleSelectChange = (event) => {
        setMateriaPrima({
            ...materiaPrima,
            fator: event.target.value
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleMateriaPrimaAdd = () => {
        setMateriasPrimas([
            ...materiasPrimas,
            { ...materiaPrima, id: nextId(), valor: calculateValor() }
        ]);
        resetMateriaPrimaValues();
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setMateriaPrima({
            ...materiaPrima,
            [event.target.name]: value
        });
    };

    const handleRemoveItem = (i) => {
        materiasPrimasAfterRemove = materiasPrimas.filter(
            (element) => element.id !== i
        );
        setRemoveConfirmDialogOpen(true);
    };

    const handleEditItem = (i) => {
        const [matPrim] = materiasPrimas.filter((element) => element.id === i);
        setMateriaPrima(matPrim);
        setEditForm(true);
    };

    const handleEditSave = () => {
        setEditConfirmDialogOpen(true);
    };

    const handleEditCancel = () => {
        setEditForm(false);
    };

    const removeMateriaPrima = (i) => {
        setMateriasPrimas(materiasPrimasAfterRemove);
        setRemoveConfirmDialogOpen(false);
        materiasPrimasAfterRemove = [];
    };

    const updateMateriaPrima = (i) => {
        const newMateriasPrimas = materiasPrimas.filter(
            (element) => element.id !== materiaPrima.id
        );
        setMateriasPrimas([...newMateriasPrimas, materiaPrima]);
        setEditForm(false);
        resetMateriaPrimaValues();
        setEditConfirmDialogOpen(false);
    };

    const calculateValor = () => {
        const valor = parseFloat(materiaPrima.preco * materiaPrima.qtd).toFixed(
            2
        );
        return valor;
    };

    return (
        <>
            <div
                className="materiasPrimasFormControl"
                onChange={handleInputChange}
            >
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Matérias Primas</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nome-mat-prim"
                            name="nome"
                            label="Nome"
                            type="text"
                            value={materiaPrima.nome}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="preco-mat-prim"
                            name="preco"
                            label="Preço"
                            type="number"
                            value={materiaPrima.preco}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="quantidade-mat-prim"
                            name="qtd"
                            label="Quantidade"
                            type="number"
                            value={materiaPrima.qtd}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <FormControl
                            className={(classes.formControl, classes.textInput)}
                        >
                            <InputLabel id="fator-select-label">
                                Unidade
                            </InputLabel>
                            <Select
                                labelId="fator-select-label"
                                name="fator"
                                id="fator-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={materiaPrima.fator}
                                onChange={handleSelectChange}
                                required
                            >
                                {Object.keys(FATORES).map((fator) => {
                                    return (
                                        <MenuItem value={fator} key={fator}>
                                            {fator}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.button}>
                        {editForm ? (
                            <>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={handleEditSave}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={handleEditCancel}
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleMateriaPrimaAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>

            <div className={classes.cardsContainer}>
                {materiasPrimas.map((matPrim) => {
                    return (
                        <Card className={classes.cards} key={matPrim.id}>
                            <CardContent>
                                <Typography variant="h5" component="h1">
                                    <span>Nome:</span> {matPrim.nome}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Preço:</span> {matPrim.preco}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Qt.:</span> {matPrim.qtd}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Fator:</span> {matPrim.fator}
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    <span>Valor:</span> {matPrim.valor}
                                </Typography>
                            </CardContent>
                            <div className={classes.cardsIcons}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => handleEditItem(matPrim.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(matPrim.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    );
                })}
                <>
                    <ConfirmDialog
                        title="Editar Matéria Prima"
                        open={editConfirmDialogOpen}
                        setOpen={setEditConfirmDialogOpen}
                        onConfirm={updateMateriaPrima}
                    >
                        Tem a certeza que deseja editar a matéria prima?
                    </ConfirmDialog>
                    <ConfirmDialog
                        title="Remover Matéria Prima"
                        open={removeConfirmDialogOpen}
                        setOpen={setRemoveConfirmDialogOpen}
                        onConfirm={removeMateriaPrima}
                    >
                        Tem a certeza que deseja remover a matéria prima?
                    </ConfirmDialog>
                </>
            </div>
        </>
    );
};

export default MateriasPrimas;
