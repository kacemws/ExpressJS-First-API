const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("Holà!");
})

app.get('/greet-user/:name', (req, res)=>{
    res.send("Hey " + req.params.name + " Thanks for reaching out ! ");
});

app.listen(port , ()=>{
    console.log(`listening on port : ${port}`);
});