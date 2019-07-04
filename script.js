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

    let categorias = document.getElementById("categoria");
    let ref;

    categorias.addEventListener("input", () => {
        //categorias.value != "inicial" ? (ref = db.ref(`${categorias.value}`)) : alert("elija una categoria");
        if (categorias.value != "inicial") {
            ref = db.ref(`${categorias.value}`);
        } else if (categorias.value === "inicial") {
            alert("elija una categoria");
        }
    });

    let getItem = document.getElementById("nuevoItem");
    let getPrice = document.getElementById("precio");
    let getBTN = document.getElementById("nuevoItemBTN");

    getBTN.addEventListener("click", () => {
        let data = {
            producto: `${getItem.value}`,
            precio: `$${getPrice.value}`
        };

        ref.push(data);
    });

    let displayData = document.getElementsByClassName("displayData");
    let keys = Object.keys(displayData);

    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        displayData[k].addEventListener("click", testData);
    }

    function testData(event) {
        ref = db.ref(`${event.target.textContent}`);
        ref.on("value", showData);
    }

    function showData(data) {
        let dataValues = data.val();
        let keys = Object.keys(dataValues);
        console.log(keys);

        for (let i = 0; i < keys.length; i++) {
            let row = document.createElement("tr");
            let item = document.createElement("td");
            let price = document.createElement("td");
            let itemName = document.createTextNode(dataValues[keys[i]].producto);
            let itemPrice = document.createTextNode(dataValues[keys[i]].precio);

            let table = document.getElementById("tableBody");

            item.appendChild(itemName);
            price.appendChild(itemPrice);
            row.appendChild(item);
            row.appendChild(price);
            table.appendChild(row);

            console.log(dataValues[keys[i]]);
        }
    }
});
