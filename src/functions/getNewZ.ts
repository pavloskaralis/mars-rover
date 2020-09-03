module.exports = {
    getNewZ: function (currentZ: string, direction: string): string {
        return {
             N: {L: 'W', R: 'E'},
             E: {L: 'N', R: 'S'},
             S: {L: 'E', R: 'W'},
             W: {L: 'S', R: 'N'} 
        }[currentZ][direction]
     }
}

