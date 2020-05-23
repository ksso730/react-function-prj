const express = require("express");
// 간단한 서버제작
const request = require("request");
// 다른 사이트 서버를 연결해서 데이터 읽기

const app = express();
// 서버생성

const port= 3355;
const mongoose = require("mongodb").MongoClient;
const MONGO_URL = `mongodb://211.238.142.181:27017`;

//port => 0~65535 (0~1023 사용중)
//port 충돌 방지
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// 서버 대기중
app.listen(port,()=>{
    console.log("Server Start...", "http://localhost:3355")
})

app.get("/",(request, response)=>{
    response.send("Hello Node Server !!")
})

/*
    몽고디비 =>  NoSQL
    find() => SELECT * FROM movie
    find({mno:1}) = SELECT * FROM movie WHERE mno=1
*/
// mongodb 연결
app.get("/movie",(request, response)=>{
    const mongoose = require("mongodb").MongoClient;
    //url
    mongoose.connect(MONGO_URL, (err, client)=>{
        var db= client.db("mydb");
        db.collection("movie").find({cateno:1}).toArray(function(err, docs){
            response.json(docs);
            client.close();
        });
    })
})

// movie_home?no=1&data=1
// request.query.data
app.get("/movie_home", (req, res)=>{
    //request.getParameter("no");
    var no = req.query.no;
    var site = "";
    if(no==1){
        site="searchMainDailyBoxOffice.do"
    } else if(no==2){
        site="searchMainRealTicket.do"
    } else if(no==3){
        site="searchMainDailySeatTicket.do"
    } else if(no==4){
        site="searchMainOnlineDailyBoxOffice.do"
    }
    var url="http://www.kobis.or.kr/kobis/business/main/"+site;
    request({url:url}, (err, request, json)=>{
        console.log(json);
        res.json(JSON.parse(json));
        // JSON.parse(json) json 이 문자열일 때 json 형식으로 넘김
    })

});

app.get("/movie_news",(request, response)=>{
    const mongoose = require("mongodb").MongoClient;
    //url
    mongoose.connect(MONGO_URL, (err, client)=>{
        var db= client.db("mydb");
        db.collection("news").find({})
            .toArray(function(err, docs){
                response.json(docs);
                client.close();
            });
    })
})

app.get("/movie_pop",(request, response)=>{
    const mongoose = require("mongodb").MongoClient;
    //url
    mongoose.connect(MONGO_URL, (err, client)=>{
        var db= client.db("mydb");
        db.collection("news_pop").find({})
            .toArray(function(err, docs){
                response.json(docs);
                client.close();
            });
    })
})














