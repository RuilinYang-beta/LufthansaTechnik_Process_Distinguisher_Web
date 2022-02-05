const getPhaseCenteredTemplates = (templates, phases) => {
  const phaseCenteredTemplates = {};
  for (let phase of phases) {
    let counter = 1;
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
            let id = `${phase} - ${counter}`;
            counter++;
            taskToId[taskContent] = id;
            phaseCenteredTemplates[phase][id] = {
              task: taskContent,
              chosen: false,
              templates: [template],
              // ignore subtask for now
            };
          } else {
            // if task is already added
            let taskId = taskToId[taskContent];
            phaseCenteredTemplates[phase][taskId]["templates"].push(template);
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
