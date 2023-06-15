import bodyParser from "body-parser";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { fileURLToPath } from "url";
import productsRoutes from './routes/product.js';
import db from './db/index.js';
import express from "express";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//import router
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use('/product', productsRoutes)
const PORT = process.env.PORT || 8080;
/*ان الport لو مشتغلش يشتغل على 6001 */
db()
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));