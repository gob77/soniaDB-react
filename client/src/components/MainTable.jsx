import React from "react";
import LoginForm from "./LoginForm";
import "./maintable.css";

class MainTable extends React.Component {
    constructor(props) {
        super(props);
        this.renderProductos = this.renderProductos.bind(this);
        this.rows = React.createRef();
        this.button = React.createRef();
    }

    renderProductos(event) {
        console.log(event.target.value);
        console.log(this.props);
        this.props.renderProd(event.target.value);
    }

    admin = () => {
        this.props.history.push("admin");
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <LoginForm user={this.props.user} />
                </div>
                <div className="btn-group w-75" onClick={this.renderProductos}>
                    <button key={"all"} value={"all"} type="button" className="btn btn-secondary text-capitalize" ref={this.button}>
                        Mostra todos
                    </button>
                    {this.props.state.productos.map((index, currentValue) => {
                        return (
                            <button key={currentValue} value={index} type="button" className="btn btn-secondary text-capitalize" ref={this.button}>
                                {index}
                            </button>
                        );
                    })}
                </div>
                <table className="table table-striped table-dark w-75">
                    <thead className="bg-light text-dark border border-dark border-bottom-0">
                        <tr>
                            <th className="border-right border-dark">Nombre</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state.status ? (
                            this.props.state.database.map((index, currentValue) => {
                                console.log(index.stock);
                                if (index.stock === "true") {
                                    if (index.producto === this.props.state.renderProd) {
                                        return (
                                            <tr key={currentValue}>
                                                <td>{index.item}</td>
                                                <td>{index.precio}</td>
                                            </tr>
                                        );
                                    } else if (this.props.state.renderProd === "all") {
                                        return (
                                            <tr key={currentValue}>
                                                <td className="text-capitalize">{index.item}</td>
                                                <td>${index.precio}</td>
                                            </tr>
                                        );
                                    }
                                }
                            })
                        ) : (
                            <tr>
                                <td colSpan="2">Hubo un error</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MainTable;
