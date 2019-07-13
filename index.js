const express = require("express");
const app = express();

const firebase = require("firebase");

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

app.listen(5000, () => {
    console.log("listening at 5000");
});

app.use(express.static("public"));

app.post("/save/:data", (request, response) => {
    //console.log(request.params);
    let data = request.params.data.split(",");
    let [ref, item, precio] = [data[0], data[1], data[2]];
    console.log(ref, item, precio);

    db.ref(`${ref}`).push({
        item: item,
        precio: precio
    });

    response.json({
        status: "success"
    });
});

app.get("/showdata/:data", (request, response) => {
    let params = request.params.data;

    db.ref(`${params}`).once("value", data => {
        response.json(data.val());
    });
});
