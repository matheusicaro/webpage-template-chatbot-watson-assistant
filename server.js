//Criando servidor ouvir porta
var express = require('express');
var app = express();
var port = 3000;
console.log('Server liste in port '+port);

var bodyParser = require('body-parser');


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use(bodyParser.json({
    limit: '5mb'
}));


//watson api
var watson = require("watson-developer-cloud");

var conversationCredentials = {
    "username":"6f651379-6ad0-4dbb-8a26-dbe3a46fecc3",
    "password":"mT2KITpXjMFh",
    "workspace":"13dfcce6-777c-446e-9cc7-2593a4674fb2"
};

var conversation = new watson.ConversationV1({
  username: conversationCredentials.username,
  password: conversationCredentials.password,
  version: 'v1',
  version_date: '2017-05-26'
});





app.post("/chat", function(req,res){
    var msg = req.body ? req.body : {};
    msg.workspace_id = '13dfcce6-777c-446e-9cc7-2593a4674fb2';

    conversation.message(msg, function(erro, response){
        if (!erro){
            console.log(response);
            res.send(response);
        }else{
            console.error('error:', erro);
            res.send(erro);
        }
    })
});

app.listen(port);
  