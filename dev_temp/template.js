{
    name: "LTAA",
    phases: [
      {
        phase: "Induction Preparation",
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
        phase: "Induction",
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
        phase: "Incoming Inspection",
        tasks: [
          {
            task: "Printworkbench (TX: ZIPOCR_PRINT e.g. Incoming Accessory List\nIncoming QEX Accessory List\nIncoming Externals List\nIncoming QEC Externals List)",
          },
        ],
      },
      {
        phase: "Disassembly",
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
        phase: "Provisioning",
        tasks: [
          { task: "Sourcing/ Unsourcing - TX: SRC" },
          { task: "Sortage - Application: FastPro - Fehlteilschnittstelle" },
          { task: "Picking - TX: ZMPICK" },
        ],
      },
      {
        phase: "Work Execution / Repair",
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
        phase: "Assembly",
        tasks: [{ task: "Installation - TX: ZIE_INST" }],
      },
      {
        phase: "Monitoring",
        tasks: [
          { task: "Event Monitoring - TX:ZIOPCR" },
          { task: "Removal Plan - TX: ZI_REMPLAN" },
        ],
      },
      {
        phase: "Outgoing",
        tasks: [{ task: "Printing of Documentation - TX: ZIOPCR_PRINT" }],
      },
      {
        phase: "Finish MRO Event",
        tasks: [
          {
            task: "Set Sales Order Status, Set WBS Status, Update Master Batch - TX: IW52",
          },
          { task: "Finish Event in FAST/pro -  TX: IW52" },
        ],
      },
    ],
  }