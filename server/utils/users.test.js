const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users= new Users();
        users.users = [{
            id: '1',
            name: 'Rajjo',
            room: 'Node'
        },{
            id: '2',
            name: 'Raj',
            room: 'React'
        },{
            id: '3',
            name: 'Ram',
            room: 'Node'
        }]
    });

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id : 1,
            name: 'Rajat',
            room: 'Unit test'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('2');

        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser(20);

        expect(user).toNotExist;
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var user = users.getUser('2');

        expect(user.id).toBe('2');
    });

    it('should not find user', () => {
        var user = users.getUser('99');

        expect(user).toNotExist();
    });

    it('should return names for node', () => {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Rajjo', 'Ram']);
    });

    it('should return names for react', () => {
        var userList = users.getUserList('React');

        expect(userList).toEqual(['Raj']);
    });
})