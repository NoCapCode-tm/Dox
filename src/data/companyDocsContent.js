const companyDocsContent = [
    {
        id: 'section-1-about-nocapcode',
        title: 'Section 1 — About NoCapCode',
        content: `This section introduces the organization, its philosophy, and its global operating model. It provides clarity on how NoCapCode functions as a hybrid software and consulting company and establishes the foundational principles that guide all work and collaboration.`,
        children: [
            {
                id: 'welcome-to-nocapcode', title: 'Welcome to NoCapCode',
                content: `Welcome to NoCapCode.

This document serves as the foundational reference for understanding how NoCapCode operates as a globally distributed organization. It has been designed to provide clarity, alignment, and transparency across all individuals engaging with the organization, irrespective of geography, role type, or engagement structure. The purpose of this handbook is to ensure that every contributor operates with a shared understanding of how work is executed, how decisions are made, and how collaboration is maintained across a distributed environment.

NoCapCode operates as a global, remote-first organization with contributors working across multiple regions, including North America, Latin America, Europe, the Middle East, and Asia. Individuals may engage with NoCapCode under various structures, including full-time employment, independent contracting, consulting, part-time collaboration, or internship-based participation. While engagement structures may vary, the operational standards, expectations of professionalism, and accountability frameworks remain consistent across all participants.

The organization has been built on the principle that clarity in execution is more valuable than complexity in planning. As such, NoCapCode emphasizes structured communication, clearly defined ownership, and disciplined delivery. Contributors are expected to operate with a high degree of responsibility, ensuring that their work aligns with organizational objectives and maintains the quality standards expected in a global professional environment.

This handbook is intended to function as a living operational document. It evolves alongside the organization’s growth, expansion into new markets, and development of new capabilities. All individuals associated with NoCapCode are expected to review, understand, and adhere to the principles and standards outlined herein. Where regional or contractual variations apply, these will be communicated separately; however, the foundational philosophy and operational expectations remain universally applicable.

NoCapCode welcomes individuals who value structured thinking, collaborative execution, and transparent working relationships. By engaging with NoCapCode, contributors become part of a globally coordinated system designed to build scalable digital solutions with clarity, discipline, and long-term impact.` },

            {
                id: 'company-overview-operating-model', title: 'Company Overview & Operating Model (Software + Consulting Hybrid)',
                content: 'A summary of NoCapCode as a software and consulting hybrid, including how delivery and client work are structured.'
            },

            {
                id: 'mission-vision-long-term-direction', title: 'Mission, Vision & Long-Term Direction',
                content: 'This section explains the mission, vision, and the long-term direction that guides decisions and growth.'
            },

            {
                id: 'company-ethos', title: 'Company Ethos',
                content: 'Our company ethos describes the mindset, tone, and standards we bring to our work and relationships.'
            },

            {
                id: 'core-values', title: 'Core Values',
                content: 'Core values define the behaviors we expect, the way we collaborate, and how we evaluate success.'
            },

            {
                id: 'core-principles', title: 'Core Principles',
                content: 'Core principles provide the practical rules that guide day-to-day judgment, ownership, and delivery.'
            },
        ],
    },
    {
        id: 'section-2-professional-standards-compliance',
        title: 'Section 2 — Professional Standards & Compliance',
        content: `This section defines the ethical, behavioral, and professional standards expected across the organization. It reflects globally aligned compliance practices and ensures that all individuals operate with integrity, respect, and responsibility in every interaction.`,
        children: [
            { id: 'code-of-conduct', title: 'Code of Conduct', content: 'A baseline for professional behavior, integrity, and respectful collaboration.' },
            { id: 'anti-harassment-respectful-workplace-policy', title: 'Anti-Harassment & Respectful Workplace Policy', content: 'Zero tolerance expectations for harassment and requirements for a respectful workplace.' },
            { id: 'equal-opportunity-non-discrimination-policy', title: 'Equal Opportunity & Non-Discrimination Policy', content: 'How we maintain fair, inclusive, and non-discriminatory employment practices.' },
            { id: 'conflict-of-interest-policy', title: 'Conflict of Interest Policy', content: 'How to disclose and avoid conflicts that affect judgment or decision-making.' },
            { id: 'confidentiality-non-disclosure', title: 'Confidentiality & Non-Disclosure', content: 'Rules for protecting confidential information and sensitive business material.' },
            { id: 'data-security-privacy', title: 'Data Security & Privacy', content: 'Expectations for handling personal, client, and company data responsibly.' },
            { id: 'information-security-access-control', title: 'Information Security & Access Control', content: 'Access permissions, secure handling, and security controls for systems and data.' },
            { id: 'acceptable-use-of-company-systems', title: 'Acceptable Use of Company Systems', content: 'How company devices, software, and accounts should be used appropriately.' },
            { id: 'external-communication-representation-policy', title: 'External Communication & Representation Policy', content: 'Rules for speaking on behalf of NoCapCode and communicating externally.' },
            { id: 'whistleblower-reporting-policy', title: 'Whistleblower & Reporting Policy', content: 'How to raise concerns safely and report issues through the right channels.' },
            { id: 'disciplinary-action-policy', title: 'Disciplinary Action Policy', content: 'How policy violations are reviewed and what disciplinary steps may follow.' },
            { id: 'social-media-public-conduct-policy', title: 'Social Media & Public Conduct Policy', content: 'Expectations for responsible public and social media behavior.' },
        ],
    },
    {
        id: 'section-3-work-framework-operating-model',
        title: 'Section 3 — Work Framework & Operating Model',
        content: `This section outlines how work is structured, managed, and delivered across NoCapCode's globally distributed teams. It defines expectations around ownership, accountability, flexibility, and cross-border collaboration.`,
        children: [
            { id: 'work-framework', title: 'Work Framework', content: 'An overview of how work is organized across teams, tasks, and deliverables.' },
            { id: 'remote-work-guidelines', title: 'Remote Work Guidelines', content: 'Standards for working effectively from remote locations.' },
            { id: 'hybrid-work-guidelines', title: 'Hybrid Work Guidelines', content: 'How hybrid schedules and collaboration expectations are managed.' },
            { id: 'work-expectations', title: 'Work Expectations', content: 'General expectations around ownership, responsiveness, and execution.' },
            { id: 'ownership-accountability-model', title: 'Ownership & Accountability Model', content: 'How responsibility is assigned and how accountability is tracked.' },
            { id: 'performance-delivery-standards', title: 'Performance & Delivery Standards', content: 'Standards for quality, timeliness, and consistency in delivery.' },
            { id: 'cross-border-collaboration-standards', title: 'Cross-Border Collaboration Standards', content: 'How to collaborate across regions and time zones effectively.' },
            { id: 'time-availability', title: 'Time & Availability', content: 'How availability, response windows, and presence are expected to work.' },
            { id: 'working-hours-time-zone-coordination', title: 'Working Hours & Time Zone Coordination', content: 'Rules for coordinating schedules across time zones.' },
            { id: 'holiday-calendar-regional-flexibility', title: 'Holiday Calendar & Regional Flexibility', content: 'How holidays are observed across regions and when flexibility applies.' },
        ],
    },
    {
        id: 'section-4-communication-collaboration',
        title: 'Section 4 — Communication & Collaboration',
        content: `This section defines how communication is structured across teams, ensuring clarity, consistency, and alignment in a distributed environment. It establishes standards for collaboration, documentation, and decision-making.`,
        children: [
            { id: 'communication-protocol', title: 'Communication Protocol', content: 'How communication should be structured, shared, and followed through internally.' },
            { id: 'stack-best-practices', title: 'Stack Best Practices', content: 'Best practices for using the company stack consistently and effectively.' },
            { id: 'documentation-standards', title: 'Documentation Standards', content: 'How documentation should be written, maintained, and shared.' },
            { id: 'knowledge-management-documentation-ownership', title: 'Knowledge Management & Documentation Ownership', content: 'Ownership expectations for maintaining accurate, discoverable team knowledge.' },
            { id: 'meeting-etiquette', title: 'Meeting Etiquette', content: 'Standards for respectful, efficient, and well-run meetings.' },
            { id: 'decision-making-communication', title: 'Decision-Making Communication', content: 'How decisions are communicated, recorded, and revisited when needed.' },
            { id: 'escalation-issue-resolution', title: 'Escalation & Issue Resolution', content: 'How to escalate blockers and resolve issues with the right urgency.' },
        ],
    },
    {
        id: 'section-5-people-talent-operations',
        title: 'Section 5 — People & Talent Operations',
        content: `This section outlines the organization’s approach to team engagement, development, and support. It provides guidance on working relationships, time-off policies, growth opportunities, and overall team experience.`,
        children: [
            { id: 'people-operations-philosophy', title: 'People Operations Philosophy', content: 'The principles behind how people operations supports the team.' },
            { id: 'engagement-types-full-time-contract-intern-part-time', title: 'Engagement Types (Full-time / Contract / Intern / Part-time)', content: 'How different engagement types are defined and managed.' },
            { id: 'leave-time-off-policy', title: 'Leave & Time-Off Policy', content: 'How time off is requested, reviewed, and recorded.' },
            { id: 'sick-leave-emergency-leave', title: 'Sick Leave & Emergency Leave', content: 'Handling sudden absence, health-related leave, and emergencies.' },
            { id: 'time-off-planning-handover', title: 'Time-Off Planning & Handover', content: 'How to plan time off and hand over responsibilities before leaving.' },
            { id: 'team-benefits', title: 'Team Benefits', content: 'Benefits available to eligible team members and how they are managed.' },
            { id: 'learning-development', title: 'Learning & Development', content: 'Ways the company supports learning, skills growth, and development.' },
            { id: 'performance-growth-opportunities', title: 'Performance & Growth Opportunities', content: 'How performance connects to progression, feedback, and growth opportunities.' },
        ],
    },
    {
        id: 'section-6-legal-regulatory-global-compliance-framework',
        title: 'Section 6 — Legal, Regulatory & Global Compliance Framework',
        content: `This section defines the legal and regulatory structures that support NoCapCode’s global operations. It ensures alignment with international standards and clarifies responsibilities related to intellectual property, data handling, and contractual engagement.`,
        children: [
            { id: 'global-compliance-framework', title: 'Global Compliance Framework', content: 'How the company approaches compliance across multiple jurisdictions.' },
            { id: 'contractor-independent-contributor-policy', title: 'Contractor & Independent Contributor Policy', content: 'Rules for working with contractors and independent contributors.' },
            { id: 'intellectual-property-ownership', title: 'Intellectual Property Ownership', content: 'How IP ownership is handled for company-created work and deliverables.' },
            { id: 'client-confidentiality-standards', title: 'Client Confidentiality Standards', content: 'Required confidentiality standards for client work and client information.' },
            { id: 'data-processing-international-transfers', title: 'Data Processing & International Transfers', content: 'How data may be processed and transferred across regions and borders.' },
            { id: 'regulatory-compliance-gdpr-us-uae-india-aligned', title: 'Regulatory Compliance (GDPR / US / UAE / India aligned)', content: 'A compliance overview aligned to GDPR and key regional requirements.' },
            { id: 'policy-updates-governance', title: 'Policy Updates & Governance', content: 'How policies are reviewed, updated, and governed over time.' },
        ],
    },
    {
        id: 'section-7-closing-section',
        title: 'Section 7 — Closing Section',
        content: `This section reinforces NoCapCode’s commitment to transparency, clarity, and responsible execution. It serves as a final alignment point for all individuals engaging with the organization.`,
        children: [
            { id: 'transparency-commitment', title: 'Transparency Commitment', content: 'NoCapCode’s commitment to clarity, honesty, and transparent communication.' },
            { id: 'build-with-clarity-nocapcode-motto', title: 'Build With Clarity — NoCapCode Motto', content: 'The motto that captures the company’s approach to work and collaboration.' },
            { id: 'acknowledgment-applicability', title: 'Acknowledgment & Applicability', content: 'Who the handbook applies to and how acknowledgment is recorded.' },
        ],
    },
    {
        id: 'section-8-risk-management-governance',
        title: 'Section 8 — Risk Management & Governance',
        content: `This section outlines how NoCapCode identifies, manages, and mitigates operational, data, and organizational risks. It supports long-term scalability and governance across global operations.`,
        children: [
            { id: 'risk-management-framework', title: 'Risk Management Framework', content: 'How risks are identified, assessed, and managed.' },
            { id: 'operational-risk-handling', title: 'Operational Risk Handling', content: 'How operational risks and disruptions should be handled.' },
            { id: 'data-security-risk', title: 'Data & Security Risk', content: 'How data and security risks are monitored and mitigated.' },
            { id: 'escalation-risk-management', title: 'Escalation Risk Management', content: 'How escalation paths support risk handling and issue resolution.' },
            { id: 'governance-model', title: 'Governance Model', content: 'The governance structure used to oversee policy and execution.' },
        ],
    },
]

export default companyDocsContent
