
//http://parse.sfm6.hackreactor.com/chatterbox/classes/messages

var app = {};
app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.init = function() {
  app.renderRoom('test');
  app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  //app.scheduleRender();
};

app.fetch = function(url) {
  url = url || undefined;
  $.get(url, function( data ) {
    let chatData = data.results;
    chatData.forEach(function(item) {
    //  = $( 'div.message').append(`<div>${item.text} </br> </div><div class="username">${item.username}</div>` );
      var message = $('<div class="message"></div>');
      var text = $(`<div class="text">${item.text}</div>`);
      var username = $(`<p class="username">${item.username}</p>`);
      text.appendTo(message);
      username.appendTo(message);
      message.prependTo($('#chats'));

    });
  });

};

app.clearMessages = function() {
  $('div#chats').html('');
};

app.renderMessage = function(message) {
  $('div#chats').append(`<div>${message} </div>`);
  app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  // $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', function( data ) {
  //   $('div#chats').append(`<div>${data.results} </div>`);
  
  // });
};

app.renderRoom = function(roomName) {
  $('select').append(`<option value=${roomName}>${roomName}</option>`);
};

app.handleUsernameClick = function() {
  
};
// $('.message').on('click', function() {
//   console.log('I am running!');
// });




// app.scheduleRender = function() {
//   app.renderMessage();
//   setTimeout(app.scheduleRender, 4000);
// };

app.init();



