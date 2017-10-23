 $(document).ready(function() {
   console.log( 'ready!');

   $('.clearBtn').on('click', function() {
     app.clearMessages();
   });
   $('#send.submit').on('click', function(event) {
     var username = window.location.search.split('=')[1];
     app.roomname = $("[name='roomSelect']").val();
     var value = $('#message').val();
     var message = {username: username, text: value, roomname: app.roomname};
     app.handleSubmit(event, message);
     $('textarea').val('');
   });
    $('#createRoom').on('click', function(e){
       app.roomname = $('#newRoomInput').val();
       app.rooms.push(app.roomname);
      $('select').append(`<option value="${app.roomname}">${app.roomname}</option>`);
      var username = window.location.search.split('=')[1];
      app.roomname = app.roomname;
      var value = `${username} created room:  ${app.roomname}`;
      var message = {username: username, text: value, roomname: app.roomname};
      app.handleSubmit(event, message);
    });
 });
