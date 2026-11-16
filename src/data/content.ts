import type {
  AIApplication,
  DecisionTier,
  DecisionTierInfo,
  LimitRow,
  LoopNode,
  Professional,
  Slide,
  Stage,
} from "./types.ts";

export const disclaimer =
  "For educational purposes only. This conceptual pathway illustrates potential AI support in rehabilitation care. All clinical decisions must remain with qualified healthcare professionals.";

export const decisionTiers: DecisionTierInfo[] = [
  {
    id: "ai-supported",
    name: "AI-supported",
    pattern: "Dashed ring",
    meaning:
      "Software may prepare, organise, or display information. A person remains accountable for how that information is used.",
  },
  {
    id: "human-supervised",
    name: "Human-supervised",
    pattern: "Double ring",
    meaning:
      "Software may draft an insight or a note. A qualified professional reviews it before it informs care.",
  },
  {
    id: "human-only",
    name: "Human-only",
    pattern: "Solid square",
    meaning:
      "A person decides. Software does not make this judgement, and it does not act on it.",
  },
];

export const tierName = (id: DecisionTier) =>
  decisionTiers.find((tier) => tier.id === id)?.name ?? id;

const stageSeeds: Stage[] = [
  {
    id: "01",
    number: "01",
    title: "Initial assessment",
    summary:
      "The team builds a picture of the person's situation, function, and rehabilitation needs.",
    activities: [
      "Patient evaluation",
      "Functional assessment",
      "Movement and mobility assessment",
      "Identifying rehabilitation needs",
    ],
    limitations: [
      "Software may organise observations from an assessment. It cannot decide what the person needs.",
      "A movement trace is a recording to review, not an explanation of why the movement looks as it does.",
    ],
    oversight:
      "A qualified professional conducts the assessment and decides which needs later planning will address.",
  },
  {
    id: "02",
    number: "02",
    title: "Goal setting",
    summary:
      "The person and the team agree the direction of rehabilitation and the functional milestones they will watch.",
    activities: [
      "Naming rehabilitation objectives",
      "Choosing functional milestones",
      "Working on those choices together",
    ],
    limitations: [
      "A chart can show recorded change against a milestone the team has already agreed.",
      "Software cannot approve a goal, retire one, or rank what should matter to the person.",
    ],
    oversight:
      "Goals are agreed by the person and the qualified professionals who share their care.",
  },
  {
    id: "03",
    number: "03",
    title: "Therapy and intervention",
    summary:
      "Guided work with the team, including physiotherapy, occupational therapy, and prosthetic support.",
    activities: [
      "Physiotherapy",
      "Occupational therapy",
      "Prosthetic support",
      "Guided activities",
    ],
    limitations: [
      "Software may describe a recorded activity. It cannot choose a treatment or change one during a session.",
      "Recognising an activity is not the same as knowing whether that activity was appropriate or safe.",
    ],
    oversight:
      "A qualified professional leads the session and judges what should happen in the moment.",
  },
  {
    id: "04",
    number: "04",
    title: "Progress review",
    summary:
      "The team looks at change over time, including improvements, difficulties, and setbacks.",
    activities: [
      "Monitoring progress",
      "Reviewing functional improvement",
      "Identifying difficulties and setbacks",
    ],
    limitations: [
      "A draft report or a chart is a view of what was recorded. It is not a judgement about the person.",
      "A pattern in the record can be misleading when sessions were missed, measures changed, or context is absent.",
    ],
    oversight:
      "Professionals interpret the record with the person and decide whether the plan should change.",
  },
  {
    id: "05",
    number: "05",
    title: "Discharge planning",
    summary:
      "The team prepares for more independent activity, arrangements at home, and follow-up.",
    activities: [
      "Considering readiness for the next setting",
      "Preparing for independent activities",
      "Organising home care and follow-up",
    ],
    limitations: [
      "Draft documents and reminders can support a plan the team has already made.",
      "Software cannot decide that someone is ready to leave a service.",
    ],
    oversight:
      "A qualified professional, with the person, decides how discharge planning should proceed.",
  },
  {
    id: "06",
    number: "06",
    title: "Home follow-up",
    summary:
      "Contact continues away from the clinic through remote check-ins, reported outcomes, and follow-up communication.",
    activities: [
      "Remote monitoring",
      "Patient-reported outcomes",
      "Follow-up communication",
    ],
    limitations: [
      "A home log is material for a conversation. It is not a safety decision.",
      "A reminder can be missed, dismissed, or wrong for the day the person is having.",
    ],
    oversight:
      "Professionals remain responsible for follow-up decisions. The person decides what they are willing to share.",
  },
];

export const professionals: Professional[] = [
  {
    id: "physiotherapists",
    name: "Physiotherapists",
    summary: "Movement, mobility, and guided physical activity.",
    responsibilities: [
      "Assess movement and mobility",
      "Lead physiotherapy and guided physical activity",
      "Review how physical function is changing",
    ],
    aiCanAssist: [
      "Organise movement observations for the therapist to revisit",
      "Show a record of completed sessions beside the notes",
      "Prepare a draft description the therapist edits",
    ],
    aiMustNotReplace: [
      "The judgement of whether a movement is appropriate that day",
      "The choice of therapy",
      "The decision to change a programme",
    ],
    stageIds: ["01", "02", "03", "04", "05", "06"],
  },
  {
    id: "occupational-therapists",
    name: "Occupational therapists",
    summary: "Everyday activity, function, and life at home.",
    responsibilities: [
      "Assess how the person manages daily activities",
      "Guide practice of those activities",
      "Help plan the home and the routine around them",
    ],
    aiCanAssist: [
      "Keep a structured log of reported activities",
      "Display functional milestones the team has set",
      "Draft routine notes for the therapist to correct",
    ],
    aiMustNotReplace: [
      "The reading of what a difficulty means in the person's life",
      "The choice of activity or adaptation",
      "Advice that only a qualified therapist should give",
    ],
    stageIds: ["01", "02", "03", "04", "05", "06"],
  },
  {
    id: "prosthetists",
    name: "Prosthetists",
    summary: "Prosthetic assessment, fitting, and use in activity.",
    responsibilities: [
      "Assess prosthetic needs with the wider team",
      "Support fitting and use during therapy",
      "Review how the prosthesis is working in practice",
    ],
    aiCanAssist: [
      "Organise notes from fitting and review visits",
      "Track reported wear or practice the person has chosen to log",
      "Remind the team of a planned review",
    ],
    aiMustNotReplace: [
      "Fitting decisions",
      "Judgements about comfort, skin, or safety",
      "Changes to a prosthesis or to how it is used",
    ],
    stageIds: ["01", "03", "04", "05"],
  },
  {
    id: "doctors",
    name: "Doctors",
    summary: "Medical responsibility around assessment, review, and discharge.",
    responsibilities: [
      "Contribute medical context to the assessment",
      "Review progress when medical questions arise",
      "Share responsibility for discharge decisions",
    ],
    aiCanAssist: [
      "Assemble existing notes into a draft the doctor reads",
      "Surface dates and recorded measures for a review meeting",
    ],
    aiMustNotReplace: [
      "Diagnosis",
      "Treatment selection",
      "Medical clearance or any other medical decision",
    ],
    stageIds: ["01", "04", "05"],
  },
  {
    id: "rehabilitation-specialists",
    name: "Rehabilitation specialists",
    summary: "Coordination of the pathway across professions.",
    responsibilities: [
      "Hold the overall rehabilitation plan in view",
      "Help the team and the person set direction",
      "Review progress and the arrangements for follow-up",
    ],
    aiCanAssist: [
      "Keep the shared record in order",
      "Show milestones and recorded change on one page",
      "Draft a progress summary for a meeting",
    ],
    aiMustNotReplace: [
      "Approval of goals",
      "Changes to the plan",
      "The decision that someone is ready for the next setting",
    ],
    stageIds: ["01", "02", "04", "05", "06"],
  },
  {
    id: "nurses",
    name: "Nurses",
    summary: "Day-to-day care, observation, and follow-up contact.",
    responsibilities: [
      "Observe and support the person during care",
      "Contribute to reviews and discharge preparation",
      "Keep follow-up contact when that is part of the role",
    ],
    aiCanAssist: [
      "Organise observations the nurse has recorded",
      "Remind the person or the team of a planned contact",
      "Draft routine documentation for the nurse to sign off",
    ],
    aiMustNotReplace: [
      "Clinical observation",
      "Safety decisions",
      "Any instruction that should come from a nurse or another professional",
    ],
    stageIds: ["01", "03", "04", "05", "06"],
  },
  {
    id: "patients-and-caregivers",
    name: "Patients and caregivers",
    summary: "The people the pathway is for, and the people who support them.",
    responsibilities: [
      "Describe what matters and what daily life requires",
      "Take part in goals, practice, and planning for home",
      "Decide what information they are willing to share",
    ],
    aiCanAssist: [
      "Offer a way to log activities they choose to record",
      "Show their own logged entries back to them",
      "Carry a reminder of a contact the team has already planned",
    ],
    aiMustNotReplace: [
      "Their account of how they are doing",
      "Their consent and their priorities",
      "The professional's duty to listen and to decide",
    ],
    stageIds: ["01", "02", "03", "04", "05", "06"],
  },
];

export const applications: AIApplication[] = [
  {
    id: "movement-tracking",
    name: "Movement tracking",
    stageIds: ["01", "03"],
    whatItDoes:
      "Software may estimate how a person moves during a recorded activity, so a professional can review the recording beside what they saw.",
    informationUsed: [
      "A recording the team has chosen to capture",
      "The activity the professional asked the person to perform",
    ],
    benefits: [
      "May help a professional revisit a movement after the session",
      "May help keep a consistent description of what was recorded",
    ],
    limitations: [
      "It cannot say why a movement looks as it does",
      "It can misread a recording when the view is blocked, the setup changes, or the activity was not the one expected",
    ],
    supervision:
      "A qualified professional compares any trace with their own observation before it informs care.",
    decisionTier: "human-supervised",
  },
  {
    id: "data-organisation",
    name: "Assessment data organisation",
    stageIds: ["01"],
    whatItDoes:
      "Software may sort assessment notes and measures into a structure the team can scan.",
    informationUsed: [
      "Notes and measures a professional has already recorded",
      "The headings the service uses for an assessment",
    ],
    benefits: [
      "May help a team find an observation without rereading every page",
      "May help keep related notes together for a meeting",
    ],
    limitations: [
      "Sorting is not interpretation",
      "A missing note stays missing, and a misplaced note can hide it",
    ],
    supervision:
      "Professionals check that the organised record still says what they recorded.",
    decisionTier: "ai-supported",
  },
  {
    id: "documentation",
    name: "Documentation assistance",
    stageIds: ["01", "05"],
    whatItDoes:
      "Software may draft routine documentation from notes a professional has entered, for that professional to edit.",
    informationUsed: [
      "Structured notes from the visit or the planning meeting",
      "The document type the professional selected",
    ],
    benefits: [
      "May reduce time spent on repetitive wording",
      "May help a draft follow a consistent outline",
    ],
    limitations: [
      "A draft can omit a caveat or smooth over uncertainty",
      "It must not be filed, sent, or treated as a record until a person has read it",
    ],
    supervision:
      "The professional who signs the document reads and edits the draft first.",
    decisionTier: "human-supervised",
  },
  {
    id: "progress-visualisation",
    name: "Progress visualisation",
    stageIds: ["02", "04"],
    whatItDoes:
      "Software may plot milestones and recorded measures over time, using values the team has already entered.",
    informationUsed: [
      "Milestones the team has agreed",
      "Measures or notes dated by the service",
    ],
    benefits: [
      "May help a meeting look at change across several visits",
      "May help the person see the same picture the team is discussing",
    ],
    limitations: [
      "A chart only shows what was entered",
      "The scale, the gaps, and the labels still need a human reading",
    ],
    supervision:
      "The picture is a display. Professionals and the person decide what it means.",
    decisionTier: "ai-supported",
  },
  {
    id: "milestone-tracking",
    name: "Milestone tracking",
    stageIds: ["02"],
    whatItDoes:
      "Software may keep a list of functional milestones and show which ones the team has marked as met, in progress, or not yet started.",
    informationUsed: [
      "Milestones written by the team and the person",
      "Status updates a professional records",
    ],
    benefits: [
      "May help a long plan stay visible between visits",
      "May help a meeting start from the same list",
    ],
    limitations: [
      "Marking a milestone met is a human act",
      "The list cannot tell the team which milestone ought to come next",
    ],
    supervision:
      "The person and the professionals agree the milestones and any change to their status.",
    decisionTier: "human-supervised",
  },
  {
    id: "exercise-monitoring",
    name: "Exercise monitoring",
    stageIds: ["03"],
    whatItDoes:
      "Software may record whether a planned exercise session was logged as done, partly done, or missed.",
    informationUsed: [
      "The exercise list a professional set",
      "Completion entries from the session or from a log the person keeps",
    ],
    benefits: [
      "May help a therapist see which sessions were logged",
      "May help a review start from a shared record rather than memory alone",
    ],
    limitations: [
      "A completed log is not evidence that the exercise was performed as intended",
      "A missed log is not, by itself, a reason to change the plan",
    ],
    supervision:
      "The therapist interprets the log with the person and decides whether the plan still fits.",
    decisionTier: "human-supervised",
  },
  {
    id: "activity-recognition",
    name: "Activity recognition",
    stageIds: ["03"],
    whatItDoes:
      "Software may suggest which activity a recording appears to show, for a professional to confirm or reject.",
    informationUsed: [
      "A recording made for that purpose",
      "A list of activities the professional expects to see",
    ],
    benefits: [
      "May help label a long recording so a review can jump to a passage",
      "May help more than one reviewer start from the same suggested labels",
    ],
    limitations: [
      "A suggestion can be wrong, especially when activities look alike",
      "A label does not say whether the activity was useful, safe, or complete",
    ],
    supervision:
      "A qualified professional confirms the label before anyone relies on it.",
    decisionTier: "human-supervised",
  },
  {
    id: "progress-reports",
    name: "Progress reports",
    stageIds: ["04"],
    whatItDoes:
      "Software may draft a progress report from notes and measures already in the record.",
    informationUsed: [
      "Visit notes and measures the team has entered",
      "The reporting period a professional chooses",
    ],
    benefits: [
      "May help a meeting start from a draft instead of a blank page",
      "May help the same headings appear from one review to the next",
    ],
    limitations: [
      "A fluent draft can sound more certain than the notes were",
      "It can miss a setback that was written in an unexpected place",
    ],
    supervision:
      "The professionals in the review edit the draft and agree what stands.",
    decisionTier: "human-supervised",
  },
  {
    id: "trend-identification",
    name: "Trend identification",
    stageIds: ["04"],
    whatItDoes:
      "Software may point to rises, falls, or flat stretches in measures the team has recorded.",
    informationUsed: [
      "Repeated measures with dates",
      "The measure definitions the service already uses",
    ],
    benefits: [
      "May help a reviewer notice a change across many visits",
      "May help a meeting ask a better question about a stretch of the record",
    ],
    limitations: [
      "A trend is not a cause",
      "Irregular visits, changed measures, or a short record can invent a shape that is not there",
    ],
    supervision:
      "Professionals decide whether a highlighted pattern is meaningful for this person.",
    decisionTier: "human-supervised",
  },
  {
    id: "data-visualisation",
    name: "Data visualisation",
    stageIds: ["04"],
    whatItDoes:
      "Software may turn a table of recorded observations into a chart a professional can read in a review.",
    informationUsed: [
      "Observations already stored in the record",
      "The chart form a professional selects",
    ],
    benefits: [
      "May help a table of dates and values be easier to discuss",
      "May help the person and the team look at the same figure",
    ],
    limitations: [
      "A chart can exaggerate or hide change through its scale",
      "It adds no information that was not already in the table",
    ],
    supervision:
      "The professional chooses the figure and explains it. The chart does not conclude.",
    decisionTier: "ai-supported",
  },
  {
    id: "reminders",
    name: "Reminders",
    stageIds: ["05", "06"],
    whatItDoes:
      "Software may send a reminder of a contact, a log, or a task that a person on the team has already scheduled.",
    informationUsed: [
      "A date and a short description entered by the team or the person",
      "The channel the person has agreed to use",
    ],
    benefits: [
      "May help a planned follow-up stay on the calendar",
      "May help a home log be filled on the day it was agreed",
    ],
    limitations: [
      "A reminder is not a clinical instruction",
      "It can arrive at the wrong moment, or not arrive at all",
    ],
    supervision:
      "People write the reminder. Software only delivers what they wrote.",
    decisionTier: "ai-supported",
  },
  {
    id: "remote-monitoring",
    name: "Remote progress monitoring",
    stageIds: ["06"],
    whatItDoes:
      "Software may gather check-ins and reported outcomes between visits and present them for a professional to review.",
    informationUsed: [
      "Entries the person chooses to submit",
      "The questions or measures the team has already chosen",
    ],
    benefits: [
      "May help a follow-up visit start from recent reports",
      "May help the team notice that expected check-ins did not arrive",
    ],
    limitations: [
      "A missing check-in has many possible reasons",
      "An entry is not a request for an automatic change in care",
    ],
    supervision:
      "A qualified professional reads the reports and decides whether any contact or change is needed.",
    decisionTier: "human-supervised",
  },
  {
    id: "activity-tracking",
    name: "Activity tracking",
    stageIds: ["06"],
    whatItDoes:
      "Software may keep a log of activities the person reports, or that a device records when the person has agreed to that.",
    informationUsed: [
      "Activities the person reports",
      "Recordings the person has agreed to share",
    ],
    benefits: [
      "May help a follow-up conversation refer to a log instead of recall alone",
      "May help the person see their own entries over a week",
    ],
    limitations: [
      "A log is not a complete picture of a life",
      "Tracked activity is not a prescription, and it is not proof of recovery",
    ],
    supervision:
      "The person controls what is shared. A professional interprets the log with them.",
    decisionTier: "human-supervised",
  },
];

export const limitRows: LimitRow[] = [
  {
    id: "movement-tracking",
    name: "Movement tracking",
    category: "may-support",
    stageIds: ["01", "03"],
    why: "A recording can be replayed and described. The meaning of the movement stays with the professional who was there, or who reviews it.",
    oversight: "A qualified professional compares the trace with their own assessment.",
    detail:
      "Useful as a second look at a recorded activity. It does not explain pain, intention, fatigue, or whether the activity should have been attempted.",
    decisionTier: "human-supervised",
    relatedApplicationIds: ["movement-tracking"],
  },
  {
    id: "data-organisation",
    name: "Data organisation",
    category: "may-support",
    stageIds: ["01"],
    why: "Assessment notes are easier to use when they share a structure. Structure is not a conclusion.",
    oversight: "The assessing professional checks the organised record against the source notes.",
    detail:
      "Organisation can group headings, dates, and measures. It should not drop a free-text caveat or invent a heading the notes do not support.",
    decisionTier: "ai-supported",
    relatedApplicationIds: ["data-organisation"],
  },
  {
    id: "progress-reporting",
    name: "Progress reporting",
    category: "may-support",
    stageIds: ["02", "04"],
    why: "A report or a chart can gather what the team already recorded so a review can start faster.",
    oversight: "The people in the review edit the draft and agree the wording that stands.",
    detail:
      "Reporting includes progress visualisation, drafted progress reports, and charts of recorded values. None of those objects decides whether progress is enough.",
    decisionTier: "human-supervised",
    relatedApplicationIds: ["progress-visualisation", "progress-reports", "data-visualisation"],
  },
  {
    id: "pattern-identification",
    name: "Pattern identification",
    category: "may-support",
    stageIds: ["04"],
    why: "Repeated measures can be scanned for rises, falls, and flat stretches that a person might then ask about.",
    oversight: "Professionals decide whether a pattern is real for this person and what, if anything, to do.",
    detail:
      "Pattern identification here means trend identification on recorded measures. A highlighted stretch is a prompt for review, not a finding in the clinical sense.",
    decisionTier: "human-supervised",
    relatedApplicationIds: ["trend-identification"],
  },
  {
    id: "reminders",
    name: "Reminders",
    category: "may-support",
    stageIds: ["05", "06"],
    why: "A scheduled contact or a home log is easy to forget. A reminder only repeats a plan a person already made.",
    oversight: "The team or the person writes the reminder. Software delivers that text and does not add advice.",
    detail:
      "Reminders belong to discharge planning and home follow-up. They are administrative. They are not instructions about symptoms, medication, or safety.",
    decisionTier: "ai-supported",
    relatedApplicationIds: ["reminders"],
  },
  {
    id: "remote-monitoring",
    name: "Remote monitoring",
    category: "may-support",
    stageIds: ["06"],
    why: "Between visits, a person may share reports or activity logs. Software can hold those reports for a professional to read.",
    oversight: "A qualified professional reviews what was shared and decides whether any follow-up is needed.",
    detail:
      "Remote monitoring and activity tracking are ways of carrying information home to clinic. They do not watch a person for danger, and they do not escalate care on their own.",
    decisionTier: "human-supervised",
    relatedApplicationIds: ["remote-monitoring", "activity-tracking"],
  },
  {
    id: "administrative-documentation",
    name: "Administrative documentation",
    category: "may-support",
    stageIds: ["01", "05"],
    why: "Assessment write-ups and discharge paperwork repeat a lot of structure. A draft can follow that structure.",
    oversight: "The professional who owns the document reads, edits, and accepts it before it is used.",
    detail:
      "This is documentation assistance for records and planning papers. It is not a care plan, and it is not a letter to the person until a professional has approved the words.",
    decisionTier: "human-supervised",
    relatedApplicationIds: ["documentation"],
  },
  {
    id: "diagnosis",
    name: "Patient diagnosis",
    category: "must-not-decide",
    stageIds: ["01"],
    why: "Diagnosis is a clinical judgement about a person's condition. It is outside the role of this pathway's software.",
    oversight: "Doctors and other qualified professionals diagnose. Software does not offer a diagnosis to act on.",
    detail:
      "Organised notes may sit in front of a clinician. They are not a differential, a label, or a suggestion that should be passed to the person as a conclusion.",
    decisionTier: "human-only",
    relatedApplicationIds: [],
  },
  {
    id: "treatment-selection",
    name: "Treatment selection",
    category: "must-not-decide",
    stageIds: ["03"],
    why: "Choosing physiotherapy, occupational therapy, prosthetic care, or any other intervention is a professional decision made with the person.",
    oversight: "The treating professionals select and explain treatment. Software does not rank options or pick one.",
    detail:
      "Monitoring a session that was already chosen is not permission to choose the next one. Activity labels and exercise logs stay downstream of that decision.",
    decisionTier: "human-only",
    relatedApplicationIds: [],
  },
  {
    id: "goal-approval",
    name: "Rehabilitation goal approval",
    category: "must-not-decide",
    stageIds: ["02"],
    why: "Goals are a collaboration. What is worth working toward is agreed by the person and the professionals, not proposed as a finished answer by software.",
    oversight: "The person and the team approve every goal and every change to a goal.",
    detail:
      "Milestone tracking can hold the goals after they exist. It does not draft a set of goals and treat silence as approval.",
    decisionTier: "human-only",
    relatedApplicationIds: [],
  },
  {
    id: "discharge-readiness",
    name: "Clinical readiness for discharge",
    category: "must-not-decide",
    stageIds: ["05"],
    why: "Readiness to leave a service depends on the person, the home, the support around them, and clinical judgement.",
    oversight: "A qualified professional, with the person, makes this decision.",
    detail:
      "Paperwork and reminders can prepare a discharge that has been decided. They cannot declare that the person is ready.",
    decisionTier: "human-only",
    relatedApplicationIds: [],
  },
  {
    id: "plan-modifications",
    name: "Treatment plan modifications",
    category: "must-not-decide",
    stageIds: ["03", "04"],
    why: "Changing the plan is a response to the person, not to a trend line. Setbacks and improvements both need interpretation.",
    oversight: "The professionals responsible for the plan agree any modification with the person.",
    detail:
      "A progress report may make a change easier to discuss. It must not rewrite the plan, pause an activity, or add one.",
    decisionTier: "human-only",
    relatedApplicationIds: [],
  },
  {
    id: "safety-decisions",
    name: "Patient safety decisions",
    category: "must-not-decide",
    stageIds: ["03", "06"],
    why: "Safety in a session or at home is a human responsibility. Software does not watch, warn as a clinician, or clear someone to continue.",
    oversight: "The professional present, and the services around the person at home, carry safety decisions.",
    detail:
      "A home log and an exercise record are not safety systems. An unusual entry waits for a person. It does not trigger an automated clinical response.",
    decisionTier: "human-only",
    relatedApplicationIds: [],
  },
];

export const loopNodes: LoopNode[] = [
  {
    id: "source",
    title: "Patient activity and assessment data",
    summary: "The sequence starts with the person and with observations a professional records.",
    detail:
      "Activity, reports, and assessment notes come from people. Software does not originate them, and it does not fill gaps with a guess.",
    decisionTier: "human-only",
  },
  {
    id: "system",
    title: "AI system",
    summary: "Software receives only the information the team and the person have chosen to put in.",
    detail:
      "The system is a tool in the pathway. It is not a member of the team and it does not hold a duty of care.",
    decisionTier: "ai-supported",
  },
  {
    id: "processing",
    title: "Data processing and pattern identification",
    summary: "Software may sort the record and point at patterns in what was entered.",
    detail:
      "Processing can organise, label, count logged events, or highlight a stretch of a chart. Those are operations on the record, not conclusions about the person.",
    decisionTier: "ai-supported",
  },
  {
    id: "insights",
    title: "AI-generated insights",
    summary: "Any output is advisory. It is a draft, a chart, a label, or a prompt for review.",
    detail:
      "An insight is not an order. It does not move into the record as a fact, and it does not travel onward to the person, until a professional has reviewed it.",
    decisionTier: "human-supervised",
  },
  {
    id: "review",
    title: "Qualified healthcare professional review",
    summary: "A professional reads the output against the person in front of them and the rest of the record.",
    detail:
      "Review can accept, edit, or discard the output. Skipping this step breaks the pathway this site describes.",
    decisionTier: "human-only",
  },
  {
    id: "decision",
    title: "Professional decision",
    summary: "The decision belongs to the qualified professional, with the person.",
    detail:
      "Goals, treatment, changes to a plan, readiness, and safety are decided here. Software does not share this step.",
    decisionTier: "human-only",
  },
  {
    id: "care",
    title: "Patient care",
    summary: "Care reaches the person only after that professional decision.",
    detail:
      "Nothing in the earlier steps is care by itself. Insights stay advisory until a professional has decided and the person has been included.",
    decisionTier: "human-only",
  },
];

export const slides: Slide[] = [
  {
    number: 1,
    title: "What rehabilitation care is",
    lede: "A sequence of support, shared by a person and a team, from the first assessment to follow-up at home.",
    showDisclaimer: true,
    notes:
      "Open by defining rehabilitation care as organised support for recovering function, adapting after illness or injury, or returning to daily activities. Stress that it is a sequence, not a single visit, and that the person, their caregivers, and a clinical team share it. Tell the room this talk uses six stages as a teaching map. It is conceptual. It is not a protocol, and it does not describe a real patient. Set the question you will keep asking: where might software that finds patterns in records or in recorded activity assist the people doing the work? Give three examples of support only: sorting notes, drawing a picture of recorded change, and sending a reminder that a person already wrote. Say plainly that none of those is a decision. Point to the disclaimer and say that every clinical judgement stays with a qualified professional.",
  },
  {
    number: 2,
    title: "Six stages, one journey",
    lede: "The same six stages appear in every view of this register.",
    showDisclaimer: false,
    notes:
      "Walk the six stages in order, and spend a sentence on each. Initial assessment builds a picture of situation, function, and needs. Goal setting is a collaboration about objectives and functional milestones. Therapy and intervention is the guided work: physiotherapy, occupational therapy, prosthetic support, and practice. Progress review looks at improvement, difficulty, and setback. Discharge planning prepares for more independent activity, home arrangements, and follow-up. Home follow-up continues the contact through remote check-ins, reported outcomes, and conversation. Say that the order is a teaching map, not a claim that every person passes through every stage the same way. Note that later slides, and the pathway view, use these exact titles, so the audience can trust the words. Do not invent timings, success rates, or a typical patient. Close by saying the next slide names the people who lead the work inside those stages.",
  },
  {
    number: 3,
    title: "The people who lead care",
    lede: "Seven roles. Software may assist the work. It does not take the role.",
    showDisclaimer: false,
    notes:
      "Name the seven roles without rushing the last two. Physiotherapists lead movement and mobility. Occupational therapists lead everyday function. Prosthetists lead prosthetic assessment, fitting, and use. Doctors carry medical responsibility, including diagnosis and treatment selection. Rehabilitation specialists keep the plan in view across professions. Nurses contribute observation, day-to-day care, and follow-up contact. Patients and caregivers are not an audience for the pathway. They are in it: priorities, practice, consent, and what they are willing to share. Say that a role is highlighted against the stages it joins, and that the pattern is not identical for every role. Then draw the line. Where software may assist, it organises, displays, drafts, or reminds. Where it must not replace the person, the examples are judgement, choice of treatment, safety, and the person's own account.",
  },
  {
    number: 4,
    title: "Where software may assist",
    lede: "Support is organising, showing, drafting, reminding, and monitoring for a person to review.",
    showDisclaimer: false,
    notes:
      "Keep this slide on the allowed side of the line. Read the seven kinds of support and attach each to a stage in one breath. Movement tracking sits in assessment and therapy. Data organisation sits in assessment. Progress reporting sits in goal setting and review. Pattern identification sits in review. Reminders sit in discharge planning and home follow-up. Remote monitoring sits at home. Administrative documentation sits in assessment and discharge paperwork. Use the hedged verbs: may help, can support. Give one limitation so the list does not sound like a promise. A chart only shows what was entered. A draft can sound more certain than the notes. A reminder is not advice. Point to the marks. Dashed ring means the software prepares or displays, and a person stays accountable. Double ring means a professional must review a draft or an insight before it informs care.",
  },
  {
    number: 5,
    title: "Where people must decide",
    lede: "Insights stay advisory. Nothing reaches patient care without a professional decision.",
    showDisclaimer: true,
    notes:
      "Read the six decisions that stay human, slowly. Patient diagnosis. Treatment selection. Rehabilitation goal approval. Clinical readiness for discharge. Treatment plan modifications. Patient safety decisions. Tie each to the stage where it would be most tempting to automate: diagnosis at assessment, treatment during therapy, goals at goal setting, discharge readiness in discharge planning, plan changes in therapy and review, safety in the session and at home. Then walk the loop in order. Activity and assessment data come from people. An AI system may process that record and identify patterns. The output is an insight, and the double ring means it is supervised. A qualified professional reviews it. The professional decides, with the person. Only then does anything become patient care. Say the sentence on the slide: insights are advisory, and nothing reaches patient care without a professional decision. Then read the disclaimer on the slide.",
  },
  {
    number: 6,
    title: "Support is not a decision",
    lede: "Use the register to teach the boundary. Do not use it to plan a person's care.",
    showDisclaimer: false,
    notes:
      "Close by restating the shape of the talk. You showed six stages, seven roles, a set of places where software may assist, and a set of decisions it must not make. Repeat the three marks. A dashed ring prepares or displays. A double ring waits for review. A solid square is a human decision. Remind the room that the site is one register: the pathway, the team view, the map, the table, the loop, and these slides all read the same stages and the same applications, so the words do not drift. Say what the register is for: teaching, discussion, and a shared picture of a boundary. Say what it is not for: a diagnosis, a treatment plan, a discharge decision, or advice to a real patient. Offer the pathway view as the place to linger in questions. Do not quote a study, a percentage, or a product.",
  },
];

export const overviewCopy = {
  title: "Rehabilitation, mapped",
  lede: "A conceptual pathway from the first assessment to follow-up at home, and the narrow places where software may assist the people who lead care.",
  definition:
    "Rehabilitation care is organised support for a person recovering function, adapting after illness or injury, or returning to daily activities. It runs across assessment, goals, therapy, review, discharge planning, and follow-up. This register is a teaching map of that sequence. It shows where software might organise records, describe recorded activity, or remind someone of a plan a person already made. It does not assess anyone, and it does not recommend care.",
  registerNote:
    "Every view reads this same register, so a stage, a role, and an application keep one meaning.",
};

export const stages: Stage[] = stageSeeds;

export const categoryName = (category: LimitRow["category"]) =>
  category === "may-support" ? "AI may support" : "AI must not independently decide";

export function getStage(id: string | undefined) {
  return stages.find((stage) => stage.id === id);
}

export function getProfessional(id: string | undefined) {
  return professionals.find((person) => person.id === id);
}

export function getApplication(id: string | undefined) {
  return applications.find((application) => application.id === id);
}

export function professionalsForStage(stageId: string) {
  return professionals.filter((person) => person.stageIds.includes(stageId));
}

export function applicationsForStage(stageId: string) {
  return applications.filter((application) => application.stageIds.includes(stageId));
}

export function stagesForProfessional(professionalId: string) {
  const person = getProfessional(professionalId);
  if (!person) return [];
  return stages.filter((stage) => person.stageIds.includes(stage.id));
}
