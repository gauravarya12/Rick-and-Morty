$(document).ready(function() {
  $(".navbar-brand").click(function(e) {
    e.preventDefault();
    location.reload();
  });

  $($("#formDiv form")[0]).hide();
  $($("#formDiv form")[1]).hide();
  $("#epWarning").hide();

  $("#submitBtn").click(function() {
    $('#resultDiv button').remove();
    $(".carousel").empty();
    $("#resultDiv h1").remove();
    var value = $("#choiceSelect").val();
    if (value == "episode") {
      $($("#formDiv form")[1]).show();
      $($("#formDiv form")[0]).hide();
    } else {
      $($("#formDiv form")[1]).hide();
      $($("#formDiv form")[0]).show();
    }
  });

  function getData(url, type, id = "") {
    var request = $.ajax({
      method: "GET",
      url: url
    });
    request.done(function(data) {
      if (type == "character") {
        createCharacterCarousel(data);
      } else {
        createEpisodeCarousel(data, id);
      }
    });
    request.fail(function() {
      var h1 = document.createElement("h1");
      h1.textContent = "NO DATA FOUND!!!";
      $("#resultDiv").append(h1);
    });
  }
  $("#chBtn").click(function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .hide();
    var name = $("#name")
      .val()
      .trim();
    var status = $("#status")
      .val()
      .trim();
    var species = $("#species")
      .val()
      .trim();
    var gender = $("#gender")
      .val()
      .trim();
    var url =
      "https://rickandmortyapi.com/api/character/?name=" +
      name +
      "&status=" +
      status +
      "&species=" +
      species +
      "&gender=" +
      gender;
    getData(url, "character");
  });

  function createCharacterCarousel(data) {
    $('#resultDiv button').remove();
    var results = data["results"];
    $("#resultDiv h1").remove();
    $(".carousel").empty();
    var crInner = document.createElement("div");
    $(crInner).addClass("carousel-inner");
    $("#carouselControls").append(crInner);
    for (var i = 0; i < results.length; i++) {
      var crItem = document.createElement("div");
      if (i == 0) {
        $(crItem).addClass("carousel-item active");
      } else {
        $(crItem).addClass("carousel-item");
      }
      var cardDiv = document.createElement("div");
      $(cardDiv).addClass("card text-center");
      $(crItem).append(cardDiv);
      var img = document.createElement("img");
      $(img).attr("alt", results[i]["name"]);
      $(img).addClass("card-img-top d-block badge-pill badge");
      $(img).attr("src", results[i]["image"]);
      $(cardDiv).append(img);
      var cbDiv = document.createElement("div");
      $(cbDiv).addClass("card-body");
      $(cardDiv).append(cbDiv);
      var p1 = document.createElement("p");
      $(p1).addClass("card-text");
      $(p1).text("Name : " + results[i]["name"]);
      $(cardDiv).append(p1);
      var p2 = document.createElement("p");
      $(p2).addClass("card-text");
      $(p2).text("Status : " + results[i]["status"]);
      $(cardDiv).append(p2);
      var p3 = document.createElement("p");
      $(p3).addClass("card-text");
      $(p3).text("Species : " + results[i]["species"]);
      $(cardDiv).append(p3);
      var p4 = document.createElement("p");
      $(p4).addClass("card-text");
      $(p4).text("Gender : " + results[i]["gender"]);
      $(cardDiv).append(p4);
      var p5 = document.createElement("p");
      $(p5).addClass("card-text");
      $(p5).text("Origin : " + results[i]["origin"]["name"]);
      $(cardDiv).append(p5);
      var p6 = document.createElement("p");
      $(p6).addClass("card-text");
      $(p6).text("Location : " + results[i]["location"]["name"]);
      $(cardDiv).append(p6);
      $(crInner).append(crItem);
    }
    var a1 = document.createElement("a");
    $(a1).addClass("carousel-control-prev bg-secondary");
    $(a1).attr("href", "#carouselControls");
    $(a1).attr("role", "button");
    $(a1).attr("data-slide", "prev");
    $(
      a1
    ).html(`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>`);
    $(".carousel").append(a1);
    var a2 = document.createElement("a");
    $(a2).addClass("carousel-control-next bg-secondary");
    $(a2).attr("href", "#carouselControls");
    $(a2).attr("role", "button");
    $(a2).attr("data-slide", "next");
    $(
      a2
    ).html(`<span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>`);
    $(".carousel").append(a2);
    if (data["info"]["next"].length > 0) {
      var btn = document.createElement("button");
      $(btn).addClass("btn btn-outline-primary m-4");
      $(btn).text("Next");
      $(btn).click(function() {
        getData(data["info"]["next"], "character");
      });
      $("#resultDiv").append(btn);
    }
    if (data["info"]["prev"].length > 0) {
      var btn = document.createElement("button");
      $(btn).addClass("btn btn-outline-primary m-4");
      $(btn).text("Prev");
      $(btn).click(function() {
        getData(data["info"]["prev"], "character");
      });
      $("#resultDiv").append(btn);
    }
  }

  $("#episodeId").keyup(function() {
    var value = Number($(this).val());
    if (value < 1 || value > 31) {
      $("#epWarning").show();
    } else {
      $("#epWarning").hide();
    }
  });

  $("#epBtn").click(function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .hide();
    var id = $("#episodeId")
      .val()
      .trim();
    var url = "https://rickandmortyapi.com/api/episode/" + id;
    getData(url, "episode", id);
  });

  function createEpisodeCarousel(data, id) {
    $('#resultDiv button').remove();
    if (id == "") {
      var results = data["results"];
    } else {
      var results = [data];
    }
    $("#resultDiv h1").remove();
    $(".carousel").empty();
    var crInner = document.createElement("div");
    $(crInner).addClass("carousel-inner");
    $("#carouselControls").append(crInner);
    for (var i = 0; i < results.length; i++) {
      var crItem = document.createElement("div");
      if (i == 0) {
        $(crItem).addClass("carousel-item active");
      } else {
        $(crItem).addClass("carousel-item");
      }
      var cardDiv = document.createElement("div");
      $(cardDiv).addClass("card text-center");
      $(crItem).append(cardDiv);
      var cbDiv = document.createElement("div");
      $(cbDiv).addClass("card-body");
      $(cardDiv).append(cbDiv);
      var p1 = document.createElement("p");
      $(p1).addClass("card-text");
      $(p1).text("Name : " + results[i]["name"]);
      $(cardDiv).append(p1);
      var p2 = document.createElement("p");
      $(p2).addClass("card-text");
      $(p2).text("Air Date : " + results[i]["air_date"]);
      $(cardDiv).append(p2);
      var p3 = document.createElement("p");
      $(p3).addClass("card-text");
      $(p3).text("Episode : " + results[i]["episode"]);
      $(cardDiv).append(p3);
      $(crInner).append(crItem);
    }
    var a1 = document.createElement("a");
    $(a1).addClass("carousel-control-prev bg-secondary");
    $(a1).attr("href", "#carouselControls");
    $(a1).attr("role", "button");
    $(a1).attr("data-slide", "prev");
    $(
      a1
    ).html(`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>`);
    $(".carousel").append(a1);
    var a2 = document.createElement("a");
    $(a2).addClass("carousel-control-next bg-secondary");
    $(a2).attr("href", "#carouselControls");
    $(a2).attr("role", "button");
    $(a2).attr("data-slide", "next");
    $(
      a2
    ).html(`<span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>`);
    $(".carousel").append(a2);
    if (id == "") {
      if (data["info"]["next"].length > 0) {
        var btn = document.createElement("button");
        $(btn).addClass("btn btn-outline-primary m-4");
        $(btn).text("Next");
        $(btn).click(function() {
          getData(data["info"]["next"], "episode");
        });
        $("#resultDiv").append(btn);
      }
      if (data["info"]["prev"].length > 0) {
        var btn = document.createElement("button");
        $(btn).addClass("btn btn-outline-primary m-4");
        $(btn).text("Prev");
        $(btn).click(function() {
          getData(data["info"]["prev"], "episode");
        });
        $("#resultDiv").append(btn);
      }
    }
  }
});
