
var moment = require('moment');
// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());


// var date = moment();
// date.add(10, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY h:mma '));
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAT = 1234
var date = moment(createdAT);
date.add(10, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY h:mma '));