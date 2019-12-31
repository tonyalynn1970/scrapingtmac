const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');
const path = require('path');
// var logger = require("morgan");
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const db = require('./models/index');

const app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


mongoose.connect("mongodb://localhost/Scrapers", { useNewUrlParser: true });
app.get("/", function (req, res) {
    db.Article.find({})
        .then(function (dbArticles) {
            console.log(dbArticles)
            res.render("home", { articles: dbArticles });

        })
});
app.get("/scrape", function (req, res) {

    axios.get("https://news.ycombinator.com/").then((response) => {

        const results = [];

        const $ = cheerio.load(response.data);
        const output = $('.storylink')
        for (let i = 0; i < output.length; i++) {

            var title = $(output[i]).text()
            const link = $(output[i]).attr("href")

            if (title && link) {
                results.push({
                    _id: "",
                    title: title,
                    link: link
                })
                var r = {
                    title: title,
                    link: link
                }
                db.Article.create(r)
                    .then(function (dbArticle) {

                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            }

        };
        res.redirect('/')
    }


    )
})



app.post("/articles/:id", function (req, res) {

});

app.listen(3000, function () {
    console.log("App running on port 3000");

});

