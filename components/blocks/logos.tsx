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
        src: "/assets/logos/Tailwind-CSS.svg",
        href: "https://tailwindcss.com",
        alt: "Tailwind CSS",
        className: "h-[80px] sm:h-[96px] w-auto",
    },
    {
        id: "nextjs",
        src: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
        href: "https://nextjs.org",
        alt: "Next.js",
        className: "h-[40px] sm:h-[48px] dark:invert",
    },
    {
        id: "figma",
        src: "/assets/logos/Figma.svg",
        href: "https://www.figma.com/",
        alt: "Figma",
        className: "h-[48px] sm:h-[56px]",
    },
    {
        id: "aws",
        src: "/assets/logos/AWS.svg",
        href: "https://aws.amazon.com",
        alt: "AWS",
        className: "h-[56px] sm:h-[64px] dark:invert dark:brightness-0 dark:contrast-200",
    },
]

export function MarqueeDemo() {
    return (
        <Marquee>
            {logos.map((logo) => (
                <a
                    key={logo.id}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-full w-fit mx-16 flex items-center justify-start transition-opacity hover:opacity-80"
                >
                    <Image
                        src={logo.src}
                        alt={logo.alt ?? logo.id}
                        className={logo.className ?? "h-[48px] sm:h-[56px]"}
                        width={500}
                        height={500}
                    />
                </a>
            ))}
        </Marquee>
    )
}
