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
import { deleteManipulado } from '../../../utils/api';

const useStyles = makeStyles((theme) => styles);

const ManipuladoItem = ({
    manipulados,
    setLoadedManipulado,
    setEditing,
    setManipulados
}) => {
    const classes = useStyles();

    const [removeConfirmDialogOpen, setRemoveConfirmDialogOpen] = useState(
        false
    );
    const [editConfirmDialogOpen, setEditConfirmDialogOpen] = useState(false);
    const [manipuladoIdToEdit, setManipuladoIdToEdit] = useState('');
    const [manipuladoIdToRemove, setManipuladoIdToRemove] = useState('');

    const handleEditManipulado = (id) => {
        setManipuladoIdToEdit(id);
        setEditConfirmDialogOpen(true);
    };

    const handleRemoveManipulado = (id) => {
        setManipuladoIdToRemove(id);
        setRemoveConfirmDialogOpen(true);
    };

    const updateManipulado = () => {
        const [manipuladoToEdit] = manipulados.filter(
            (manipulado) => manipulado._id === manipuladoIdToEdit
        );
        setLoadedManipulado(manipuladoToEdit);
        setEditing(true);
    };

    const removeManipulado = () => {
        console.log(manipuladoIdToRemove);
        deleteManipulado(manipuladoIdToRemove);
        const newManipuladosToSave = manipulados.filter(
            (manipulado) => manipulado._id !== manipuladoIdToRemove
        );
        setManipulados(newManipuladosToSave);
    };

    return (
        <div>
            {manipulados.length > 0 ? (
                <>
                    {manipulados.map((manipulado) => (
                        <Card key={manipulado._id} className={classes.cards}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <span>Nome:</span>{' '}
                                    {manipulado.nomeManipulado}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    <span>Preço:</span> {manipulado.totalPrice}
                                </Typography>
                            </CardContent>
                            <Grid item className={classes.cardsIcons}>
                                <IconButton
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() =>
                                        handleEditManipulado(manipulado._id)
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() =>
                                        handleRemoveManipulado(manipulado._id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Card>
                    ))}
                    <>
                        <ConfirmDialog
                            title="Remover Manipulado"
                            open={removeConfirmDialogOpen}
                            setOpen={setRemoveConfirmDialogOpen}
                            onConfirm={removeManipulado}
                        >
                            Tem a certeza que deseja remover o manipulado?
                        </ConfirmDialog>
                        <ConfirmDialog
                            title="Editar Manipulado"
                            open={editConfirmDialogOpen}
                            setOpen={setEditConfirmDialogOpen}
                            onConfirm={updateManipulado}
                        >
                            Tem a certeza que deseja editar o manipulado? (Será
                            redirecionado para a edição de manipulado)
                        </ConfirmDialog>
                    </>
                </>
            ) : (
                <h3>Não existem manipulados!</h3>
            )}
        </div>
    );
};

export default ManipuladoItem;
