
var generateHTML = require("./Generatehtml")

var inquirer  = require("inquirer")

var fs = require('fs');
var pdf = require('html-pdf');
var axios = require('axios')

var data = {}

function askQuestions () {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your github username?",
            name: "username"
        },
        {
            type: "list",
            message: "please select a color",
            name: "color",
            choices: ["blue" , "green" , "pink" , "red"]

        }
    ]).then(function(input){

         axios.get("https://api.github.com/users/" + input.username).then(function(response){
              data.name = response.data.name
              data.avatar_url = response.data.avatar_url
              data.company = response.data.company
              data.location = response.data.location
              data.bio = response.data.bio
              data.public_repos = response.data.public_repos
              data.followers = response.data.followers
              data.following = response.data.following
              data.color = input.data.color
              axios.get("https://api.github.com/users/"+input.username+"/starred").then(function(response2){
                  var listStars = response2.data
                     var stargazers_count  = 0    
                  for (let index = 0; index < listStars.length; index++) {
                           
                    stargazers_count += listStars[index].stargazers_count
                  }
                  
                  data.stargazers_count = stargazers_count 
              })

              var html = generateHTML(data)

              fs.writeFile("./index.html",html,function(err,data){

              })
         })

    })
}

askQuestions()