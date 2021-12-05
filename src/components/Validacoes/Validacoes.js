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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { styles } from './styles';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const useStyles = makeStyles((theme) => styles);

const Validacoes = ({ validacoes, setValidacoes }) => {
    const classes = useStyles();

    const [editForm, setEditForm] = useState(false);
    const [validacao, setValidacao] = useState({
        id: '',
        nomeEnsaio: '',
        especificacao: '',
        resultado: ''
    });

    const [open, setOpen] = useState(false);
    const [removeConfirmDialogOpen, setRemoveConfirmDialogOpen] = useState(
        false
    );
    const [editConfirmDialogOpen, setEditConfirmDialogOpen] = useState(false);

    let validacoesAfterRemove = [];

    const resetValidacaoValues = () => {
        setValidacao({
            id: '',
            nomeEnsaio: '',
            especificacao: '',
            resultado: ''
        });
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setValidacao({
            ...validacao,
            [event.target.name]: value
        });
    };

    const handleValidacaoAdd = () => {
        setValidacoes([...validacoes, { ...validacao, id: nextId() }]);
        resetValidacaoValues();
    };

    const handleRemoveItem = (i) => {
        validacoesAfterRemove = validacoes.filter(
            (element) => element.id !== i
        );
        setRemoveConfirmDialogOpen(true);
    };

    const handleEditItem = (i) => {
        const [valid] = validacoes.filter((element) => element.id === i);
        setValidacao(valid);
        setEditForm(true);
    };

    const handleEditCancel = () => {
        setEditForm(false);
    };

    const handleEditSave = () => {
        setEditConfirmDialogOpen(true);
    };

    const handleSelectChange = (event) => {
        setValidacao({
            ...validacao,
            resultado: event.target.value
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const updateValidacao = () => {
        const newValidacoes = validacoes.filter(
            (element) => element.id !== validacao.id
        );
        setValidacoes([...newValidacoes, validacao]);
        setEditForm(false);
        resetValidacaoValues();
    };

    const removeValidacao = () => {
        setValidacoes(validacoesAfterRemove);
    };

    return (
        <>
            <div className="validacoesFormControl" onChange={handleInputChange}>
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Validacões</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nome-valid"
                            name="nomeEnsaio"
                            label="Nome do ensaio"
                            type="text"
                            value={validacao.nomeEnsaio}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextareaAutosize
                            className={classes.textArea}
                            id="especificacao"
                            name="especificacao"
                            label="Especificação"
                            type="text"
                            rowsMin={3}
                            placeholder="Especificação"
                            value={validacao.especificacao}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <InputLabel id="aprovacao-select-label">
                            Resultado
                        </InputLabel>
                        <Select
                            className={classes.textInput}
                            labelId="aprovacao-select-label"
                            id="aprovacao-select"
                            name="aprovacao"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={validacao.resultado}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem key={1} value="conforme">
                                Conforme
                            </MenuItem>
                            <MenuItem key={0} value="não conforme">
                                Não Conforme
                            </MenuItem>
                        </Select>
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
                                onClick={handleValidacaoAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>
            <div className={classes.cardsContainer}>
                {validacoes.map((valid) => {
                    return (
                        <Card className={classes.cards} key={valid.id}>
                            <CardContent>
                                <Typography variant="h5" component="h1">
                                    <span>Nome:</span> {valid.nomeEnsaio}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Descrição:</span>{' '}
                                    {valid.especificacao}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Resultado:</span> {valid.resultado}
                                </Typography>
                            </CardContent>
                            <div className={classes.cardsIcons}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => handleEditItem(valid.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(valid.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    );
                })}
                <>
                    <ConfirmDialog
                        title="Editar Validação"
                        open={editConfirmDialogOpen}
                        setOpen={setEditConfirmDialogOpen}
                        onConfirm={updateValidacao}
                    >
                        Tem a certeza que deseja editar o ensaio de validação?
                    </ConfirmDialog>
                    <ConfirmDialog
                        title="Remover Material de Embalagem"
                        open={removeConfirmDialogOpen}
                        setOpen={setRemoveConfirmDialogOpen}
                        onConfirm={removeValidacao}
                    >
                        Tem a certeza que deseja remover o ensaio de validação?
                    </ConfirmDialog>
                </>
            </div>
        </>
    );
};

export default Validacoes;
