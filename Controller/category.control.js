const Category = require('../Model/Category.js')

let getCategories = (req, res) => {
    Category.find({}, (err, Category) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: Category
            });

        }
    })
}

let postCategory = (req, res) => {
    let newCategory = new Category(req.body);
    newCategory.save((err, Category) => {
        if(err) {
            res.send(err)
        } else {
            res.status(200).json({code: 200, data: Category})
        }
    })
}

let getCategory = (req, res) => {
    Category.find({_id: req.params.categoryId}, (err, category) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: category[0]
            });

        }
    })
}



module.exports = {
    getCategory: getCategory,
    getList: getCategories,
    doPost: postCategory
}