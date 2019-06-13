var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//connection a la base de données mongodb
mongoose.connect("mongodb://127.0.0.1:27017/todo", { useNewUrlParser: true });
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model("Todo", todoSchema);

module.exports = function(app) {
    //Récupération des données depuis la base
  app.get("/todo", function(req, res) {
    Todo.find({},function(err, data) {
      if (err) {
        throw err;
      }
      res.render("todo", { todos: data });
    });
  });
  //Ajout de données
  app.post("/todo", urlencodedParser, function(req, res) {
    var newTodo = new Todo(req.body).save(function(err,data) {
      if (err) {
        throw err;
      }
      res.json(data);
    });
  });
  //Suppression de données
  app.delete("/todo/:item", function(req, res) {
    Todo.find({ item: req.params.item.replace(/\-/, "") }).remove(function(err,data) {
      if (err) {
        throw err;
      }
      res.json(data);
    });
  });
};
