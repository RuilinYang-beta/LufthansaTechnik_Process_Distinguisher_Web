/*
 * The same structure with templatePhaseCentered.js.
 * The difference is, the chosen field are marked as true
 * according to user's choice; and there is a `userComment`
 * field if the user has input for a phase.
 */
const verboseResult = {
  phaseA: {
    "taskA-1": {
      task: "taskName",
      templates: ["tempA", "tempB"],
      info: ["info1", "info2"],
      chosen: true,
    },
    "taskA-2": {
      task: "taskName",
      templates: ["tempA", "tempB"],
      chosen: false,
    },
    userComment: "user has input something for this phase",
  },
};
