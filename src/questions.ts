const GRIDBOUNDS = {
    name: 'gridbounds',
    type: 'input',
    message: 'Please provide exploration grid bounds (example: "5 5"):'
}

const START_A = {
    name: 'startA',
    type: 'input',
    message: 'Please provide rover A starting coordinates and heading (example: "0 1 E"):'
}

const INSTRUCTIONS_A = {
    name: 'instructionsA',
    type: 'input',
    message: 'Please provide rover A path instructions (example: "LMRM"):'
}

const START_B = {
    name: 'startB',
    type: 'input',
    message: 'Please provide rover B starting coordinates and heading (example: "0 1 E"):'
}

const INSTRUCTIONS_B = {
    name: 'instructionsB',
    type: 'input',
    message: 'Please provide rover B path instructions (example: "LMRM"):'
}

module.exports = {
    GRIDBOUNDS,
    START_A,
    INSTRUCTIONS_A,
    START_B,
    INSTRUCTIONS_B
}