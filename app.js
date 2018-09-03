// App Api Key from TMDB: API Key (v3 auth) :62594d3da44c94f7189796a1ea71d84c
//
// API Read Access Token (v4 auth): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjU5NGQzZGE0NGM5NGY3MTg5Nzk2YTFlYTcxZDg0YyIsInN1YiI6IjViNjA0Njg0YzNhMzY4NTgzYzAwZGYyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-XsQ0CoB8d5BdodRS0u4mkGhh1Qzm5SwoBLHC9Z4jho
//
// https://api.themoviedb.org/3/movie/550?api_key=62594d3da44c94f7189796a1ea71d84c
//
// https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=62594d3da44c94f7189796a1ea71d84c

var express     = require("express"),
    request     = require("request"),
    bodyParser  = require("body-parser"),
    operations  = require("./controls/operations.js"),
    
    //// Usage of vars
    app         = express(),
    op          = new operations(),
    
    //// API Attrubutes
    apiUrl      = "https://api.themoviedb.org/3",
    apikey      = "api_key=62594d3da44c94f7189796a1ea71d84c",

    apiAction   = {
        search      : "/search",
        discover    : "/discover",
        find        : "/find"
    },
    apiCategory = {
        movie       : "/movie",
        show        : "/tv"
    };

/// App.use

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/// Routing

app.get("/", function(req, res){
    
    res.render("home");
      
})


// On theatre movies
function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getLastmonth(){
    var last = new Date();
    var dd = last.getDate();
    var mm = last.getMonth()+1; //January is 0!
    var yyyy = last.getFullYear();

    if(mm > 1) mm -= 1;
    else mm = 12;

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    }

    last = yyyy + '-' + mm + '-' + dd;
    return last;
}

app.get("/on_theater", function(req, res){
    let today  = getCurrentDate(),
        lastmn = getLastmonth(),

        url    = apiUrl + apiAction.discover + apiCategory.movie + "?" + apikey 
               + "&primary_release_date.gte=" + lastmn + "&primary_release_date.lte=" + today;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){ 
            let data = JSON.parse(body);
            //console.log(data);
            res.render("index", {movies: data.results});
        }
    })
    //res.redirect("/show/id/" + id);   
})

app.get("/view/:id", function(req, res){
    let id  = req.params.id,
        url = apiUrl + apiCategory.movie + "/" + id + "?" + apikey;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){ 
            let data = JSON.parse(body);
            //console.log(data);
            res.render("show", {movie: data});
        }
    })
})

app.post("/search", function(req, res){
    let title = req.body.title;
    res.redirect("/search/" + title);   
})

app.get("/search/:title", function(req, res){
    let title = req.params.title,
        url   = apiUrl + apiAction.search + apiCategory.movie + "?" + apikey 
              + "&query=" + title;
    
    console.log(url);
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){ 
            let data = JSON.parse(body);
            //console.log(data);
            res.render("search", {movies: data.results});
        }
    })
    //res.redirect("/show/id/" + id);   
})

app.listen(3000, function(){
    console.log("MTGate is serving on port 3000");
})

//console.log(randomObj.generateID(7));