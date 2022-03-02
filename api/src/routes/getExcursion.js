const { Router } = require ("express");
const { Excursion } = require('../db');
const getExcursion = Router ();

getExcursion.get("/", async (req, res, next) => {
try{
      const { name } = req.query;
      if (name){
          const excursionName = await Excursion.findAll({
              where : {
                  name: name
              }
          });
          excursionName.length? res.status(200).send(excursionName)
          : res.status(500).send("Excursion not found");
      } else {
          const excursion = await Excursion.findAll()
          return res.status(200).send(excursion)
      }
        }
    catch (error) {
       next(error)
   }
})

module.exports = getExcursion;