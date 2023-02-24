const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const Visitor = require("./db/models");

// db
require("./db/db");

//views
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", async function (req, res, next) {
  try {
    const user = await Visitor.findOne({ name: req.query.name });
    if (!user) {
      const newVisitor = new Visitor({
        name: req.query.name || "Anónimo",
        count: 1,
      });
      await newVisitor.save();
    } else {
      await user.updateOne({
        count: user.count + 1,
      });
    }
    const allVisitors = await Visitor.find({}).lean();
    res.render("main", { visitors: allVisitors });
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
