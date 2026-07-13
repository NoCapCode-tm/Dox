import { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import documentTree from '../data/companyDocsContent.js';
import HelpButton from "../components/Help/HelpButton";
import HelpDrawer from "../components/Help/HelpDrawer";
import Loader from "../components/ui/Loader";

import { acknowledgeCompanyDocs, getCurrentUser } from '../api/employeeApi.js';

import './css/CompanyDocs.css';

// Helper to recursively get a flat array of all readable leaf document IDs
const getAllDocumentIds = (nodes) => {
    let ids = [];
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            ids.push(...getAllDocumentIds(node.children));
        } else {
            ids.push(node.id);
        }
    });
    return ids;
};

const CompanyDocs = () => {
    const navigate = useNavigate();
    
    const [selectedDocumentId, setSelectedDocumentId] = useState('section-1-about-nocapcode');
    const [expandedSectionIds, setExpandedSectionIds] = useState([]);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const [hasOpenedLongContent, setHasOpenedLongContent] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    
    // --- Synchronization States ---
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alreadyAcknowledgedDB, setAlreadyAcknowledgedDB] = useState(false);
    const [readDocs, setReadDocs] = useState([]);

    const allDocIds = useMemo(() => getAllDocumentIds(documentTree), []);

    const contentRef = useRef(null);
    const contentScrollRef = useRef(null);

    // 1. On Mount: Fetch User from DB to check if policyhandbook is already true
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await getCurrentUser();
                
                // FIXED: Bulletproof check across the entire payload response structure
                const isAcknowledged = 
                    res?.message?.policyhandbook === true || res?.message?.policyhandbook === "true" ||
                    res?.data?.policyhandbook === true || res?.data?.policyhandbook === "true" ||
                    res?.data?.user?.policyhandbook === true || res?.data?.user?.policyhandbook === "true" ||
                    res?.policyhandbook === true || res?.policyhandbook === "true";

                if (isAcknowledged) {
                    // If true in DB, mark EVERYTHING as read automatically
                    setAlreadyAcknowledgedDB(true);
                    setReadDocs(allDocIds);
                    localStorage.setItem('dox-read-docs', JSON.stringify(allDocIds)); // Ensure local cache mirrors DB
                } else {
                    // Otherwise, load incremental progress from local storage
                    const saved = localStorage.getItem('dox-read-docs');
                    if (saved) {
                        setReadDocs(JSON.parse(saved));
                    }
                }
            } catch (error) {
                console.error("Error fetching user status:", error);
                // Fallback to local storage on error
                const saved = localStorage.getItem('dox-read-docs');
                if (saved) setReadDocs(JSON.parse(saved));
            } finally {
                setIsCheckingStatus(false);
            }
        };

        fetchStatus();
    }, [allDocIds]);

    // 2. Save incremental progress to Local Storage
    useEffect(() => {
        if (!isCheckingStatus) {
            localStorage.setItem('dox-read-docs', JSON.stringify(readDocs));
        }
    }, [readDocs, isCheckingStatus]);

    const selectedDocument = useMemo(
        () => findDocumentNode(documentTree, selectedDocumentId),
        [selectedDocumentId]
    );

    // Derived states for validation
    const isCurrentDocRead = readDocs.includes(selectedDocumentId);
    const isAllRead = useMemo(() => {
        if (allDocIds.length === 0) return false;
        return allDocIds.every(id => readDocs.includes(id));
    }, [allDocIds, readDocs]);

    const handleSelect = (id) => {
        setSelectedDocumentId(id);
        setIsContentOverflowing(false);
        setHasOpenedLongContent(false);
        setIsExpanded(false);
        if (contentScrollRef.current) {
            contentScrollRef.current.scrollTop = 0;
        }

        // Auto-expand the parent folder in the sidebar
        const parent = documentTree.find(sec => sec.children?.some(child => child.id === id));
        if (parent) {
            setExpandedSectionIds([parent.id]);
        } else {
            setExpandedSectionIds([id]);
        }
    };

    const handleMarkAsRead = () => {
        // Enforce reading the full document if it's long
        if (isContentOverflowing && !hasOpenedLongContent) {
            toast.error('Please click Read More to review the full document.');
            return;
        }

        let updatedReadDocs = readDocs;

        // If not already read, add it to the tracking array
        if (!isCurrentDocRead) {
            updatedReadDocs = [...readDocs, selectedDocumentId];
            setReadDocs(updatedReadDocs);
            
            // Check if this was the last document needed
            const allCompleted = allDocIds.every(id => updatedReadDocs.includes(id));
            if (allCompleted && !alreadyAcknowledgedDB) {
                toast.success("All sections read! You can now click Continue below.", { duration: 4000 });
            }
        }

        // Auto-advance to the next unread document
        const nextUnreadId = allDocIds.find(id => !updatedReadDocs.includes(id));
        if (nextUnreadId) {
            handleSelect(nextUnreadId);
        }
    };

    // Final Action: Continue Button
    const handleFinalContinue = async () => {
        if (!isAllRead) {
            toast.error("Please read all sections and sub-sections before continuing.");
            return;
        }

        // If it was already true in the DB when they logged in, skip the API call and just navigate
        if (alreadyAcknowledgedDB) {
            navigate('/legal-agreements');
            return;
        }

        // Otherwise, send the POST request to mark it true in DB
        try {
            setIsSubmitting(true);
            await acknowledgeCompanyDocs({ acknowledge: true });
            toast.success("Company policies successfully acknowledged!");
            
            setAlreadyAcknowledgedDB(true);
            // FIXED: Do NOT remove the local storage cache anymore. Keep it intact!
            navigate('/legal-agreements');
        } catch (error) {
            toast.error(error.message || "Failed to submit acknowledgment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate overflow based on content height
    useEffect(() => {
        if (contentRef.current && contentScrollRef.current) {
            const isOver = contentRef.current.scrollHeight > 404;
            setIsContentOverflowing(isOver);
        }
    }, [selectedDocument]);

    // Show a loader while we verify their DB status to prevent flickering
    if (isCheckingStatus) {
        return (
            <div className="docs-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
                 <Loader message="Syncing document status..." />
            </div>
        );
    }

    return (
        <div className="docs-wrapper">
            
            {/* --- Mobile Top Navbar --- */}
            <div className="docs-mobile-nav">
                <div className="docs-mobile-nav-logo">
                    <DoxLogo width="50" />
                </div>
                <div className="docs-mobile-steps">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className={`docs-mobile-step ${n === 2 ? 'active' : 'inactive'}`}>
                            {n}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Desktop Sidebar Navigation --- */}
            <nav className="docs-sidebar">
                <div className="docs-sidebar-logo">
                    <DoxLogo width="45" />
                </div>
                <div className="docs-sidebar-steps">
                    <div className="docs-sidebar-step inactive">1</div>
                    <div className="docs-sidebar-step active">2</div>
                    <div className="docs-sidebar-step inactive">3</div>
                </div>
            </nav>

            {/* --- Main Content Area --- */}
            <main className="docs-main">
                <div className="docs-card">
                    
                    <div className="docs-header-container">
                        <h1 className="docs-h1">Company Docs</h1>
                        <p className="docs-subtitle">
                            Please review and understand our policies and culture
                        </p>
                    </div>

                    <div className="docs-grid">
                        
                        {/* --- Inner Sidebar Menu --- */}
                        <div className="docs-inner-nav">
                            <div className="docs-inner-nav-content">
                                {documentTree.map((section) => {
                                    const isSectionExpanded = expandedSectionIds.includes(section.id);
                                    
                                    // Verify if all sub-documents in this section are read
                                    const sectionChildIds = section.children ? section.children.map(c => c.id) : [section.id];
                                    const isFullyRead = sectionChildIds.every(id => readDocs.includes(id));

                                    return (
                                        <div key={section.id} className="docs-nav-group">
                                            <button 
                                                className={`docs-nav-group-title ${isSectionExpanded ? 'expanded' : ''}`}
                                                onClick={() => {
                                                    if (section.children?.length) {
                                                        // Accordion Logic: close others, open this
                                                        setExpandedSectionIds(prev => 
                                                            prev.includes(section.id) ? [] : [section.id]
                                                        );
                                                    } else {
                                                        handleSelect(section.id);
                                                    }
                                                }}
                                            >
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    {section.title} 
                                                    {isFullyRead && <CheckIcon width="14" stroke="#4ade80" />}
                                                </span>
                                                {section.children?.length ? (
                                                    <span className={`docs-nav-chevron ${isSectionExpanded ? 'open' : ''}`}>
                                                        <ChevronDownIcon />
                                                    </span>
                                                ) : null}
                                            </button>

                                            {/* Sub-items */}
                                            {section.children?.length > 0 && isSectionExpanded && (
                                                <div className="docs-nav-subitems">
                                                    {section.children.map((child) => (
                                                        <button
                                                            key={child.id}
                                                            className={`docs-nav-item ${selectedDocumentId === child.id ? 'active' : ''}`}
                                                            onClick={() => handleSelect(child.id)}
                                                        >
                                                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                                {child.title}
                                                                {readDocs.includes(child.id) && <CheckIcon width="12" stroke="#4ade80" />}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* --- Document Reading Area --- */}
                        <div className="docs-content-area">
                            <div className="docs-article-wrapper">
                                
                                <img 
                                    src="../../../CompanyDocs_BG.svg" 
                                    className="docs-watermark" 
                                    alt="watermark" 
                                    aria-hidden="true" 
                                />
                                
                                <div className="docs-article-header">
                                    <h2 className="docs-article-title">{selectedDocument.title}</h2>
                                    <span className="docs-read-time">
                                        <ClockIcon /> Est. reading time: 3 mins
                                    </span>
                                </div>

                                <div 
                                    className={`docs-scroll-area ${isExpanded ? 'expanded' : ''}`}
                                    ref={contentScrollRef}
                                >
                                    <div className="docs-article-content" ref={contentRef}>
                                        {renderContentWithBoldMarkers(selectedDocument.content || 'Content not found.')}
                                    </div>
                                </div>

                                {isContentOverflowing && !isExpanded && (
                                    <div className="docs-fade-overlay" />
                                )}

                                {isContentOverflowing && (
                                    <div className="docs-expand-toggle">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsExpanded(!isExpanded);
                                                setHasOpenedLongContent(true);
                                            }}
                                            className="docs-toggle-btn"
                                        >
                                            {isExpanded ? (
                                                <><span>Read Less</span> <ChevronUpIcon /></>
                                            ) : (
                                                <><span>Read More</span> <ChevronDownIcon /></>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* --- Confirmation Checkbox Box --- */}
                            <div className="docs-confirm-box">
                                <label className="docs-checkbox-label" style={{ cursor: 'not-allowed' }}>
                                    <div className={`docs-checkbox-box ${isCurrentDocRead ? 'checked' : ''}`}>
                                        <input
                                            type="checkbox"
                                            className="docs-hidden-checkbox"
                                            checked={isCurrentDocRead}
                                            disabled
                                            readOnly
                                        />
                                        {isCurrentDocRead && <CheckIcon />}
                                    </div>
                                    <span>I have read and understood this document.</span>
                                </label>

                                <button
                                    type="button"
                                    onClick={handleMarkAsRead}
                                    disabled={isCurrentDocRead}
                                    className="docs-mark-read-btn"
                                >
                                    <ReadIcon />
                                    {isCurrentDocRead ? 'Document Marked as Read' : 'Mark as Read & Continue'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- Bottom Navigation Buttons --- */}
                    <div className="docs-bottom-nav">
                        <button
                            type="button"
                            onClick={() => navigate('/welcome')}
                            className="docs-nav-btn"
                        >
                            <BackArrowIcon />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={handleFinalContinue}
                            disabled={!isAllRead || isSubmitting}
                            className={`docs-nav-btn docs-continue-btn ${isAllRead ? 'enabled' : 'disabled'}`}
                        >
                            {isSubmitting ? 'Saving...' : 'Continue'}
                            {!isSubmitting && <ForwardArrowIcon />}
                        </button>
                    </div>

                </div>
            </main>
            
            <HelpButton onClick={() => setHelpOpen(true)} />
            <HelpDrawer open={helpOpen} onClose={() => setHelpOpen(false)} page="companyDocs" />
        </div>
    );
};

/* --- Helpers --- */
const findDocumentNode = (items, targetId) => {
    const findMatch = (nodes, trail = []) => {
        for (const item of nodes) {
            const nextTrail = [...trail, item.title];
            if (item.id === targetId) return { ...item, pathLabel: nextTrail.join(' / ') };
            if (item.children?.length) {
                const nestedMatch = findMatch(item.children, nextTrail);
                if (nestedMatch) return nestedMatch;
            }
        }
        return null;
    };
    const match = findMatch(items);
    return match || { ...items[0], pathLabel: items[0].title };
};

const renderContentWithBoldMarkers = (text) => {
    if (!text) return null;
    const markerRegex = /§b§([\s\S]*?)§\/b§/g;
    const renderedParts = [];
    let lastIndex = 0;
    let match;

    while ((match = markerRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            renderedParts.push(text.slice(lastIndex, match.index));
        }
        renderedParts.push(
            <strong key={`bold-${match.index}`} style={{ fontWeight: 600, color: '#FFFFFF' }}>
                {match[1]}
            </strong>
        );
        lastIndex = markerRegex.lastIndex;
    }
    if (lastIndex < text.length) {
        renderedParts.push(text.slice(lastIndex));
    }
    return renderedParts.map((part, index) =>
        typeof part === 'string' ? <span key={`text-${index}`}>{part}</span> : part
    );
};

/* --- Icons --- */
const CheckIcon = ({ width = "10", stroke = "#FFFFFF" }) => (
    <svg width={width} height={width === "10" ? "8" : width} viewBox="0 0 10 8" fill="none" style={{ flexShrink: 0 }}>
        <path d="M1 4L3.5 6.5L9 1" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 3V6L8 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ReadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M6 9.25L8 11.2L12 6.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12 10L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BackArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ForwardArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const DoxLogo = ({ width = '50' }) => (
    <svg width={width} viewBox="0 0 339 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.7 3C46.7 3 56 9 62.1 17.5C68.1 25.8 71.2 36.7 71.5 47.3C71.8 57.9 69.3 68.8 63.3 77.4C57.2 86.1 47.6 92 34.7 92H3C2.9 91.9 2.9 85.9 3 80H34.7C43.4 80 49.5 76.2 53.5 70.5C57.6 64.6 59.7 56.3 59.5 47.6C59.3 39 56.7 30.6 52.3 24.5C48.1 18.6 42.2 15 34.7 15H4V3H34.7ZM159.8 3C171.8 3 181.1 9 187.2 17.5C193.2 25.8 196.3 36.7 196.6 47.3C196.9 57.9 194.4 68.8 188.4 77.4C182.3 86.1 172.7 92 159.8 92H120.4C107.5 92 97.9 86.1 91.8 77.4C85.8 68.8 83.3 57.9 83.6 47.3C83.9 36.7 87 25.8 93 17.5C99.1 9 108.4 3 120.4 3H159.8ZM241.7 3C253.6 3 262.9 9 269 17.5C270.3 19.2 271.4 21.1 272.5 23.1C273.5 21.1 274.6 19.2 275.9 17.5C282 9 291.3 3 303.2 3H334V15H303.2C295.8 15 289.9 18.6 285.6 24.5C281.3 30.6 278.7 39 278.5 47.6C278.2 56.3 280.3 64.6 284.5 70.5C288.5 76.2 294.5 80 303.2 80H335C335 85.9 335 91.9 335 92H303.2C290.4 92 280.8 86.1 274.7 77.4C273.9 76.2 273.1 75 272.5 73.8C271.8 75 271 76.2 270.2 77.4C264.1 86.1 254.5 92 241.7 92H209.9C209.9 91.9 209.9 85.9 209.9 80H241.7C250.4 80 256.4 76.2 260.4 70.5C264.6 64.6 266.7 56.3 266.4 47.6C266.2 39 263.6 30.6 259.3 24.5C255 18.6 249.1 15 241.7 15H210.9V3H241.7ZM120.4 15C112.9 15 107 18.6 102.7 24.5C98.4 30.6 95.8 39 95.6 47.6C95.4 56.3 97.5 64.6 101.6 70.5C105.6 76.2 111.7 80 120.4 80H159.8C168.6 80 174.6 76.2 178.6 70.5C182.8 64.6 184.9 56.3 184.6 47.6C184.4 39 181.8 30.6 177.5 24.5C173.2 18.6 167.3 15 159.8 15H120.4Z" fill="#FFFFFF" />
    </svg>
);

export default CompanyDocs;