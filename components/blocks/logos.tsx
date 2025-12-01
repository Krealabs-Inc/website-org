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
        className: "h-[28px] sm:w-auto w-[140px]",
    },
    {
        id: "nextjs",
        src: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
        href: "https://nextjs.org",
        alt: "Next.js",
        className: "h-[20px] fill-gray-900 dark:fill-white",
    },
    {
        id: "framer",
        src: "/assets/logos/framer.svg",
        href: "https://www.framer.com/motion/",
        alt: "Framer Motion",
        className: "h-[30px]",
    },
    {
        id: "aws",
        src: "/assets/logos/aws.svg",
        href: "https://aws.amazon.com",
        alt: "AWS",
        className: "h-[40px]",
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
                    className="relative h-full w-fit mx-[4rem] flex items-center justify-start transition-opacity hover:opacity-80"
                >
                    <Image
                        src={logo.src}
                        alt={logo.alt ?? logo.id}
                        className={logo.className ?? "h-[30px]"}
                        width={100}
                        height={100}
                    />
                </a>
            ))}
        </Marquee>
    )
}
