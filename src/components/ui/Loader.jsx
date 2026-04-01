/**
 * Loader — reusable loading spinner component
 */
const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
        : 'flex items-center justify-center'

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center justify-center gap-4">
                {/* Spinner */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-400 border-r-gray-400 animate-spin" />
                </div>

                {/* Loading text */}
                {message && (
                    <p className="text-white text-sm font-medium animate-pulse">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Loader
