
const express = require('express');
const { MongoClient } = require('mongodb');
const { listenerCount } = require('process');
const uri = "mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority";
//const uri = "mongodb://jblant00:jblant00_spoty.@127.0.0.1:27018/db-musicot-e";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var cors = require('cors');
var app = express();
app.use(cors());

client.connect(open => {

  // perform actions on the collection object
  app.get('/accidentabilidad', function(req, res){
    const collection = client.db("Anthem").collection("Accidentabilidad");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });

  app.get('/autobuses', function(req, res){
      const collection = client.db("Anthem").collection("Autobuses");
      collection.find().toArray((error, datos) => {
          if(error) {
              console.log(error);
              res.send('');
          }
          res.send(datos);
          });
      });

  app.get('/cercanias', function(req, res){
      const collection = client.db("Anthem").collection("Cercanias");
      collection.find().toArray((error, datos) => {
          if(error) {
              console.log(error);
              res.send('');
          }
          res.send(datos);
          });
      });

  app.get('/contacus', function(req, res){
    const collection = client.db("Anthem").collection("ContAcus");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });

  app.get('/interurbano', function(req, res){
    const collection = client.db("Anthem").collection("Interurbano");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });

  app.get('/metro', function(req, res){
    const collection = client.db("Anthem").collection("Metro");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });

  app.get('/metroligero', function(req, res){
    const collection = client.db("Anthem").collection("MetroLigero");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });

  app.get('/patinetes', function(req, res){
    const collection = client.db("Anthem").collection("Patinetes");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });
  
  app.get('/taxi', function(req, res){
    const collection = client.db("Anthem").collection("Taxi");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });
    
  app.get('/trafico', function(req, res){
    const collection = client.db("Anthem").collection("Trafico");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });

  app.get('/ubiacustica', function(req, res){
    const collection = client.db("Anthem").collection("UbiAcustica");
    collection.find().toArray((error, datos) => {
        if(error) {
            console.log(error);
            res.send('');
        }
        res.send(datos);
        });
    });
    app.get('/contenedores', function(req, res){
        const collection = client.db("Anthem").collection("Contenedores");
        collection.find().toArray((error, datos) => {
            if(error) {
                console.log(error);
                res.send('');
            }
            res.send(datos);
            });
        });

  //client.close();
});


app.listen(3000);