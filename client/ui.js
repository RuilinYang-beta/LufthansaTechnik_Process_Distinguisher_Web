// toggle navbar
$(".hamburger").click(() => {
  $(".navbar").toggleClass("collapse");
  $(".main_container").toggleClass("expand");
});

// change the style of tasks that have subtask
$(".task:has(.subtask)").css("border-bottom", "2px solid #ffad00");

// temp: send GET when click on logo
$(".header .logo").click(() => {
  $.ajax({
    url: "./api/templates",
    type: "GET",
    success: (result) => {
      console.log(result);
    },
    error: (error) => {
      console.log(`Error ${error}`);
    },
  });
});
