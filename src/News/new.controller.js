const db = require("../News");
const jwt = require('jsonwebtoken')
const News = db.news;
const Op = db.Sequelize.Op;







exports.create = (req, res) => {
    console.log(req.body);
    if (!req.file) {
        return res.status(400).send({
            message: "Content can not be empty!  Dostonbek please fill smth in body form"
        });
    }
    
    const news = {
        cat_id: req.body.cat_id,
        title: req.body.title,
        text: req.body.text,
        author:req.body.author,
        date:req.body.date,
        image:`${req.protocol + "://" + req.get("host") + "/public/img/" + req.file.filename}`,
    };
    

    News.create(news)
        .then(data => {
            res.send(data)
            
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while creating the news"
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}` } } : null;

    News.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while retrieveing news"
            });
        });
}
exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "error retrieving news with the id=" + id

            });
        });
};

exports.update = (req, res) => {
console.log("ewewerwer",req.body);
    console.log("qwerewwewwewerewe",req.file);
    const id = req.params.id;

    News.update(req.body ,{
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News updated successfully"
                });
            } else {
                res.send({
                    message: "cannot update News with id=" + id + " maybe it is more than one"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error updating News with the id=" + id
            });
        });

}

exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News deleted successfully"
                });
            } else {
                res.send({
                    message: "cannot delete News with id=" + id + " maybe it is more than one"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error deleting user with the id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    News.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} News were deleted succeessfully`
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while removing all users"
            });
        });
};


