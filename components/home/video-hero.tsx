"use client"

import { useState, useRef } from "react"
import { VolumeHighIcon, VolumeOffIcon } from "hugeicons-react"

export function VideoHero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className="relative w-full aspect-video max-h-75 overflow-hidden rounded-xl cursor-pointer group"
      onClick={toggleMute}
    >
      <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source
          src="https://grover.xgramm.com/admin/uploads//grover.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay with branding */}
      <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />

      {/* <div className="absolute bottom-4 left-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">BD</span>
        </div>
        <div>
          <h1 className="text-primary-foreground font-bold text-xl">Bean Drivin</h1>
          <p className="text-primary-foreground/80 text-sm">Ltd</p>
        </div>
      </div> */}

      {/* Sound indicator */}
      <div className="absolute bottom-4 right-4 bg-foreground/20 backdrop-blur-sm p-2 rounded-full transition-all group-hover:bg-foreground/40">
        {isMuted ? (
          <VolumeOffIcon className="w-5 h-5 text-primary-foreground" />
        ) : (
          <VolumeHighIcon className="w-5 h-5 text-primary-foreground" />
        )}
      </div>

      {/* Tap hint */}
      <div className="absolute top-4 right-4 bg-foreground/20 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-primary-foreground text-xs">Tap to {isMuted ? "unmute" : "mute"}</span>
      </div>
    </div>
  )
}
