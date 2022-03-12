/* below are data retrieved from the server */
// a phase-centered template, also can be used to calc score
let templates;
// an array of all phases
let phases;
// an obj bookkeeping task counts per template per phase
let templateTaskCounts;
// an array of all template names
let templateNames;

/* below are data specific to each user session */
// id:          the id associate with a task, returned from the server
// raw id:      same with id
// cleaned id:  obtained by replace the invalid character with '-' from raw id,
//              because some characters are not valid html element id
const idRawToCleaned = {};
const idCleanedToRaw = {};
// a set to record the id of chosen checkbox, across phases
const chosenIds = new Set();
// an obj bookkeeping user comment per phase
const userCommentPerPhase = {};

const VALID_ID_PATTERN = /[^A-Za-z0-9\-\:\.\_]/g;
const TEMPLATE_LETTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

  // clicking phase: change displayed tasks
  $(".navbar li a").click((e) => {
    _saveUserChoices($("a.focused").text()); // save user choice before changing phase
    _focusOnlyOnOnePhase(false, e);
    showTasksOfFocusedPhase();
  });

  // focus on the first phase
  $(".navbar li:first-child a").addClass("focused");
  showTasksOfFocusedPhase();
};

const _focusOnlyOnOnePhase = (
  fromBtn,
  e = undefined,
  childToFocus = undefined
) => {
  if (!fromBtn && e !== undefined) {
    // changing focus is from click phase on sidebar
    $(".navbar li a").removeClass("focused");
    $(e.target).addClass("focused");
  } else if (fromBtn && childToFocus !== undefined) {
    // changing focus is the result of prev/next button click
    $(".navbar li a").removeClass("focused");
    $(`.navbar li:nth-child(${childToFocus}) a`).addClass("focused");
  } else {
    console.log(`Error in _focusOnlyOnOnePhase: you should not reach here!`);
  }

  // if it's the last phase, change the text on next button
  const flag =
    $(".navbar li a.focused")[0].innerText === phases[phases.length - 1];
  __changeNextBtn(flag);
};

const __changeNextBtn = (final = true) => {
  const btnText = final ? "OK, See Result >" : "OK, Next Phase >";
  $("#nxtBtn").text(btnText);
};

// ============ sidebar: show tasks of the focused phase ============
const showTasksOfFocusedPhase = () => {
  const focusedPhase = $("a.focused").text();
  const phaseObj = templates[focusedPhase];

  // clear existing tasks
  $(".taskArea div.grid").html("");
  // add user input field to task grid
  $(".taskArea div.grid").append(_makeInputField(focusedPhase));
  // add tasks to task grid
  for (let taskId in phaseObj) {
    $(".taskArea div.grid").append(_makeTaskElement(taskId, phaseObj));
  }
  _styleTasksWithSubtasks();
};

const _makeInputField = (focusedPhase) => {
  const hasComment = userCommentPerPhase.hasOwnProperty(focusedPhase);
  const comment = hasComment ? userCommentPerPhase[focusedPhase] : "";
  return `
    <label class="task">
      <input type="text" placeholder="other task/comment?" value="${comment}" />
    </label>
  `;
};

const _makeTaskElement = (rawId, phaseObj) => {
  const cleanedId = __getCleanedId(rawId);
  // record bi-directional mapping
  idRawToCleaned[rawId] = cleanedId;
  idCleanedToRaw[cleanedId] = rawId;

  let taskObj = phaseObj[rawId];
  // --- a task without additional info ---
  const checkStatus = chosenIds.has(cleanedId) ? "checked" : "";
  if (!taskObj.hasOwnProperty("info")) {
    return `
      <label class="task">
       <input type="checkbox" id="${cleanedId}" ${checkStatus}/>
        ${phaseObj[rawId]["task"]}
      </label>
      `;
  }

  // --- a task with additional info ---
  const subtasksHTML = __makeInfoElement(taskObj);

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

const __makeInfoElement = (taskObj) => {
  return taskObj["info"].join("<br /><br />");
};

// change the style of tasks that have subtask
const _styleTasksWithSubtasks = () => {
  $(".task:has(.subtasks)").css("border-bottom", "2px solid #ffad00");
};

// ============ buttons: handle prev/next button click ============
$(".btn").click((e) => {
  e.preventDefault(); // prevent from reload URL
});

$("#prvBtn").click(() => {
  const focusedPhase = $("a.focused").text();
  const idx = phases.indexOf(focusedPhase);
  _saveUserChoices(focusedPhase);

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
  _saveUserChoices(focusedPhase);

  // when reach the end of survey: finalizing
  if (idx === phases.length - 1) {
    const results = analyseChosenTasks();
    // _sendResultToServer(result);
    showResultModal(results);
    return;
  }

  // otherwise go to next phase
  if (idx !== -1) {
    _focusOnlyOnOnePhase(true, 0, idx + 2); // idx of html ele should +2
    showTasksOfFocusedPhase();
  } else {
    console.log("Something went wrong, you shouldn't reach here");
  }
});

$("#rstBtn").click(() => {
  $('input[type="checkbox"]').prop("checked", false);
  _saveUserChoices($("a.focused").text());
});

// ============ score related functions ============
const _saveUserChoices = (focusedPhase) => {
  // deal with input[type='checkbox']
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

  // deal with input[type='text']
  const comment = $('input[type="text"]')[0].value;
  if (comment !== "") userCommentPerPhase[focusedPhase] = comment;
};

const analyseChosenTasks = () => {
  const copy = JSON.parse(JSON.stringify(templates));
  const verboseResult = _getVerboseResult(copy);
  const conciseResult = _getConciseResult(verboseResult);

  return { verboseResult, conciseResult };
};

const _getVerboseResult = (templates) => {
  // deal with input[type='checkbox']
  for (let phaseKey in templates) {
    for (let taskKeyRaw in templates[phaseKey]) {
      const taskKeyClean = idRawToCleaned[taskKeyRaw];
      if (chosenIds.has(taskKeyClean)) {
        templates[phaseKey][taskKeyRaw]["chosen"] = true;
      }
    }
  }
  // deal with input[type='text']
  for (let phaseKey in userCommentPerPhase) {
    templates[phaseKey]["userComment"] = userCommentPerPhase[phaseKey];
  }
  return templates;
};

const __initConciseResult = () => {
  const basis = {};
  const basisCount = {
    overlappingCount: 0,
    overlappingFraction: 0,
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

const _getConciseResult = (verboseResult) => {
  const result = __initConciseResult();
  // bookkeeping overlappingCount
  for (let phaseKey in verboseResult) {
    for (let taskKey in verboseResult[phaseKey]) {
      if (verboseResult[phaseKey][taskKey]["chosen"]) {
        verboseResult[phaseKey][taskKey]["templates"].forEach((temp) => {
          result[temp][phaseKey]["overlappingCount"] += 1;
          result[temp]["Summary"]["overlappingCount"] += 1;
        });
      }
    }
  }
  for (let templateName in result) {
    for (let phaseKey in result[templateName]) {
      // bookkeeping overlappingFraction
      result[templateName][phaseKey]["overlappingFraction"] = __getFraction(
        result,
        templateName,
        phaseKey
      );
    }
  }
  return result;
};

const __getFraction = (conciseResult, templateName, phaseKey) => {
  const overlapCount =
    conciseResult[templateName][phaseKey]["overlappingCount"];
  const totalCount = templateTaskCounts[templateName][phaseKey];
  return totalCount === 0
    ? 0
    : Math.round((overlapCount / totalCount) * 100) / 100;
};

// ============ result modal ============
$(".closeModal").click(() => {
  $("#modal").css("display", "none");
});

const showResultModal = (results) => {
  const { verboseResult, conciseResult } = results;
  // show modal
  $("#modal").css("display", "block");
  // show phases
  $(".modalPhases .flex").html(
    '<a href="#" id="summaryPhase">Summary</a>' +
      phases.map((ele) => `<a href="#">${ele}</a>`).join("")
  );
  // show table header with anonymized template names
  let tableHeader = "<th></th>";
  templateNames.forEach((ele, idx) => {
    tableHeader += `<th>template ${TEMPLATE_LETTER[idx]}</th>`;
  });
  $(".modalTable #tableHeader").html(tableHeader);
  // show table content and comment when phase clicked
  $(".modalPhases a").click((e) => {
    $(".modalPhases a").removeClass("focusedInModal");
    $(e.target).addClass("focusedInModal");
    const phase = e.target.text;
    $(".modalTable #taskRow").html(_makeTaskRow(conciseResult, phase));

    const comment = userCommentPerPhase.hasOwnProperty(phase)
      ? `Your comment:<br />${userCommentPerPhase[phase]}`
      : "";

    $(".modalComment").html(comment);
  });

  $(".modalPhases a#summaryPhase").click();
  // $("#dldBtn").click(() => _downloadResults(results));
};

const _makeTaskRow = (conciseResult, phase) => {
  return (
    `<td>task</td>` +
    templateNames
      .map((temp) => {
        const chosenNr = conciseResult[temp][phase]["overlappingCount"];
        const chosenFrac = conciseResult[temp][phase]["overlappingFraction"];
        const totalNr = templateTaskCounts[temp][phase];

        return `<td>${chosenNr} of ${totalNr} (${Math.round(
          chosenFrac * 100
        )}%)</td>`;
      })
      .join("")
  );
};

// ============ DB related ============
// const _downloadResults = (results, all = false) => {
//   const a = document.createElement("a");
//   const file = new Blob([JSON.stringify(results)], {
//     type: "application/json",
//   });
//   a.href = URL.createObjectURL(file);

//   const now = new Date();
//   const filenameHeader = all ? "allProcesses" : "process";
//   const filename = `${filenameHeader}-${now.getFullYear()}-${
//     now.getMonth() + 1
//   }-${now.getDate()}-${now.getHours()}h${now.getMinutes()}m.json`;
//   a.download = filename;

//   a.click();
//   URL.revokeObjectURL(a.href);
// };

// POST: client send data to server, then server store data to DB;
const _sendResultToServer = (result) => {
  $.post("./api/result", result).done((response) => {
    console.log(`server replies: ${response}`);
  });
};

// $("#tempBtn").click(() => _getAllResultFromServer());

// const _getAllResultFromServer = () => {
//   // $.get("./api/results").done((response) => {
//   //   console.log(response);
//   // });
//   $.get("./api/results", function (data) {
//     // console.log(data);
//     _downloadResults(JSON.parse(data), true);
//   });
// };
