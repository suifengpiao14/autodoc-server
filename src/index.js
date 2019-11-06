const express = require('express');
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const path=require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/v1/openapi",addOpenapi);
app.get("/openapi.json",getOpenapi);

function addOpenapi(request,response){
    doDbAction(function(db){
        const dbo = db.db("document");
        const row ={"name":request.body.name,"document":request.body.document};
        dbo.createCollection('openapi', function (err, res) {
            if (err) throw err;
            console.log("创建集合!");
            dbo.collection("openapi").insertOne(row, function(err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                response.send("ok");
            });
        });

    });
}

function getOpenapi(request,response){
    doDbAction(function(db){
        const dbo = db.db("document");
        dbo.collection("openapi").findOne.toArray(function(err, doc) {
            assert.equal(err, null);
            console.log("Found the following record");
            console.log(doc);
            response.set('Content-Type', 'application/json');
            response.send(doc);
          });

    });
}




function start(options){
    app.options = options;
    app.listen(options.port, function () {
        console.log('Example app listening on port '+options.port+"!");
        const staticDir=path.join(__dirname,'/../documentation-starter');
        app.use('/', express.static(staticDir));
      });
}

// 操作db
function doDbAction(action){
    MongoClient.connect(app.options.mongodb, { useUnifiedTopology:true ,useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        action(db);
        //db.close();
      });
}


app.start=start;


module.exports ={
    app:app
}