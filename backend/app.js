const express = require("express");
const app = express();
const port = 4000;
const authRouter = require("./auth");
const ideaRouter = require("./idea");
const faqRouter = require("./faq");
const portfolioRouter = require("./routes/portfolio.route");
const storiesRoutes = require("./routes/storiesRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const notificationRoutes = require("./routes/notification.route");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const editProfileRoutes = require("./routes/investorProfileEdit")

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(session({
  secret: 'KJFBNKDJbfkjsbdkfKFDFKjsbfkefbbKFbkfe499f9d87fd7f',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use("/stories", storiesRoutes);
app.use("/portfolio", portfolioRouter);
app.use("/users", authRouter);
app.use("/", ideaRouter);
app.use("/", faqRouter);
app.use("/api", ratingRoutes);
app.use("/notification", notificationRoutes);
app.use("/profile", editProfileRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
