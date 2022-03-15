const LoremIpsum = require("lorem-ipsum").LoremIpsum;

// guarantee that `templates` and `phases` use the same phase name
const INDUCTION_PREPARATION = "Induction Preparation";
const INDUCTION = "Induction";
const INCOMING_INSPECTION = "Incoming Inspection";
const DISASSEMBLY = "Disassembly";
const PROVISIONING = "Provisioning";
const WORK_PLANNING = "Work Planning";
const WORK_EXECUTION_REPAIR = "Work Execution / Repair";
const ASSEMBLY = "Assembly";
const MONITORING_EVENT_MONITORING = "Monitoring / Event Monitoring";
const OUTGOING_OUTGOING_DOCUMENTATION = "Outgoing / Outgoing Documentation";
const FINISH_MRO_EVENT = "Finish MRO Event";

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 10,
    min: 1,
  },
});

const LTAA = {
  name: "LTAA",
  phases: [
    {
      phase: INDUCTION_PREPARATION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: INDUCTION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: INCOMING_INSPECTION,
      tasks: [{ task: lorem.generateSentences(1) }],
    },
    {
      phase: DISASSEMBLY,
      tasks: [
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [lorem.generateSentences(1)],
        },
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [lorem.generateSentences(1), lorem.generateSentences(1)],
        },
      ],
    },
    {
      phase: PROVISIONING,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: WORK_EXECUTION_REPAIR,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [
            lorem.generateSentences(1),
            lorem.generateSentences(1),
            lorem.generateSentences(1),
          ],
        },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: ASSEMBLY,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: MONITORING_EVENT_MONITORING,
      tasks: [{ task: lorem.generateSentences(1) }],
    },
    {
      phase: OUTGOING_OUTGOING_DOCUMENTATION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: FINISH_MRO_EVENT,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
  ],
};

const HPUS = {
  name: "HPUS",
  phases: [
    {
      phase: INDUCTION_PREPARATION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: INDUCTION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: INCOMING_INSPECTION,
      tasks: [{ task: lorem.generateSentences(1) }],
    },
    {
      phase: DISASSEMBLY,
      tasks: [
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [
            lorem.generateSentences(1),
            lorem.generateSentences(1),
            lorem.generateSentences(1),
          ],
        },
        {
          task: lorem.generateSentences(1),
          info: [lorem.generateSentences(1), lorem.generateSentences(1)],
        },
      ],
    },
    {
      phase: PROVISIONING,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: WORK_PLANNING,
      tasks: [
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [
            lorem.generateSentences(1),
            lorem.generateSentences(1),
            lorem.generateSentences(1),
          ],
        },
      ],
    },
    {
      phase: WORK_EXECUTION_REPAIR,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [
            lorem.generateSentences(1),
            lorem.generateSentences(1),
            lorem.generateSentences(1),
          ],
        },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: ASSEMBLY,
      tasks: [{ task: lorem.generateSentences(1) }],
    },
    {
      phase: MONITORING_EVENT_MONITORING,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: OUTGOING_OUTGOING_DOCUMENTATION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: FINISH_MRO_EVENT,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
  ],
};

const LTLGS = {
  name: "LTLGS",
  phases: [
    {
      phase: INDUCTION_PREPARATION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: INDUCTION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: INCOMING_INSPECTION,
      tasks: [{ task: lorem.generateSentences(1) }],
    },
    {
      phase: DISASSEMBLY,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [
            lorem.generateSentences(1),
            lorem.generateSentences(1),
            lorem.generateSentences(1),
          ],
        },
      ],
    },
    {
      phase: PROVISIONING,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: WORK_PLANNING,
      tasks: [
        {
          task: lorem.generateSentences(1),
          info: [lorem.generateSentences(1)],
        },
        {
          task: lorem.generateSentences(1),
          info: [lorem.generateSentences(1), lorem.generateSentences(1)],
        },
      ],
    },
    {
      phase: WORK_EXECUTION_REPAIR,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        {
          task: lorem.generateSentences(1),
          info: [
            lorem.generateSentences(1),
            lorem.generateSentences(1),
            lorem.generateSentences(1),
          ],
        },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: ASSEMBLY,
      tasks: [{ task: lorem.generateSentences(1) }],
    },
    {
      phase: MONITORING_EVENT_MONITORING,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: OUTGOING_OUTGOING_DOCUMENTATION,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
    {
      phase: FINISH_MRO_EVENT,
      tasks: [
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
        { task: lorem.generateSentences(1) },
      ],
    },
  ],
};

const phases = [
  INDUCTION_PREPARATION,
  INDUCTION,
  INCOMING_INSPECTION,
  DISASSEMBLY,
  PROVISIONING,
  WORK_PLANNING,
  WORK_EXECUTION_REPAIR,
  ASSEMBLY,
  MONITORING_EVENT_MONITORING,
  OUTGOING_OUTGOING_DOCUMENTATION,
  FINISH_MRO_EVENT,
];
const templates = [LTAA, HPUS, LTLGS];

module.exports = {
  templates,
  phases,
};
