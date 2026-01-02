export function CrownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 16L3 10L8 8L12 2L16 8L21 10L19 16H5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#crownGradient)"
      />
      <defs>
        <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF6347" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 18L22 12L16 6M8 6L2 12L8 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4L11 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SpiderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
      <path
        d="M12 7V2M12 18V13M7 10H2M22 10H17M9.5 6.5L6 3M14.5 6.5L18 3M9.5 13.5L6 17M14.5 13.5L18 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function WebIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M2 12H22M12 2C15.31 2 18 4.69 18 8C18 11.31 15.31 14 12 14C8.69 14 6 11.31 6 8C6 4.69 8.69 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export function DurkaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      <path
        d="M8 14C8 14 10 16 12 16C14 16 16 14 16 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

