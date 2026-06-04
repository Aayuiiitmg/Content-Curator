export const DOMAINS = [
  'Steel Manufacturing',
  'Mining',
  'Safety & Compliance',
  'Human Resources',
  'Operations',
  'Procurement',
  'Finance',
  'Environmental Management',
  'Training & Development',
]

export const OUTPUT_TYPES = [
  'Executive Report',
  'Training Program',
  'SOP',
  'Handbook',
  'Presentation',
  'Video Script',
  'Podcast Script',
]

export const WORKFLOW_STEPS = [
  { id: 1, label: 'Provide Context' },
  { id: 2, label: 'Upload Documents' },
  { id: 3, label: 'Define Objective' },
  { id: 4, label: 'Generate Assets' },
  { id: 5, label: 'Review & Export' },
]

export const ARTIFACT_TABS = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'document', label: 'Document' },
  { id: 'spreadsheet', label: 'Spreadsheet' },
  { id: 'video', label: 'Video' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'handbook', label: 'Handbook' },
  { id: 'sop', label: 'SOP' },
]

export const OUTPUT_TYPE_TO_ARTIFACT = {
  'Executive Report': 'document',
  'Training Program': 'presentation',
  SOP: 'sop',
  Handbook: 'handbook',
  Presentation: 'presentation',
  'Video Script': 'video',
  'Podcast Script': 'podcast',
}

export const OUTPUT_TYPE_LABELS = {
  document: 'Executive Report',
  presentation: 'Presentation',
  sop: 'Standard Operating Procedure',
  handbook: 'Corporate Handbook',
  video: 'Video Script',
  podcast: 'Podcast Script',
}

export const OUTPUT_TYPE_INSTRUCTIONS = {
  'Executive Report':
    'Generate a structured executive report with summary, findings, recommendations, and implementation plan.',
  'Training Program':
    'Create a training program with slide deck covering objectives, modules, assessments, and certification criteria.',
  SOP: 'Produce a formal SOP with purpose, scope, responsibilities, procedures, and approval workflow.',
  Handbook: 'Build a corporate handbook with chapters covering policies, guidelines, and compliance requirements.',
  Presentation: 'Create an executive presentation with agenda, key points, and actionable recommendations.',
  'Video Script':
    'Generate a corporate training video script with narration, scene descriptions, and safety messaging.',
  'Podcast Script':
    'Produce an executive audio briefing script with introduction, key updates, and closing summary.',
}

export const GENERATION_SUMMARY_BY_OUTPUT = {
  'Executive Report': [
    { id: 1, description: 'Source documents analyzed' },
    { id: 2, description: 'Compliance guidelines applied (IS 14489, DGMS)' },
    { id: 3, description: 'Executive summary drafted' },
    { id: 4, description: 'Findings and recommendations structured' },
    { id: 5, description: 'Executive report generated' },
  ],
  'Training Program': [
    { id: 1, description: 'Training materials and source docs reviewed' },
    { id: 2, description: 'Learning objectives defined' },
    { id: 3, description: 'Safety framework integrated' },
    { id: 4, description: 'Slide deck structure applied' },
    { id: 5, description: 'Training presentation generated' },
  ],
  SOP: [
    { id: 1, description: 'Existing SOP templates analyzed' },
    { id: 2, description: 'Regulatory requirements mapped' },
    { id: 3, description: 'Responsibility matrix defined' },
    { id: 4, description: 'Escalation workflow included' },
    { id: 5, description: 'Standard operating procedure generated' },
  ],
  Handbook: [
    { id: 1, description: 'Policy documents consolidated' },
    { id: 2, description: 'Chapter structure organized' },
    { id: 3, description: 'Compliance sections integrated' },
    { id: 4, description: 'Operational guidelines formatted' },
    { id: 5, description: 'Corporate handbook generated' },
  ],
  Presentation: [
    { id: 1, description: 'Briefing context analyzed' },
    { id: 2, description: 'Executive messaging refined' },
    { id: 3, description: 'Slide layout template applied' },
    { id: 4, description: 'Key data points incorporated' },
    { id: 5, description: 'Executive presentation generated' },
  ],
  'Video Script': [
    { id: 1, description: 'Training content reviewed' },
    { id: 2, description: 'Scene structure planned' },
    { id: 3, description: 'Safety messaging scripted' },
    { id: 4, description: 'Narration and captions drafted' },
    { id: 5, description: 'Video script generated' },
  ],
  'Podcast Script': [
    { id: 1, description: 'Briefing topics identified' },
    { id: 2, description: 'Executive tone applied' },
    { id: 3, description: 'Segment structure defined' },
    { id: 4, description: 'Narrator script drafted' },
    { id: 5, description: 'Podcast script generated' },
  ],
}

export const DOMAIN_EXAMPLES = {
  'Steel Manufacturing': {
    objective: 'Create a Q3 Blast Furnace Safety Training Program for New Employees at Jamshedpur Plant.',
    context:
      'Following the Q2 safety audit at Blast Furnace #4, management has directed HR and Safety teams to develop a comprehensive induction program for 120 new contract workers joining in Q3 2026. Key focus areas include hot metal handling, PPE compliance, and emergency evacuation procedures per IS 14489 standards.',
  },
  'Mining': {
    objective: 'Develop an Open-Pit Mining Operations Handbook for Noamundi Iron Ore Mine.',
    context:
      'Operations team requires updated documentation covering bench drilling protocols, haul road safety, and environmental dust suppression measures aligned with DGMS regulations and Tata Steel sustainability commitments.',
  },
  'Safety & Compliance': {
    objective: 'Generate a Contractor Safety Compliance SOP for External Maintenance Teams.',
    context:
      'Recent incidents involving third-party contractors at the coke oven battery highlight gaps in permit-to-work systems. Safety department needs a standardized SOP covering contractor onboarding, hot work permits, and escalation procedures.',
  },
  'Human Resources': {
    objective: 'Build an Employee Induction Program for Graduate Engineer Trainees — 2026 Batch.',
    context:
      'HR leadership has approved a structured 90-day onboarding framework covering Tata Steel values, plant orientation, mentorship assignment, and competency assessments for 45 GETs joining across Jamshedpur and Kalinganagar plants.',
  },
  Operations: {
    objective: 'Create an Executive Briefing on Continuous Casting Line Optimization — FY2026.',
    context:
      'Plant head requires a leadership presentation summarizing CC Line #2 throughput improvements, quality metrics, downtime analysis, and recommended capital investments for the upcoming board review.',
  },
  Procurement: {
    objective: 'Produce a Vendor Compliance Assessment Report for Raw Material Suppliers.',
    context:
      'Procurement team needs an executive summary of Q2 vendor audits covering iron ore, coking coal, and flux suppliers with compliance scores, risk ratings, and corrective action timelines.',
  },
  Finance: {
    objective: 'Generate a Cost Optimization Executive Summary for Energy Management Division.',
    context:
      'CFO office requires a quarterly report on energy consumption trends, renewable integration progress, and projected savings from blast furnace gas recovery initiatives across integrated steel plants.',
  },
  'Environmental Management': {
    objective: 'Create an Environmental Compliance Handbook for Zero Liquid Discharge Operations.',
    context:
      'Environmental team must document ZLD system operations, effluent monitoring protocols, CPCB compliance requirements, and incident reporting procedures for all Tata Steel manufacturing facilities.',
  },
  'Training & Development': {
    objective: 'Develop a Leadership Development Program for Plant Managers — Safety Excellence Track.',
    context:
      'Corporate L&D requires a structured program covering behavioral safety leadership, incident investigation methodology, regulatory compliance oversight, and cross-plant best practice sharing for 28 plant managers.',
  },
}

export const DEFAULT_GENERATION_SUMMARY = [
  {
    id: 1,
    status: 'complete',
    description: '14 source documents analyzed',
    timestamp: '10:42 AM',
  },
  {
    id: 2,
    status: 'complete',
    description: 'Existing safety framework detected',
    timestamp: '10:42 AM',
  },
  {
    id: 3,
    status: 'complete',
    description: 'Compliance guidelines applied (IS 14489, DGMS)',
    timestamp: '10:43 AM',
  },
  {
    id: 4,
    status: 'complete',
    description: 'Previous SOP structure reused',
    timestamp: '10:43 AM',
  },
  {
    id: 5,
    status: 'complete',
    description: 'Executive presentation generated',
    timestamp: '10:44 AM',
  },
  {
    id: 6,
    status: 'complete',
    description: 'Training handbook created',
    timestamp: '10:44 AM',
  },
  {
    id: 7,
    status: 'complete',
    description: 'Approval workflow included',
    timestamp: '10:45 AM',
  },
]

export const PRESENTATION_SLIDES = [
  {
    id: 1,
    title: 'Blast Furnace Safety Excellence Program',
    subtitle: 'Q3 Employee Training Initiative',
    type: 'title',
  },
  {
    id: 2,
    title: 'Agenda',
    bullets: [
      'Program Overview & Objectives',
      'Risk Prevention Framework',
      'Emergency Response Protocols',
      'Building Safety Culture',
      'Assessment & Certification',
    ],
    type: 'content',
  },
  {
    id: 3,
    title: 'Risk Prevention',
    bullets: [
      'Hot metal handling procedures per SOP-BF-042',
      'Mandatory PPE requirements for furnace area',
      'Gas detection and ventilation protocols',
      'Pre-shift safety briefing checklist',
    ],
    type: 'content',
  },
  {
    id: 4,
    title: 'Emergency Response',
    bullets: [
      'Evacuation routes and assembly points',
      'First aid station locations',
      'Incident reporting within 15 minutes',
      'Emergency contact escalation matrix',
    ],
    type: 'content',
  },
  {
    id: 5,
    title: 'Safety Culture',
    bullets: [
      'Stop Work Authority for all employees',
      'Near-miss reporting incentives',
      'Monthly safety committee participation',
      'Recognition program for safety champions',
    ],
    type: 'content',
  },
]

export const DOCUMENT_SECTIONS = [
  {
    title: 'Executive Summary',
    content:
      'This report presents the Q3 Blast Furnace Safety Training Program designed for 120 new contract workers at Tata Steel Jamshedpur Plant. The program addresses critical safety gaps identified in the Q2 audit and aligns with IS 14489 and DGMS regulatory requirements. Expected outcomes include 40% reduction in near-miss incidents and 100% PPE compliance within 90 days of implementation.',
  },
  {
    title: 'Current Situation',
    content:
      'Blast Furnace #4 operations involve high-risk activities including hot metal tapping, slag handling, and gas system maintenance. The Q2 safety audit identified 23 observations across contractor management, PPE compliance, and emergency preparedness. Three near-miss incidents in May 2026 involved inadequate hot work permit procedures.',
  },
  {
    title: 'Key Findings',
    content:
      'Analysis of 14 source documents reveals: (1) 68% of contract workers lack formal blast furnace safety certification, (2) Emergency evacuation drills conducted quarterly vs. monthly requirement, (3) Existing training materials dated 2022 and missing updated gas detection protocols, (4) Strong safety culture foundation with active safety committee participation.',
  },
  {
    title: 'Recommendations',
    content:
      'Implement a structured 5-day induction program with classroom and field components. Deploy digital competency assessments via plant LMS. Establish contractor safety passport system with quarterly recertification. Integrate real-time PPE compliance monitoring at furnace access points.',
  },
  {
    title: 'Implementation Plan',
    content:
      'Phase 1 (July 2026): Program rollout for first 40 workers. Phase 2 (August 2026): Scale to remaining 80 workers. Phase 3 (September 2026): Assessment, certification, and program evaluation. Budget allocation: ₹42 lakhs including trainer deployment, materials, and LMS integration.',
  },
  {
    title: 'Expected Outcomes',
    content:
      'Target metrics: Zero lost-time injuries in BF#4 area during Q3-Q4 2026. 100% contractor safety passport compliance. 95%+ training assessment pass rate. Reduction in safety observations from 23 to below 5 by December 2026 audit.',
  },
]

export const SPREADSHEET_DATA = [
  {
    department: 'Blast Furnace',
    completion: '94%',
    compliance: '92',
    risk: 'Medium',
    status: 'On Track',
    reviewDate: '15 Jul 2026',
  },
  {
    department: 'Coke Oven',
    completion: '88%',
    compliance: '85',
    risk: 'High',
    status: 'Action Required',
    reviewDate: '12 Jul 2026',
  },
  {
    department: 'Steel Melting Shop',
    completion: '97%',
    compliance: '96',
    risk: 'Low',
    status: 'Compliant',
    reviewDate: '20 Jul 2026',
  },
  {
    department: 'Continuous Casting',
    completion: '91%',
    compliance: '89',
    risk: 'Medium',
    status: 'On Track',
    reviewDate: '18 Jul 2026',
  },
  {
    department: 'Maintenance',
    completion: '76%',
    compliance: '72',
    risk: 'High',
    status: 'Critical',
    reviewDate: '10 Jul 2026',
  },
  {
    department: 'Logistics & Transport',
    completion: '99%',
    compliance: '98',
    risk: 'Low',
    status: 'Compliant',
    reviewDate: '25 Jul 2026',
  },
]

export const HANDBOOK_CHAPTERS = [
  {
    id: 1,
    title: 'Introduction',
    content:
      'Welcome to the Blast Furnace Operations Handbook. This document serves as the primary reference for all personnel working in or around Blast Furnace #4 at Tata Steel Jamshedpur Plant. It consolidates operational guidelines, safety requirements, and best practices developed over decades of steel manufacturing excellence.',
  },
  {
    id: 2,
    title: 'Safety Principles',
    content:
      'Safety is non-negotiable at Tata Steel. All personnel must adhere to the Life Saving Rules: obtain authorization before overriding safety systems, protect yourself against falling objects, do not walk under suspended loads, and report all incidents and near-misses immediately. Stop Work Authority empowers every employee to halt unsafe operations.',
  },
  {
    id: 3,
    title: 'Operational Guidelines',
    content:
      'Standard operating procedures govern all blast furnace activities including charging, tapping, slag handling, and maintenance. Pre-shift briefings are mandatory. Gas monitoring systems must be operational before area entry. Hot metal transport follows designated routes with escort vehicles during peak operations.',
  },
  {
    id: 4,
    title: 'Emergency Response',
    content:
      'In case of gas leak: evacuate immediately using nearest exit route, report to assembly point BF-Alpha, do not re-enter until all-clear from Safety Officer. Fire emergency: activate nearest alarm, use appropriate extinguisher if safe to do so, evacuate and account for all personnel. Medical emergency: contact plant medical center ext. 119.',
  },
  {
    id: 5,
    title: 'Compliance Requirements',
    content:
      'Operations must comply with IS 14489 (Code of Practice on Occupational Safety and Health Audit), DGMS Circular on Metalliferous Mines Regulations, Factory Act 1948, and Tata Steel Corporate EHS Policy. Annual compliance audits are conducted by internal and external assessors. Non-compliance items require corrective action within defined timelines.',
  },
]

export const SOP_SECTIONS = [
  {
    title: 'Purpose',
    content:
      'This Standard Operating Procedure establishes the requirements for contractor safety management during maintenance and project activities at Tata Steel manufacturing facilities, ensuring compliance with corporate EHS standards and regulatory requirements.',
  },
  {
    title: 'Scope',
    content:
      'Applies to all external contractors, vendors, and service providers performing work at Tata Steel Jamshedpur, Kalinganagar, and Meramandali plants. Covers hot work, confined space entry, work at height, and general maintenance activities.',
  },
  {
    title: 'Definitions',
    content:
      'Contractor: Any external entity performing work under contract. Permit-to-Work (PTW): Formal authorization system for high-risk activities. Safety Passport: Digital credential verifying contractor safety training and competency. EHS: Environment, Health, and Safety.',
  },
  {
    title: 'Responsibilities',
    content:
      'Plant Head: Overall accountability for contractor safety. EHS Manager: PTW system administration and audit. Contract Owner: Pre-qualification and performance monitoring. Contractor Supervisor: On-site safety compliance and workforce briefing. Safety Officer: PTW approval and incident investigation.',
  },
  {
    title: 'Procedure',
    content:
      'Step 1: Contractor pre-qualification via approved vendor portal. Step 2: Safety induction within 24 hours of site entry. Step 3: PTW application for all high-risk activities. Step 4: Toolbox talk before work commencement. Step 5: Continuous supervision and compliance monitoring. Step 6: Work completion verification and PTW closure.',
  },
  {
    title: 'Safety Requirements',
    content:
      'Mandatory PPE: helmet, safety shoes, high-visibility vest, gloves, eye protection. Hot work requires fire watch for 30 minutes post-completion. Confined space entry mandates gas testing and standby attendant. Work at height above 1.8m requires fall protection and edge protection.',
  },
  {
    title: 'Escalation Matrix',
    content:
      'Level 1 (Minor observation): Contractor supervisor correction within 4 hours. Level 2 (Repeat violation): Work stoppage, re-induction required. Level 3 (Serious violation): Contract suspension, EHS review. Level 4 (Incident/injury): Immediate work stoppage, investigation, potential contract termination.',
  },
  {
    title: 'Approval Workflow',
    content:
      'Document prepared by: EHS Team. Reviewed by: Plant Safety Committee. Approved by: Plant Head. Effective date upon signature. Next review: Annual or upon regulatory change.',
  },
  {
    title: 'Revision History',
    content:
      'Rev 3.0 — June 2026: Added digital safety passport requirements. Rev 2.0 — January 2025: Updated hot work procedures. Rev 1.0 — March 2023: Initial release.',
  },
  {
    title: 'Document Control',
    content:
      'Document ID: SOP-EHS-CON-001. Classification: Internal — Controlled. Owner: Corporate EHS Department. Distribution: All plant EHS managers, contractor coordinators. Supersedes: SOP-EHS-CON-001 Rev 2.0.',
  },
]

export const TRUST_PANEL_ITEMS = [
  { label: '14 documents analyzed', status: 'verified' },
  { label: 'Internal Safety Framework Applied', status: 'verified' },
  { label: 'Environmental Compliance Standards Referenced', status: 'verified' },
  { label: 'Training Guidelines Included', status: 'verified' },
]

export const SAMPLE_SOURCE_FILES = [
  { name: 'BF4_Safety_Audit_Q2_2026.pdf', size: '2.4 MB', type: 'pdf' },
  { name: 'Hot_Metal_Handling_SOP_v4.docx', size: '856 KB', type: 'docx' },
  { name: 'DGMS_Circular_2025_14.pdf', size: '1.1 MB', type: 'pdf' },
  { name: 'Contractor_Safety_Guidelines.pptx', size: '3.2 MB', type: 'pptx' },
  { name: 'PPE_Compliance_Matrix_Q2.xlsx', size: '445 KB', type: 'xlsx' },
]

export const SAMPLE_TEMPLATE_FILES = [
  { name: 'Safety_Training_Template_2024.pptx', size: '5.1 MB', type: 'pptx' },
  { name: 'SOP_Master_Format.docx', size: '234 KB', type: 'docx' },
]

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getFileIcon(type) {
  const icons = {
    pdf: 'PDF',
    docx: 'DOC',
    pptx: 'PPT',
    xlsx: 'XLS',
    default: 'FILE',
  }
  return icons[type] || icons.default
}

export const SUGGESTED_ACTIONS = [
  {
    label: 'Create Training Program',
    prompt:
      'Create a Blast Furnace Safety Training Program for new employees using the uploaded SOPs and incident reports.',
    outputType: 'Training Program',
  },
  {
    label: 'Generate SOP',
    prompt:
      'Generate a contractor safety compliance SOP for external maintenance teams at Jamshedpur plant.',
    outputType: 'SOP',
  },
  {
    label: 'Create Handbook',
    prompt:
      'Create an operations handbook covering safety principles, emergency response, and compliance for blast furnace teams.',
    outputType: 'Handbook',
  },
  {
    label: 'Build Presentation',
    prompt:
      'Build an executive presentation on Q3 blast furnace safety performance for plant leadership review.',
    outputType: 'Presentation',
  },
  {
    label: 'Create Executive Report',
    prompt:
      'Create an executive report summarizing safety audit findings, risks, and recommended actions for the plant head.',
    outputType: 'Executive Report',
  },
]

export const COMPLIANCE_FRAMEWORKS = [
  'IS 14489 — Occupational Safety Audit',
  'DGMS Metalliferous Mines Regulations',
  'Factory Act 1948',
  'Tata Steel Corporate EHS Policy',
  'CPCB Environmental Standards',
  'ISO 45001 Occupational Health & Safety',
]

export const RECENT_DOCUMENTS = [
  { id: 'r1', name: 'BF4 Safety Training Program', type: 'Training Program', date: '2 hours ago' },
  { id: 'r2', name: 'Contractor Safety SOP', type: 'SOP', date: 'Yesterday' },
  { id: 'r3', name: 'Q3 Executive Safety Report', type: 'Executive Report', date: '3 days ago' },
]

export const GENERATED_ASSETS_BY_OUTPUT = {
  'Training Program': [
    { id: 'presentation', label: 'Presentation', artifact: 'presentation', description: '12-slide training deck' },
    { id: 'handbook', label: 'Handbook', artifact: 'handbook', description: '5-chapter guide' },
    { id: 'sop', label: 'SOP', artifact: 'sop', description: 'Operational procedure' },
    { id: 'checklist', label: 'Training Checklist', artifact: 'spreadsheet', description: 'Compliance tracker' },
  ],
  SOP: [{ id: 'sop', label: 'SOP', artifact: 'sop', description: 'Standard operating procedure' }],
  Handbook: [{ id: 'handbook', label: 'Handbook', artifact: 'handbook', description: 'Corporate handbook' }],
  Presentation: [
    { id: 'presentation', label: 'Presentation', artifact: 'presentation', description: 'Executive slide deck' },
  ],
  'Executive Report': [
    { id: 'document', label: 'Executive Report', artifact: 'document', description: 'Full report document' },
  ],
  'Video Script': [{ id: 'video', label: 'Video Script', artifact: 'video', description: 'Training video script' }],
  'Podcast Script': [
    { id: 'podcast', label: 'Podcast Script', artifact: 'podcast', description: 'Audio briefing script' },
  ],
}

export const SIMPLE_PROGRESS_STEPS = {
  'Training Program': [
    'Analyzing documents...',
    'Building training structure...',
    'Generating presentation...',
    'Creating handbook...',
  ],
  SOP: ['Analyzing documents...', 'Mapping compliance requirements...', 'Structuring procedure...', 'Finalizing SOP...'],
  Handbook: [
    'Analyzing documents...',
    'Organizing chapters...',
    'Applying compliance standards...',
    'Creating handbook...',
  ],
  Presentation: [
    'Analyzing documents...',
    'Structuring narrative...',
    'Designing slides...',
    'Finalizing presentation...',
  ],
  'Executive Report': [
    'Analyzing documents...',
    'Extracting key findings...',
    'Drafting recommendations...',
    'Finalizing report...',
  ],
  'Video Script': [
    'Analyzing documents...',
    'Planning scenes...',
    'Writing narration...',
    'Finalizing script...',
  ],
  'Podcast Script': [
    'Analyzing documents...',
    'Structuring segments...',
    'Drafting script...',
    'Finalizing briefing...',
  ],
}

export const ASSISTANT_CHECKS = [
  'documents analyzed',
  'Existing SOP framework detected',
  'Safety compliance standards applied',
]

export function inferOutputTypeFromPrompt(prompt, fallback = 'Training Program') {
  const t = prompt.toLowerCase()
  if (t.includes('sop') || t.includes('standard operating procedure')) return 'SOP'
  if (t.includes('handbook')) return 'Handbook'
  if (t.includes('presentation') || t.includes('slide') || t.includes('deck')) return 'Presentation'
  if (t.includes('executive report') || (t.includes('report') && t.includes('executive'))) return 'Executive Report'
  if (t.includes('video script') || (t.includes('video') && t.includes('script'))) return 'Video Script'
  if (t.includes('podcast')) return 'Podcast Script'
  if (t.includes('training program') || t.includes('training') || t.includes('induction')) return 'Training Program'
  return fallback
}
