import { useState, useRef, useEffect } from 'react'
import omAudio from '../assets/om.mp3'
import './AudioPlayer.css'

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true) // Start muted to allow autoplay
  const audioRef = useRef(null)

  useEffect(() => {
    const startAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3
        audioRef.current.loop = true
        audioRef.current.muted = true // Start muted for autoplay
        setIsMuted(true)
        
        try {
          // Try to play muted (browsers allow muted autoplay)
          await audioRef.current.play()
          
          // Try to unmute after a short delay
          setTimeout(() => {
            if (audioRef.current && audioRef.current.muted) {
              try {
                audioRef.current.muted = false
                setIsMuted(false)
              } catch (err) {
                // If unmuting fails, set up user interaction handler
                const handleUserInteraction = () => {
                  if (audioRef.current) {
                    audioRef.current.muted = false
                    setIsMuted(false)
                  }
                  document.removeEventListener('click', handleUserInteraction)
                  document.removeEventListener('touchstart', handleUserInteraction)
                }
                
                document.addEventListener('click', handleUserInteraction, { once: true })
                document.addEventListener('touchstart', handleUserInteraction, { once: true })
              }
            }
          }, 500)
        } catch (error) {
          console.log('Audio autoplay failed, will start on user interaction:', error)
          // If autoplay fails completely, wait for user interaction
          const handleUserInteraction = async () => {
            try {
              if (audioRef.current) {
                audioRef.current.muted = false
                await audioRef.current.play()
                setIsMuted(false)
              }
            } catch (err) {
              console.log('Audio play failed:', err)
            }
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
          }
          
          document.addEventListener('click', handleUserInteraction, { once: true })
          document.addEventListener('touchstart', handleUserInteraction, { once: true })
        }
      }
    }

    startAudio()
  }, [])

  useEffect(() => {
    // If audio is still muted, try to unmute on any user interaction
    if (isMuted && audioRef.current) {
      const handleInteraction = () => {
        if (audioRef.current && audioRef.current.muted) {
          audioRef.current.muted = false
          setIsMuted(false)
        }
        document.removeEventListener('click', handleInteraction)
        document.removeEventListener('touchstart', handleInteraction)
      }
      
      document.addEventListener('click', handleInteraction, { once: true })
      document.addEventListener('touchstart', handleInteraction, { once: true })
      
      return () => {
        document.removeEventListener('click', handleInteraction)
        document.removeEventListener('touchstart', handleInteraction)
      }
    }
  }, [isMuted])

  const toggleMute = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted
      audioRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={omAudio} />
      <button 
        className="audio-toggle-button" 
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
            <line x1="2" y1="2" x2="22" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C17.01 19.86 20 16.28 20 12C20 7.72 17.01 4.14 14 3.23Z" fill="white"/>
          </svg>
        )}
      </button>
    </div>
  )
}

export default AudioPlayer

