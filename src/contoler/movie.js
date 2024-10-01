const {Movie} = require("../model/movie")

const getData = async (req, res) => {
    const user = await Movie.find();
    res.json(user);
}

const getSingleData = async (req, res) => {
    const id = req.params.id;
    const user = await Movie.findOne({ _id: id });
    if (!user) {
        res.status(404).json({
            msg: "user not found"
        })
    } else {
        res.json(user);
    }
}

const createData = async (req, res) => {
    const data = req.body
    const fullname = data.fullname;
    const language = data.language;
    const size=data.size;
    const quality=data.quality;
    const source=data.source;
    const formate=data.formate;
    const subtitele=data.subtitele;

    const allData = await Movie.findOne({ fullname: fullname })

    if (allData) {
        res.json("data already existed")
    } else {

        await Movie.create({
            fullname:fullname,
            language:language,
            size:size,
            quality:quality,
            source:source,
            formate:formate,
            subtitele:subtitele

        })

        const alldata = await Movie.find();
        res.json({
            msg: "data created.",

        })
    }
}

const upadateData = async (req, res) => {
    const id = req.params.id;
    const user = await Movie.updateOne({ _id: id }, req.body);
    const updateUser = await Movie.findOne({ _id: id });
    if (!updateUser) {
       return res.status(404).json({
            msg: "user not found"
        })
    }
    if (!user) {
        res.status(404).json({
            msg: "user not found"
        })
    }
    res.json({ msg: "user update sucessefully" });
}

const deleteData = async (req, res) => {
    const id = req.params.id;
    const user = await Movie.deleteOne({ _id: id });
    if (user.deletedCount === 0) {
        res.status(404).json({
            msg: "user not found"
        })
    } else {
        res.json({ msg: "user detete sucessfully" });
    }
}

module.exports = {getData,getSingleData,createData,upadateData,deleteData }
