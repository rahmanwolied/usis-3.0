import { Icons } from '@/components/shared/icons';

interface IconProps {
    fill?: string;
    viewBox?: string;
    className?: string;
    style?: React.CSSProperties;
}

interface Social {
    name: string;
    href: string;
    icon: (props: IconProps) => JSX.Element;
}

export const socials: Social[] = [
    {
        name: 'Facebook',
        href: '#',
        icon: Icons.facebook,
    },
    {
        name: 'Instagram',
        href: '#',
        icon: Icons.instagram,
    },
    {
        name: 'Twitter',
        href: '#',
        icon: Icons.x,
    },
    {
        name: 'GitHub',
        href: '#',
        icon: Icons.github,
    },
    {
        name: 'YouTube',
        href: '#',
        icon: Icons.youtube,
    },
];
