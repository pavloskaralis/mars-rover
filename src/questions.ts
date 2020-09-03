const GRIDBOUNDS = {
    name: 'gridbounds',
    type: 'input',
    message: 'Please provide exploration grid bounds (example: "5 5"):'
}

const START_A = {
    name: 'startA',
    type: 'input',
    message: 'Please provide rover A starting coordinates and heading (example: "1 2 N"):'
}

const INSTRUCTIONS_A = {
    name: 'instructionsA',
    type: 'input',
    message: 'Please provide rover A path instructions (example: "LMLMLMLMM"):'
}

const START_B = {
    name: 'startB',
    type: 'input',
    message: 'Please provide rover B starting coordinates and heading (example: "3 3 E"):'
}

const INSTRUCTIONS_B = {
    name: 'instructionsB',
    type: 'input',
    message: 'Please provide rover B path instructions (example: "MMRMMRMRRM"):'
}

const RESTART = {
    name: 'restart',
    type: 'input',
    message: 'Would you like to plan another exploration? (yes/no)'
}

module.exports = {
    GRIDBOUNDS,
    START_A,
    INSTRUCTIONS_A,
    START_B,
    INSTRUCTIONS_B,
    RESTART
}