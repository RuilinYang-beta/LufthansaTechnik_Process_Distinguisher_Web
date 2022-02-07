// a phase-centered template, also can be used to calc score
let templates;
let phases;
// because html element requires some pattern,
// raw task id need to be cleaned,
// these two objects record the two way conversion of rawId <- -> cleaned id
const idRawToCleaned = {};
const idCleanedToRaw = {};

$(".hamburger").click(() => {
  $(".navbar").toggleClass("collapse");
  $(".main_container").toggleClass("expand");
});

// ============ Initialization ============
// ----- get data from backend -----
// temp: send GET when click on logo
$(document).ready(() => {
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
    _writeChosenTasks();
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
    // changing focus is from click phase on sidebar
    $(".navbar li a").removeClass("focused");
    $(e.target).addClass("focused");
  } else {
    // changing focus is the result of prev/next button click
    $(".navbar li a").removeClass("focused");
    $(`.navbar li:nth-child(${childToFocus}) a`).addClass("focused");
  }
};

// ============ sidebar: show tasks of the focused phase ============
const showTasksOfFocusedPhase = () => {
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

const _makeTaskElement = (rawId, tasks) => {
  const cleanedId = __getCleanedId(rawId);
  // record bi-directional mapping
  idRawToCleaned[rawId] = cleanedId;
  idCleanedToRaw[cleanedId] = rawId;

  // const phase = __getPhaseFromCleanedId(rawId);

  // if (templates[phase][rawId]["chosen"]) {
  //   return `
  //   <label class="task">
  //   <input type="checkbox" id="${cleanedId}" checked/>
  //   ${tasks[rawId]["task"]}
  //   </label>
  //   `;
  // } else {
  //   return `
  //   <label class="task">
  //   <input type="checkbox" id="${cleanedId}"/>
  //   ${tasks[rawId]["task"]}
  //   </label>
  //   `;
  // }

  return `
  <label class="task">
  <input type="checkbox" id="${cleanedId}"/>
  ${tasks[rawId]["task"]}
  </label>
  `;

  // TODO: accommodate subtasks
};

const __getCleanedId = (rawId) => {
  // pattern for all invalid character for html element
  const pattern = /[^A-Za-z0-9\-\:\.\_]/g;
  return rawId.replace(pattern, "-");
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

$("#prvBtn").click(() => {
  const focusedPhase = $("a.focused").text();
  const idx = phases.indexOf(focusedPhase);
  _writeChosenTasks();

  if (idx === 0) {
    return;
  }

  if (idx !== -1) {
    _focusOnlyOnOnePhase(true, 0, idx);
    showTasksOfFocusedPhase();
  } else {
    console.log("Something went wrong, you shouldn't reach here");
  }
});

$("#nxtBtn").click(() => {
  const focusedPhase = $("a.focused").text();
  const idx = phases.indexOf(focusedPhase);
  _writeChosenTasks();

  if (idx === phases.length - 1) {
    console.log("to result page");
    // TODO: compute score
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
  $('input[type="checkbox"]').prop("checked", false);
});

// ============ read/write from/to `templates` to record choice ============
const _readChosenTasksAndUpdateUI = () => {};

const _writeChosenTasks = () => {
  const chosenElements = $(".taskArea .grid input:checked");
  const chosenIds = Object.entries(chosenElements)
    .filter(([key, value]) => {
      return !isNaN(key);
    })
    .map(([key, value]) => {
      return value.id;
    });

  if (chosenIds.length === 0) {
    return;
  }

  // const phase = __getPhaseFromCleanedId(chosenIds[0]);

  // for (let cleanedId of chosenIds) {
  //   const rawId = idCleanedToRaw[cleanedId];
  //   templates[phase][rawId]["chosen"] = true;
  // }
};

const __getPhaseFromCleanedId = (cleanedId) => {
  console.log(cleanedId);
  console.log(idCleanedToRaw);
  const rawId = idCleanedToRaw[cleanedId];
  const pattern = /\-[0-9]+$/;
  const phase = rawId.replace(pattern, "");
  return phase;
};

// TODO:whenever user click next or select a diff phase from sidebar,
// read current status of the checkbox and write to `templates` obj

// TODO: a function to compute score
