var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function(){
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(error){
        if(error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
    // console.log('Connected to server');

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

socket.on('updateUserList', function(users){
    var ol = jQuery('<ol></ol>')

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    })
    jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// socket.emit('createMessage', {
//     from: 'Harry',
//     text: "Help"
// }, function(data) {
//     console.log('From index.js', data);
// });

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery("#message-form").on('submit', function(e){
    e.preventDefault();
    var messageTextbox =jQuery("[name=message");
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    },function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by yur browser');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(error){
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location');
    });
});