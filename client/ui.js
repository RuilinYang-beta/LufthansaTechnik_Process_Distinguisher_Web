// a phase-centered template, also can be used to calc score
let templates;
let phases;
let temp; // temporary variable

$(".hamburger").click(() => {
  $(".navbar").toggleClass("collapse");
  $(".main_container").toggleClass("expand");
});

// ============ Initialization ============
// ----- get data from backend -----
// temp: send GET when click on logo
$(".header .logo").click(() => {
  $.ajax({
    url: "./api/templates",
    type: "GET",
    success: (result) => {
      templates = result;
    },
    error: (error) => {
      console.log(`Error ${error}`);
    },
  });

  $.ajax({
    url: "./api/phases",
    type: "GET",
    success: (result) => {
      phases = result;
      // TODO: make sure when this line happen, `templates` is also ready
      // async, await
      initDisplay(phases);
    },
    error: (error) => {
      console.log(`Error ${error}`);
    },
  });
});

// ----- display init phase -----
const initDisplay = () => {
  // add phases on sidebar
  $(".navbar nav ul").html(`
    ${phases.map((p) => `<li><a href="#">${p}</a></li>`).join("")}
  `);

  // phase event listener: click -> focus
  // show tasks of the focused phase
  $(".navbar li a").click((e) => {
    e.target.focus();
    showTasksOfFocusedPhase();
  });

  // focus on the first phase
  $(".navbar li:first-child a").focus();
};

// ============ General interactions ============
// $(".navbar li a").click((e) => {
//   $(".navbar li:nth-child(3) a").focus();
//   console.log(e.target);
// });

const showTasksOfFocusedPhase = () => {
  // clear existing tasks
  // TODO: do I need to add event listener to tasks??
  $(".taskArea div.grid").html("");

  const focusedPhase = $("a:focus").text();
  console.log(focusedPhase);
  const tasks = templates[focusedPhase];
  for (let taskId in tasks) {
    $(".taskArea div.grid").append(_makeTaskElement(taskId, tasks));
  }
  _styleTasksWithSubtasks();

  // TODO: read into `templates` to see what the user has already selected
  // update checkbox accordingly
};

const _makeTaskElement = (taskId, tasks) => {
  // TODO: accommodate subtasks
  return `
    <label class="task">
      <input type="checkbox" id=${taskId}/>
      ${tasks[taskId]["task"]}
  </label>
  `;
};

// change the style of tasks that have subtask
const _styleTasksWithSubtasks = () => {
  $(".task:has(.subtask)").css("border-bottom", "2px solid #ffad00");
};
