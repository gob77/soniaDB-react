const express = require("express");
const app = express();
const firebase = require("firebase");
const rebase = require("re-base");
const compression = require("compression");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyAUjfb3kU6XqSyCx5l7_dMIS90sO3gxlgE",
    authDomain: "soniadb1518.firebaseapp.com",
    databaseURL: "https://soniadb1518.firebaseio.com",
    projectId: "soniadb1518",
    storageBucket: "soniadb1518.appspot.com",
    messagingSenderId: "463219674443",
    appId: "1:463219674443:web:d22a98942e074104"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const authentication = firebase.auth();
const ref = db.ref("productos");
module.exports.base = rebase.createClass(db);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started , Listening to ${port}`);
});

app.use(express.static("public"));
app.use(compression());

app.get("/main", (req, res) => {
    ref.once("value", data => {
        if (data.exists()) {
            console.log("success");
            res.json({
                status: true,
                info: data.val()
            });
        } else {
            console.log("failed");
            res.json({
                status: false,
                info: "db is empty"
            });
        }
    }).catch(err => {
        console.log(err.message);
    });
});

app.post("/admin/save/:data", (req, res) => {
    const params = req.params.data.split(",");
    const [producto, item, precio, stock] = [params[0], params[1].toLowerCase(), params[2], params[3]];

    ref.orderByChild("item")
        .equalTo(`${item}`)
        .once("value", data => {
            if (data.exists()) {
                ref.once("child_added", data => {
                    res.json({
                        status: false,
                        info: "el item ya esta en la base de datos",
                        extra: data.key
                    });
                });
            } else {
                ref.push({
                    producto: producto,
                    item: item,
                    precio: precio,
                    stock: stock
                });

                ref.once("child_added", data => {
                    res.json({
                        status: true,
                        info: "el item se agrego con exito",
                        key: data.key,
                        data: data.val()
                    });
                });
            }
        });
});

app.post("/login/:data", (req, res) => {
    if (req.params.data != "logout") {
        const params = req.params.data.split(",");
        const [email, pass] = [params[0], params[1]];

        authentication
            .signInWithEmailAndPassword(email, pass)
            .then(() => {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        res.json({
                            status: true,
                            path: "admin"
                        });
                    }
                });
            })
            .catch(error => {
                res.json({
                    status: false,
                    error: error.message
                });
            });
    } else {
        authentication
            .signOut()
            .then(() => {
                res.json({
                    status: true,
                    info: "signed out"
                });
            })
            .catch(error => {
                res.json({
                    status: false,
                    error: error.message
                });
            });
    }
});
