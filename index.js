const express = require("express");
const {sendEmail} = require("./mail");
const log4js = require("log4js");

log4js.configure({
	appenders: { def: { type: 'file', filename: './node.log' } },
	categories: { default: { appenders: ['def'], level: 'all' } }
});

const log = log4js.getLogger("Main");
      log.level = "all";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/post", async (req, res) => {
    
    try {
    
        await sendEmail(req.body);
		res.status(200);
		res.send();
    
    } catch (e) {
    
        if (e.empty) {
			res.status(406);
			res.send();
			return;
		}

		res.status(500);
		res.json(e.message || e.error);
	}
});

app.get("/api", (req, res, next) => {
	res.status(418);
	res.json({
		error: "cant' implemented!"
    });
    log.warn("Try request:", req.body);
});

app.listen(PORT, (req, res) => {
	log.info("Server runned on " + PORT);
});
