export default function HUD() {
  return (
    <div 
      style={{ position: 'fixed' }}
      className="fixed inset-0 pointer-events-none z-20 hidden md:block"
    >
      {/* Center Grid Elements */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-5">
         <div className="w-[90vw] h-[90vh] border border-white/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
