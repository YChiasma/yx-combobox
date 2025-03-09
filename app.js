const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'combobox.js');
const scriptContents = fs.readFileSync(scriptPath, 'utf8');

const stylesPath = path.join(__dirname, 'combobox.css');
const stylesContents = fs.readFileSync(stylesPath, 'utf8');

class Combobox {
    constructor(search) { 
        this.search = search; 
        this.scriptContents = scriptContents;
        this.stylesContents = stylesContents;
    }

    getScript() { return this.scriptContents; }

    setScript(_scriptContents) { this.scriptContents = _scriptContents; }

    getStyles() { return this.stylesContents; }

    setStyles(_stylesContents) { this.stylesContents = _stylesContents; }

    serveCompletions() { return (req, res) => {
        const query = req.query.q || '';
        const results = this.search(query);
        res.json(results);
    }}

    serveScript() { return (req, res) => {
        res.type(".js").send(this.getScript());
    }}

    serveStyles() { return (req, res) => {
        res.type(".css").send(this.getStyles());
    }}

    getRouter() { return (req, res) => {
        switch(req.path) {
            case "/completions":
                this.serveCompletions()(req, res);
                break;
            case "/combobox.js":
                this.serveScript()(req, res);
                break;
            case "/combobox.css":
                this.serveStyles()(req, res);
                break;
        }
    }}
}

module.exports = { Combobox };