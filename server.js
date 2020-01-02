const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');
const path = require('path');

const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const db = require('./models/index');

const app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Scrapers";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", function (req, res) {
    db.Article.find({})
        .then(function (dbArticles) {
            console.log(dbArticles)
            res.render("home", { articles: dbArticles });

        })
});
app.get("/scrape", function (req, res) {
    console.log('hit')

    axios.get("https://news.ycombinator.com/").then((response) => {

        const results = [];

        const $ = cheerio.load(response.data);
        const output = $('.storylink')
        console.log(output)
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
                console.log(r)
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App running on port 3000");

});

