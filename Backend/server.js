const express = require ('express')
const mongoose = require ('mongoose')
const cors  = require ('cors')
const userRoutes = require ('./routes/userRoutes.js')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/randamUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error", err));

app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
