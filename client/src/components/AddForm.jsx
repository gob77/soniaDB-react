import React from "react";
import { withRouter } from "react-router-dom";
import "./addform.css";

class AddForm extends React.Component {
    productos = React.createRef();
    item = React.createRef();
    precio = React.createRef();
    stock = React.createRef();

    sendData = event => {
        event.preventDefault();
        console.log(this.props);

        const data = {
            producto: this.productos.current.value,
            item: this.item.current.value,
            precio: this.precio.current.value,
            stock: this.stock.current.value
        };

        this.props.data(data);
    };

    logout = () => {
        this.props.user("logout").then(res => {
            if (res === true) {
                this.setState({ logedIn: false });
                this.props.history.push("/");
            }
        });
    };

    enableEdit = event => {
        console.log(event.target);
        alert("edit mode on");
    };

    render() {
        return (
            <>
                <form className="h-50" onSubmit={this.sendData}>
                    <div className="form-container">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="productos">
                                        Producto
                                    </label>
                                </div>
                                <select className="form-control" name="productos" id="productos" ref={this.productos}>
                                    <option value="none" hidden={this.props.hidden}>
                                        Elija un producto
                                    </option>
                                    <option value="almacen">Almacen</option>
                                    <option value="bebidas">Bebidas</option>
                                    <option value="cervezas">Cervezas</option>
                                    <option value="chocolates">Chocolates</option>
                                    <option value="galletas">Galletas</option>
                                    <option value="tabaco">Tabaco</option>
                                    <option value="vinos">Vinos</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="item">
                                        Nombre
                                    </label>
                                </div>
                                <input className="form-control" type="text" name="item" id="item" placeholder="Nombre" ref={this.item} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="precio">
                                        Precio
                                    </label>
                                </div>
                                <input className="form-control" type="number" name="precio" id="precio" min="0" placeholder="Precio" ref={this.precio} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="stock">
                                        Stock?
                                    </label>
                                </div>
                                <select className="form-control" name="stock" id="stock" ref={this.stock}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group btn-container">
                        <button className="btn btn-primary" type="submit">
                            Aceptar
                        </button>
                        <button className="btn btn-primary" type="button" onClick={this.enableEdit}>
                            Editar
                        </button>
                    </div>
                </form>
                <button type="button" className="btn btn-link border border-1 w-25" onClick={this.logout}>
                    Salir
                </button>
            </>
        );
    }
}

export default withRouter(AddForm);
