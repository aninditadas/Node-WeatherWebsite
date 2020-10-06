const path = require("path")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const express = require("express")
const hbs = require("hbs")
const app = express()

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("views", viewsPath)
app.set("view engine", "hbs") //to set up handlebars
hbs.registerPartials(partialsPath) //partials are used to retain code liek header which remains same throughout all pages of the website

//handlebars are used to provide dynamic pages and uses render instead of send and hbs is handlebar which is more integrated with express
app.use(express.static(publicDirectoryPath)) //setup static directory to use

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "andrew",
  })
})

//render has first argument as .hbs doc name
app.get("/about", (req, res) => {
  res.render("about", {
    name: "andrew",
    title: "holla",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    message: " This is a help message",
    title: "weather app",
    name: "andrew",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "enter an address",
    })
  }
  //default values
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error,
      })
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error,
        })
      }
      res.send({
        forecastdata: forecastdata,
        location,
        address: req.query.address,
      })
    })
  })
})

//can use res only once
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "provide a search term",
    })
  }
  res.send({
    products: [],
  })
})

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "andrew",
    errorMessage: "help 404 found",
  })
})
//needs to come last as it matches with everything
// * means everything is a match
app.get("*", (req, res) => {
  res.render("404page", {
    errorMessage: "page not found",
    name: "andrew",
    title: "404",
  })
})

app.listen(3000, () => {
  console.log("server is up")
})
