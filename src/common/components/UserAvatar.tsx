type UserAvatarProps = {
    name?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
};

export default function UserAvatar({ name = '?', size = 'md' }: UserAvatarProps) {
    const sizeClass = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-16 h-16 text-xl',
    }[size];

    const initial = name.charAt(0).toUpperCase();

    return (
        <div
            className={`${sizeClass} rounded-full bg-primary text-primary-content flex items-center justify-center font-bold select-none`}
        >
            {initial}
        </div>
    );
}
