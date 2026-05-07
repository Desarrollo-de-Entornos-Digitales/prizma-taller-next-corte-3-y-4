'use client';

type StarRatingProps = {
    value: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
};

export default function StarRating({ value, onChange, readOnly = false, size = 'md' }: StarRatingProps) {
    const sizeClass = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
    }[size];

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= value;

                return (
                    <span
                        key={star}
                        className={`${sizeClass} ${isActive ? 'text-warning' : 'text-base-content/30'} ${
                            !readOnly ? 'cursor-pointer hover:text-warning transition-colors' : ''
                        }`}
                        onClick={() => {
                            if (!readOnly && onChange) {
                                onChange(star);
                            }
                        }}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}
