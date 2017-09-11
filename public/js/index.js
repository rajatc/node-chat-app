var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'anjali@example.com',
    //     text: 'Hey, this is Rajat'
    // });

    // socket.emit('createMessage', {
    //     from: 'Rajat',
    //     text: 'My text message'
    // })
});

socket.on('disconnect', function(){
    console.log('Disconnected from Server');
});

// socket.on('newEmail', function(email){
//     console.log('New Email', email);
// });

socket.on('newMessage', function(message) {
    console.log('New message' ,message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Harry',
//     text: "Help"
// }, function(data) {
//     console.log('From index.js', data);
// });

jQuery("#message-form").on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery("[name=message").val()
    },function() {

    });
});

