const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['NOAA', 'SPARRSO'],
    upcoming: true,
    success: true,
};


launches.set(launch.flightNumber, launch);

module.exports = {
    launches,
}