const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());



app.get('/', (req, res)=>{
    res.send("Holà!");
})

app.get('/greet-user/:name', (req, res)=>{
    res.send("Hey " + req.params.name + " Thanks for reaching out ! ");
});

const quotes = require("./routes/quotes");

app.use('/quotes', quotes);

app.listen(port , ()=>{
    console.log(`listening on port : ${port}`);
});