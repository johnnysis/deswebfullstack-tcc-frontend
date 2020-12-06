import React from 'react';

const ModalExclusao = (props) => {
    return (<>
        <div class="modal fade" id={props.id} tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Atenção!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">  
                <p>Deseja confirmar a exclusão?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => props.handleClick(props.codigo)}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
    </>);
}

export default ModalExclusao;