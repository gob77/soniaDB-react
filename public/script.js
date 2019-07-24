document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("table");

    const dataStore = {
        productos: [],
        items: []
    };

    console.log(dataStore);
    async function getInfo() {
        const api_url = "/main";
        const fetch_data = await fetch(api_url);
        const json_data = await fetch_data.json();

        if (json_data.info === null) {
            let thead = document.createElement("thead");
            let th = document.createElement("th");
            let thTXT = document.createTextNode("la base de datos esta vacia");

            thead.setAttribute("class", "bg-danger text-center text-uppercase");
            th.setAttribute("colspan", "3");

            th.append(thTXT);
            thead.append(th);
            table.append(thead);
        } else {
            let data = json_data.info.producto;
            let len = Object.keys(data);
            let _temp = [];

            for (let i = 0; i < len.length; i++) {
                let producto = data[len[i]];
                _temp.push(producto.producto);
                dataStore.items.push(producto);
            }

            dataStore.productos.push(...new Set(_temp));
            dataStore.productos.map(index => {
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");
                let th = document.createElement("th");
                let thTXT = document.createTextNode(index);

                th.setAttribute("class", "bg-secondary text-uppercase text-center");
                th.setAttribute("colspan", "3");
                tbody.setAttribute("id", index);

                th.append(thTXT);
                thead.append(th);
                table.append(thead, tbody);
            });

            let productosID;

            dataStore.items.map(index => {
                productosID = document.getElementById(index.producto);

                let tr = document.createElement("tr");
                let itemTD = document.createElement("td");
                let precioTD = document.createElement("td");
                let cantidadTD = document.createElement("td");

                let itemTXT = document.createTextNode(index.item);
                let precioTXT = document.createTextNode(index.precio);
                let cantidadTXT = document.createTextNode(index.cantidad);

                itemTD.append(itemTXT);
                precioTD.append(precioTXT);
                cantidadTD.append(cantidadTXT);

                tr.append(itemTD, precioTD, cantidadTD);
                productosID.append(tr);
            });
        }
    }

    function newRow() {
        let i = dataStore.items.length - 1;
        let data = dataStore.items[i];

        let getParent = document.getElementById(data.producto);

        let row = () => {
            let tr = document.createElement("tr");
            let itemTD = document.createElement("td");
            let precioTD = document.createElement("td");
            let cantidadTD = document.createElement("td");

            let itemTXT = document.createTextNode(data.item);
            let precioTXT = document.createTextNode(data.precio);
            let cantidadTXT = document.createTextNode(data.cantidad);

            itemTD.append(itemTXT);
            precioTD.append(precioTXT);
            cantidadTD.append(cantidadTXT);

            tr.append(itemTD, precioTD, cantidadTD);

            getParent.append(tr);
        };
        if (getParent === null) {
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            let th = document.createElement("th");
            let thTXT = document.createTextNode(data.producto);

            th.setAttribute("class", "bg-secondary text-uppercase text-center");
            th.setAttribute("colspan", "3");
            tbody.setAttribute("id", data.producto);

            thead.append(th);
            th.append(thTXT);
            table.append(thead, tbody);

            getParent = document.getElementById(data.producto);
            row();
        } else {
            row();
        }
        console.log("success");
    }

    const categoria = document.getElementById("categoria");
    const nuevoItemBTN = document.getElementById("nuevoItemBTN");
    const item = document.getElementById("item");
    const precio = document.getElementById("precio");
    const cantidad = document.getElementById("cantidad");

    nuevoItemBTN.addEventListener("click", async () => {
        const childs = table.children;

        if (categoria.value === "none") {
            alert("Por favor eligar una categoria");
        } else {
            let data = {
                producto: categoria.value,
                item: item.value,
                precio: `$${precio.value}`,
                cantidad: cantidad.value
            };

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            let api_url = `/save/${data.producto},${data.item},${data.precio},${data.cantidad}`;
            let post_data = await fetch(api_url, options);
            let data_json = await post_data.json();

            console.log(data_json);
            dataStore.items.push(data_json.info);
            newRow();
        }
    });

    let displayData = document.getElementsByClassName("displayData");
    for (let i = 0; i < displayData.length; i++) {
        displayData[i].addEventListener("click", () => {
            dataStore.productos.map(index => {
                let elem = document.getElementById(index);
                if (event.target.dataset.value !== index) {
                    elem.previousSibling.style.display = "none";
                    elem.style.display = "none";
                    event.target.style.display = "";
                } else {
                    elem.previousSibling.style.display = "";
                    elem.style.display = "";
                    event.target.style.display = "none";
                }
            });
        });
    }

    getInfo();
    console.log(dataStore);
});
