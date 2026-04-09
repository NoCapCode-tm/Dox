import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const documentTree = [
    {
        id: 'company-policies',
        title: 'Company Policies',
        content: 'TEXT....',
    },
    {
        id: 'code-of-conduct',
        title: 'Code of Conduct',
        content: 'TEXT....',
    },
    {
        id: 'data-security',
        title: 'Data Security & Privacy',
        content: 'TEXT....',
    },
    {
        id: 'working-style',
        title: 'Working Style',
        content: 'TEXT....',
        children: [
            {
                id: 'culture-values',
                title: 'Our Culture & Values',
                content: 'TEXT....',
            },
            {
                id: 'remote-work-guidelines',
                title: 'Remote Work Guidelines',
                content: 'TEXT....',
            },
        ],
    },
    {
        id: 'holidays-shifts',
        title: 'Holidays & Shifts',
        content: 'TEXT....',
        children: [
            {
                id: 'working-hours-holiday-calendar',
                title: 'Working Hours & Holiday Calendar',
                content: 'TEXT....',
            },
        ],
    },
    {
        id: 'communication-guidelines',
        title: 'Communication Guidelines',
        content: 'TEXT....',
        children: [
            {
                id: 'slack-best-practices',
                title: 'Slack Best Practices',
                content: 'TEXT....',
            },
            {
                id: 'meeting-etiquette',
                title: 'Meeting Etiquette',
                content: 'TEXT....',
            },
        ],
    },
    {
        id: 'hr-policies',
        title: 'HR Policies',
        content: 'TEXT....',
        children: [
            {
                id: 'leave-time-off-policy',
                title: 'Leave & Time Off Policy',
                content: 'TEXT....',
            },
            {
                id: 'employee-benefits',
                title: 'Employee Benefits',
                content: 'TEXT....',
            },
        ],
    },
]

const CompanyDocs = () => {
    const navigate = useNavigate()
    const [selectedDocumentId, setSelectedDocumentId] = useState('company-policies')
    const [hasAcknowledged, setHasAcknowledged] = useState(false)

    const selectedDocument = useMemo(
        () => findDocumentNode(documentTree, selectedDocumentId),
        [selectedDocumentId],
    )

    const handleSelect = (id) => {
        setSelectedDocumentId(id)
        setHasAcknowledged(false)
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden font-[Jost] text-white" style={{ background: '#000' }}>
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-0 left-0 h-full w-1/2"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #0A1F56 0deg, #00184D 219.41deg, #0A1F56 309.85deg, #0D2460 360deg)',
                    }}
                />
                <div
                    className="absolute top-0 right-0 h-full w-1/2"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #0A1F56 0deg, #00184D 219.41deg, #0A1F56 309.85deg, #0D2460 360deg)',
                        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                    }}
                />
            </div>

            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        'url(/dox-bg.png), linear-gradient(180deg, #000000 14.42%, rgba(74, 131, 214, 0.6) 43.27%, #000000 100%)',
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    mixBlendMode: 'multiply',
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 py-8 md:px-8 md:py-10">
                <div
                    className="relative overflow-hidden rounded-[12px] border border-white/8"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(153, 153, 153, 0.02) 100%)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <div className="grid min-h-[760px] grid-cols-1 md:grid-cols-[140px_1fr]">
                        <aside className="relative p-4 md:p-3">
                            <div className="pointer-events-none absolute right-0 top-[18px] bottom-[18px] hidden items-stretch md:flex">
                                <VerticalDivider />
                            </div>
                            <DoxLogo />
                            <p className="mt-1 text-[11px] leading-[16px] text-white/65">Employee Onboarding</p>
                            <div className="my-5 pr-6">
                                <HorizontalDivider />
                            </div>

                            <div className="flex gap-3 md:flex-col md:gap-8">
                                <StepBadge number="1" />
                                <StepBadge number="2" active />
                                <StepBadge number="3" />
                            </div>
                        </aside>

                        <section className="relative p-5 md:p-8 lg:p-10">
                            <div className="relative z-10">
                                <h1 className="text-[28px] font-normal leading-[34px]">Company Docs</h1>
                                <p className="mt-1 max-w-[820px] text-[16px] leading-[24px] text-white/70">
                                    Please review and understand our policies and culture.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr] lg:gap-5">
                                    <nav
                                        className="rounded-[10px] border border-white/8 p-3"
                                        style={{
                                            background: 'rgba(46, 109, 194, 0.16)',
                                            backdropFilter: 'blur(10px)',
                                            WebkitBackdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <div className="space-y-2">
                                            {documentTree.map((item) => (
                                                <DocumentTreeItem
                                                    key={item.id}
                                                    item={item}
                                                    depth={0}
                                                    activeId={selectedDocumentId}
                                                    onSelect={handleSelect}
                                                />
                                            ))}
                                        </div>
                                    </nav>

                                    <div className="space-y-4">
                                        <article
                                            className="rounded-[10px] border border-white/8 p-4 md:p-6"
                                            style={{
                                                background: 'rgba(46, 109, 194, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                WebkitBackdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <p className="min-h-[404px] text-[15px] leading-[24px] tracking-[0.08em] text-white/80 md:text-[16px] md:leading-[26px]">
                                                {selectedDocument.content}
                                            </p>
                                        </article>

                                        <section
                                            className="rounded-[10px] border border-white/8 p-4 md:p-6"
                                            style={{
                                                background: 'rgba(46, 109, 194, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                WebkitBackdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[20px] text-white/70 md:text-[15px] md:leading-[22px]">
                                                <input
                                                    type="checkbox"
                                                    checked={hasAcknowledged}
                                                    onChange={(event) => setHasAcknowledged(event.target.checked)}
                                                    className="mt-1 h-4 w-4 rounded border-white/35 bg-transparent text-[#6EA8FF] focus:ring-0 focus:ring-offset-0"
                                                />
                                                <span>I have read and understood this document.</span>
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => setHasAcknowledged(true)}
                                                disabled={hasAcknowledged}
                                                className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-white/35 px-5 py-2.5 text-[15px] leading-[22px] text-white/90 transition-colors hover:bg-white/6 disabled:cursor-default disabled:bg-white/10 disabled:text-white/55"
                                            >
                                                <ReadIcon />
                                                {hasAcknowledged ? 'Document Marked as Read' : 'Mark as Read & Continue'}
                                            </button>
                                        </section>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/welcome')}
                                        className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 px-7 py-2.5 text-[16px] leading-[22px] text-white/90 transition-colors hover:bg-white/5"
                                    >
                                        <BackArrowIcon />
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/legal-agreements')}
                                        className="inline-flex items-center gap-2 rounded-[10px] border border-white/40 px-7 py-2.5 text-[16px] leading-[22px] text-white/90 transition-colors hover:bg-white/5"
                                    >
                                        Continue
                                        <ForwardArrowIcon />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DocumentTreeItem = ({ item, depth, activeId, onSelect }) => {
    const isActive = activeId === item.id
    const isNested = depth > 0

    return (
        <div>
            <button
                type="button"
                onClick={() => onSelect(item.id)}
                className="flex w-full items-start rounded-[8px] border border-transparent text-left transition-colors hover:bg-white/6"
                style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.78)' : 'transparent',
                    color: isActive ? '#15213A' : 'rgba(255,255,255,0.88)',
                    paddingTop: isNested ? '8px' : '10px',
                    paddingBottom: isNested ? '8px' : '10px',
                    paddingLeft: `${14 + depth * 18}px`,
                    paddingRight: '12px',
                    fontSize: isNested ? '13px' : '14px',
                    lineHeight: isNested ? '18px' : '20px',
                    fontWeight: 400,
                }}
            >
                <span className="block w-full whitespace-normal break-words">{item.title}</span>
            </button>

            {item.children?.length ? (
                <div className="mt-1 space-y-1 border-l border-white/8 pl-2">
                    {item.children.map((child) => (
                        <DocumentTreeItem
                            key={child.id}
                            item={child}
                            depth={depth + 1}
                            activeId={activeId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

const findDocumentNode = (items, targetId, trail = []) => {
    for (const item of items) {
        const nextTrail = [...trail, item.title]
        if (item.id === targetId) {
            return {
                ...item,
                pathLabel: nextTrail.join(' / '),
            }
        }

        if (item.children?.length) {
            const match = findDocumentNode(item.children, targetId, nextTrail)
            if (match) {
                return match
            }
        }
    }

    return {
        ...items[0],
        pathLabel: items[0].title,
    }
}

const StepBadge = ({ number, active = false }) => (
    <div
        className="flex h-[56px] w-[56px] items-center justify-center rounded-[10px] text-[34px] leading-none text-white"
        style={{
            background: active ? 'rgba(255,255,255,0.18)' : 'rgba(75, 96, 137, 0.35)',
        }}
    >
        {number}
    </div>
)

const ReadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
        <path d="M6 9.25L8 11.2L12 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const BackArrowIcon = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
        <path d="M9.8 2.2L4.8 7L9.8 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 7H14.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
)

const ForwardArrowIcon = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
        <path d="M6.2 2.2L11.2 7L6.2 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.8 7H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
)

const VerticalDivider = () => (
    <svg className="h-full w-auto" width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
        <path d="M1 1L1 795.024" stroke="white" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const HorizontalDivider = () => (
    <svg width="118" height="2" viewBox="0 0 150 2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1H148.5" stroke="white" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const DoxLogo = () => (
    <svg width="69" height="19" viewBox="0 0 75 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
        <g transform="translate(0 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(17 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(27 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(45 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(56 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
    </svg>
)

export default CompanyDocs
