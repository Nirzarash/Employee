const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save" , (req,res) => {
	console.log("Data received:",req.body)
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("task4db");
	const coll = db.collection("client");
	const record = { "_id": req.body.id, "name": req.body.name,"salary": req.body.salary};
	coll.insertOne(record)
	.then(result => res.send(result))
	.catch(error => res.send(error));	
})
app.get("/read",(req,res) => {
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("task4db");
	const coll = db.collection("client");
	coll.find({}).toArray()
	.then(result => res.send(result))
	.catch(error=> res.send(error));	
})
app.put("/change", (req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("task4db");
	const coll = db.collection("client");
	coll.updateOne({"_id" : req.body.id}, {"$set":{"name" : req.body.name, "salary" : req.body.salary}})
	.then(result => res.send(result))
	.catch(error => res.send(send));
})
app.delete("/remove", (req,res) => {
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("task4db");
	const coll = db.collection("client");
	const data = {"_id" : req.body.id};
	coll.deleteOne(data)
	.then(result => res.send(result))
	.catch(error => res.send(error));
})
app.listen(9000, () => {console.log("ready @9000");});