document.addEventListener("DOMContentLoaded", () => {
    // firebase Configuration

    let firebaseConfig = {
        apiKey: "AIzaSyAUjfb3kU6XqSyCx5l7_dMIS90sO3gxlgE",
        authDomain: "soniadb1518.firebaseapp.com",
        databaseURL: "https://soniadb1518.firebaseio.com",
        projectId: "soniadb1518",
        storageBucket: "soniadb1518.appspot.com",
        messagingSenderId: "463219674443",
        appId: "1:463219674443:web:b194b55814cbb943"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let db = firebase.database();
    let ref;

    // get item data and submit to db

    let category = document.getElementById("categoria");
    let item = document.getElementById("newItem");
    let precio = document.getElementById("precio");
    let itemBTN = document.getElementById("newItemBTN");

    itemBTN.addEventListener("click", () => {
        if (category.value === "vinos") {
            ref = db.ref("vinos");
        } else if (category.value === "tabaco") {
            ref = db.ref("tabaco");
        } else if (category.value === "chocolates") {
            ref = db.ref("chocolates");
        }

        let data = {
            producto: `${item.value}`,
            precio: `$${precio.value}`
        };

        ref.push(data);
    });
});
