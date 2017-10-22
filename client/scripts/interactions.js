 $(document).ready(function() {
   console.log( 'ready!');

   $('.clearBtn').on('click', function() {
     app.clearMessages();
   });
   $('#send.submit').on('click', function(event) {
     var username = window.location.search.split('=')[1];
     roomname = $("[name='roomSelect']").val();

     var value = $('#message').val();
     var message = {username: username, text: value, roomname: roomname};
     app.handleSubmit(event, message);
     $('textarea').val('');
   });
 });
