const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        username : "krutik@gmail.com",
        password:"123",
        name : "krutik gevariya",
    }
    ,
    {
        username : "naren@gmail.com",
        password:"123321",
        name : "Naren Zadafiya",
    }
    ,{
        username : "Nayan@gmail.com",
        password:"123321",
        name : "Nayan Sorathiya",
    }
    ,
];

function userExists(username, password){
    // Write logic to return true or false if this user exists
    // in ALL_USERS array
    for(let i=0;i<ALL_USERS.length;i++)
    {
        if((username == ALL_USERS[i].username) && (password == ALL_USERS[i].password))
        {
            return true;
        }
    }
    return false;
}


app.post("/signup", function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist in our in memory db",
        });
    }

    var token = jwt.sign({username: username} , jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function(req,res) {
    const token = req.headers.authorization;
    // try{
    const decode = jwt.verify(token, jwtPassword);
    const username = decode.username;
    res.json({
        users: ALL_USERS
    });
    // }
    // catch (err) { 
    //     return res.status(403).json({
    //         msg : "Invalid token",
    //     });
    // }
});

app.listen(3000);