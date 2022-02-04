$(".hamburger").click(() => {
  $(".navbar").toggleClass("collapse");
  $(".main_container").toggleClass("expand");
});

$(".task:has(.subtask)").css("border-bottom", "2px solid #ffad00");
