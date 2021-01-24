import React from 'react';

const ModalConfirmacao = (props) => {
    return (<>
        <div className="modal fade" id={props.id} tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmação!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">  
                <p>Deseja confirmar a operação?</p>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={props.handleClick}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
    </>);
}

export default ModalConfirmacao;