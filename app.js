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

    app         = express(),
    op          = new operations(),

    apiUrl      = "https://api.themoviedb.org/3",
    apikey      = "api_key=62594d3da44c94f7189796a1ea71d84c",

    apiAction   = {
        search      : "/seach",
        discover    : "/discover",
        find        : "/find"
    },
    apiCategory = {
        movie       : "/movie",
        show        : "/tv"
    };
///

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
///

app.get("/", function(req, res){
    res.render("home");
})

app.get("/theater", function(req, res){
    let url = apiUrl + apiAction.discover + apiCategory.movie + "?" + apikey 
              + "&primary_release_date.gte=2018-01-15&primary_release_date.lte=2018-07-31";
    
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
    console.log("Moviaty is serving on port 3000");
})

//console.log(randomObj.generateID(7));