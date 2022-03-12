const { templates, phases } = require("../model/templates");
const util = require("util");

const getTemplateTaskCounts = (templates, phases) => {
  const templateTaskCounts = {};
  for (let templateObj of templates) {
    const taskCountObj = {};
    for (let phase of phases) {
      taskCountObj[phase] = 0;
    }
    let summary = 0;
    for (let phaseObj of templateObj["phases"]) {
      const taskCount = phaseObj["tasks"].length;
      taskCountObj[phaseObj["phase"]] = taskCount;
      summary += taskCount;
    }
    taskCountObj["Summary"] = summary;
    const templateName = templateObj["name"];
    templateTaskCounts[templateName] = taskCountObj;
  }
  return templateTaskCounts;
};

const getPhaseCenteredTemplates = (templates, phases) => {
  const phaseCenteredTemplates = {};
  for (let phase of phases) {
    let taskCounter = 1;
    let taskToId = {};
    phaseCenteredTemplates[phase] = {};
    for (let template of templates) {
      const foundPhase = template["phases"].find(
        (ele) => ele["phase"] === phase
      );
      if (foundPhase) {
        for (let taskObj of foundPhase["tasks"]) {
          let taskContent = taskObj["task"];
          // if task is not yet added
          if (!taskToId.hasOwnProperty(taskContent)) {
            // generate an id for this task
            let id = `${phase}-${taskCounter}`;
            taskCounter++;

            taskToId[taskContent] = id;
            phaseCenteredTemplates[phase][id] = {
              task: taskContent,
              templates: [template["name"]],
              chosen: false,
            };
            if (taskObj.hasOwnProperty("info")) {
              phaseCenteredTemplates[phase][id]["info"] = taskObj["info"];
            }
          } else {
            // if task is already added,
            // this happens when two or more phases share a same task
            let taskId = taskToId[taskContent];
            phaseCenteredTemplates[phase][taskId]["templates"].push(
              template["name"]
            );
          }
        }
      }
    }
  }
  return phaseCenteredTemplates;
};

const templateTaskCounts = getTemplateTaskCounts(templates, phases);
const phaseCenteredTemplates = getPhaseCenteredTemplates(templates, phases);
const templateNames = templates.map((tempObj) => tempObj.name);

module.exports = {
  templateTaskCounts,
  phaseCenteredTemplates,
  templateNames,
};
