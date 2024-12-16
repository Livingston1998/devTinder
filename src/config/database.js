const mongoose = require("mongoose");

const connectDB = async()=> {
    await mongoose.connect("mongodb+srv://rdavidlivingstone:david21@namastenode.1didy.mongodb.net/devTinder");
    // await mongoose.connect("mongodb://rdavidlivingstone:david21@namastenode-shard-00-00.1didy.mongodb.net:27017,namastenode-shard-00-01.1didy.mongodb.net:27017,namastenode-shard-00-02.1didy.mongodb.net:27017/?ssl=true&replicaSet=atlas-jbpt41-shard-0&authSource=admin&retryWrites=true&w=majority&appName=NamasteNode");
};

module.exports = connectDB;
