import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FORMAS_FARMACEUTICAS from '../../data/formas-farmaceuticas.json';
import MateriasPrimas from '../MateriasPrimas/MateriasPrimas';
import MateriaisEmbalagem from '../MateriaisEmbalagem/MateriaisEmbalagem';
import Calculos from '../Calculos/Calculos';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { styles } from './styles';
import { FATOR_F, patchOrcamento, postOrcamento } from '../../utils/api';
import { matEmbReader, matPrimReader } from '../../utils/readers';

const useStyles = makeStyles((theme) => styles);

const Orcamento = ({ editing, setEditing, loadedOrcamento }) => {
    const classes = useStyles();
    const [nomeOrcamento, setNomeOrcamento] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [formaFarmaceutica, setFormaFarmaceutica] = useState('');
    const [formaFarmaceuticaPreco, setFormaFarmaceuticaPreco] = useState('');
    const [materiasPrimas, setMateriasPrimas] = useState([]);
    const [materiasPrimasPreco, setMateriasPrimasPreco] = useState('');
    const [materiaisEmbalagem, setMateriaisEmbalagem] = useState([]);
    const [materiaisEmbalagemPreco, setMateriaisEmbalagemPreco] = useState('');
    const [totais, setTotais] = useState([0, 0]);
    const [open, setOpen] = useState(false);
    const [orcamentoId, setOrcamentoID] = useState('');
    const [completed, setCompleted] = useState(false);
    const [saveConfirmDialogOpen, setSaveConfirmDialogOpen] = useState(false);
    const [editConfirmDialogOpen, setEditConfirmDialogOpen] = useState(false);

    useEffect(() => {
        const populateOrcamentoEdit = () => {
            if (loadedOrcamento && editing) {
                setNomeOrcamento(loadedOrcamento.nomeManipulado);
                setQuantidade(loadedOrcamento.fFarmQtd);
                setFormaFarmaceutica(loadedOrcamento.fFarmNome.toLowerCase());
                setMateriasPrimas(
                    matPrimReader(loadedOrcamento.materiasPrimas)
                );
                setMateriaisEmbalagem(
                    matEmbReader(loadedOrcamento.materiaisEmbalagem)
                );
                setOrcamentoID(loadedOrcamento._id);
            }
        };

        populateOrcamentoEdit();
    }, []);

    useEffect(() => {
        const checkCompletedForm = () => {
            if (
                nomeOrcamento &&
                quantidade &&
                formaFarmaceutica &&
                materiasPrimas.length > 0 &&
                materiaisEmbalagem.length > 0
            ) {
                setCompleted(true);
            }
        };

        checkCompletedForm();
    }, [
        nomeOrcamento,
        quantidade,
        formaFarmaceutica,
        materiasPrimas,
        materiaisEmbalagem
    ]);

    let history = useHistory();

    const handleChange = (event) => {
        setFormaFarmaceutica(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleEditSaveButton = () => {
        setEditConfirmDialogOpen(true);
    };

    const handleSaveButton = () => {
        setSaveConfirmDialogOpen(true);
    };

    const updateOrcamento = () => {
        let dataBody = {
            fatorF: FATOR_F,
            fFarmPrice: formaFarmaceuticaPreco,
            nomeManipulado: nomeOrcamento,
            fFarmNome: formaFarmaceutica,
            fFarmQtd: quantidade,
            materiasPrimas: materiasPrimas,
            materiasPrimasPrice: materiasPrimasPreco,
            materiaisEmbalagem: materiaisEmbalagem,
            materiaisEmbalagemPrice: materiaisEmbalagemPreco,
            IVA: totais[1],
            totalPrice: totais[0]
        };
        patchOrcamento(orcamentoId, dataBody);
        setEditing(false);
        history.push('/arquivo');
    };

    const saveOrcamento = () => {
        let dataBody = {
            fatorF: FATOR_F,
            fFarmPrice: formaFarmaceuticaPreco,
            nomeManipulado: nomeOrcamento,
            fFarmNome: formaFarmaceutica,
            fFarmQtd: quantidade,
            materiasPrimas: materiasPrimas,
            materiasPrimasPrice: materiasPrimasPreco,
            materiaisEmbalagem: materiaisEmbalagem,
            materiaisEmbalagemPrice: materiaisEmbalagemPreco,
            IVA: totais[1],
            totalPrice: totais[0]
        };
        postOrcamento(dataBody);
        setSaveConfirmDialogOpen(false);
        history.push('/orcamento');
    };

    return (
        <Grid
            className={classes.gridContainer}
            container
            direction={'column'}
            spacing={1}
        >
            <Grid item>
                <Typography variant="h4">Orçamento</Typography>
            </Grid>
            <Grid item>
                <TextField
                    id="nome-orcamento"
                    label="Nome do Orçamento"
                    onChange={(e) => setNomeOrcamento(e.target.value)}
                    className={classes.textInput}
                    value={nomeOrcamento}
                    type="text"
                    required
                />
            </Grid>
            <Grid item>
                <FormControl
                    className={(classes.formControl, classes.textInput)}
                >
                    <InputLabel id="forma-farmaceutica-select-label">
                        Forma Farmacêutica
                    </InputLabel>
                    <Select
                        labelId="forma-farmaceutica-select-label"
                        id="forma-farmaceutica-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={formaFarmaceutica}
                        onChange={handleChange}
                        required
                    >
                        {Object.keys(FORMAS_FARMACEUTICAS).map(
                            (formaFarmaceutica) => {
                                return (
                                    <MenuItem
                                        value={formaFarmaceutica}
                                        key={formaFarmaceutica}
                                    >
                                        {formaFarmaceutica}
                                    </MenuItem>
                                );
                            }
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <TextField
                    id="quantidade-orcamento"
                    label="Quantidade"
                    type="number"
                    onChange={(e) => setQuantidade(e.target.value)}
                    className={classes.textInput}
                    value={quantidade}
                    required
                />
            </Grid>
            <Grid item className={classes.gridContainer}>
                <MateriasPrimas
                    materiasPrimas={materiasPrimas}
                    setMateriasPrimas={setMateriasPrimas}
                />
            </Grid>
            <Grid item className={classes.gridContainer}>
                <MateriaisEmbalagem
                    materiaisEmbalagem={materiaisEmbalagem}
                    setMateriaisEmbalagem={setMateriaisEmbalagem}
                />
            </Grid>
            <Grid item className={classes.gridContainer}>
                <Calculos
                    formaFarmaceutica={formaFarmaceutica}
                    formaFarmaceuticaPreco={formaFarmaceuticaPreco}
                    setFormaFarmaceuticaPreco={setFormaFarmaceuticaPreco}
                    materiasPrimas={materiasPrimas}
                    materiasPrimasPreco={materiasPrimasPreco}
                    setMateriasPrimasPreco={setMateriasPrimasPreco}
                    materiaisEmbalagem={materiaisEmbalagem}
                    materiaisEmbalagemPreco={materiaisEmbalagemPreco}
                    setMateriaisEmbalagemPreco={setMateriaisEmbalagemPreco}
                    quantidade={quantidade}
                    nomeOrcamento={nomeOrcamento}
                    handleEditSaveButton={handleEditSaveButton}
                    handleSaveButton={handleSaveButton}
                    totais={totais}
                    setTotais={setTotais}
                    editing={editing}
                    completed={completed}
                    setCompleted={setCompleted}
                />
            </Grid>
            <ConfirmDialog
                title="Editar Orçamento"
                open={editConfirmDialogOpen}
                setOpen={setEditConfirmDialogOpen}
                onConfirm={updateOrcamento}
            >
                Tem a certeza que deseja editar o orçamento?
            </ConfirmDialog>
            <ConfirmDialog
                title="Gravar Orçamento"
                open={saveConfirmDialogOpen}
                setOpen={setSaveConfirmDialogOpen}
                onConfirm={saveOrcamento}
            >
                Tem a certeza que deseja gravar o orçamento?
            </ConfirmDialog>
        </Grid>
    );
};

export default Orcamento;
