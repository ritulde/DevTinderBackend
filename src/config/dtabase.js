const mongoose = require("mongoose");
const connetDB = async () => {
  mongoose.connect(
    "mongodb+srv://ritulde601:9CTUaCZd6fiMQvQn@node.kpqrtsf.mongodb.net/devTinder"
  );
};

module.exports = connetDB;
