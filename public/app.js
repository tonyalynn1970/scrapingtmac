

$(document).on("click", "li", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  let thisId = $(this).attr("data-id");
  alert(thisId)

  $("#notes").append("<input id= 'titleinput' name='title' >");
  $("#notes").append("<div><textarea id='bodyinput' name='body'></textarea></div>");
  $("#notes").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");




  // $.ajax({
  //   method: "GET",
  //   url: "/articles/" + thisId
  // }).then(function (data) {
  //   $("#existing-notes").empty();
  //   $("#article-title").text(data.title);






  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      title: $("#titleinput").val(),
      notes: $("#notesinput").val()
    }
  })

    .then(function (data) {
      console.log(data);
      $("#notes").empty();
    });
})
//Also, remove the values entered in the input and textarea for note entry
$("#titleinput").val("");
$("#bodyinput").val("");


    // function deleteComment() {
    //     $(document).click, ".delete-comment", function() {
    //         let id = $(this).attr("data-id");
    //         $.ajax({
    //             method: "GET",
    //             url: "/articles/" + thisId
    //         }).then(function(data) {
    //             $("." + thisId).remove();
    //         });
    //     }
    // } 

    // function saveArticle () {
    //     $(".save-article").on("click", function() {
    //         let id = $(this).attr("data-id");

    //         $.ajax({
    //           url: "/articles/" + id,
    //           type: "PUT",
    //           success: function() {
    //             $("#saveArticleModal").modal("show");
    //           }
    //         }).then(function() {
    //           $(".saveArticleCloseBtn").on("click", function() {
    //             window.location.href = "/articles";
    //           });
    //         });
    //       });
    //     }

    //     function removeArticle() {
    //         $(".remove-article").on("click", function() {
    //           let id = $(this).attr("data-id");

    //           $.ajax({
    //             url: "/saved/" + id,
    //             type: "PUT",
    //             success: function() {
    //               $("#returnArticleModal").modal("show");
    //             }
    //           }).then(function() {
    //             $(".returnArticleCloseBtn").on("click", function() {
    //               window.location.href = "/saved";
    //             });
    //           });
    //         });
    //       }


//    
//
// viewComments();
// postComments();
// deleteComment();
// removeArticle();
// saveArticle();
