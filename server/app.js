const express = require("express");
const cors = require("cors");
const expressGraphQL = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

app.use(cors());

require("dotenv").config();

const db = require("./helpers/db")();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server ayağa kalktı");
});
