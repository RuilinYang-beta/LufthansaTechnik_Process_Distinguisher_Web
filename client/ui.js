// a phase-centered template, also can be used to calc score
let templates;
let phases;
let templateTaskCounts;
let templateNames;

// id:          the id associate with a task or a subtask, returned from the server
// raw id:      same with id
// cleaned id:  obtained by replace the invalid character with '-' from raw id
const idRawToCleaned = {};
const idCleanedToRaw = {};
// a set to record the id of chosen checkbox, across phases
const chosenIds = new Set();

const VALID_ID_PATTERN = /[^A-Za-z0-9\-\:\.\_]/g;
const TASK_WEIGHT = 1;
const SUBTASK_WEIGHT = 0.5;

$(".hamburger").click(() => {
  $(".navbar").toggleClass("collapse");
  $(".main_container").toggleClass("expand");
});

// ============ Initialization ============
// ----- get data from backend -----
// for dev: click logo to get data from server
$("h1.logo").click(() => {
  // for production: get data on page load
  // $(document).ready(() => {
  $.when(
    $.get("./api/templates"),
    $.get("./api/phases"),
    $.get("./api/templateTaskCounts"),
    $.get("./api/templateNames")
  ).done((result1, result2, result3, result4) => {
    templates = result1[0];
    phases = result2[0];
    templateTaskCounts = result3[0];
    templateNames = result4[0];

    initDisplay();
  });
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
    _updateChosenTasks();
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

    if (e.target.innerText === phases[phases.length - 1]) __changeNextBtn();
  } else if (fromBtn && childToFocus !== undefined) {
    // changing focus is the result of prev/next button click
    $(".navbar li a").removeClass("focused");
    $(`.navbar li:nth-child(${childToFocus}) a`).addClass("focused");

    if (childToFocus === phases.length) __changeNextBtn();
  } else {
    console.log(`Error in _focusOnlyOnOnePhase: you should not reach here!`);
  }
};

const __changeNextBtn = () => {
  $("#nxtBtn").text("OK, See Result >");
};

// ============ sidebar: show tasks of the focused phase ============
const showTasksOfFocusedPhase = () => {
  const focusedPhase = $("a.focused").text();
  const phaseObj = templates[focusedPhase];

  // clear existing tasks
  $(".taskArea div.grid").html("");
  // write to task grid
  for (let taskId in phaseObj) {
    $(".taskArea div.grid").append(_makeTaskElement(taskId, phaseObj));
  }
  _styleTasksWithSubtasks();
};

const _makeTaskElement = (rawId, phaseObj) => {
  const cleanedId = __getCleanedId(rawId);
  // record bi-directional mapping
  idRawToCleaned[rawId] = cleanedId;
  idCleanedToRaw[cleanedId] = rawId;

  let taskObj = phaseObj[rawId];
  // --- a task without subtasks ---
  const checkStatus = chosenIds.has(cleanedId) ? "checked" : "";
  if (!taskObj.hasOwnProperty("subtasks")) {
    return `
    <label class="task">
     <input type="checkbox" id="${cleanedId}" ${checkStatus}/>
      ${phaseObj[rawId]["task"]}
    </label>
    `;
  }

  // --- a task with subtasks ---
  for (let subtaskRawId in taskObj["subtasks"]) {
    const subtaskCleanedId = __getCleanedId(subtaskRawId);
    idRawToCleaned[subtaskRawId] = subtaskCleanedId;
    idCleanedToRaw[subtaskCleanedId] = subtaskRawId;
  }

  const subtasksHTML = __makeSubtaskElements(taskObj);

  return `
    <label class="task">
     <input type="checkbox" id="${cleanedId}"  ${checkStatus}/>
      ${phaseObj[rawId]["task"]}
      <div class="subtasks">
      ${subtasksHTML}
      </div>
    </label>
    `;
};

const __getCleanedId = (rawId) => {
  // pattern for all invalid character for html element
  return rawId.replace(VALID_ID_PATTERN, "-");
};

const __makeSubtaskElements = (taskObj) => {
  const subtasksHTML = Object.keys(taskObj["subtasks"])
    .map((subtaskRawId) => {
      const subtaskCleanedId = idRawToCleaned[subtaskRawId];
      const checkStatus = chosenIds.has(subtaskCleanedId) ? "checked" : "";
      return `
      <label class="task subtask">
        <input type="checkbox" id="${subtaskCleanedId}" ${checkStatus}/>
        ${taskObj["subtasks"][subtaskRawId]["subtask"]}
      </label>`;
    })
    .join("");

  return subtasksHTML;
};

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
  _updateChosenTasks();

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
  _updateChosenTasks();

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
  _updateChosenTasks();
});

// ============ score related functions ============
const _updateChosenTasks = () => {
  const checkedElements = $(".taskArea .grid input:checked").toArray();
  const uncheckedElements = $(
    ".taskArea .grid input:checkbox:not(:checked)"
  ).toArray();

  checkedElements.forEach((ele) => {
    chosenIds.add(ele.id);
  });

  uncheckedElements.forEach((ele) => {
    chosenIds.delete(ele.id);
  });
};

// TODO: a function to compute score
const analyseChosenTasks = () => {
  const copy = JSON.parse(JSON.stringify(templates));
  const verboseResult = _getVerboseResult(copy);
  const conciseRawResult = _getConciseRawResult(verboseResult);
  const conciseFractionResult = _getConciseFractionResult(
    conciseRawResult,
    templateTaskCounts
  );
  return { verboseResult, conciseRawResult, conciseFractionResult };
};

const _getConciseRawResult = (verboseResult) => {
  const result = __initConciseResult();
  for (let phaseKey in verboseResult) {
    for (let taskKey in verboseResult[phaseKey]) {
      // bookkeeping taskCount
      if (verboseResult[phaseKey][taskKey]["chosen"]) {
        verboseResult[phaseKey][taskKey]["templates"].forEach((temp) => {
          result[temp][phaseKey]["task"] += 1;
          result[temp]["Summary"]["task"] += 1;
        });
      }
      // bookkeeping subtaskCount
      if (verboseResult[phaseKey][taskKey].hasOwnProperty("subtasks")) {
        for (let subtaskKey in verboseResult[phaseKey][taskKey]["subtasks"]) {
          if (
            verboseResult[phaseKey][taskKey]["subtasks"][subtaskKey]["chosen"]
          ) {
            verboseResult[phaseKey][taskKey]["subtasks"][subtaskKey][
              "templates"
            ].forEach((temp) => {
              result[temp][phaseKey]["subtask"] += 1;
              result[temp]["Summary"]["subtask"] += 1;
            });
          }
        }
      }
    }
  }
  return result;
};

const __initConciseResult = () => {
  const basis = {};
  const basisCount = {
    task: 0,
    subtask: 0,
  };

  for (let tempName of templateNames) {
    const content = {
      Summary: JSON.parse(JSON.stringify(basisCount)),
    };
    for (let phase of phases) {
      content[phase] = JSON.parse(JSON.stringify(basisCount));
    }
    basis[tempName] = content;
  }
  return basis;
};

const _getConciseFractionResult = (conciseRawObj, templateTaskCountObj) => {
  const result = __initConciseResult();
  for (let templateName in templateTaskCountObj) {
    for (let phase in templateTaskCountObj[templateName]) {
      result[templateName][phase]["task"] = _computeFraction(
        "task",
        conciseRawObj,
        templateTaskCountObj,
        templateName,
        phase
      );
      result[templateName][phase]["subtask"] = _computeFraction(
        "subtask",
        conciseRawObj,
        templateTaskCountObj,
        templateName,
        phase
      );
    }
  }
  return result;
};

const _computeFraction = (
  item,
  conciseRawObj,
  templateTaskCountObj,
  templateName,
  phase
) => {
  const templateTaskCount = templateTaskCountObj[templateName][phase][item];
  const chosenTaskCount = conciseRawObj[templateName][phase][item];
  const taskFraction =
    templateTaskCount === 0
      ? 0
      : __roundFraction(chosenTaskCount / templateTaskCount);

  return taskFraction;
};

const __roundFraction = (fraction) => {
  return Math.round(fraction * 100) / 100;
};

const _getVerboseResult = (templates) => {
  for (let phaseKey in templates) {
    for (let taskKeyRaw in templates[phaseKey]) {
      const taskKeyClean = idRawToCleaned[taskKeyRaw];
      if (chosenIds.has(taskKeyClean)) {
        templates[phaseKey][taskKeyRaw]["chosen"] = true;
      }
      if (templates[phaseKey][taskKeyRaw].hasOwnProperty("subtasks")) {
        for (let subtaskKeyRaw in templates[phaseKey][taskKeyRaw]["subtasks"]) {
          const subtaskKeyClean = idRawToCleaned[subtaskKeyRaw];
          if (chosenIds.has(subtaskKeyClean)) {
            templates[phaseKey][taskKeyRaw]["subtasks"][subtaskKeyRaw][
              "chosen"
            ] = true;
          }
        }
      }
    }
  }
  return templates;
};
// TODO: the div of subtasks should have a min width
// maybe its parent, the task element also should have this min witdh
