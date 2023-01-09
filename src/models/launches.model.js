const launchesDatabase = require('./launches.mongo');
const planets = require('../models/planets.mongo');


const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NOAA', 'SPARRSO'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort({'flightNumber': -1})

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDatabase
        .find({}, { '_id': 0, '__v': 0})
}

async function saveLaunch(launch) {
    // Check if the target of the launch is in the inhabitable planets database
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error("No matching planet found!")
    }
    // Save the launch
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, { 
        upsert: true,
    });
}


async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NOAA', 'SPARRSO'],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch);
}


async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    })
    
    return aborted.acknowledged === true && aborted.modifiedCount === 1;
}


module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}




