
//http://parse.sfm6.hackreactor.com/chatterbox/classes/messages

var app = {};
app.currentDataLength = 0;
app.data;
app.roomname;
app.lastMessageId;
app.rooms = [];
app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    type: 'POST',
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');

    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.init = function() {
  app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');

  setInterval(function() {
    app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  }, 1000);
};

app.fetch = function(url) {
  var chatData;
  url = url || undefined;

  $.ajax({
    type: 'GET',
    url: url,
    data: 'order=-createdAt',
    success: function (data) {
      app.data = data.results;
      var mostRecentMessage = app.data[0];
      if (mostRecentMessage.objectId !== app.lastMessageId) {

          app.renderMessage(app.data, app.roomname);

      }
      app.lastMessageId = app.data[0].objectId;

    }
  });

};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(dataM) {
  app.clearMessages();
  // dataM = Array.from(dataM);

  dataM.forEach(function(dataMessage) {
    dataMessage.username = _.escape(dataMessage.username);
    dataMessage.text = _.escape(dataMessage.text);
    dataMessage.roomname = _.escape(dataMessage.roomname);
    if (!app.rooms.includes(dataMessage.roomname)) {
      app.rooms.push(dataMessage.roomname);
      $('select').append(`<option value=${dataMessage.roomname}>${dataMessage.roomname}</option>`);
    }

    var room = $(`<div class="room ${dataMessage.roomname}"> Room: ${dataMessage.roomname}</div>`);
    var message = $(`<div class="message ${dataMessage.username} ${dataMessage.roomname}"></div>`);
    var text = $(`<div class="text">${dataMessage.text}</div>`);
    var username = $(`<button class="username" onclick="app.handleUsernameClick(this)">${dataMessage.username}</button>`);
    room.appendTo(message);
    text.appendTo(message);
    username.appendTo(message);
    message.appendTo($('#chats'));
  });
  app.changeRoom(app.roomname);
};

app.renderRoom = function(array) {
  for (let i = 0; i < array.length; i++) {
    $('select').append(`<option value=${array[i]}>${array[i]}</option>`);
  }

};
//LOOK AT ME!
app.changeRoom = function(roomname) {
  app.roomname = roomname;
  console.log("inside changeRoom", roomname);
  if(!roomname || roomname === "allrooms"){
    console.log("all rooms");
    $('.message').removeClass('hideRoom');
    $('.message').addClass('showRoom');
  }else{
  $('.message').addClass('hideRoom');
  $('.message' + '.'+ roomname).removeClass('hideRoom');
  }
};

app.handleUsernameClick = function(username) {
  var theUser = $(username).html().split(' ')[0];
  $('.' + theUser).toggleClass('friend');

};



app.handleSubmit = function(event, message) {
  app.send(message);
  event.preventDefault();
  app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
};

app.init();




