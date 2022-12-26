const launches = new Map();

let latestFlightNumber = 100;

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


launches.set(launch.flightNumber, launch);


function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['NOAA', 'SPARRSO'],
            flightNumber: latestFlightNumber,
        })
    );
}


module.exports = {
    getAllLaunches,
    addNewLaunch,
}




