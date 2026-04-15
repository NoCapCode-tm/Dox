const Sidebar = ({
    items,
    activeDocumentId,
    expandedSectionIds,
    onSectionSelect,
    onDocumentSelect,
}) => {
    return (
        <div className="space-y-2">
            {items.map((item) => {
                const isExpanded = expandedSectionIds.includes(item.id)
                const isActive = activeDocumentId === item.id

                return (
                    <div key={item.id} className="space-y-1">
                        <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() => onSectionSelect(item.id, Boolean(item.children?.length))}
                            className="flex w-full items-start rounded-lg border border-transparent text-left transition-colors hover:bg-white/6"
                            style={{
                                backgroundColor: isActive ? 'rgba(255,255,255,0.78)' : 'transparent',
                                color: isActive ? '#15213A' : 'rgba(255,255,255,0.88)',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                fontSize: '14px',
                                lineHeight: '20px',
                                fontWeight: 400,
                            }}
                        >
                            <span className="flex min-w-0 flex-1 items-start gap-2">
                                <span className="block min-w-0 flex-1 whitespace-normal wrap-break-word">{item.title}</span>
                                {item.children?.length ? (
                                    <ChevronIcon rotated={isExpanded} active={isActive} />
                                ) : null}
                            </span>
                        </button>

                        {isExpanded && item.children?.length ? (
                            <div className="space-y-1 pl-5">
                                {item.children.map((child) => {
                                    const isChildActive = activeDocumentId === child.id

                                    return (
                                        <button
                                            key={child.id}
                                            type="button"
                                            onClick={() => onDocumentSelect(child.id, item.id)}
                                            className="flex w-full items-start rounded-lg border border-transparent text-left transition-colors hover:bg-white/6"
                                            style={{
                                                backgroundColor: isChildActive ? 'rgba(255,255,255,0.72)' : 'transparent',
                                                color: isChildActive ? '#15213A' : 'rgba(255,255,255,0.8)',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                                paddingLeft: '12px',
                                                paddingRight: '12px',
                                                fontSize: '13px',
                                                lineHeight: '18px',
                                                fontWeight: 400,
                                            }}
                                        >
                                            <span className="block min-w-0 flex-1 whitespace-normal wrap-break-word">
                                                {child.title}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

const ChevronIcon = ({ rotated, active }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        style={{
            flexShrink: 0,
            marginTop: '3px',
            transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: active ? '#15213A' : 'rgba(255,255,255,0.75)',
        }}
    >
        <path d="M3.2 5.2L7 9L10.8 5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default Sidebar
