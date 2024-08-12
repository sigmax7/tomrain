import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

const API_KEY = "a32850bceb824bbda93161124241108";
app.use(bodyParser.urlencoded({extended : true}));

const d = new Date();
const yy = d.getFullYear();
const mm = d.getMonth()+1;
const dd = d.getDate() +1;

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

app.post("/submit" ,async (req,res) => {
   const city = req.body.loc;
    try{
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&dt=${yy}-${mm}-${dd}`);
       const result = response.data.forecast.forecastday[0];
        res.render("index.ejs",{content : result});
 
    } catch(error) {
        res.render("index.ejs",{content : JSON.stringify(error.response.data) });
    }
}
);


app.listen(port ,() => {
    console.log(`Server listening on port ${port}`);
});
