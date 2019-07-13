document.addEventListener("DOMContentLoaded", () => {
    const categoria = document.getElementById("categoria");
    const nuevoItemBTN = document.getElementById("nuevoItemBTN");
    const item = document.getElementById("item");
    const precio = document.getElementById("precio");

    nuevoItemBTN.addEventListener("click", async () => {
        let data = {
            ref: categoria.value,
            item: item.value,
            precio: `$${precio.value}`
        };

        //console.log(data);

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        let api_url = `/save/${data.ref},${data.item}, ${data.precio}`;
        let post_data = await fetch(api_url, options);
        let data_json = await post_data.json();
        console.log(data_json.status);
    });

    let displayData = document.getElementsByClassName("displayData");
    for (let i = 0; i < displayData.length; i++) {
        displayData[i].addEventListener("click", async () => {
            //alert(`clickeaste ${event.target.textContent}`);
            let api_url = `/showData/${event.target.textContent}`;
            let fetchData = await fetch(api_url);
            let fetch_json = await fetchData.json();
            renderData(fetch_json);
        });
    }

    function renderData(data) {
        let tbody = document.getElementById("tableBody");

        let test = () => {
            for (keys in data) {
                createTable(data[keys].item, data[keys].precio);
            }
        };

        let k = Object.keys(data);
        if (tbody.innerText === "") {
            test();
        } else {
            tbody.innerText = "";
            test();
        }
    }

    function createTable(producto, precio) {
        let tbody = document.getElementById("tableBody");
        let tr = document.createElement("tr");
        let itemTXT = document.createElement("td");
        let precioTXT = document.createElement("td");
        let item = document.createTextNode(producto);
        let valor = document.createTextNode(precio);
        itemTXT.append(item);
        precioTXT.append(valor);
        tr.append(itemTXT, precioTXT);
        tbody.append(tr);
    }
});
