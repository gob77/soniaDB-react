document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("table");

    const dataStore = {
        productos: [],
        items: []
    };

    async function getInfo() {
        const api_url = "/main";
        const fetch_data = await fetch(api_url);
        const json_data = await fetch_data.json();

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

    const categoria = document.getElementById("categoria");
    const nuevoItemBTN = document.getElementById("nuevoItemBTN");
    const item = document.getElementById("item");
    const precio = document.getElementById("precio");
    const cantidad = document.getElementById("cantidad");

    nuevoItemBTN.addEventListener("click", async () => {
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
            console.log("executing printDAta");
            getInfo(data_json.info);
        }
    });

    let displayData = document.getElementsByClassName("displayData");
    for (let i = 0; i < displayData.length; i++) {
        displayData[i].addEventListener("click", async () => {
            let api_url = `/showData/${event.target.textContent}`;
            let fetchData = await fetch(api_url);
            let fetch_json = await fetchData.json();
            renderData(fetch_json);
        });
    }

    function renderData(data) {
        let table = document.getElementsByTagName("table");
        let childs = table[0].children;
        let thead = document.getElementsByTagName("thead");
        let tbody = document.getElementsByTagName("tbody");
        let test = () => {
            let k = Object.keys(data);

            for (keys in data) {
                //console.log(keys, data[keys]);
                createTable(data[keys].item, data[keys].precio, data[keys].cantidad);
            }
        };

        Object.keys(childs).map(index => {
            if (index != 0) {
                childs[index].style.display = "none";
            }
        });
        test();
    }

    function createTable(producto, precio, cantidad) {
        let table = document.getElementById("table");
        let tbody = document.createElement("tbody");
        let tr = document.createElement("tr");
        let itemTXT = document.createElement("td");
        let precioTXT = document.createElement("td");
        let cantidadTXT = document.createElement("td");
        let item = document.createTextNode(producto);
        let valor = document.createTextNode(precio);
        let existencias = document.createTextNode(cantidad);

        itemTXT.append(item);
        precioTXT.append(valor);
        cantidadTXT.append(existencias);
        tr.append(itemTXT, precioTXT, cantidadTXT);
        tbody.append(tr);
        table.append(tbody);
    }

    getInfo();
});
