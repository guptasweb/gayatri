import { useEffect, useRef } from 'react'
import './SlipOpening.css'

const SlipOpening = ({ word, onComplete }) => {
  const scrollContentRef = useRef(null)

  useEffect(() => {
    if (!word) return

    const { sanskrit, english, meaning, symbol } = word

    // Populate scroll content
    if (scrollContentRef.current) {
      scrollContentRef.current.innerHTML = `
        <div class="scroll-symbol">${symbol}</div>
        <div class="scroll-word-sanskrit">${sanskrit}</div>
        <div class="scroll-word-english">${english}</div>
        <div class="scroll-word-meaning">"${meaning}"</div>
      `
    }

    // After 3.5 seconds, show meaning
    const timer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(timer)
    }
  }, [word, onComplete])

  return (
    <div id="opening-screen">
      <div className="scroll-container">
        <div className="scroll-wrapper">
          <div className="scroll-ribbon"></div>
          <div className="scroll-rod-top"></div>
          <div className="scroll-top-roll"></div>
          <div className="scroll-paper">
            <div className="scroll-content" id="scrollContent" ref={scrollContentRef}>
            </div>
          </div>
          <div className="scroll-bottom-roll"></div>
          <div className="scroll-rod-bottom"></div>
        </div>
      </div>
      <div className="unfold-particles" id="unfoldParticles"></div>
    </div>
  )
}

export default SlipOpening
