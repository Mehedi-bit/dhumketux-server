const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

// FIND inhabitable planets
function isHabitablePlanet(planet) {
  // Check Confirmation, Amount of Sunlight and the Planetary radius
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}


function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        // Convert the csv data into object and store
        fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv'))
          .pipe(parse({
            comment: '#',
            columns: true,
          }))
          .on('data', (data) => {
            // Check habitability criteria and move it to habitable planets
            if (isHabitablePlanet(data)) {
              habitablePlanets.push(data);
            }
          })
          .on('error', (err) => {
            console.log(err);
            reject(err);
          })
          .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
          });

    });
}


function getAllPlanets() {
  return habitablePlanets;
}


module.exports = {
  loadPlanetsData,
  getAllPlanets,
};