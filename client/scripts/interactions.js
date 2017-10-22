 $(document).ready(function() {
   console.log( 'ready!');
   $('.username').on('click', function() {
     console.log('I am running, i am button!');
   });   
//LOOK AT ME!
   // $('.roomSubmit').on('click', function() {
   //   console.log("inside ROOM SUBMIT");
   //   var roomname = window.location.search.split('&')[0].split('=')[1];
   //   app.changeRoom(roomname);
   // });

   $('.clearBtn').on('click', function() {
     app.clearMessages();
   });

   $('#send.submit').on('click', function(event) {
     var username = window.location.search.split('&')[1].split('=')[1];
     var roomname = window.location.search.split('&')[0].split('=')[1];

     var value = $('#message').val();
     console.log(this.username);
     var message = {username: username, text: value, roomname: roomname};
     app.handleSubmit(event, message);
     $('textarea').val('');
   });
 });
