const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());


server.get("/api/accounts", (req, res) => {

    db.select('*').from('accounts')
      .then(accounts => {
        res.status(200).json({data: accounts})
      })
      .catch(err => {
         res.status(500).json({error: "Could not load accounts." })
      })
  
})

server.post("/api/accounts", (req, res) => {
    
    db('accounts').insert(req.body)
        .then(newAccountId => {
            res.status(200).json({ data: newAccountId })
        })
        .catch(err => {
            res.status(500).json({error: "Could not create account data." })
         })


})

server.put("/api/accounts/:id", (req, res) => {
    
    db('accounts').where({ id: req.params.id }).update(req.body)
        .then(count => {
          res.status(200).json({Success: `${count} account(s) updated` })
        })
        .catch(err => {
          res.status(500).json({error: 'Could not update account info.'})
        })

})


server.delete("/api/accounts/:id", (req, res) => {

    db('accounts').where({ id: req.params.id }).del()
        .then(count => {
          res.status(200).json({Success: `${count} account(s) deleted` })
        })
        .catch(err => {
          res.status(500).json({error: 'Could not delete account.'})
        })
    
})



module.exports = server;
