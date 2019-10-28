+const search = require("./search_multi_match.js");
const bodyParser = require('body-parser')
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get('/', function(){
    
})

app.post('/search', function(req, res) {
    console.log(req.body.text);  
    search(req.body.text).then(results => {
        let r = [];
        results.hits.hits.forEach((hit, index) => {
            data = {
                name: hit._source.name,
                content: hit._source.content,
                hits: hit._score
            }
            r.push(data);
            console.log(data.name);
        });
        res.send(r);    
    });
    });

app.listen(3000, function(){
    console.log("Server started work");
    
});