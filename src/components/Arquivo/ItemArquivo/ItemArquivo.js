import React from 'react';

import ManipuladoItem from '../ManipuladoItem/ManipuladoItem';
import OrcamentoItem from '../OrcamentoItem/OrcamentoItem';

const ItemArquivo = ({
    orcamentos,
    setOrcamentos,
    manipulados,
    setManipulados,
    toggleManip,
    loadedManipulado,
    setLoadedManipulado,
    loadedOrcamento,
    setLoadedOrcamento,
    setEditing
}) => {
    return (
        <div>
            {toggleManip ? (
                <ManipuladoItem
                    manipulados={manipulados}
                    loadedManipulado={loadedManipulado}
                    setLoadedManipulado={setLoadedManipulado}
                    setManipulados={setManipulados}
                    setEditing={setEditing}
                />
            ) : (
                <OrcamentoItem
                    orcamentos={orcamentos}
                    loadedOrcamento={loadedOrcamento}
                    setLoadedOrcamento={setLoadedOrcamento}
                    setOrcamentos={setOrcamentos}
                    setEditing={setEditing}
                />
            )}
        </div>
    );
};

export default ItemArquivo;
