const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const AuthController = {
    store: async (req,res) => {
const { name, email, password} = req.body;


const hash = bcrypt.hashSync(password, 10)
const user = await User.create({
    name,
    email,
    password: hash
});

return res.status(201).json(user);
},

login: async (req,res)=>{
    const { email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if(!user || bcrypt.compareSync(password, user.password)) {
        return res.status(400).json ({message: "não foi possivel cadastrar com sucesso"})
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,  
    },  
    process.env.JWT_KEY,
    {
        expiresIn: "1h"
    })

    return res.status(200).json ({message: "autenticação realizada com sucesso", token})
}
};




module.exports = AuthController;
