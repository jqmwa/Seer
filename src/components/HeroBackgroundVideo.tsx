import React, { useEffect, useRef, useState } from 'react'

export interface HeroVideoClip {
  id: 'politics' | 'tennis' | 'rocket' | 'fortune-teller'
  label: string
  localSrc: string
  fallbackSrc: string
}

export const HERO_VIDEO_CLIPS: HeroVideoClip[] = [
  {
    id: 'politics',
    label: 'Global Politics Summit',
    localSrc: '/videos/politics.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/23166/23166-720.mp4',
  },
  {
    id: 'tennis',
    label: 'Championship Tennis Match',
    localSrc: '/videos/tennis.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/869/869-720.mp4',
  },
  {
    id: 'rocket',
    label: 'Space Rocket Launch',
    localSrc: '/videos/rocket.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/45230/45230-720.mp4',
  },
  {
    id: 'fortune-teller',
    label: 'Fortune Teller & Crystal Orb',
    localSrc: '/videos/fortune-teller.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/48896/48896-720.mp4',
  },
]

interface HeroBackgroundVideoProps {
  isLight?: boolean
  intervalMs?: number
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  isLight = false,
  intervalMs = 5500,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [grainDataUrl, setGrainDataUrl] = useState<string>('')
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  // Generate a fine, seamless organic film-grain texture once (no dots or grid)
  useEffect(() => {
    const size = 160
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.createImageData(size, size)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const shade = Math.floor(Math.random() * 255)
      data[i] = shade
      data[i + 1] = shade
      data[i + 2] = shade
      data[i + 3] = 28 // Subtle organic film grain alpha
    }
    ctx.putImageData(imageData, 0, 0)
    setGrainDataUrl(canvas.toDataURL('image/png'))
  }, [])

  // Cycle through the 4 clips on a steady interval
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_VIDEO_CLIPS.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs])

  // Ensure the newly active video plays from the beginning smoothly
  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex]
    if (activeVideo) {
      try {
        activeVideo.currentTime = 0
        const playPromise = activeVideo.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay fallback if browser blocks initial play
          })
        }
      } catch {
        // Ignore seek errors before metadata is loaded
      }
    }
  }, [activeIndex])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {HERO_VIDEO_CLIPS.map((clip, idx) => {
        const isActive = idx === activeIndex
        return (
          <video
            key={clip.id}
            ref={(el) => {
              videoRefs.current[idx] = el
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-[0.15]' : 'opacity-0'
            }`}
            style={{
              filter: isLight
                ? 'saturate(0.85) contrast(1.05)'
                : 'saturate(0.9) contrast(1.08)',
            }}
          >
            <source src={clip.localSrc} type="video/mp4" />
            <source src={clip.fallbackSrc} type="video/mp4" />
          </video>
        )
      })}

      {/* Organic Film-Grain & Frosted Matte Texture Layered on Top of Video (No Dots) */}
      {grainDataUrl && (
        <div
          className="absolute inset-0 z-10 backdrop-blur-[1px]"
          style={{
            backgroundImage: `url(${grainDataUrl})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '160px 160px',
            mixBlendMode: isLight ? 'multiply' : 'overlay',
            opacity: isLight ? 0.55 : 0.75,
          }}
        />
      )}

      {/* Soft radial & edge vignette so center typography and floating nodes remain crisp */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 50% 50%, rgba(233, 233, 245, 0.22) 0%, rgba(233, 233, 245, 0.64) 72%, rgba(233, 233, 245, 0.9) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(16, 16, 19, 0.18) 0%, rgba(16, 16, 19, 0.58) 72%, rgba(16, 16, 19, 0.92) 100%)',
        }}
      />
    </div>
  )
}

export default HeroBackgroundVideo
