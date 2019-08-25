import React from "react";

class Modal extends React.Component {
    state = {};
    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Advertencia
                            </h5>
                        </div>
                        <div className="modal-body">El item ya existe en la base de datos</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
