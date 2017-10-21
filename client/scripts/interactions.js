 $(document).ready(function() {
   console.log( 'ready!');
   $('.username').on('click', function() {
     console.log('I am running!');
   });   
   $('.message').on('click', function() {
     console.log('I am running!');
   });

   $('.clearBtn').on('click', function() {
     console.log('I am running!');
     app.clearMessages();
   });

   $('.inputBtn').on('click', function() {
     var value = $('textarea').val();
     var message = {username: 'Kaylin', text: value, roomname: 'testing'};
     app.send(message);
     $('textarea').val('');
   });

 });   
