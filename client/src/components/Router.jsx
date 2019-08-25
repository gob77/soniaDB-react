import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import MainTable from "./MainTable";
import $ from "jquery";

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            database: [],
            productos: [],
            status: false,
            logedIn: false,
            editMode: false,
            renderProd: "all"
        };

        this.newItem = this.newItem.bind(this);
    }

    async newItem(data) {
        const [producto, item, precio, stock] = [data.producto, data.item, data.precio, data.stock];

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        };

        const api_url = `/admin/save/${producto},${item},${precio},${stock}`;
        const getData = await fetch(api_url, options);
        const json = await getData.json();
        console.log(json.status);
        if (json.status) {
            json.data.key = json.key;
            const db = [...this.state.database];
            db.push(data);
            const productos = [...this.state.productos];
            productos.push(producto);

            this.setState({ database: db, status: true, productos });
            console.log(this.state.productos, "from newItem");
        } else {
            $("#exampleModal").modal(options);
            console.log(json.status, json.info);
        }
    }

    async getData() {
        const api_url = "/main";
        const fetchData = await fetch(api_url);

        const data = await fetchData.json();

        if (data.status) {
            const k = Object.keys(data.info);

            k.map(index => {
                return (data.info[index].key = index);
            });

            const db = [...this.state.database];
            const _temp = [...this.state.productos];

            const keys = Object.keys(data.info);
            keys.forEach(index => {
                db.push(data.info[index]);
                _temp.push(data.info[index].producto);
            });

            const productos = [...new Set(_temp)];

            this.setState({ database: db, status: data.status, productos });
        } else {
            this.setState({ status: data.status });
        }
    }

    renderList = data => {
        this.setState({ renderProd: data });
    };

    login = async data => {
        console.log(data);
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        };

        if (data === "logout") {
            const api_url = `/login/${data}`;
            const fetchData = await fetch(api_url, options);
            const json = await fetchData.json();

            const response = json.status;

            return response;
        } else {
            const [email, pass] = [data.email, data.pass];

            const api_url = `/login/${email},${pass}`;

            const fetchData = await fetch(api_url, options);
            const json = await fetchData.json();

            if (json.status) {
                this.setState({ logedIn: true });
                return { status: true };
            } else {
                return { status: false };
            }
        }
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={props => <MainTable {...props} test={this.test} renderProd={this.renderList} state={this.state} user={this.login} />} />
                    <Route path="/admin" render={props => <App {...props} newItem={this.newItem} getData={this.getData} state={this.state} render={this.renderList} user={this.login} />} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
