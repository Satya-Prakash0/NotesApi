const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "NotesApi";

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;  // Corrected line
        if (token) {
            token = token.split(" ")[1]; // Corrected line
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else {
            res.status(401).json({ message: "Unauthorized user" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized user" });
    }
}

module.exports = auth;
