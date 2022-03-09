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

const LTAA = {
  name: "LTAA",
  phases: [
    {
      phase: INDUCTION_PREPARATION,
      tasks: [
        { task: "Quotation - TX: VA21" },
        { task: "Create/Update Structure (as maint.) - TX: ZISTRUC" },
        { task: "Update Lifetime for LCP, LLP - Application: M/J/R" },
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
          info: ["Creation of I&F Package"],
        },
        {
          task: "Primary Disposition - TX: IBX",
        },
        {
          task: "Tasklistassignment - SAP -> FastPro -> SAP",
          info: ["Routingplanhead", "Repaircodes"],
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
        { task: "Shortage - Application: FastPro - Fehlteilschnittstelle" },
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
          info: [
            "Create Purchase Requisition - TX:IBX",
            "Create Purchase Order;\nCreate Delivery;\nOutbound: TX: ADSUBCON",
            "Physical Exchange, Modification at Vendor  - TX: EWI",
            "Inbound - TX: MIGO",
            "QI- Release - TX: ZMB_QIREL",
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
      phase: MONITORING_EVENT_MONITORING,
      tasks: [
        { task: "Event Monitoring - TX:ZIOPCR" },
        { task: "Removal Plan - TX: ZI_REMPLAN" },
      ],
    },
    {
      phase: OUTGOING_OUTGOING_DOCUMENTATION,
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

const HPUS = {
  name: "HPUS",
  phases: [
    {
      phase: INDUCTION_PREPARATION,
      tasks: [
        { task: "Create Contract - TX: VA41" },
        { task: "Forecast outside SAP" },
        {
          task: "Create/Update Structure (as maint.) & Inc. Characteristics - TX: ZISTRUC",
        },
      ],
    },
    {
      phase: INDUCTION,
      tasks: [
        { task: "Select Workscoping - TX: IW51" },
        { task: "Creation of Sales Order & Project - TX: IW51" },
        { task: "Correct PN/SN - TX: IW51" },
        { task: "Return Delivery - TX: IW51" },
        { task: "Goods Receipt - TX: IW51" },
        { task: "Release Project and Network -  TX: IW51" },
        { task: "Creation of Routine Orders - TX: IW51 (PM - Generator Job" },
        { task: "Release Routine Orders - TX: IW38" },
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
          task: "Laborclocking due to physical dismantling of piece parts - TX: ZHCLOCK",
        },
        {
          task: "Initial Inspection - TX: IBX",
          info: ["Creation of I&F Package"],
        },
        {
          task: "Primary Disposition - TX: IBX",
          info: [
            "Automatic manualassignment",
            "Automatic Inspection Task List (E)",
          ],
        },
      ],
    },
    {
      phase: PROVISIONING,
      tasks: [
        { task: "Sourcing/ Unsourcing - TX: SRC" },
        { task: "Sortage Report - TX: ZIXSHORT" },
        { task: "Pick/ Return Consumeables- TX: ZMPICK/ ZMBSCAN" },
      ],
    },
    {
      phase: WORK_PLANNING,
      tasks: [
        {
          task: "Repair Task List (W) & Master Task List Operation (Y) assigned manually within work oder view",
          info: ["Bushingprocess - TX: IBX", "IRO/ IDR Assignment - TX: IBX"],
        },
        {
          task: "SubCon - TX: IBX",
          info: [
            "Create Purchase Requisition - TX: IBX",
            "Create Purchase Order Delivery Post Goods Issue - TX: ADSUBCON",
          ],
        },
      ],
    },
    {
      phase: WORK_EXECUTION_REPAIR,
      tasks: [
        { task: "Physical Repair Execution" },
        {
          task: "Labor Clocking for Repair Order/ Bushing Order - TX: ZHCLOCK ",
        },
        { task: "Labor Clocking for unproductive work (e.g. training)" },
        {
          task: "Further SubContracting",
          info: [
            "Physical Exchange, Modification at Vendor - TX:EWI",
            "Inbound - TX: MIGO",
            "QI- Release - TX: ZMB_QIREL",
          ],
        },
        { task: "Labor posting manually - TX: TIMECALC" },
        { task: "Post consumption of Bushing of Rep. Order - TX: ZIPP" },
        { task: "Final Inspection - TX: EWI" },
        { task: "Final Disposition - TX: EWI" },
      ],
    },
    {
      phase: ASSEMBLY,
      tasks: [{ task: "Installation - TX: ZIE_INST" }],
    },
    {
      phase: MONITORING_EVENT_MONITORING,
      tasks: [
        { task: "Removal Plan - TX: ZI_REMPLAN" },
        { task: "Event Monitoring - TX:ZIOPCR" },
        { task: "Operation List - TX: ZIA_OPER_LIST" },
      ],
    },
    {
      phase: OUTGOING_OUTGOING_DOCUMENTATION,
      tasks: [
        { task: "Change Equi-PN - TX: IW52" },
        { task: "Certification - TX: ZICCLCTNEW, ZICCLCTCHG, and ZICCLCTAUTO" },
        { task: "Terdown Report -  TX: IW52" },
        { task: "Printing of Documentation - TX: ZIOPCR_PRINT" },
      ],
    },
    {
      phase: FINISH_MRO_EVENT,
      tasks: [
        { task: "Finish MRO-Event - TX: IW52" },
        { task: "Close Build Orders (tech. And busi.) - TX: IW38" },
        { task: "Certification - TX: ZICCLCTNEW, ZICCLCTCHG, and ZICCLCTAUTO" },
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
        { task: "Create Contract - TX: VA41" },
        { task: "Forecast outside SAP" },
        {
          task: "Create/Update Structure (as maint.) & Inc. Characteristics - TX: ZISTRUC",
        },
      ],
    },
    {
      phase: INDUCTION,
      tasks: [
        { task: "Select Workscoping - TX: IW51" },
        { task: "Creation of Sales Order & Project - TX: IW51" },
        { task: "Correct PN/SN - TX: IW51" },
        { task: "Return Delivery - TX: IW51" },
        { task: "Receipt Asset into Induction Stock - TX: IW51" },
        { task: "Release Project and Network -  TX: IW51" },
        { task: "Creation of Routine Orders - TX: IW51 (PM - Generator Job" },
        { task: "Release Routine Orders - TX: IW38" },
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
          task: "Laborclocking due to physical dismantling of piece parts - TX: ZHCLOCK",
        },
        { task: "Record Inpection & Findings - TX: IBX (OPTIONAL)" },
        {
          task: "Primary Disposition - TX: IBX",
          info: [
            "Automatic manualassignment",
            "Automatic Inspection Task List (E)",
          ],
        },
      ],
    },
    {
      phase: PROVISIONING,
      tasks: [
        { task: "Sourcing/ Unsourcing - TX: SRC" },
        { task: "Sortage Report - TX: ZIXSHORT" },
        { task: "Pick/ Return Consumeables- TX: ZMPICK/ ZMBSCAN" },
      ],
    },
    {
      phase: WORK_PLANNING,
      tasks: [
        {
          task: "Repair Task List (W) & Master Task List Operation (Y) assigned manually within work oder view",
          info: ["Bushingprocess - TX: IBX", "IRO/ IDR Assignment - TX: IBX"],
        },
        {
          task: "SubCon - TX: IBX",
          info: [
            "Create Purchase Requisition - TX: IBX",
            "Create Purchase Order Delivery Post Goods Issue - TX: ADSUBCON",
          ],
        },
      ],
    },
    {
      phase: WORK_EXECUTION_REPAIR,
      tasks: [
        { task: "Physical Repair Execution" },
        {
          task: "Labor Clocking for Repair Order/ Bushing Order - TX: ZHCLOCK ",
        },
        { task: "Labor Clocking for unproductive work (e.g. training)" },
        {
          task: "Further SubContracting",
          info: [
            "Physical Exchange, Modification at Vendor - TX:EWI",
            "Inbound - TX: MIGO",
            "QI- Release - TX: ZMB_QIREL",
          ],
        },
        { task: "Labor posting manually - TX: TIMECALC" },
        { task: "Post consumption of Bushing of Rep. Order - TX: ZIPP" },
        { task: "Final Disposition - TX: EWI" },
      ],
    },
    {
      phase: ASSEMBLY,
      tasks: [{ task: "Installation - TX: ZIE_INST" }],
    },
    {
      phase: MONITORING_EVENT_MONITORING,
      tasks: [
        { task: "Removal Plan - TX: ZI_REMPLAN" },
        { task: "Event Monitoring - TX:ZIOPCR" },
        { task: "Outgoing PNs - TX: ZI_OUT" },
      ],
    },
    {
      phase: OUTGOING_OUTGOING_DOCUMENTATION,
      tasks: [
        { task: "Change Equi-PN - TX: IW52" },
        { task: "Certification - TX: ZICCLCTNEW, ZICCLCTCHG, and ZICCLCTAUTO" },
        { task: "Printing of Documentation - TX: ZIOPCR_PRINT" },
      ],
    },
    {
      phase: FINISH_MRO_EVENT,
      tasks: [
        { task: "Finish MRO-Event - TX: IW52" },
        { task: "Close Build Orders (tech. And busi.) - TX: IW38" },
        { task: "Certification - TX: ZICCLCTNEW, ZICCLCTCHG, and ZICCLCTAUTO" },
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
// const templateNames = templates.map((tempObj) => tempObj.name);
// const templateTaskCounts = makeTemplateTaskCounts(templates);

module.exports = {
  templates,
  phases,
  // templateNames,
  // templateTaskCounts,
};
