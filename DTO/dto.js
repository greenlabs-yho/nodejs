

class UserDto {
    constructor() {
        this._name = null;
    }

    get name() {
        return this._name;
    }

    set name(paramName) {
        if (paramName) {
            this._name = paramName;
        }

    }
}


let sample = new UserDto();
sample.name = 'jin';
console.log(sample._name)