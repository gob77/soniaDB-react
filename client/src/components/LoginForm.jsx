import React from "react";
import { withRouter } from "react-router-dom";
import "./loginform.css";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.pass = React.createRef();
    }

    handleSubmit = async event => {
        event.preventDefault();

        const data = {
            email: this.email.current.value,
            pass: this.pass.current.value
        };

        this.props.user(data).then(res => {
            if (res.status) {
                this.props.history.push("admin");
            } else {
                alert("error");
            }
        });
    };

    render() {
        return (
            <div className="w-100 container">
                <div className="form-group login-container w-75">
                    <div className="input-group email">
                        <div className="input-group-prepend">
                            <label htmlFor="email" className="input-group-text">
                                Email
                            </label>
                        </div>
                        <input ref={this.email} type="email" name="email" id="email" className="form-control" required />
                    </div>
                    <div className="input-group pass">
                        <div className="input-group-prepend">
                            <label htmlFor="pass" className="input-group-text">
                                Contraseña
                            </label>
                        </div>
                        <input ref={this.pass} type="password" name="pass" id="pass" className="form-control" required />
                    </div>
                    <input type="submit" value="Aceptar" className="btn btn-primary" onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default withRouter(LoginForm);
