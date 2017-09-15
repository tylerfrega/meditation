

// $('#getUser').on('click', function(){
//   $.get('/api/user', function(data){
//       console.log(data);
//   })    
    





$('#submit').on('click', function(){
  $.get('/api/user', function(data){
    var userData = data;
   

  var before = $('#newEntry').val();
  var newEntry = {
    text: "new name"
  }

  $.ajax({
    method: "PUT",
    url: "api/user/" + userData._id,
    data: {id:userData._id, before: before},
    success: console.log('it works')
  });
  console.log(userData._id);
})
});
     
    



