import { Marquee } from "@/components/ui/marquee"
import Image from "next/image"

type LogoItem = {
    id: string
    src: string
    href: string
    alt?: string
    className?: string
}

const logos: LogoItem[] = [
    {
        id: "tailwindcss",
        src: "/assets/logos/tailwind.svg",
        href: "https://tailwindcss.com",
        alt: "Tailwind CSS",
        className: "h-16 w-auto dark:invert",
    },
    {
        id: "nextjs",
        src: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
        href: "https://nextjs.org",
        alt: "Next.js",
        className: "h-16 w-auto dark:invert",
    },
    {
        id: "figma",
        src: "/assets/logos/Figma.svg",
        href: "https://www.figma.com/",
        alt: "Figma",
        className: "h-16 w-auto",
    },
    {
        id: "aws",
        src: "/assets/logos/AWS.svg",
        href: "https://aws.amazon.com",
        alt: "AWS",
        className: "h-16 w-auto dark:invert dark:brightness-0 dark:contrast-200",
    },
    {
        id: "react",
        src: "/assets/logos/React.svg",
        href: "https://reactjs.org",
        alt: "React",
        className: "h-16 w-auto",
    },
    {
        id: "typescript",
        src: "/assets/logos/TypeScript.svg",
        href: "https://www.typescriptlang.org",
        alt: "TypeScript",
        className: "h-16 w-auto",
    },
    {
        id: "wordpress",
        src: "/assets/logos/WordPress.svg",
        href: "https://wordpress.org",
        alt: "WordPress",
        className: "h-16 w-auto",
    }
]

export function MarqueeDemo() {
    return (
        <Marquee className="py-8">
            {logos.map((logo) => (
                <a
                    key={logo.id}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mx-16 flex h-20 items-center justify-center transition-opacity hover:opacity-80"
                >
                    <Image
                        src={logo.src}
                        alt={logo.alt ?? logo.id}
                        className={logo.className ?? "h-16 w-auto"}
                        width={200}
                        height={64}
                        style={{ objectFit: 'contain' }}
                    />
                </a>
            ))}
        </Marquee>
    )
}
