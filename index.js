const express = require('express'); //express
const bodyParser = require('body-parser'); //library
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); //bodyParser(convert body to Json)

let products = [{ //information of products
        id: 1,
        name: "Bascula",
        price: 50,
        image: "imagenes/peso.jfif",
        stock: 3
    },
    {
        id: 2,
        name: "Estufa",
        price: 350,
        image: "imagenes/coci.jfif",
        stock: 3
    },
    {
        id: 3,
        name: "Bicicleta acortada",
        price: 200,
        image: "imagenes/abdo.jfif",
        stock: 3
    },
    {
        id: 4,
        name: "Lavadora",
        price: 500,
        image: "imagenes/lava.jfif",
        stock: 3
    },
    {
        id: 5,
        name: "Bicleta GYM",
        price: 350,
        image: "imagenes/bici.jfif",
        stock: 3
    },
    {
        id: 6,
        name: "Mancuernas",
        price: 150,
        image: "imagenes/manc.jfif",
        stock: 3
    },
];

app.get("/api/products", (req, res) => { //send json to method GET
    res.send(products);
});

app.post("/api/pay", (req, res) => { //send POST
    // console.log(req.body)
    const ids = req.body;
    const procutsCopy = products.map((p) => ({ ...p })); //express operator:hace una copia

    ids.forEach((id) => {
        const product = procutsCopy.find((p) => p.id === id); //delete procutsCopy>products
        if (product.stock > 0) {
            product.stock--;

        } else {
            throw "Sin stock";
        }
        // product.stock--;
    });
    products = procutsCopy;
    res.send(products); //lo que devuelve el backend
});

app.use("/", express.static("Front")); //plus url "/"

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});