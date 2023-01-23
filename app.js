
const express = require("express"); 
const bodyParser = require("body-parser");    //requiring the express module
const https = require("https");
// const request = require("request");

const app = express();  //initalising the new express app

app.use(express.static("public"));  //a static folder called public
app.use(bodyParser.urlencoded({extended: true   }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){   //home route

    var fistname = req.body.Fname;  //pulling the information from the form and storing then into these variables.
    var surname = req.body.Sname;
    var email = req.body.email;

    var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fistname,
                LNAME: surname
            }
        }
    ]
    };

    var jsonData = JSON.stringify(data);   //this is what we're sending to mailchamp.

    const url = "https://us12.api.mailchimp.com/3.0/lists/8179fce917/members";

    const options = {
        method: "POST",
        auth: "morongwa:d570aaabe9554dbe7ec3eecbdad90dd2-us12"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html");
        } else {
                res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    // request.write(jsonData);
    request.end();

    });

    app.post("/failure", function(req,res){   //redirecting the try again button the home ("/") route.
        res.redirect("/")

    });

app.listen(3000, function(){     // listening on port 3000m and adding a call back function
    console.log("Server running on port 3000.")
});


// d570aaabe9554dbe7ec3eecbdad90dd2-us1 2

// 8179fce917

