const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require('./database/database')
const questionModel = require('./database/models/Question')
const answerModel = require('./database/models/Answer')

connection
    .authenticate()
    .then(()=> {
        console.log("conexao feita")
    })
    .catch((error)=>{
        console.log("erro: ", error)
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {   
        res.render("index")
})

app.get("/questions", (req, res)=> {
    res.render("questions")
})

app.get("/showQuestion/:id", (req, res)=>{
    let id = req.params.id;
    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){
            answerModel.findAll({
                where: {perguntaId: question.id}
            }).then(resposta =>{
                res.render("answerQuestion",{
                    question :question,
                    answer: resposta
            });
            })

            
    }else {
            res.redirect("/")
        }
    })
})

app.get("/pickQuestion", (req, res)=>{
const field = req.query.field || 'id'
const dir = req.query.dir || 'DESC'

    questionModel.findAll({raw:true, order: [
    [field, dir]
    ]}).then(questions => {
        res.render("pickQuestion", {questions, field, dir}, console.log(questions))
    })
})

app.post("/savequestion", (req, res) => {
    let title =  req.body.titulo
    let desc =  req.body.descricao
    questionModel.create({
        titulo: title,
        descricao: desc
    }).then(()=>{
        res.redirect('/')
    });
})

app.post("/answerquestion", (req, res) => {
    let answer =  req.body.answer
    let questionId =  req.body.questionId
    answerModel.create({
        resposta: answer,
        perguntaId: questionId
    }).then(()=>{
        res.redirect('/showQuestion/'+questionId)
    });
})

app.listen(8080, (error)=>{
    if(error){
        console.log("erro:", error)
    } else{
        console.log("td certo")
    }
})