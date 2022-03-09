// this is the output of getPhaseCenteredTemplates(templates, phases)
const phaseCenteredTemplates = {
  "Induction Preparation": {
    "Induction Preparation-1": {
      task: "Quotation - TX: VA21",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction Preparation-2": {
      task: "Create/Update Structure (as maint.) - TX: ZISTRUC",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction Preparation-3": {
      task: "Update Lifetime for LCP, LLP - Application: M/J/R",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction Preparation-4": {
      task: "Create Contract - TX: VA41",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction Preparation-5": {
      task: "Forecast outside SAP",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction Preparation-6": {
      task: "Create/Update Structure (as maint.) & Inc. Characteristics - TX: ZISTRUC",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
  },
  Induction: {
    "Induction-1": {
      task: "Workscoping - TX: IW51",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction-2": {
      task: "Creation of Sales Order - TX: IW51",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction-3": {
      task: "Production Planning (Network) - Application FastPro",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction-4": {
      task: "Goods Receipt - TX: IW51",
      templates: ["LTAA", "HPUS"],
      chosen: false,
    },
    "Induction-5": {
      task: "Creation of Routine Orders - Application FastPro to SAP",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction-6": {
      task: "Get Value from M/J/R - TX: IW51",
      templates: ["LTAA"],
      chosen: false,
    },
    "Induction-7": {
      task: "Select Workscoping - TX: IW51",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-8": {
      task: "Creation of Sales Order & Project - TX: IW51",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-9": {
      task: "Correct PN/SN - TX: IW51",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-10": {
      task: "Return Delivery - TX: IW51",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-11": {
      task: "Release Project and Network -  TX: IW51",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-12": {
      task: "Creation of Routine Orders - TX: IW51 (PM - Generator Job",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-13": {
      task: "Release Routine Orders - TX: IW38",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Induction-14": {
      task: "Receipt Asset into Induction Stock - TX: IW51",
      templates: ["LTLGS"],
      chosen: false,
    },
  },
  "Incoming Inspection": {
    "Incoming Inspection-1": {
      task:
        "Printworkbench (TX: ZIPOCR_PRINT e.g. Incoming Accessory List\n" +
        "Incoming QEX Accessory List\n" +
        "Incoming Externals List\n" +
        "Incoming QEC Externals List)",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
  },
  Disassembly: {
    "Disassembly-1": {
      task: "Initial Inspection - TX: IBX",
      templates: ["LTAA", "HPUS"],
      chosen: false,
      info: ["Creation of I&F Package"],
    },
    "Disassembly-2": {
      task: "Primary Disposition - TX: IBX",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
    "Disassembly-3": {
      task: "Tasklistassignment - SAP -> FastPro -> SAP",
      templates: ["LTAA"],
      chosen: false,
      info: ["Routingplanhead", "Repaircodes"],
    },
    "Disassembly-4": {
      task: "Manualassignment - TX: IBX",
      templates: ["LTAA"],
      chosen: false,
    },
    "Disassembly-5": {
      task: "Laborclocking due to physical dismantling of piece parts - TX: ZHCLOCK",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Disassembly-6": {
      task: "Record Inpection & Findings - TX: IBX (OPTIONAL)",
      templates: ["LTLGS"],
      chosen: false,
    },
  },
  Provisioning: {
    "Provisioning-1": {
      task: "Sourcing/ Unsourcing - TX: SRC",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
    "Provisioning-2": {
      task: "Shortage - Application: FastPro - Fehlteilschnittstelle",
      templates: ["LTAA"],
      chosen: false,
    },
    "Provisioning-3": {
      task: "Picking - TX: ZMPICK",
      templates: ["LTAA"],
      chosen: false,
    },
    "Provisioning-4": {
      task: "Sortage Report - TX: ZIXSHORT",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Provisioning-5": {
      task: "Pick/ Return Consumeables- TX: ZMPICK/ ZMBSCAN",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
  },
  "Work Planning": {
    "Work Planning-1": {
      task: "Repair Task List (W) & Master Task List Operation (Y) assigned manually within work oder view",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
      info: ["Bushingprocess - TX: IBX", "IRO/ IDR Assignment - TX: IBX"],
    },
    "Work Planning-2": {
      task: "SubCon - TX: IBX",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
      info: [
        "Create Purchase Requisition - TX: IBX",
        "Create Purchase Order Delivery Post Goods Issue - TX: ADSUBCON",
      ],
    },
  },
  "Work Execution / Repair": {
    "Work Execution / Repair-1": {
      task: "Detailed Inspection - TX: IBX",
      templates: ["LTAA"],
      chosen: false,
    },
    "Work Execution / Repair-2": {
      task: "Secondary Disposition - TX: IBX",
      templates: ["LTAA"],
      chosen: false,
    },
    "Work Execution / Repair-3": {
      task: "SubContracting",
      templates: ["LTAA"],
      chosen: false,
      info: [
        "Create Purchase Requisition - TX:IBX",
        "Create Purchase Order;\nCreate Delivery;\nOutbound: TX: ADSUBCON",
        "Physical Exchange, Modification at Vendor  - TX: EWI",
        "Inbound - TX: MIGO",
        "QI- Release - TX: ZMB_QIREL",
      ],
    },
    "Work Execution / Repair-4": {
      task: "Final Inspection - TX: EWI",
      templates: ["LTAA", "HPUS"],
      chosen: false,
    },
    "Work Execution / Repair-5": {
      task: "Final Disposition - TX: EWI",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
    "Work Execution / Repair-6": {
      task: "Physical Repair Execution",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Work Execution / Repair-7": {
      task: "Labor Clocking for Repair Order/ Bushing Order - TX: ZHCLOCK ",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Work Execution / Repair-8": {
      task: "Labor Clocking for unproductive work (e.g. training)",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Work Execution / Repair-9": {
      task: "Further SubContracting",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
      info: [
        "Physical Exchange, Modification at Vendor - TX:EWI",
        "Inbound - TX: MIGO",
        "QI- Release - TX: ZMB_QIREL",
      ],
    },
    "Work Execution / Repair-10": {
      task: "Labor posting manually - TX: TIMECALC",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Work Execution / Repair-11": {
      task: "Post consumption of Bushing of Rep. Order - TX: ZIPP",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
  },
  Assembly: {
    "Assembly-1": {
      task: "Installation - TX: ZIE_INST",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
  },
  "Monitoring / Event Monitoring": {
    "Monitoring / Event Monitoring-1": {
      task: "Event Monitoring - TX:ZIOPCR",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
    "Monitoring / Event Monitoring-2": {
      task: "Removal Plan - TX: ZI_REMPLAN",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
    "Monitoring / Event Monitoring-3": {
      task: "Operation List - TX: ZIA_OPER_LIST",
      templates: ["HPUS"],
      chosen: false,
    },
    "Monitoring / Event Monitoring-4": {
      task: "Outgoing PNs - TX: ZI_OUT",
      templates: ["LTLGS"],
      chosen: false,
    },
  },
  "Outgoing / Outgoing Documentation": {
    "Outgoing / Outgoing Documentation-1": {
      task: "Printing of Documentation - TX: ZIOPCR_PRINT",
      templates: ["LTAA", "HPUS", "LTLGS"],
      chosen: false,
    },
    "Outgoing / Outgoing Documentation-2": {
      task: "Change Equi-PN - TX: IW52",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Outgoing / Outgoing Documentation-3": {
      task: "Certification - TX: ZICCLCTNEW, ZICCLCTCHG, and ZICCLCTAUTO",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Outgoing / Outgoing Documentation-4": {
      task: "Terdown Report -  TX: IW52",
      templates: ["HPUS"],
      chosen: false,
    },
  },
  "Finish MRO Event": {
    "Finish MRO Event-1": {
      task: "Set Sales Order Status, Set WBS Status, Update Master Batch - TX: IW52",
      templates: ["LTAA"],
      chosen: false,
    },
    "Finish MRO Event-2": {
      task: "Finish Event in FAST/pro -  TX: IW52",
      templates: ["LTAA"],
      chosen: false,
    },
    "Finish MRO Event-3": {
      task: "Finish MRO-Event - TX: IW52",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Finish MRO Event-4": {
      task: "Close Build Orders (tech. And busi.) - TX: IW38",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
    "Finish MRO Event-5": {
      task: "Certification - TX: ZICCLCTNEW, ZICCLCTCHG, and ZICCLCTAUTO",
      templates: ["HPUS", "LTLGS"],
      chosen: false,
    },
  },
};
