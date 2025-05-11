import type { HTMLAttributes } from "react"

interface LogoProps extends HTMLAttributes<SVGElement> {}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="18" height="18" x="2" y="2" rx="2" className="fill-primary" />
      <rect width="18" height="18" x="20" y="2" rx="2" className="fill-primary/80" />
      <rect width="18" height="18" x="2" y="20" rx="2" className="fill-primary/60" />
      <rect width="18" height="18" x="20" y="20" rx="2" className="fill-primary/40" />
    </svg>
  )
}
