const db = require("../Users");
const jwt = require('jsonwebtoken')
const User = db.users;
const Op = db.Sequelize.Op;
const { ErrorHandler } = require("./../util/error");


exports.auth = async (req, res, next) => {
    try {
        const Data = await User.findAll()

        if (!Data) throw new Error();
        
        console.log(Data);
        for(var i of Data){
            if(i.login === req.body.login && i.password === req.body.password){
                var person = i
            }
        }        

        if(!person) {
            return res.status(400).send({
                status: 400,
                message: "User not found"
            })
        }

        const token = jwt.sign(
            {
                id: person.id,
                title: person.title,
                role: "admin",
            },
            process.env.TOKEN_SECRET_KEY,
            { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRESIN }
        );

        return res.status(200).json({ token });

    } catch (err) {
        return next(new ErrorHandler(403, "Forbidden access"));
    }
},


exports.create = (req, res) => {
        if (!req.body.login) {
            res.status(400).send({
                message: "Content can not be empty!  Dostonbek please fill smth in body form"
            });
            return;
        }



        const users = {
            login: req.body.login,
            password: req.body.password,
            username: req.body.username,
            published: req.body.published ? req.body.published : false
        };

        User.create(users)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "some error occured while creating the user"
                });
            });
    };

exports.findAll = (req, res) => {
    const login = req.query.login;
    var condition = login ? { login: { [Op.like]: `%${login}` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while retrieveing users"
            });
        });
}
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "error retrieving User with the id=" + id

            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User updated successfully"
                });
            } else {
                res.send({
                    message: "cannot update User with id=" + id + " maybe it is more than one"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error updating user with the id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User deleted successfully"
                });
            } else {
                res.send({
                    message: "cannot delete User with id=" + id + " maybe it is more than one"
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
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} users were deleted succeessfully`
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while removing all users"
            });
        });
};

exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while retrieving users"
            });
        });
}
