const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');


// Find inhabitable planets
function isHabitablePlanet(planet) {
  // Check Confirmation, Amount of Sunlight and the Planetary radius
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}


function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        // Parse the csv data into object and store
        fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv'))
          .pipe(parse({
            comment: '#',
            columns: true,
          }))
          .on('data', async (data) => {
            // Check habitability criteria
            if (isHabitablePlanet(data)) {
              // upsert into database
              savePlanet(data);
            }
          })
          .on('error', (err) => {
            console.log(err);
            reject(err);
          })
          .on('end', async () => {
            const countHabitablePlanets = (await getAllPlanets()).length;
            console.log(`${countHabitablePlanets} habitable planets found!`);
            resolve();
          });

    });
}


async function getAllPlanets() {
  return await planets.find({}, {
    '_id': 0, '__v': 0
  });
};


async function savePlanet(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true
    })  
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
};


module.exports = {
  loadPlanetsData,
  getAllPlanets,
};