// TODO: add the other two templates

// guarantee that `templates` and `phases` use the same phase name
const INDUCTION_PREPARATION = "Induction Preparation";
const INDUCTION = "Induction";
const INCOMING_INSPECTION = "Incoming Inspection";
const DISASSEMBLY = "Disassembly";
const PROVISIONING = "Provisioning";
const WORK_PLANNING = "Work Planning";
const WORK_EXECUTION_REPAIR = "Work Execution / Repair";
const ASSEMBLY = "Assembly";
const MONITORING = "Monitoring";
const OUTGOING = "Outgoing";
const FINISH_MRO_EVENT = "Finish MRO Event";

const LTAA = {
  name: "LTAA",
  phases: [
    {
      phase: INDUCTION_PREPARATION,
      tasks: [
        {
          task: "Quotation - TX: VA21",
        },
        {
          task: "Create/Update Structure (as maint.) - TX: ZISTRUC",
        },
        {
          task: "Update Lifetime for LCP, LLP - Application: M/J/R",
        },
      ],
    },
    {
      phase: INDUCTION,
      tasks: [
        {
          task: "Workscoping - TX: IW51",
        },
        {
          task: "Creation of Sales Order - TX: IW51",
        },
        {
          task: "Production Planning (Network) - Application FastPro",
        },
        {
          task: "Goods Receipt - TX: IW51",
        },
        {
          task: "Creation of Routine Orders - Application FastPro to SAP",
        },
        {
          task: "Get Value from M/J/R - TX: IW51",
        },
      ],
    },
    {
      phase: INCOMING_INSPECTION,
      tasks: [
        {
          task: "Printworkbench (TX: ZIPOCR_PRINT e.g. Incoming Accessory List\nIncoming QEX Accessory List\nIncoming Externals List\nIncoming QEC Externals List)",
        },
      ],
    },
    {
      phase: DISASSEMBLY,
      tasks: [
        {
          task: "Initial Inspection - TX: IBX",
          subtasks: [
            {
              subtask: "Creation of I&F Package",
            },
          ],
        },
        {
          task: "Primary Disposition - TX: IBX",
        },
        {
          task: "Tasklistassignment - SAP -> FastPro -> SAP",
          subtasks: [
            { subtask: "Routingplanhead" },
            { subtask: "Repaircodes" },
          ],
        },
        {
          task: "Manualassignment - TX: IBX",
        },
      ],
    },
    {
      phase: PROVISIONING,
      tasks: [
        { task: "Sourcing/ Unsourcing - TX: SRC" },
        { task: "Sortage - Application: FastPro - Fehlteilschnittstelle" },
        { task: "Picking - TX: ZMPICK" },
      ],
    },
    {
      phase: WORK_EXECUTION_REPAIR,
      tasks: [
        { task: "Detailed Inspection - TX: IBX" },
        { task: "Secondary Disposition - TX: IBX" },
        {
          task: "SubContracting",
          subtasks: [
            { subtask: "Create Purchase Requisition - TX:IBX" },
            {
              subtask:
                "Create Purchese Order;\nCreate Delivery;\nOuntbound: TX: ADSUBCON",
            },
            {
              subtask: "Physical Exchange, Modification at Vendor  - TX: EWI",
            },
            { subtask: "Inbound - TX: MIGO" },
            { subtask: "QI- Release - TX: ZMB_QIREL" },
          ],
        },
        { task: "Final Inspection - TX: EWI" },
        { task: "Final Disposition - TX: EWI" },
      ],
    },
    {
      phase: ASSEMBLY,
      tasks: [{ task: "Installation - TX: ZIE_INST" }],
    },
    {
      phase: MONITORING,
      tasks: [
        { task: "Event Monitoring - TX:ZIOPCR" },
        { task: "Removal Plan - TX: ZI_REMPLAN" },
      ],
    },
    {
      phase: OUTGOING,
      tasks: [{ task: "Printing of Documentation - TX: ZIOPCR_PRINT" }],
    },
    {
      phase: FINISH_MRO_EVENT,
      tasks: [
        {
          task: "Set Sales Order Status, Set WBS Status, Update Master Batch - TX: IW52",
        },
        { task: "Finish Event in FAST/pro -  TX: IW52" },
      ],
    },
  ],
};

const templates = [LTAA];
const phases = [
  INDUCTION_PREPARATION,
  INDUCTION,
  INCOMING_INSPECTION,
  DISASSEMBLY,
  PROVISIONING,
  WORK_PLANNING,
  WORK_EXECUTION_REPAIR,
  ASSEMBLY,
  MONITORING,
  OUTGOING,
  FINISH_MRO_EVENT,
];

module.exports = {
  templates,
  phases,
};
