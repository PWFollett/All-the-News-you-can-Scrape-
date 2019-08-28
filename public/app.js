
$.getJSON("/question", function(data) {
  
    for (var i = 0; i < data.length; i++) {
     
      $("#question").append("<li data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</li>" + "<br />" + "<br />" );
    }
  });
  
 
  $(document).on("click", "li", function() {
  
    $("#note").empty();
   
    var thisId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "GET",
      url: "/questions/" + thisId
    })
     
      .then(function(data) {
        console.log(data);
        
        $("#note").append("<h2>" + data.title + "</h2>");
     
        $("#note").append("<input id='titleinput' name='title' >");
        
        $("#note").append("<textarea id='bodyinput' name='body'></textarea>");
        
        $("#note").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
      
        if (data.note) {
          
          $("#titleinput").val(data.note.title);
          
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
 
  $(document).on("click", "#savenote", function() {
   
    var thisId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "POST",
      url: "/questions/" + thisId,
      data: {
      
        title: $("#titleinput").val(),
        
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        
        console.log(data);
       
        $("#notes").empty();
      });
  
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });