import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

// Elegant fine-line SVG custom icons
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const PinterestIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M12 2a10 10 0 0 0-3.3 19.4c-.1-.9-.1-2.1.2-3.1l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5.1 0-2.1-1.4-3.7-4.1-3.7-3 0-4.9 2.2-4.9 4.8 0 .9.3 1.6.7 2.1a.4.4 0 0 1 .1.4c-.1.3-.2.9-.3 1.1-.1.2-.2.3-.4.2-1.3-.5-1.9-2-1.9-3.7 0-2.8 2.4-6.2 7-6.2 3.7 0 6.1 2.7 6.1 5.5 0 3.8-2.1 6.6-5.2 6.6-1 0-2-.6-2.3-1.2l-.6 2.5c-.2.9-.7 1.8-1.1 2.4A10 10 0 1 0 12 2z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

// A premium editorial Journal/Book icon representing curated reading/insights
const JournalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const DEFAULT_SOCIALS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <InstagramIcon />,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: <PinterestIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <LinkedInIcon />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: <YouTubeIcon />,
  },
  {
    name: "Journal",
    href: "/journal",
    icon: <JournalIcon />,
  },
];

export default function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {DEFAULT_SOCIALS.map((social) => (
        <motion.a
          key={social.name}
          href={social.href}
          target={social.href.startsWith("http") ? "_blank" : undefined}
          rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group relative flex items-center justify-center p-2 rounded-full text-[#8C8273] hover:text-[#EAE5D9] transition-colors duration-300"
          aria-label={`Follow us on ${social.name}`}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {/* Subtle outline expansion ring on hover */}
          <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#EAE5D9]/20 group-hover:scale-125 transition-all duration-500 ease-out" />
          
          <div className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-105", iconClassName)}>
            {social.icon}
          </div>
          
          {/* Screen reader label */}
          <span className="sr-only">{social.name}</span>
        </motion.a>
      ))}
    </div>
  );
}
