import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/layout/Sidebar.jsx'
import documentTree from '../data/companyDocsContent.js'

const CompanyDocs = () => {
    const navigate = useNavigate()
    const [selectedDocumentId, setSelectedDocumentId] = useState('section-1-about-nocapcode')
    const [expandedSectionIds, setExpandedSectionIds] = useState([])
    const [mobileActiveSectionId, setMobileActiveSectionId] = useState('section-1-about-nocapcode')
    const [hasAcknowledged, setHasAcknowledged] = useState(false)
    const [isContentOverflowing, setIsContentOverflowing] = useState(false)
    const [hasOpenedLongContent, setHasOpenedLongContent] = useState(false)
    const sidebarScrollRef = useRef(null)
    const sidebarThumbDragRef = useRef({ isDragging: false, startY: 0, startScrollTop: 0 })
    const [sidebarThumbTop, setSidebarThumbTop] = useState(0)
    const [sidebarTrackHeight, setSidebarTrackHeight] = useState(0)

    const sidebarThumbHeight = 73

    const selectedDocument = useMemo(
        () => findDocumentNode(documentTree, selectedDocumentId),
        [selectedDocumentId],
    )

    const mobileActiveSection = useMemo(
        () => documentTree.find((item) => item.id === mobileActiveSectionId) ?? documentTree[0],
        [mobileActiveSectionId],
    )

    const handleSelect = (id) => {
        setSelectedDocumentId(id)
        setHasAcknowledged(false)
        setIsContentOverflowing(false)
        setHasOpenedLongContent(false)
    }

    const handleSectionSelect = (sectionId, hasChildren) => {
        handleSelect(sectionId)
        setMobileActiveSectionId(sectionId)

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
            setMobileActiveSectionId(parentSectionId)
        }

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

    const syncSidebarThumb = () => {
        const scrollContainer = sidebarScrollRef.current
        if (!scrollContainer) {
            return
        }

        const { scrollHeight, clientHeight, scrollTop } = scrollContainer
        const trackHeight = clientHeight
        setSidebarTrackHeight(trackHeight)

        if (scrollHeight <= clientHeight) {
            setSidebarThumbTop(0)
            return
        }

        const maxThumbTop = Math.max(trackHeight - sidebarThumbHeight, 0)
        const maxScrollTop = scrollHeight - clientHeight
        const nextThumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0

        setSidebarThumbTop(nextThumbTop)
    }

    useEffect(() => {
        syncSidebarThumb()
    }, [expandedSectionIds, selectedDocumentId])

    useEffect(() => {
        const handleResize = () => {
            syncSidebarThumb()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleSidebarWheel = (event) => {
        const scrollContainer = event.currentTarget
        const hasScrollableContent = scrollContainer.scrollHeight > scrollContainer.clientHeight

        if (!hasScrollableContent) {
            return
        }

        scrollContainer.scrollTop += event.deltaY
        syncSidebarThumb()
        event.preventDefault()
    }

    const handleSidebarThumbMouseDown = (event) => {
        event.preventDefault()

        const scrollContainer = sidebarScrollRef.current
        if (!scrollContainer) {
            return
        }

        sidebarThumbDragRef.current = {
            isDragging: true,
            startY: event.clientY,
            startScrollTop: scrollContainer.scrollTop,
        }
        document.body.style.userSelect = 'none'

        const handleMouseMove = (moveEvent) => {
            const currentScrollContainer = sidebarScrollRef.current
            if (!currentScrollContainer || !sidebarThumbDragRef.current.isDragging) {
                return
            }

            const maxScrollTop = currentScrollContainer.scrollHeight - currentScrollContainer.clientHeight
            const maxThumbTop = Math.max(sidebarTrackHeight - sidebarThumbHeight, 0)

            if (maxScrollTop <= 0 || maxThumbTop <= 0) {
                return
            }

            const deltaY = moveEvent.clientY - sidebarThumbDragRef.current.startY
            const scrollRatio = maxScrollTop / maxThumbTop
            currentScrollContainer.scrollTop = sidebarThumbDragRef.current.startScrollTop + deltaY * scrollRatio
            syncSidebarThumb()
        }

        const handleMouseUp = () => {
            sidebarThumbDragRef.current.isDragging = false
            document.body.style.userSelect = ''
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden font-[Jost] text-white" style={{ background: 'linear-gradient(119.18deg, #0A0E14 2.67%, #141C28 96.61%)' }}>
            <style>{`.no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{scrollbar-width:none; -ms-overflow-style:none;}`}</style>

            {/* Mobile layout */}
            <div className="fixed inset-0 z-40 overflow-hidden bg-[linear-gradient(171.66deg,#0C1119_40.66%,#141C28_99.3%)] md:hidden">
                <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{
                        width: '172px',
                        height: '87px',
                        background: '#0A0E14',
                        border: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRadius: '0px 0px 10px 0px',
                    }}
                >
                    <div className="absolute left-[64px] top-[44px]" style={{ transform: 'scale(0.62)', transformOrigin: 'left top' }}>
                        <DoxLogo />
                    </div>
                    <p
                        className="absolute left-[64px] top-[56px] leading-none text-white/65"
                        style={{ fontSize: '10px', fontWeight: 400 }}
                    >
                        Employee Onboarding
                    </p>
                </div>

                <div className="absolute left-0 right-0 top-[90px] bottom-[72px] overflow-y-auto px-6 pb-6 pt-0">
                    <div className="pt-0">
                        <h1 className="text-[24px] leading-[24px] font-normal text-white">Company Docs</h1>
                        <p className="mt-4 max-w-[357px] text-[16px] leading-[24px] text-white/65">
                            Please review and understand our policies and culture.
                        </p>
                    </div>

                    <div className="mt-6 relative">
                        <div className="flex h-[36px] overflow-x-auto rounded-[10px] border border-white bg-transparent no-scrollbar">
                            {documentTree.map((section) => {
                                const isActive = mobileActiveSection?.id === section.id
                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => handleSectionSelect(section.id, Boolean(section.children?.length))}
                                        onMouseEnter={() => setMobileActiveSectionId(section.id)}
                                        onFocus={() => setMobileActiveSectionId(section.id)}
                                        className="flex h-full shrink-0 items-center justify-between gap-2 border-r border-white/10 px-4 text-left transition-colors last:border-r-0"
                                        style={{
                                            minWidth: '126px',
                                            background: isActive ? '#1C2027' : 'transparent',
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            lineHeight: '20px',
                                            fontWeight: 400,
                                        }}
                                    >
                                        <span className="truncate">{section.title}</span>
                                        {section.children?.length ? (
                                            <span
                                                className="inline-flex shrink-0 transition-transform"
                                                style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                            >
                                                <ChevronDownIcon />
                                            </span>
                                        ) : null}
                                    </button>
                                )
                            })}
                        </div>

                        {mobileActiveSection?.children?.length ? (
                            <div className="mt-2 rounded-[10px] border border-white/20 bg-[#0A0E14] p-2 shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                                <div className="max-h-[210px] overflow-y-auto pr-1 no-scrollbar">
                                    {mobileActiveSection.children.map((child) => {
                                        const isChildActive = selectedDocumentId === child.id
                                        return (
                                            <button
                                                key={child.id}
                                                type="button"
                                                onClick={() => handleDocumentSelect(child.id, mobileActiveSection.id)}
                                                className="flex w-full items-start rounded-[8px] px-3 py-2 text-left transition-colors hover:bg-white/6"
                                                style={{
                                                    color: isChildActive ? '#FFFFFF' : 'rgba(255,255,255,0.82)',
                                                    fontSize: '12px',
                                                    lineHeight: '18px',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                <span className="block whitespace-normal break-words">{child.title}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="mt-8 rounded-[10px] border border-white/10 bg-[rgba(0,0,0,0.54)] p-4">
                        <ExpandableContent
                            content={selectedDocument.content}
                            onOverflowChange={setIsContentOverflowing}
                            onExpanded={() => setHasOpenedLongContent(true)}
                        />

                        <div className="mt-4 rounded-[5px] bg-[rgba(255,255,255,0.1)] px-3 py-3 text-white">
                            <p className="text-[16px] leading-[24px] font-normal">Need Help?</p>
                            <p className="mt-1 text-[12px] leading-[24px] text-white/90">
                                Reach out to DOX or your assigned onboarding buddy.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-[10px] border border-white/50 p-4">
                        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[20px] text-white/65">
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
                    </div>
                </div>

                <div className="absolute bottom-[24px] left-1/2 z-50 flex -translate-x-1/2 items-center">
                    <div className="flex h-[43px] w-[156px] overflow-hidden rounded-[10px] border border-white/50">
                        {[1, 2, 3].map((number) => {
                            const isActive = number === 2
                            return (
                                <div
                                    key={number}
                                    className="flex h-full w-[52px] items-center justify-center border-r border-white/50 last:border-r-0"
                                    style={{
                                        background: isActive ? '#1C2027' : '#0A0E14',
                                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        fontWeight: 400,
                                    }}
                                >
                                    {number}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile top navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-stretch justify-between border-b border-white/10 bg-[#0A0E14] md:hidden">
                <div
                    className="flex flex-col items-center justify-center overflow-hidden shrink-0"
                    style={{
                        width: 'clamp(86px, 28vw, 112px)',
                        height: 'clamp(64px, 14vw, 74px)',
                        background: '#0A0E14',
                        borderRight: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderBottom: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderRadius: '0px 0px 10px 0px',
                    }}
                >
                    <div style={{ transform: 'scale(0.62)', transformOrigin: 'center' }}>
                        <DoxLogo />
                    </div>
                    <p className="leading-none text-white/50 text-[8px] mt-0.5 text-center px-1">Employee Onboarding</p>
                </div>

                <div className="flex flex-1 items-center justify-around gap-2 px-2 py-2">
                    {[1, 2, 3].map((n) => {
                        const isActive = n === 2
                        return (
                            <div
                                key={n}
                                className="flex min-w-0 flex-1 items-center justify-center rounded-[10px] border text-center font-medium"
                                style={{
                                    height: 'clamp(42px, 10vw, 56px)',
                                    fontSize: 'clamp(12px, 3.5vw, 16px)',
                                    background: isActive ? '#1C2027' : '#0A0E14',
                                    borderColor: 'rgba(173, 173, 173, 0.5)',
                                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)'
                                }}
                            >
                                {n}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Sidebar DOX logo square */}
            <div className="absolute top-0 left-0 z-50 hidden md:block">
                <div
                    className="flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        width: '12vw',
                        height: '16vh',
                        background: '#0A0E14',
                        borderRight: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderBottom: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderRadius: '0px 0px 10px 0px',
                    }}
                >
                    <div style={{ transform: 'scale(0.82)', transformOrigin: 'center' }}>
                        <DoxLogo />
                    </div>
                    <p className="leading-none text-white/50 mt-1" style={{ fontSize: 'clamp(10px, 0.65vw, 12px)' }}>Employee Onboarding</p>
                </div>
            </div>

            {/* Sidebar steps */}
            <aside className="fixed left-0 top-0 h-full z-30 hidden flex-col bg-transparent md:flex" style={{ paddingTop: '32vh' }}>
                <div className="flex flex-col gap-9">
                    <div
                        className="flex items-center justify-center font-medium"
                        style={{
                            width: '5vw',
                            height: '10vh',
                            fontSize: '2.2vw',
                            background: '#0A0E14',
                            border: '0.5px solid rgba(173, 173, 173, 0.5)',
                            borderRadius: '0px 10px 10px 0px',
                            color: '#848689',
                        }}
                    >
                        1
                    </div>
                    <div
                        className="flex items-center justify-center font-medium"
                        style={{
                            width: '5vw',
                            height: '10vh',
                            fontSize: '2.2vw',
                            background: '#1C2027',
                            border: '0.5px solid rgba(173, 173, 173, 0.5)',
                            borderRadius: '0px 10px 10px 0px',
                            color: '#FFFFFF',
                        }}
                    >
                        2
                    </div>
                    <div
                        className="flex items-center justify-center font-medium"
                        style={{
                            width: '5vw',
                            height: '10vh',
                            fontSize: '2.2vw',
                            background: '#0A0E14',
                            border: '0.5px solid rgba(173, 173, 173, 0.5)',
                            borderRadius: '0px 10px 10px 0px',
                            color: 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        3
                    </div>
                </div>
            </aside>

            {/* Framed container */}
            <div className="relative hidden md:block" style={{ marginLeft: '4.5vw', marginTop: '8vh', marginRight: '3vw', marginBottom: '5vh', zIndex: 20 }}>
                <div className="w-full border rounded-[10px] relative no-scrollbar" style={{ borderColor: 'rgba(173, 173, 173, 0.5)', maxHeight: 'calc(100vh - 12vh)', overflowY: 'auto' }}>
                    {/* Content Layout */}
                    <div className="grid min-h-[760px]">
                        <section className="relative p-5 md:p-8 lg:p-10">
                            <div className="relative z-10" style={{ paddingLeft: 'clamp(36px, 6.5vw, 100px)' }}>
                                <h1 className="text-[28px] font-normal leading-[34px]">Company Docs</h1>
                                <p className="mt-1 max-w-[820px] text-[16px] leading-[24px] text-white/70">
                                    Please review and understand our policies and culture.
                                </p>

                                {/* Document and Acknowledgement Area */}
                                <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr] lg:gap-5">
                                    <nav
                                        className="relative h-[470px] rounded-[10px] border border-white/8 p-3"
                                        style={{
                                            background: 'rgba(28, 32, 39, 0.65)',
                                            backdropFilter: 'blur(10px)',
                                            WebkitBackdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <div
                                            className="h-full overflow-y-auto overscroll-contain pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                            ref={sidebarScrollRef}
                                            onScroll={syncSidebarThumb}
                                            onWheel={handleSidebarWheel}
                                            style={{
                                                scrollbarWidth: 'none',
                                                msOverflowStyle: 'none',
                                            }}
                                        >
                                            <Sidebar
                                                items={documentTree}
                                                activeDocumentId={selectedDocumentId}
                                                expandedSectionIds={expandedSectionIds}
                                                onSectionSelect={handleSectionSelect}
                                                onDocumentSelect={handleDocumentSelect}
                                            />
                                        </div>

                                        <div className="absolute bottom-3 right-2 top-3">
                                            <SidebarScrollFrame
                                                trackHeight={sidebarTrackHeight}
                                                thumbTop={sidebarThumbTop}
                                                onThumbMouseDown={handleSidebarThumbMouseDown}
                                            />
                                        </div>
                                    </nav>

                                    <div className="space-y-4">
                                        <section
                                            className="rounded-[10px] border border-white/50 p-4 md:p-6"
                                            style={{
                                                background: '0A0E14',
                                                // backdropFilter: 'blur(10px)',
                                                //WebkitBackdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <ExpandableContent
                                                content={selectedDocument.content}
                                                onOverflowChange={setIsContentOverflowing}
                                                onExpanded={() => setHasOpenedLongContent(true)}
                                            />

                                            <div className="mt-4 rounded-[5px] bg-[rgba(28,32,39,0.65)] px-3 py-3 text-white">
                                                <p className="text-[16px] leading-[24px] font-normal">Need Help?</p>
                                                <p className="mt-1 text-[14px] leading-[24px] text-white/90">
                                                    Reach out to DOX or your assigned onboarding buddy.
                                                </p>
                                            </div>
                                        </section>
                                        {/*confirmation  */}
                                        <section
                                            className="rounded-[10px] border p-4 md:p-6"
                                            style={{
                                                background: '0A0E14',
                                                border: '0.5px solid rgba(255, 255, 255, 0.5)',
                                                backdropFilter: 'blur(10px)',
                                                WebkitBackdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[20px] text-white/65 md:text-[15px] md:leading-[22px]">
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

                                {/* Footer Actions */}
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

const renderContentWithBoldMarkers = (text) => {
    const markerRegex = /§b§([\s\S]*?)§\/b§/g
    const renderedParts = []
    let lastIndex = 0
    let match

    while ((match = markerRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            renderedParts.push(text.slice(lastIndex, match.index))
        }

        renderedParts.push(
            <strong key={`bold-${match.index}`} className="font-bold text-white">
                {match[1]}
            </strong>,
        )

        lastIndex = markerRegex.lastIndex
    }

    if (lastIndex < text.length) {
        renderedParts.push(text.slice(lastIndex))
    }

    return renderedParts.map((part, index) =>
        typeof part === 'string' ? <span key={`text-${index}`}>{part}</span> : part,
    )
}

const ExpandableContent = ({ content, onOverflowChange, onExpanded }) => {
    const contentRef = useRef(null)
    const contentScrollRef = useRef(null)
    const contentTrackRef = useRef(null)
    const contentThumbRef = useRef(null)
    const contentThumbDragRef = useRef({ isDragging: false, startY: 0, startScrollTop: 0 })
    const [isExpanded, setIsExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)

    const contentThumbHeight = 27
    const contentTrackInset = 13

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

        if (contentScrollRef.current) {
            contentScrollRef.current.scrollTop = 0
        }

        if (contentThumbRef.current) {
            contentThumbRef.current.style.transform = 'translateY(0px)'
        }
    }, [content, onOverflowChange])

    const syncContentThumb = () => {
        const scrollContainer = contentScrollRef.current
        const trackElement = contentTrackRef.current
        const thumbElement = contentThumbRef.current

        if (!scrollContainer || !trackElement || !thumbElement) {
            return
        }

        const { scrollHeight, clientHeight, scrollTop } = scrollContainer
        const trackHeight = Math.max(trackElement.clientHeight, 0)

        if (scrollHeight <= clientHeight) {
            thumbElement.style.transform = 'translateY(0px)'
            return
        }

        const maxThumbTop = Math.max(trackHeight - contentThumbHeight, 0)
        const maxScrollTop = scrollHeight - clientHeight
        const nextThumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0

        const clampedThumbTop = Math.max(0, Math.min(nextThumbTop, maxThumbTop))
        thumbElement.style.transform = `translateY(${clampedThumbTop}px)`
    }

    useEffect(() => {
        syncContentThumb()
    }, [content, isExpanded])

    useEffect(() => {
        const handleResize = () => {
            syncContentThumb()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleContentThumbPointerDown = (event) => {
        if (!isExpanded) {
            return
        }

        event.preventDefault()

        const scrollContainer = contentScrollRef.current
        if (!scrollContainer) {
            return
        }

        event.currentTarget.setPointerCapture?.(event.pointerId)

        contentThumbDragRef.current = {
            isDragging: true,
            startY: event.clientY,
            startScrollTop: scrollContainer.scrollTop,
        }
        document.body.style.userSelect = 'none'

        const handleMouseMove = (moveEvent) => {
            const currentScrollContainer = contentScrollRef.current
            const currentTrack = contentTrackRef.current
            if (!currentScrollContainer || !contentThumbDragRef.current.isDragging) {
                return
            }

            if (!currentTrack) {
                return
            }

            const maxScrollTop = currentScrollContainer.scrollHeight - currentScrollContainer.clientHeight
            const maxThumbTop = Math.max(currentTrack.clientHeight - contentThumbHeight, 0)

            if (maxScrollTop <= 0 || maxThumbTop <= 0) {
                return
            }

            const deltaY = moveEvent.clientY - contentThumbDragRef.current.startY
            const scrollRatio = maxScrollTop / maxThumbTop
            currentScrollContainer.scrollTop = contentThumbDragRef.current.startScrollTop + deltaY * scrollRatio
            syncContentThumb()
        }

        const handleMouseUp = () => {
            contentThumbDragRef.current.isDragging = false
            document.body.style.userSelect = ''
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const handleToggleExpanded = () => {
        setIsExpanded((previousValue) => !previousValue)
    }

    useEffect(() => {
        if (isExpanded) {
            onExpanded?.()
        }
    }, [isExpanded, onExpanded])

    return (
        <div className="space-y-2">
            {/* Document Card */}
            <article
                className="rounded-[10px] border border-white/8 transition-all duration-300 relative overflow-hidden"
                style={{
                    background: 'rgba(0, 0, 0, 0.54)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
            >
                {/* Scrollable Content */}
                <div className="relative overflow-hidden min-h-[404px]">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-20 top-10 z-0 select-none whitespace-nowrap opacity-100"
                        style={{
                            width: '1164px',
                            height: '129px',
                            fontFamily: 'Jost, sans-serif',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '200px',
                            lineHeight: '24px',
                            color: 'rgba(255, 255, 255, 0.1)',
                            textShadow: '0 0 24px rgba(255, 255, 255, 0.05)',
                            letterSpacing: '-0.06em',
                            transform: 'rotate(90deg)',
                            transformOrigin: 'left top',
                        }}
                    >
                        no cap code
                    </div>

                    <div
                        ref={contentScrollRef}
                        className="relative z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        onScroll={syncContentThumb}
                        style={{
                            position: 'relative',
                            overflowX: 'hidden',
                            overflowY: isExpanded ? 'auto' : 'hidden',
                            maxHeight: '404px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <p
                            ref={contentRef}
                            className="p-4 md:p-6 text-[15px] leading-[24px] tracking-[0.08em] text-white/85 md:text-[16px] md:leading-[26px] transition-all duration-300"
                            style={{
                                minHeight: '404px',
                                margin: 0,
                                whiteSpace: 'pre-line',
                                fontFamily: 'Arial, sans-serif',

                            }}
                        >
                            {renderContentWithBoldMarkers(content)}
                        </p>
                    </div>
                </div>

                {isExpanded && isOverflowing ? (
                    <div className="absolute bottom-[13px] right-3 top-[13px] z-20 pointer-events-auto">
                        <ContentScrollThumb
                            trackRef={contentTrackRef}
                            thumbRef={contentThumbRef}
                            onThumbPointerDown={handleContentThumbPointerDown}
                        />
                    </div>
                ) : null}

                {/* Fade Overlay */}
                {isOverflowing && !isExpanded && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '120px',
                            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.96) 100%)',
                            pointerEvents: 'none',
                            borderRadius: '0 0 10px 10px',
                        }}
                    />
                )}
            </article>

            {/* Expand Toggle */}
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

const SidebarScrollFrame = ({ trackHeight, thumbTop, onThumbMouseDown }) => (
    <div className="relative h-full w-[10px]">
        <button
            type="button"
            aria-label="Scroll sidebar"
            onMouseDown={onThumbMouseDown}
            className="absolute left-0 w-[10px] bg-transparent p-0 focus:outline-none"
            style={{
                top: `${thumbTop}px`,
                height: '73px',
                cursor: 'default',
                pointerEvents: 'auto',
                opacity: trackHeight > 73 ? 1 : 0.4,
            }}
        >
            <svg width="10" height="73" viewBox="0 0 10 73" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="0.75" y="0.75" width="8.5" height="71.5" rx="4.25" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            </svg>
        </button>
    </div>
)

const ContentScrollThumb = ({ trackRef, thumbRef, onThumbPointerDown }) => (
    <div ref={trackRef} className="relative h-full w-[8px] z-20">
        <button
            ref={thumbRef}
            type="button"
            aria-label="Scroll content"
            onPointerDown={onThumbPointerDown}
            className="absolute left-0 top-0 z-20 w-[8px] bg-transparent p-0 focus:outline-none"
            style={{
                height: '27px',
                cursor: 'default',
                pointerEvents: 'auto',
                touchAction: 'none',
                userSelect: 'none',
                willChange: 'transform',
            }}
        >
            <svg width="8" height="27" viewBox="0 0 8 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="0.75" y="0.75" width="6.5" height="25.5" rx="3.25" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            </svg>
        </button>
    </div>
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
