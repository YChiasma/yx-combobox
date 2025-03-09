# Combobox

A customizable text input widget that supports autocompletions.

# Installation

`npm i yx-combobox`

# Example

```
const combobox = require("yx-combobox");

function search(query) {
    const possibleCompletions = ["San Francisco", "New York", "Orlando", "Miami", "Boston", "Oklahoma City", "Nashville"];
    const filteredCompletions = possibleCompletions.filter(x => x.slice(0, query.length).toUpperCase() == query.toUpperCase());
    return filteredCompletions;
}

const myCombobox = new combobox.Combobox(search);

const express = require("express");
const cors = require("cors");
const app = express();

app.use("/combobox", myCombobox.getRouter());

app.get("/", (req, res) => {
    res.send("<form method='get' action='/submit'><div data-combobox='/combobox' data-forcecompletion='true' data-name='location'></div><p><input type='submit'></form><script src='/combobox/combobox.js'></script>");
})

app.get("/submit", (req, res) => {
    res.send(req.query);
}) 

app.listen(3000, () => { console.log("App is listening on http://localhost:3000/")});
```