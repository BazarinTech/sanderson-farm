"use client"

import { useEffect, useRef, useState } from "react"
import { VolumeHighIcon, VolumeOffIcon, Loading03Icon } from "hugeicons-react"

export function VideoHero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted = true
    v.playsInline = true
    v.preload = "auto"

    const p = v.play()
    if (p && typeof p.catch === "function") p.catch(() => {})
  }, [])

  const handleCanPlay = () => {
    setIsLoaded(true)
  }

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
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10">
          <Loading03Icon className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        onCanPlay={handleCanPlay}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <source src="https://grover.xgramm.com/admin/uploads/grover.hero.webm" type="video/webm" />
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
