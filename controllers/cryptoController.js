// controllers/cryptoController.js
import axios from "axios";
import { Crypto } from "../models/CryptoSchema.js"; // Change the import statement

export default async function fetchDataAndStoreInDatabase(req, res) {
  let cryptoDataArray; // Declare cryptoDataArray outside the try block

  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = response.data;

    const top10Tickers = Object.values(tickers).slice(0, 10);
    console.log(top10Tickers);

    cryptoDataArray = top10Tickers.map((ticker) => ({
      name: ticker.name,
      last: parseFloat(ticker.last),
      low: parseFloat(ticker.low),
      high: parseFloat(ticker.high),
      buy: parseFloat(ticker.buy),
      sell: parseFloat(ticker.sell),
      volume: parseFloat(ticker.volume),
      base_unit: ticker.base_unit,
    }));

    await Crypto.insertMany(cryptoDataArray);

    console.log("Data successfully fetched and stored in the database.");
  } catch (error) {
    console.error("Error fetching and storing data:", error.message);
    return res.status(500).json({
      success: false,
      error: "Error fetching and storing data",
    });
  }

  return res.status(200).json({
    success: true,
    cryptoDataArray,
  });
}
