const { Book } = require('../models');

const BooksV1Controller = {
    list: async (req, res) => {
        try {
            const books = await Book.findAll();
            return res.status(200).json(books);
        } catch (error) {
            console.log(error);

            if (error.name === "sequelizeConnectionRefusedError") {

                return res.status(500).json({ error: true, message: "sistema indisponivel" });
            }

            return res.status(400).json({ error: true, message: "requisição mal feita" })

        }
    },

    getOneBook: async (req, res) => {
try {
    const {id} = req.params;
    const book = await Book.findByPk(id);

    if(!book){
        return res.status(404).json("Livro não encontrado");

    }
    return res.status(200).json(book);

} catch(error){
    console.log(error);
    if (error.name === "SequelizeConnectionRefusedError"){
        return res.status(500).json({error: true, message:"Sistema indisponivel"});

    }
    return res.status(400).json({error: true, message: "Requesição mal feita"});
}
    },

    store: async (req, res) => {  //cadastrar um livro
        try {
            const { title, total_pages, author, release_year, stock } = req.body;

            const verifyBookExists = await Book.findOne({ where: { [Op.and]: [{ title }, { author }] } })

            if (verifyBookExists) {
                return res.status(422).json("Este Livro já está cadastrado");
            }
            const book = await Book.create({ title, total_pages, author, release_year, stock });
            return res.status(201).json(book);
        } catch (error) { }
    },

    update: async (req, res) => {
        try {

            const { id } = req.params;

            const [title, total_pages, author, release_year, stock] = req.body;

            const verifyBookExists = await Book.findByPk(id);
            if (!verifyBookExists) {
                return res.status(404).json("Livro não encontrado");
            }
            await Book.update({ title, total_pages, author, release_year, stock }, { where: { id } });
            const book = await Book.findByPk(id);

            return res.status(200).json(book)
        } catch { error } { 
            console.log(error);
        }
    },

    delete: async (req, res ) => {
        const {id} = req.params;
        const book = await Book.findByPk(id);

        if(!book){
            return res.status(400).json
        }
    }

};

module.exports = BooksV1Controller;