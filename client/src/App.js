import React from "react";
import update from "immutability-helper";
import "./App.css";
import AddForm from "./components/AddForm";
import Table from "./components/Table";
import Modal from "./components/Modal";

class App extends React.Component {
    back = () => {
        this.props.history.push("/");
    };

    render() {
        return this.props.state.logedIn ? (
            <div className="App">
                <div className="App-header">
                    <AddForm data={this.props.newItem} state={this.props.state} user={this.props.user} />
                </div>
                <Table state={this.props.state} render={this.props.render} />
                <Modal />
            </div>
        ) : (
            <div className="App">
                <div className="App-header">
                    <h1>You must be loged in</h1>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.back}>
                    Regresar
                </button>
            </div>
        );
    }
}

export default App;
