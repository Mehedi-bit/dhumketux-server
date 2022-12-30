const { 
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}


function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    // if launch doesn't exist
    if (!existsLaunchWithId(launchId)){
        res.status(404).json({
            error: 'Launch not found',
        })
    }

    // if launch does exist
    const aborted = abortLaunchById(launchId);
    res.status(200).json(aborted);
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};