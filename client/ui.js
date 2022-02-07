// a phase-centered template, also can be used to calc score
let templates;
let phases;
let temp; // temporary variable
let currentPhase;

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

      // this would happen after the two GETs are done
      initDisplay();
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
  // and show tasks of the focused phase
  $(".navbar li a").click((e) => {
    _focusOnlyOnOnePhase(false, e);
    showTasksOfFocusedPhase();
  });

  // focus on the first phase
  $(".navbar li:first-child a").addClass("focused");
  showTasksOfFocusedPhase();
};

// REFACTOR: better way to handle this??
const _focusOnlyOnOnePhase = (
  fromBtn,
  e = undefined,
  childToFocus = undefined
) => {
  if (!fromBtn && e !== undefined) {
    // changing focus is not from prev/next button click
    $(".navbar li a").removeClass("focused");
    $(e.target).addClass("focused");
  } else {
    // changing focus is the result of prev/next button click
    $(".navbar li a").removeClass("focused");
    console.log(`idxToFocus: ${childToFocus}`);
    $(`.navbar li:nth-child(${childToFocus}) a`).addClass("focused");
  }
};

// ============ sidebar: show tasks of the focused phase ============
const showTasksOfFocusedPhase = () => {
  // TODO: do I need to add event listener to tasks?? --> no, that's handled by css
  const focusedPhase = $("a.focused").text();
  const tasks = templates[focusedPhase];

  // clear existing tasks
  $(".taskArea div.grid").html("");
  // write to task grid
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

const _makeSubtaskElement = () => {};

// change the style of tasks that have subtask
const _styleTasksWithSubtasks = () => {
  $(".task:has(.subtask)").css("border-bottom", "2px solid #ffad00");
};

// ============ buttons: handle prev/next button click ============
$(".btn").click((e) => {
  e.preventDefault(); // prevent from reload URL
});

$("#prvBtn").click((e) => {
  const focusedPhase = $("a.focused").text();
  const idx = phases.indexOf(focusedPhase);

  if (idx === 0) {
    return;
  }

  if (idx !== -1) {
    _focusOnlyOnOnePhase(true, 0, idx);
    // $(`.navbar li:nth-child(${idx - 1}) a`).addClass("focused");
    showTasksOfFocusedPhase();
  } else {
    console.log("Something went wrong, you shouldn't reach here");
  }
});

$("#nxtBtn").click((e) => {
  const focusedPhase = $("a.focused").text();
  const idx = phases.indexOf(focusedPhase);

  if (idx === phases.length - 1) {
    console.log("to result page");
    return;
  }

  if (idx !== -1) {
    _focusOnlyOnOnePhase(true, 0, idx + 2); // go to next phase, idx of html ele should +2
    showTasksOfFocusedPhase();
  } else {
    console.log("Something went wrong, you shouldn't reach here");
  }
});

$("#rstBtn").click(() => {
  $('input[type="checkbox"').prop("checked", false);
});

// ============ read/write from/to `templates` to record choice ============

// TODO:whenever user click next or select a diff phase from sidebar,
// read current status of the checkbox and write to `templates` obj

// TODO: a function to compute score
