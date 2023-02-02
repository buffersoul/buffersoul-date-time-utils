require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
const DateTime = require("./src/utils/DateTime");

app.get("/", async (req, res) => {
    let dateTime = new DateTime();
    let offset = dateTime.getOffset({ miliseconds: true });
    let local_date = dateTime.getDate({ local: true });
    let utc_date = dateTime.getDate({ utc: true });
    let utcMiliseconds = dateTime.getDate({ utcMiliseconds: true });
    let utcSeconds = dateTime.getDate({ utcSeconds: true });
    let localMiliseconds = dateTime.getDate({ localMiliseconds: true });
    let localSeconds = dateTime.getDate({ localSeconds: true });

    res.send({
        offset: offset,
        local_date: local_date,
        utc_date: utc_date,
        utcMiliseconds: utcMiliseconds,
        utcSeconds: utcSeconds,
        localMiliseconds: localMiliseconds,
        localSeconds: localSeconds,
    });
});

app.listen(3005, () => {
    console.log("http://localhost:3005");
});
