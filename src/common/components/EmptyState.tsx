type EmptyStateProps = {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
};

export default function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-4xl">📭</p>

            <h3 className="text-xl font-bold text-base-content">{title}</h3>

            {description && <p className="text-base-content/60 max-w-sm">{description}</p>}

            {actionLabel && onAction && (
                <button onClick={onAction} className="btn btn-primary mt-2">
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
