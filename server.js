const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb+srv://Moneer_masai:8802420364@masai.x9yst.mongodb.net/naukri")
}

const newSchema = new mongoose.Schema(
    {
        job_name: { type: String, required: true },
        company: { type: String, required: true },
        company_details: { type: String, required: true },
        notice_period: { type: Boolean, required: false, default: false },
        work_from_home: { type: Boolean, required: false, default: true },
        rating: { type: Number, required: true },

    },
    {
        versionKey: false,
        timestamps: true
    }
)

const naukri = mongoose.model("naukri", newSchema)

app.post("/naukri", async (req, res) => {
    const newUser = await naukri.create(req.body)
    res.status(201).send(newUser)
})
app.patch("/update/:id", async (req, res) => {
    const newUser = await naukri.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec()
    res.status(201).send(newUser)
})

app.get("/naukri", async (req, res) => {
    const newUser = await naukri.find().lean().exec()
    res.status(201).send(newUser)
})
app.get("/jobs", async (req, res) => {
    const newUser = await naukri.find().lean().exec()
    res.status(201).send(newUser)
})
app.get("/skill/:name", async (req, res) => {
    const newUser = await naukri.find({ job_name: req.params.name }).lean().exec()
    res.status(201).send(newUser)
})
app.get("/work-from-home", async (req, res) => {
    const newUser = await naukri.find({ work_from_home: true }).lean().exec()
    res.status(201).send(newUser)
})
app.get("/notice-period", async (req, res) => {
    const newUser = await naukri.find({ notice_period: true }).lean().exec()
    res.status(201).send(newUser)
})
app.get("/rating", async (req, res) => {
    const newUser = await naukri.find({ lt: {rating : 10} }).lean().exec()
   
    res.status(201).send(newUser)
})

app.get("/company/:name", async (req, res) => {
    const newUser = await naukri.find({ company: req.params.name }).lean().exec()
    res.status(201).send(newUser)
})
app.get("/details/:name", async (req, res) => {
    const newUser = await naukri.find({ company: req.params.name }).lean().exec()
    res.status(201).send(newUser[0].company_details)
})




app.get("/:id", async (req, res) => {
    const newUser = await naukri.findById(req.params.id).lean().exec()
    res.status(201).send(newUser)
})

app.delete("/:id", async (req, res) => {
    const newUser = await naukri.findByIdAndDelete(req.params.id).lean().exec()
    res.status(201).send(newUser)
})


/*

app.get("/:company:", async (req, res) => {
    const newUser = await naukri.filter(user =>{
        if (user.company === req.params.company) {
           console.log(user)
        }
    })
    res.status(201).send(newUser)
})

*/




app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345");
})