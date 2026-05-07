'use client';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | '...')[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, '...', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    return (
        <div className="flex justify-center items-center gap-1 mt-8">
            <button
                className="btn btn-sm btn-ghost"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </button>

            {getPageNumbers().map((page, index) =>
                page === '...' ? (
                    <span key={`dots-${index}`} className="px-2">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`btn btn-sm ${currentPage === page ? 'btn-active' : 'btn-ghost'}`}
                        onClick={() => {
                            if (typeof page === 'number') {
                                onPageChange(page);
                            }
                        }}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                className="btn btn-sm btn-ghost"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
}
