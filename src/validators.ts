module.exports = {
    startInput: function (string: string) : boolean {
        return string.match(/^\d+\s\d+\s[NESW]$/) ? true : false;
    }, 
    instructionsInput: function (string: string) : boolean {
        return string.match(/^[LRM]+$/) ? true : false;
    },
    gridboundsInput: function (string: string) : boolean {
        return string.match(/^([1-9]+|[0-9]{2,})\s([1-9]+|[0-9]{2,})$/) ? true : false;
    },
    restartInput: function (string: string) : boolean {
        return string.match(/^((yes)|(no))$/) ? true : false;
    }
}