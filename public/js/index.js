

// $('#getUser').on('click', function(){
//   $.get('/api/user', function(data){
//       console.log(data);
//   })    
    





$('#submit').on('click', getSessionData);



 
function getSessionData(){
  $.get('/api/user', function(data){
    var userData = data;

  var before = $('#before').val();
  var after = $('#after').val();
  var sessionTime = $('#num').val();

  var sessionDataObj = {
    id:userData._id, 
    before: before,
    after: after,
    sessionTime: sessionTime
}

  $.ajax({
    method: "PUT",
    url: "api/user/" + userData._id,
    data: {id:userData._id, 
           before: before,
           after: after,
           sessionTime: sessionTime
          },
    success: console.log(data)
  });
});

};
   



