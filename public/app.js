$.get('/scrape')

$(document).on("click", "li", function () {
  // Empty the notes from the note section
  $("#note-div").empty();
  // Save the id from the p tag
  let thisId = $(this).attr("data-id");
  alert(thisId)

  $("#note-div").append("<input id= 'titleinput' name='title' >");
  $("#note-div").append("<div><textarea id='bodyinput' name='body'></textarea></div>");
  $("#note-div").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");





  function postNote() {
    $(document).on("click", ".post-note", function () {
      let id = $(this).attr("data-id");
    })
  }


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

$("#titleinput").val("");
$("#bodyinput").val("");


function deleteNote() {
  $(document).click, ".delete-note", function () {
    let id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(function (data) {
      $("." + thisId).remove();
    });
  }
}

function saveArticle() {
  $(".save-article").on("click", function () {
    let id = $(this).attr("data-id");

    $.ajax({
      url: "/articles/" + id,
      type: "PUT",
      success: function () {
        $("#saveArticleModal").modal("show");
      }
    }).then(function () {
      $(".saveArticleCloseBtn").on("click", function () {
        window.location.href = "/articles";
      });
    });
  });
}

function removeArticle() {
  $(".remove-article").on("click", function () {
    let id = $(this).attr("data-id");

    $.ajax({
      url: "/saved/" + id,
      type: "PUT",
      success: function () {
        $("#returnArticleModal").modal("show");
      }
    }).then(function () {
      $(".returnArticleCloseBtn").on("click", function () {
        window.location.href = "/saved";
      });
    });
  });
}





