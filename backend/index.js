import express from "express";
import mysql from "mysql";

const app = express()


const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Deven@1234",
    database:"cashprice"

})


app.use(express.json())

// app.get("/",(req,res)=>{
//     res.json("Hello this is backend")
// })       


// app.get("/tbl_login_master",(req,res)=>{
//     const q ="SELECT * FROM tbl_login_master"
//     db.query(q,(err,data) =>{
//         if(err) return res.json(err);
//          else   return res.json("hello")
//     })
// })
// app.get("/usermaster",(req,res)=>{
//     const q ="SELECT * FROM usermaster"
//     db.query(q,(err,data) =>{
//         if(err) return res.json(err);
//          else   return res.json(data)
//     })
// })

// app.post("/usermaster",(req,res)=>{
//     const q ="INSERT INTO usermaster(`Name`,`Email`,`Password`,`CreatedBy`,`CreatedDate`)VALUES(?)"
//     const VALUES =["omdapke","om@gmail.com","Deven@123","om@gmail.com",NOW()]
//     // const q2 = "INSERT INTO `tbl_login_master`(`LoginId`,`Email`,`Password`,`CreatedDate`,`CreatedBy`)VALUES(2,"om@gmail.com","om@123",NOW(),"om@gmail.com")"
//     db.query(q,[VALUES],(err,data) =>{
//         if(err) return res.json(err);
//         return res.json(data)
//     })
// })


// app.post("/usermaster",(req,res)=>{
//     const q ="INSERT INTO usermaster(`Name`,`Email`,`Password`,`CreatedBy`,`CreatedDate`)VALUES(?)"
//     const VALUES =["omdapke","om@gmail.com","Deven@123","om@gmail.com",NOW()]
//     // const q2 = "INSERT INTO `tbl_login_master`(`LoginId`,`Email`,`Password`,`CreatedDate`,`CreatedBy`)VALUES(2,"om@gmail.com","om@123",NOW(),"om@gmail.com")"
//     db.query(q,[VALUES],(err,data) =>{
//         if(err) return res.json(err);
//         return res.json(data)
//     })
// })

// app.listen(8800,()=>{
//     console.log("connected to backend")
// })


// Replace with your CoinMarketCap API key
const apiKey = 'YOUR_API_KEY';

const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC'; // Replace with desired symbol(s)

app.get('/api/crypto', async (req, res) => {
  try {
    const headers = {
      'X-CMC_PRO_API_KEY': apiKey,
    };
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      const data = response.data;
      if (data.status.error_code === 0) {
        const cryptoData = {};
        for (const [symbol, info] of Object.entries(data.data)) {
          cryptoData[symbol] = {
            name: info.name,
            symbol: info.symbol,
            price: info.quote.USD.price,
          };
        }
        res.json(cryptoData); // Send extracted data as JSON response
      } else {
        console.error("API Error:", data.status.error_message);
        res.status(500).json({ error: "API error occurred" }); // Handle API errors
      }
    } else {
      console.error("Network error:", response.statusText);
      res.status(500).json({ error: "Network error occurred" }); // Handle network errors
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" }); // Handle other errors
  }
});

const port = 8800; // Use port 8800 for Express server

app.listen(port, () => console.log(`Server listening on port ${port}`));