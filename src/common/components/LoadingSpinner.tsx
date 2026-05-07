type LoadingSpinnerProps = {
    size?: 'sm' | 'md' | 'lg';
    fullPage?: boolean;
};

export default function LoadingSpinner({ size = 'md', fullPage = false }: LoadingSpinnerProps) {
    const sizeClass = {
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
    }[size];

    if (fullPage) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className={`loading loading-spinner ${sizeClass}`}></span>
            </div>
        );
    }

    return <span className={`loading loading-spinner ${sizeClass}`}></span>;
}
