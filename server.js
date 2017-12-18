//declarações necessarias
var cfenv = require('cfenv');
var express = require('express');
var bodyParser = require('body-parser');

//acesso ao cloud foundry
var appEnv = cfenv.getAppEnv();

//Criando servidor ouvir porta
var app = express();


// jogando a pasta public para net, ou seja, somente ela estará disponivel  para acesso
app.use(express.static(__dirname + '/public'));

//limitando arquivos de transição
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

app.listen(appEnv.port, appEnv.bind, function() {
    console.log("escutando na porta: "+appEnv.url)
});
  