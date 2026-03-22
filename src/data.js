export const dashboardStats = [
  { label: 'Active agents', value: '12', delta: '+3 this quarter', tone: 'success' },
  { label: 'Automation rate', value: '68%', delta: '+8.4%', tone: 'success' },
  { label: 'Critical escalations', value: '4', delta: 'Needs review', tone: 'warning' },
  { label: 'Connected systems', value: '9', delta: '2 pending', tone: 'neutral' },
]

export const agentCards = [
  {
    name: 'Support Triage',
    status: 'healthy',
    summary: 'Routes priority conversations, drafts answers, and flags policy-sensitive requests.',
    csat: '94%',
    resolutionRate: '72%',
    escalations: '18 / day',
  },
  {
    name: 'Renewals Concierge',
    status: 'warning',
    summary: 'Handles plan recommendations and hands off exception pricing for manager approval.',
    csat: '91%',
    resolutionRate: '59%',
    escalations: '11 / day',
  },
  {
    name: 'Onboarding Guide',
    status: 'draft',
    summary: 'Guides new workspace setup with implementation checklists and milestone tracking.',
    csat: 'Pilot',
    resolutionRate: 'N/A',
    escalations: 'Draft rules',
  },
]

export const agentProfiles = [
  {
    name: 'Support Triage',
    owner: 'Owner: CX Operations',
    description: 'First-line assistant for inbound support across chat, email, and portal forms.',
    channels: ['Chat', 'Email', 'Portal'],
    live: true,
  },
  {
    name: 'Account Health Monitor',
    owner: 'Owner: Success Programs',
    description: 'Detects churn risk patterns and drafts outreach plans for customer success managers.',
    channels: ['CRM', 'Tasks'],
    live: true,
  },
  {
    name: 'Incident Comms Drafting',
    owner: 'Owner: Reliability',
    description: 'Prepares status updates using incident metadata and legal-approved response templates.',
    channels: ['Status page', 'Email'],
    live: false,
  },
]

export const escalationPolicies = [
  {
    name: 'Payment disputes',
    trigger: 'Requested refund exceeds auto-approval threshold or chargeback language is detected.',
    destination: 'Billing specialist queue',
    sla: '< 15 minutes',
  },
  {
    name: 'Security-sensitive access',
    trigger: 'Agent detects admin role changes, MFA bypass attempts, or suspicious session patterns.',
    destination: 'Trust & security on-call',
    sla: '< 5 minutes',
  },
  {
    name: 'Executive account risk',
    trigger: 'Open ticket belongs to strategic account with unresolved sentiment drop or renewal blocker.',
    destination: 'Named CSM + account executive',
    sla: '< 30 minutes',
  },
]

export const integrationGroups = [
  {
    name: 'CRM and customer data',
    status: 'Healthy',
    statusTone: 'success',
    description: 'Customer context sources used for personalization, case history, and ownership routing.',
    items: [
      { name: 'Salesforce', scope: 'Read accounts, write tasks' },
      { name: 'Segment', scope: 'Read traits and events' },
    ],
  },
  {
    name: 'Ticketing and messaging',
    status: 'Review pending',
    statusTone: 'warning',
    description: 'Operational systems for conversation intake, handoff notes, and incident communications.',
    items: [
      { name: 'Zendesk', scope: 'Read/write tickets' },
      { name: 'Slack', scope: 'Post escalation alerts' },
    ],
  },
  {
    name: 'Finance and provisioning',
    status: 'Draft',
    statusTone: 'neutral',
    description: 'Restricted actions for subscription updates, invoicing workflows, and environment changes.',
    items: [
      { name: 'Stripe', scope: 'Read invoices only' },
      { name: 'Internal admin API', scope: 'Disabled until approval' },
    ],
  },
]
