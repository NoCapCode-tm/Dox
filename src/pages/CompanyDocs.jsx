import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/layout/Sidebar.jsx'
import documentTree from '../data/companyDocsContent.js'

const CompanyDocs = () => {
    const navigate = useNavigate()
    const [selectedDocumentId, setSelectedDocumentId] = useState('section-1-about-nocapcode')
    const [expandedSectionIds, setExpandedSectionIds] = useState([])
    const [hasAcknowledged, setHasAcknowledged] = useState(false)
    const [isContentOverflowing, setIsContentOverflowing] = useState(false)
    const [hasOpenedLongContent, setHasOpenedLongContent] = useState(false)

    const selectedDocument = useMemo(
        () => findDocumentNode(documentTree, selectedDocumentId),
        [selectedDocumentId],
    )

    const handleSelect = (id) => {
        setSelectedDocumentId(id)
        setHasAcknowledged(false)
        setIsContentOverflowing(false)
        setHasOpenedLongContent(false)
    }

    const handleSectionSelect = (sectionId, hasChildren) => {
        handleSelect(sectionId)

        if (hasChildren) {
            setExpandedSectionIds((previousIds) =>
                previousIds.includes(sectionId)
                    ? previousIds.filter((id) => id !== sectionId)
                    : [...previousIds, sectionId],
            )
        }
    }

    const handleDocumentSelect = (documentId, parentSectionId) => {
        handleSelect(documentId)

        if (parentSectionId) {
            setExpandedSectionIds((previousIds) =>
                previousIds.includes(parentSectionId)
                    ? previousIds
                    : [...previousIds, parentSectionId],
            )
        }
    }

    const handleAcknowledgeChange = (event) => {
        if (event.target.checked && isContentOverflowing && !hasOpenedLongContent) {
            toast.error('Please click Read More to review the full document.')
            return
        }

        setHasAcknowledged(event.target.checked)
    }

    const handleMarkAsRead = () => {
        if (isContentOverflowing && !hasOpenedLongContent) {
            toast.error('Please click Read More to review the full document.')
            return
        }

        setHasAcknowledged(true)
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
                    backgroundImage: 'url(/dox-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'multiply',
                    filter: 'brightness(0) contrast(1.08)',
                    opacity: 0.62,
                }}
            />

            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'linear-gradient(180deg, #000000 20%, #5492EC 52%, #000000 100%)',
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
                                        <Sidebar
                                            items={documentTree}
                                            activeDocumentId={selectedDocumentId}
                                            expandedSectionIds={expandedSectionIds}
                                            onSectionSelect={handleSectionSelect}
                                            onDocumentSelect={handleDocumentSelect}
                                        />
                                    </nav>

                                    <div className="space-y-4">
                                        <ExpandableContent
                                            content={selectedDocument.content}
                                            onOverflowChange={setIsContentOverflowing}
                                            onExpanded={() => setHasOpenedLongContent(true)}
                                        />

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
                                                    onChange={handleAcknowledgeChange}
                                                    className="mt-1 h-4 w-4 rounded border-white/35 bg-transparent text-[#6EA8FF] focus:ring-0 focus:ring-offset-0"
                                                />
                                                <span>I have read and understood this document.</span>
                                            </label>

                                            <button
                                                type="button"
                                                onClick={handleMarkAsRead}
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

const ExpandableContent = ({ content, onOverflowChange, onExpanded }) => {
    const contentRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
        if (contentRef.current) {
            // Check if content exceeds max-height (404px approximately)
            const scrollHeight = contentRef.current.scrollHeight
            const maxHeight = 404
            const nextIsOverflowing = scrollHeight > maxHeight
            setIsOverflowing(nextIsOverflowing)
            onOverflowChange?.(nextIsOverflowing)
            // Reset expanded state when content changes
            setIsExpanded(false)
        }
    }, [content, onOverflowChange])

    const handleToggleExpanded = () => {
        setIsExpanded((previousValue) => {
            const nextValue = !previousValue
            if (nextValue) {
                onExpanded?.()
            }
            return nextValue
        })
    }

    return (
        <div className="space-y-2">
            <article
                className="rounded-[10px] border border-white/8 transition-all duration-300 relative"
                style={{
                    background: 'rgba(46, 109, 194, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        overflow: isExpanded ? 'visible' : 'hidden',
                        maxHeight: isExpanded ? 'none' : '404px',
                    }}
                >
                    <p
                        ref={contentRef}
                        className="p-4 md:p-6 text-[15px] leading-[24px] tracking-[0.08em] text-white/80 md:text-[16px] md:leading-[26px] transition-all duration-300"
                        style={{
                            minHeight: isExpanded ? 'auto' : '404px',
                            margin: 0,
                        }}
                    >
                        {content}
                    </p>
                </div>

                {isOverflowing && !isExpanded && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '120px',
                            background: 'linear-gradient(to bottom, rgba(46, 109, 194, 0) 0%, rgba(15, 23, 42, 0.8) 100%)',
                            pointerEvents: 'none',
                            borderRadius: '0 0 10px 10px',
                        }}
                    />
                )}
            </article>

            {isOverflowing && (
                <div className="flex items-center justify-center pt-2">
                    <button
                        type="button"
                        onClick={handleToggleExpanded}
                        className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2 text-[13px] leading-[18px] text-white/70 transition-all hover:bg-white/6 hover:text-white/90"
                    >
                        {isExpanded ? (
                            <>
                                <span>Read Less</span>
                                <ChevronUpIcon />
                            </>
                        ) : (
                            <>
                                <span>Read More</span>
                                <ChevronDownIcon />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}

const findDocumentNode = (items, targetId) => {
    const findMatch = (nodes, trail = []) => {
        for (const item of nodes) {
            const nextTrail = [...trail, item.title]

            if (item.id === targetId) {
                return {
                    ...item,
                    pathLabel: nextTrail.join(' / '),
                }
            }

            if (item.children?.length) {
                const nestedMatch = findMatch(item.children, nextTrail)
                if (nestedMatch) {
                    return nestedMatch
                }
            }
        }

        return null
    }

    const match = findMatch(items)
    if (match) {
        return match
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

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 6L8 11L12.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const ChevronUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.5 10L8 5L3.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default CompanyDocs
