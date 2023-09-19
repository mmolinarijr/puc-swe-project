import express from "express";
import cors from "cors";
import router from "./src/router.mjs";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use('/api', router);

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
