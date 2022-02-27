/* ASSUMPTION:
 * if a task has subtasks, and the task is shared between more than one templates,
 * its possible that each template has different subtask on that task.
 */

// TODO: adding task and adding subtask is repetitive, refactor
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

            taskToId[taskContent] = id;
            phaseCenteredTemplates[phase][id] = {
              task: taskContent,
              chosen: false,
              templates: [template["name"]],
            };
            if (taskObj.hasOwnProperty("subtasks")) {
              let subtaskCounter = 1;
              let subtasks = {};
              for (let subtaskObj of taskObj["subtasks"]) {
                let subtaskContent = subtaskObj["subtask"];
                // if subtask is not yet added
                if (!taskToId.hasOwnProperty(subtaskObj["subtask"])) {
                  let id = `${phase}-${taskCounter}-${subtaskCounter}`;
                  subtaskCounter++;
                  taskToId[subtaskContent] = id;
                  subtasks[id] = {
                    subtask: subtaskContent,
                    chosen: false,
                    templates: [template["name"]],
                  };
                } else {
                  // if subtask is already added
                  let subtaskId = taskToId[subtaskContent];
                  let taskId = taskToId[taskContent];
                  phaseCenteredTemplates[phase][taskId]["subtasks"][subtaskId][
                    "templates"
                  ].push(template["name"]);
                }
                phaseCenteredTemplates[phase][id]["subtasks"] = subtasks;
              }
            }
            taskCounter++;
          } else {
            // if task is already added,
            // this happens when two or more phases share a same task
            let taskId = taskToId[taskContent];
            phaseCenteredTemplates[phase][taskId]["templates"].push(
              template["name"]
            );

            // TODO: check if the already added task has unadded subtask
          }
        }
      }
    }
  }
  return phaseCenteredTemplates;
};

module.exports = {
  getPhaseCenteredTemplates,
};
