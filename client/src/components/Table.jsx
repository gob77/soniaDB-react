import React from "react";
import "./table.css";

class Productos extends React.Component {
    constructor(props) {
        super(props);
        this.renderProductos = this.renderProductos.bind(this);
        this.rows = React.createRef();
        this.button = React.createRef();
    }

    renderProductos(event) {
        this.props.render(event.target.value);
    }

    render() {
        return (
            <>
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
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state.status ? (
                            this.props.state.database.map((index, currentValue) => {
                                if (index.producto === this.props.state.renderProd) {
                                    return (
                                        <tr key={currentValue}>
                                            <td>{index.item}</td>
                                            <td>{index.precio}</td>
                                            {index.stock ? <td>SI</td> : <td>NO</td>}
                                        </tr>
                                    );
                                } else if (this.props.state.renderProd === "all") {
                                    return (
                                        <tr key={currentValue}>
                                            <td className="text-capitalize">{index.item}</td>
                                            <td>${index.precio}</td>
                                            {index.stock ? <td>SI</td> : <td>NO</td>}
                                        </tr>
                                    );
                                }
                            })
                        ) : (
                            <tr>
                                <td colSpan="2">Hubo un error</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}

export default Productos;
