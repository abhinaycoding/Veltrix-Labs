export default function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center pointer-events-none select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 480"
        className="w-full h-full object-contain"
      >
        <rect width="600" height="480" fill="transparent" />
        
        {/* Plant Background */}
        <g transform="translate(340, 150)">
          <path d="M60 200 C40 150 10 120 0 90 C30 110 50 150 60 200Z" fill="#889c8a" />
          <path d="M70 200 C90 140 120 100 130 60 C90 90 75 140 70 200Z" fill="#889c8a" />
          <path d="M65 200 C65 100 90 50 110 10 C70 50 60 120 65 200Z" fill="#a4b8a7" />
          <path d="M55 200 C50 130 20 80 0 40 C30 80 45 140 55 200Z" fill="#a4b8a7" />
          {/* Subtle stems/details */}
          <path d="M60 200 L10 90" stroke="#718673" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 200 L110 10" stroke="#718673" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Chair Back */}
        <path d="M80 200 C80 160 100 140 150 140 L280 140 C330 140 350 160 350 200 L350 400 L80 400 Z" fill="#2d1c24" rx="20" />

        {/* Character Base / Shirt */}
        <g transform="translate(100, 140)">
          <path d="M120 60 C90 60 60 90 50 140 L20 280 L250 280 L210 140 C200 90 170 60 140 60 Z" fill="#5b4b55" />
          {/* Shirt Details/Folds */}
          <path d="M130 60 L130 280" stroke="#3b2b35" strokeWidth="2" />
          <path d="M50 140 L100 240" stroke="#3b2b35" strokeWidth="1" fill="none" />
          <path d="M210 140 L160 240" stroke="#3b2b35" strokeWidth="1" fill="none" />
          {/* Collar */}
          <path d="M100 60 L130 140 L160 60 Z" fill="#5b4b55" stroke="#3b2b35" strokeWidth="2" />
          {/* Undershirt visible at neck */}
          <polygon points="115,60 145,60 130,100" fill="#ded4d1" />
        </g>
        
        {/* Neck & Head */}
        <g transform="translate(180, 70)">
          <path d="M55 70 L55 120 C55 140 75 140 75 120 L75 70 Z" fill="#fdb896" />
          <path d="M30 40 C30 10 90 10 90 40 C90 70 80 90 60 90 C40 90 30 70 30 40 Z" fill="#fdb896" />
          {/* Ear left */}
          <circle cx="25" cy="45" r="8" fill="#fdb896" />
          {/* Ear right */}
          <circle cx="95" cy="40" r="8" fill="#fdb896" />
          
          {/* Hair */}
          <path d="M25 40 C20 10 50 -10 80 10 C100 20 100 40 95 50 C90 60 95 30 80 15 C60 0 35 20 30 40 Z" fill="#2d1c24" />
          <path d="M20 30 C10 15 30 0 50 5 Z" fill="#2d1c24" />
          <path d="M85 10 C95 5 110 20 100 35 Z" fill="#2d1c24" />
          
          {/* Face Details */}
          <path d="M45 40 Q55 35 60 40" stroke="#2d1c24" strokeWidth="2" fill="none" />
          <path d="M70 40 Q80 35 85 40" stroke="#2d1c24" strokeWidth="2" fill="none" />
          <circle cx="50" cy="48" r="3" fill="#2d1c24" />
          <circle cx="75" cy="48" r="3" fill="#2d1c24" />
          {/* Nose */}
          <path d="M62 48 L65 65 L60 65" stroke="#d58670" strokeWidth="2" fill="none" strokeLinejoin="round" />
          {/* Smile */}
          <path d="M55 75 Q65 82 75 72" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M55 75 Q65 82 75 72" stroke="#d58670" strokeWidth="1" fill="none" />
          {/* Blush */}
          <ellipse cx="40" cy="62" rx="6" ry="4" fill="#f58f70" opacity="0.4" />
          <ellipse cx="85" cy="58" rx="6" ry="4" fill="#f58f70" opacity="0.4" />
        </g>

        {/* Arms & Hands */}
        <g transform="translate(130, 280)">
          {/* Left Arm & Hand resting */}
          <path d="M0 40 C0 80 50 120 100 120 C140 120 170 110 170 80 C170 60 130 50 100 50 C60 50 60 30 60 0 Z" fill="#fdb896" />
          {/* Pen / Stylus */}
          <path d="M60 40 L90 80 M58 38 L92 82" stroke="#2d1c24" strokeWidth="8" strokeLinecap="round" />
          <circle cx="57" cy="37" r="4" fill="white" />
          {/* Simple finger lines */}
          <path d="M120 80 Q140 100 150 110" stroke="#d58670" strokeWidth="2" fill="none" />
          <path d="M130 75 Q150 90 160 100" stroke="#d58670" strokeWidth="2" fill="none" />
          <path d="M145 70 Q160 80 165 90" stroke="#d58670" strokeWidth="2" fill="none" />
        </g>

        {/* Laptop */}
        <g transform="translate(230, 240)">
          <path d="M30 0 L180 0 C190 0 195 10 190 30 L160 140 C155 155 150 160 140 160 L-10 160 C-20 160 -25 155 -20 140 L10 30 C15 10 20 0 30 0 Z" fill="#e8dcd9" />
          {/* Laptop Base Lip */}
          <path d="M-30 160 L160 160 C165 160 165 165 160 165 L-35 165 C-40 165 -40 160 -30 160 Z" fill="#d2c5bf" />
          {/* Apple / Logo */}
          <circle cx="85" cy="80" r="8" fill="#d2c5bf" />
        </g>

        {/* Floating Badges */}
        <g transform="translate(300, 50)">
          {/* Yellow Badge */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="50" height="50" rx="10" fill="#f3bc5b" transform="rotate(-5)" />
            <path d="M15 25 L25 35 L40 15" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-5)" />
          </g>
          
          {/* Purple/Grey Badge */}
          <g transform="translate(80, 10)">
            <rect x="0" y="0" width="45" height="45" rx="8" fill="#bcaba6" transform="rotate(15)" />
            <path d="M12 25 L20 32 L35 15" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(15)" />
          </g>

          {/* Green Badge */}
          <g transform="translate(30, 80)">
            <rect x="0" y="0" width="45" height="45" rx="8" fill="#69a595" transform="rotate(10)" />
            {/* Outline */}
            <rect x="-4" y="-4" width="53" height="53" rx="12" fill="none" stroke="white" strokeWidth="2" transform="rotate(10)" />
            <path d="M10 25 L20 32 L35 15" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(10)" />
          </g>
          
          {/* Small Pink Badge */}
          <g transform="translate(-15, 60)">
            <rect x="0" y="0" width="30" height="30" rx="6" fill="#e4cec7" transform="rotate(-15)" />
            <path d="M8 15 L14 20 L22 10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-15)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
