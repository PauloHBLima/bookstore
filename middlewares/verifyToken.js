const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.berify(token, process.env.JWT_KEY);
        req.user = decode;
        return next();
    } 
    
        catch(error) {
        return res.status(401).json({message: "Requer altenticação"})  
        }      
}

module.exports = verifyToken;