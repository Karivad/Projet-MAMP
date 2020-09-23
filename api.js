const express = require("express")
const app = express()
const port = 3000
const mysql = require('mysql2')
const bcrypt = require('bcrypt');
const { ok } = require("assert");
const saltRounds = 10;



app.use(
    express.urlencoded({
        extended :true
    })
);
app.use(express.json());

const con = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : 'Khmer200487?' ,
    database : 'autdb' ,
});

con.connect(function (err) {
    if(err) throw err;

    app.post("/sign-up", (req,res) => {
       try {
          
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                let dataUser = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hash}');`;
                con.query(dataUser, () => {
                    console.log(hash);
                    res.json("👌🏾") 
                
                })
            });
        });
    
       } catch (error) {
           console.log(error)
       }

    })

    app.post("/sign-in", (req,res) => {
        try {
            con.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, function(err, result){
                // if(err) throw err;
                // if(req.body.password === result[0].password)
                // console.log('u re connected 👍🏾')
                // else
                // console.log('sorry we dunno know this user 🙈')
                // res.send(result);
               var hash = result[0].password
               bcrypt.compare(req.body.password, hash, function(err, resultat) {
                    if (err) {console.log('error')}
                    else {
                        if (resultat == true) {
                            res.send('ok')
                            console.log('ok logged in')
                        }

                        else {
                            resultat == false
                            res.send('not connected')
                            console.log('not connected')
                        }
                    }
                });

            })
            
        } catch (error) {
            console.log(error)      
        }
   });

 
console.log('touchdown 🥇');
})

app.listen(port, () => {
    console.log('connected')

})
