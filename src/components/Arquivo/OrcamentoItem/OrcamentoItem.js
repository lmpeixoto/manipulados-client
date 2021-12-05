import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { styles } from './styles';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';
import { deleteOrcamento } from '../../../utils/api';

const useStyles = makeStyles((theme) => styles);

const OrcamentoItem = ({
    orcamentos,
    setLoadedOrcamento,
    setEditing,
    setOrcamentos
}) => {
    const classes = useStyles();

    const [removeConfirmDialogOpen, setRemoveConfirmDialogOpen] = useState(
        false
    );
    const [editConfirmDialogOpen, setEditConfirmDialogOpen] = useState(false);
    const [orcamentoIdToEdit, setOrcamentoIdToEdit] = useState('');
    const [orcamentoIdToRemove, setOrcamentoIdToRemove] = useState('');

    const handleEditOrcamento = (id) => {
        setOrcamentoIdToEdit(id);
        setEditConfirmDialogOpen(true);
    };

    const handleRemoveOrcamento = (id) => {
        setOrcamentoIdToRemove(id);
        setRemoveConfirmDialogOpen(true);
    };

    const updateOrcamento = () => {
        const [orcamentoToEdit] = orcamentos.filter(
            (orcamento) => orcamento._id === orcamentoIdToEdit
        );
        setLoadedOrcamento(orcamentoToEdit);
        setEditing(true);
    };

    const removeOrcamento = () => {
        console.log(orcamentoIdToRemove);
        deleteOrcamento(orcamentoIdToRemove);
        const newOrcamentosToSave = orcamentos.filter(
            (orcamento) => orcamento._id !== orcamentoIdToRemove
        );
        setOrcamentos(newOrcamentosToSave);
    };

    return (
        <div>
            {orcamentos.length > 0 ? (
                <>
                    {orcamentos.map((orcamento) => (
                        <Card key={orcamento._id} className={classes.cards}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <span>Nome:</span>{' '}
                                    {orcamento.nomeManipulado}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    <span>Preço:</span> {orcamento.totalPrice}
                                </Typography>
                            </CardContent>
                            <Grid item className={classes.cardsIcons}>
                                <IconButton
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() =>
                                        handleEditOrcamento(orcamento._id)
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() =>
                                        handleRemoveOrcamento(orcamento._id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Card>
                    ))}
                    <>
                        <ConfirmDialog
                            title="Remover Orçamento"
                            open={removeConfirmDialogOpen}
                            setOpen={setRemoveConfirmDialogOpen}
                            onConfirm={removeOrcamento}
                        >
                            Tem a certeza que deseja remover o orçamento?
                        </ConfirmDialog>
                        <ConfirmDialog
                            title="Editar Orçamento"
                            open={editConfirmDialogOpen}
                            setOpen={setEditConfirmDialogOpen}
                            onConfirm={updateOrcamento}
                        >
                            Tem a certeza que deseja editar o orçamento? (Será
                            redirecionado para a edição de orçamento)
                        </ConfirmDialog>
                    </>
                </>
            ) : (
                <h3>Não existem orçamentos!</h3>
            )}
        </div>
    );
};

export default OrcamentoItem;
