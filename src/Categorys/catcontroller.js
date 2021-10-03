const db = require('../Categorys');
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'Please enter name of the category'
        });
        return;
    }

    const category = {
        name: req.body.name,
        color: req.body.color,
    };

    Category.create(category)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'some error occured while creating a category'
            });
        });
}

exports.findCategoryNumber = (req, res) => {

    Category.sequelize.query("Select (select name from categories WHERE id=news.cat_id) as name, (select color from categories WHERE id=news.cat_id) as color ,count(*) as nums from news group by cat_id;")
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:  'some err while retrieving categories',
                
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}` } } : null;

    Category.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:  'some err while retrieving categories',
                
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "err getting category with the id = " + id
            });
        });
}
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `${num} category updated successfully`
                })
            } else {
                res.send({
                    message: "can not update Category with the id = " + id + "maybe it is more then one"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'error updating category with the id = ' + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category deleted successfully"
                });
            } else {
                res.send({
                    message: "cannot delete category with id=" + id + " maybe it is more than one"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error deleting category with the id=" + id
            });
        });
}