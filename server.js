const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

axios.get("https://news.ycombinator.com/").then((response) => {
    // console.log(response.data)
    // const $ = cheerio.load(html);

    const $ = cheerio.load(response.data);
    const output = $('.storylink')
    for (let i = 0; i < output.length; i++) {
        // console.log(output[i])
        var linktext = $(output[i]).text()
        console.log(linktext)
        results.push({
            title: title,
            link: link
        })
    }

});
