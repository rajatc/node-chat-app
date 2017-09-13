[{
    id: 'e2343fwfwrrq3r',
    name: 'Rajat',
    room: 'Office'
}]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        //return user that was removed
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} old.`;
//     }
// }

// var me = new Person('Rajat', 35);
// var description = me.getUserDescription();
// console.log(description);



module.exports = {Users};
