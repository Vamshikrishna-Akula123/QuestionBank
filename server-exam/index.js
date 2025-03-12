var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var connectionString = "mongodb://127.0.0.1:27017";

//API Routes

app.get('/get-admin', (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-questions", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tblquestions").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-categories", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tblquestions").distinct("CategoryName").then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get("/get-question/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tblquestions").find({Id:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})



app.get("/get-students", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tblstudents").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-student/:studentId", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tblstudents").find({StudentId:req.params.studentId}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/filter-questions/:categoryName", (req, res)=>{
    let categoryName = req.params.categoryName.trim();
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        database.collection("tblquestions").find({ CategoryName: { $regex: new RegExp(`^${categoryName}$`, "i") } }).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});


app.post("/student-register", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        var student = {
            StudentId: req.body.StudentId,
            StudentName: req.body.StudentName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile
        };

        database.collection("tblstudents").insertOne(student).then(()=>{
            console.log(`User Registered`);
            res.end();
        })
    })
});

app.post("/add-question", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");
        var question = {
            que: req.body.que,
            opt1: req.body.opt1,
            opt2: req.body.opt2,
            opt3: req.body.opt3,
            opt4: req.body.opt4,
            type: req.body.type,
            ans: req.body.ans,
            CategoryName: req.body.CategoryName,
            Id: parseInt(req.body.CategoryId)
        }

        database.collection("tblquestions").insertOne(question).then(()=>{
            console.log("Question Added");
            res.end();
        })
    })
})

app.put("/edit-question/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");

        var question = {
            que: req.body.que,
            opt1: req.body.opt1,
            opt2: req.body.opt2,
            opt3: req.body.opt3,
            opt4: req.body.opt4,
            type: req.body.type,
            ans: req.body.ans,
            CategoryName: req.body.CategoryName,
            Id: parseInt(req.body.Id)
        }

        database.collection("tblquestions").updateOne({Id:parseInt(req.params.id)}, {$set: question}).then(()=>{
            console.log("Question Updated Successfully..");
            res.end();
        })
    })
})

app.delete("/delete-question/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("onlinetest");

        database.collection("tblquestions").deleteOne({Id:parseInt(req.params.id)})
        .then(()=>{
            console.log("Question Deleted.");
            res.end();
        })
    })
})








app.listen(5080);
console.log(`Server Started : http://127.0.0.1:5080`);