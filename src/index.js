import app from "./app/app.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
