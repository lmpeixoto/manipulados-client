import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import nextId from 'react-id-generator';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { styles } from './styles.js';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const useStyles = makeStyles((theme) => styles);

const MateriaisEmbalagem = ({ materiaisEmbalagem, setMateriaisEmbalagem }) => {
    const classes = useStyles();

    const [editForm, setEditForm] = useState(false);
    const [materialEmbalagem, setMaterialEmbalagem] = useState({
        id: '',
        nome: '',
        capacidade: '',
        preco: '',
        qtd: '',
        valor: ''
    });
    const [removeConfirmDialogOpen, setRemoveConfirmDialogOpen] = useState(
        false
    );
    const [editConfirmDialogOpen, setEditConfirmDialogOpen] = useState(false);

    let materiaisEmbalagemAfterRemove = [];

    const resetMateriaisEmbalagemValues = () => {
        setMaterialEmbalagem({
            id: '',
            nome: '',
            capacidade: '',
            preco: '',
            qtd: '',
            valor: ''
        });
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setMaterialEmbalagem({
            ...materialEmbalagem,
            [event.target.name]: value
        });
    };

    const handleMateriaisEmbalagemAdd = () => {
        setMateriaisEmbalagem([
            ...materiaisEmbalagem,
            { ...materialEmbalagem, id: nextId(), valor: calculateValor() }
        ]);
        resetMateriaisEmbalagemValues();
    };

    const handleRemoveItem = (i) => {
        materiaisEmbalagemAfterRemove = materiaisEmbalagem.filter(
            (element) => element.id !== i
        );
        setRemoveConfirmDialogOpen(true);
    };

    const handleEditItem = (i) => {
        const [matEmb] = materiaisEmbalagem.filter(
            (element) => element.id === i
        );
        setMaterialEmbalagem(matEmb);
        setEditForm(true);
    };

    const calculateValor = () => {
        const valor = parseFloat(
            materialEmbalagem.preco * materialEmbalagem.qtd
        ).toFixed(2);
        return valor;
    };

    const handleEditSave = () => {
        setEditConfirmDialogOpen(true);
    };

    const handleEditCancel = () => {
        setEditForm(false);
    };

    const removeMaterialEmbalagem = () => {
        setMateriaisEmbalagem(materiaisEmbalagemAfterRemove);
    };

    const updateMaterialEmbalagem = () => {
        const newMateriaisEmbalagem = materiaisEmbalagem.filter(
            (element) => element.id !== materialEmbalagem.id
        );
        setMateriaisEmbalagem([...newMateriaisEmbalagem, materialEmbalagem]);
        setEditForm(false);
        resetMateriaisEmbalagemValues();
    };

    return (
        <>
            <div
                className="materiaisEmbalagemFormControl"
                onChange={handleInputChange}
            >
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">
                            Materiais de Embalagem
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nome-mat-emb"
                            name="nome"
                            label="Nome"
                            type="text"
                            value={materialEmbalagem.nome}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="capacidade"
                            name="capacidade"
                            label="Capacidade"
                            type="number"
                            value={materialEmbalagem.capacidade}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="preco-mat-emb"
                            name="preco"
                            label="Preço"
                            type="number"
                            value={materialEmbalagem.preco}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="quantidade-mat-emb"
                            name="qtd"
                            label="Quantidade"
                            type="number"
                            value={materialEmbalagem.qtd}
                            className={classes.textInput}
                            required
                        />
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
                                onClick={handleMateriaisEmbalagemAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>
            <div className={classes.cardsContainer}>
                {materiaisEmbalagem.map((matEmb) => {
                    return (
                        <Card className={classes.cards} key={matEmb.id}>
                            <CardContent>
                                <Typography variant="h5" component="h1">
                                    <span>Nome:</span> {matEmb.nome}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Capacidade:</span> {matEmb.capacidade}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Preço:</span> {matEmb.preco}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Qt.:</span> {matEmb.qtd}
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    <span>Valor:</span> {matEmb.valor}
                                </Typography>
                            </CardContent>
                            <div className={classes.cardsIcons}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => handleEditItem(matEmb.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(matEmb.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    );
                })}
                <>
                    <ConfirmDialog
                        title="Editar Material de Embalagem"
                        open={editConfirmDialogOpen}
                        setOpen={setEditConfirmDialogOpen}
                        onConfirm={updateMaterialEmbalagem}
                    >
                        Tem a certeza que deseja editar o material de embalagem?
                    </ConfirmDialog>
                    <ConfirmDialog
                        title="Remover Material de Embalagem"
                        open={removeConfirmDialogOpen}
                        setOpen={setRemoveConfirmDialogOpen}
                        onConfirm={removeMaterialEmbalagem}
                    >
                        Tem a certeza que deseja remover o material de
                        embalagem?
                    </ConfirmDialog>
                </>
            </div>
        </>
    );
};

export default MateriaisEmbalagem;
