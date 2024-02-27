import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/" ,async(req,res) => {
    try{
        const result= await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs",{
            secret: result.data.secret,
            user: result.data.username,
        });
    }catch(error){
        res.render("index.ejs",{secret:`Error: ${error.message}`});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});