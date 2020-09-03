module.exports = {
    startInput: function (string: string) : boolean {
        return string.match(/^\d+\s\d+\s[NESW]$/) ? true : false;
    }, 
    instructionsInput: function (string: string) : boolean {
        return string.match(/^[LRM]+$/) ? true : false;
    },
    gridboundsInput: function (string: string) : boolean {
        return string.match(/^[1-9]+\s[1-9]+$/) ? true : false;
    }
}