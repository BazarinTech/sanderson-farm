"use client"

import { useEffect, useRef, useState } from "react"
import { VolumeHighIcon, VolumeOffIcon } from "hugeicons-react"

export function VideoHero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Try to “warm” the video as soon as component mounts
    const v = videoRef.current
    if (!v) return

    // Ensure attributes are applied early
    v.muted = true
    v.playsInline = true
    v.preload = "auto"

    // Attempt play; some browsers will delay until enough buffer
    const p = v.play()
    if (p && typeof p.catch === "function") p.catch(() => {})
  }, [])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  return (
    <div
      className="relative w-full aspect-video max-h-[300px] overflow-hidden rounded-xl cursor-pointer group"
      onClick={toggleMute}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="https://grover.xgramm.com/admin/uploads/grover.webm" type="video/webm" />
        <source src="https://grover.xgramm.com/admin/uploads/grover.fast.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />

      <div className="absolute bottom-4 right-4 bg-foreground/20 backdrop-blur-sm p-2 rounded-full transition-all group-hover:bg-foreground/40">
        {isMuted ? (
          <VolumeOffIcon className="w-5 h-5 text-primary-foreground" />
        ) : (
          <VolumeHighIcon className="w-5 h-5 text-primary-foreground" />
        )}
      </div>

      <div className="absolute top-4 right-4 bg-foreground/20 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-primary-foreground text-xs">
          Tap to {isMuted ? "unmute" : "mute"}
        </span>
      </div>
    </div>
  )
}
