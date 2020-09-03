
module.exports = {
    startInput: function (string: string) {
        return string.match(/^\d+\s\d+\s[NESW]$/);
    }, 
    instructionsInput: function (string: string) {
        return string.match(/^[LRM]+$/);
    },
    gridboundsInput: function (string: string) {
        return string.match(/^[1-9]+\s[1-9]+$/);
    }
}