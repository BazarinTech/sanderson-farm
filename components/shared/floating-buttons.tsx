import { Message01Icon, ArrowUp01Icon } from "hugeicons-react"

export function FloatingButtons() {
  return (
    <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
      <button className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
        <Message01Icon className="w-6 h-6 text-accent-foreground" />
      </button>
      <div className="text-xs text-accent font-medium text-center">Manager</div>

      <button className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
        <Message01Icon className="w-6 h-6 text-accent-foreground" />
      </button>
      <div className="text-xs text-accent font-medium text-center">Community</div>

      <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform mt-2">
        <ArrowUp01Icon className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  )
}
