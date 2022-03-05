const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors')



const app = express();
const port = process.env.PORT || 5000;
//middlewire
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@studentmanagement.qkja8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        // console.log("connected")

        const database = client.db("BdTravelAgency");
        const hotPackCollection = database.collection("hotPack");
        const eventCollection = database.collection("events");
        const packageCollection = database.collection("packages");
        const usersCollection = database.collection("registerUser");
        const ordersCollection = database.collection("bookOrders");

        //-----------Hot Package Operation Start Here---------------//
        //post data hotPackage data
        app.post("/addHotPackage", async (req, res) => {
            // console.log(req.body)
            const result = await hotPackCollection.insertOne(req.body);
            res.json(result)
        })

        //get all hot package data
        app.get("/addHotPackage", async (req, res) => {
            const result = await hotPackCollection.find({}).toArray();
            res.send(result)
        })

        app.get("/addHotPackage/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await hotPackCollection.findOne(query)
            res.send(result)
        })
        //--------------Hot Package Operation End Here-------------------//

        //--------------Event OPERATION sTART Here-------------------//

        app.post("/addEvent", async (req, res) => {
            const result = await eventCollection.insertOne(req.body);
            res.json(result)
        })

        app.get("/addEvent", async (req, res) => {
            const result = await eventCollection.find({}).toArray();
            res.send(result)
        })
        //get single id
        app.get("/addEvent/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await eventCollection.findOne(query);
            res.send(result);
        })
        //--------------Event OPERATION End Here-------------------//

        //--------------Package OPERATION Start Here-------------------//
        //post data
        app.post("/addPackage", async (req, res) => {
            const result = await packageCollection.insertOne(req.body);
            res.json(result)
        })

        //get data
        app.get("/addPackage", async (req, res) => {
            const result = await packageCollection.find({}).toArray()
            res.send(result)
        });

        //get single package data
        app.get("/addPackage/:id", async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await packageCollection.findOne(query);
            res.send(result)
        })
        //--------------Package OPERATION End Here-------------------//

        ///user Registration operation//
        app.post("/users", async (req, res) => {

            const result = await usersCollection.insertOne(req.body)
            res.json(result);
        })

        app.get("/users", async (req, res) => {

            const result = await usersCollection.find({}).toArray();
            res.send(result)
        })
        //delete operation
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            // console.log(result)
            res.json(result)
        })
        ///user Registration operation end here//


        ///-----booking package  operation start hare------//

        app.post("/bookingPackage", async (req, res) => {

            const result = await ordersCollection.insertOne(req.body);
            res.json(result);
        });



        app.get("/bookingPackage", async (req, res) => {
            const result = await ordersCollection.find({}).toArray();
            res.send(result)
        })
        //delete booking package 
        app.delete("/bookingPackage/:id", async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.send(result)
        })

        //get booking package for single user;
        app.get("/bookingPackage/:email", async (req, res) => {
            const email = req.params.email;
            const result = await ordersCollection.find({ email: req.params.email }).toArray();

            res.send(result)

        });

        app.delete("/bookingPackage/delete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query)
            res.send(result)
        })
        //get single order 
        app.get("/bookingPackage/single/:id", async (req, res) => {
            const id = req.params.id;
            // console.log("single id is = ", id)
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.findOne(query)
            res.send(result)

        });


        app.put("/bookingPackage/single/:id", async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: updateUser,
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })





        ///-----booking package  operation end hare------//


    } finally {
        //await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    console.log("surver running")
    res.send("From Travel Agency Server")
})

app.listen(port, () => {
    console.log("Travel Agency Server is runnng port ", port)
})