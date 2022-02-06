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
  $.when($.get("./api/templates"), $.get("./api/phases")).done(
    (result1, result2) => {
      templates = result1[0];
      phases = result2[0];

      initDisplay(phases);
    }
  );
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
  showTasksOfFocusedPhase();
};

// ============ General interactions ============
// $(".navbar li a").click((e) => {
//   $(".navbar li:nth-child(3) a").focus();
//   console.log(e.target);
// });

const showTasksOfFocusedPhase = () => {
  // clear existing tasks
  // TODO: do I need to add event listener to tasks?? --> no, that's handled by css
  $(".taskArea div.grid").html("");

  const focusedPhase = $("a:focus").text();
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
