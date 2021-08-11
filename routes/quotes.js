const router = require("express").Router();
const Joi = require("@hapi/joi");

let quotes = [
  {
    id: 1,
    quote: "test 1 ",
    author: "author 1",
  },
  {
    id: 2,
    quote: "test 2",
    author: "author 2",
  },
  {
    id: 3,
    quote: "test 3",
    author: "author 1",
  },
];

router.get("/", (req, res) => {
  res.send(quotes);
});

router.post("/add", (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log("Object missing");
    return res.status(400).send("Empty request");
  }

  const { error } = verifyQuote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const aux = quotes.find(
    (c) => c.author == req.body.author && c.quote == req.body.quote
  );

  if (aux) return res.status(400).send("Already available");

  let quote = {
    id: quotes.length + 1,
    quote: req.body.quote,
    author: req.body.author,
  };

  quotes.push(quote);

  return res.send(quotes);
});

router.patch("/update/:id", (req, res) => {
  let aux = quotes.findIndex((quote) => quote.id == req.params.id);
  console.log(aux);
  if (!aux) return res.status(400).send("no matching quote is available");
  quotes[aux] = req.body;
  return res.send(quotes);
});

function verifyQuote(quote) {
  const schema = Joi.object({
    quote: Joi.string().min(10).required(),
    author: Joi.string().min(5).required(),
  });

  return schema.validate(quote);
}

module.exports = router;
