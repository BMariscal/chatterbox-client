

var app = {};
app.currentDataLength = 0;
app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
app.data;
app.roomname;
app.lastMessageId;
app.rooms = [];
app.send = function(message) {
  $.ajax({
    type: 'POST',
    url: app.server,
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.init = function() {
  app.fetch(app.server);

  setInterval(function() {
    app.fetch(app.server);
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
          app.renderMessage(app.data);
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
  dataM.forEach(function(dataMessage) {
    dataMessage.username = _.escape(dataMessage.username);
    dataMessage.text = _.escape(dataMessage.text);
    dataMessage.roomname = _.escape(dataMessage.roomname);
    if (!app.rooms.includes(dataMessage.roomname)) {
      app.rooms.push(dataMessage.roomname);
      $('select').append(`<option value="${dataMessage.roomname}">${dataMessage.roomname}</option>`);
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
    $('select').append(`<option value="${array[i]}">${array[i]}</option>`);
  }

};

app.changeRoom = function(roomname) {
  app.roomname= roomname;
  if(roomname.includes(' ')){
     roomnameFirst= roomname.split(' ')[0];
     roomnameSecond = roomname.split(' ')[1];
  }

  if(!roomname || roomname === "allrooms"){
    $('.message').removeClass('hideRoom');
    $('.message').addClass('showRoom');
  }else if(roomname.includes(' ')){
    $('.message').addClass('hideRoom');
    $('.message' + '.'+ roomnameFirst + '.' + roomnameSecond).removeClass('hideRoom');
  }else{
    $('.message').addClass('hideRoom');
    $('.message' + '.'+ roomname).removeClass('hideRoom');
    $('.message' + '.'+ roomnameFirst + '.' + roomnameSecond).addClass('hideRoom');
  }
};

app.handleUsernameClick = function(username) {
  var theUser = $(username).html().split(' ')[0];
  $('.' + theUser).toggleClass('friend');

};

app.handleSubmit = function(event, message) {
  app.send(message);
  event.preventDefault();
  app.fetch(app.server);
};

app.init();




