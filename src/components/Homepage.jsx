import { useState, useEffect, useRef } from 'react'
import './Homepage.css'

const Homepage = ({ onComplete }) => {
  const [showLine1, setShowLine1] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showLine3, setShowLine3] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)
  const particlesContainerRef = useRef(null)
  const omSymbolsContainerRef = useRef(null)

  useEffect(() => {
    // Create floating particles
    const container = particlesContainerRef.current
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 8 + 's'
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's'
      container.appendChild(particle)
    }

    // Animate mantra lines
    setTimeout(() => setShowLine1(true), 500)
    setTimeout(() => setShowLine2(true), 2000)
    setTimeout(() => setShowLine3(true), 3500)
    // Show meaning after mantra is fully displayed (5000ms = 3500ms + 1500ms delay)
    setTimeout(() => setShowMeaning(true), 5000)
  }, [])

  useEffect(() => {
    // Continuously create floating Om symbols
    const omContainer = omSymbolsContainerRef.current
    let omCount = 0
    const maxOms = 50 // Keep more Om symbols visible

    const createOm = () => {
      if (omCount >= maxOms) {
        // Remove oldest Om if we've reached max
        const firstOm = omContainer.firstChild
        if (firstOm) {
          omContainer.removeChild(firstOm)
        }
      } else {
        omCount++
      }

      const omSymbol = document.createElement('div')
      omSymbol.className = 'floating-om'
      omSymbol.textContent = 'ॐ'
      const drift = (Math.random() - 0.5) * 200 // Random horizontal drift
      omSymbol.style.left = Math.random() * 100 + '%'
      omSymbol.style.top = '100%' // Start from bottom
      omSymbol.style.fontSize = (Math.random() * 4 + 1.5) + 'rem'
      omSymbol.style.animationDuration = (Math.random() * 10 + 20) + 's'
      omSymbol.style.setProperty('--drift', drift)
      omContainer.appendChild(omSymbol)

      // Remove Om after animation completes
      setTimeout(() => {
        if (omSymbol.parentNode) {
          omSymbol.parentNode.removeChild(omSymbol)
          omCount--
        }
      }, parseFloat(omSymbol.style.animationDuration) * 1000)
    }

    // Create initial batch of Om symbols
    for (let i = 0; i < 40; i++) {
      setTimeout(() => createOm(), i * 300)
    }

    // Continuously create new Om symbols
    const omInterval = setInterval(() => {
      createOm()
    }, 600) // Create a new Om every 600ms

    return () => {
      clearInterval(omInterval)
    }
  }, [])

  const handleButtonClick = (e) => {
    e.stopPropagation()
    onComplete()
  }

  const handleVishwamitraClick = (e) => {
    e.stopPropagation()
    if (onComplete) {
      onComplete('vishwamitra')
    }
  }

  return (
    <div className="homepage">
      <div className="mandala mandala-1"></div>
      <div className="mandala mandala-2"></div>
      
      <div className="light-particles" ref={particlesContainerRef}></div>
      <div className="floating-om-symbols" ref={omSymbolsContainerRef}></div>
      
      <div className="om-symbol">ॐ</div>
      
      
      <div className="mantra-text">
        <div className={`mantra-line ${showLine1 ? 'visible' : ''}`}>
          ॐ भूर्भुवः स्वः
        </div>
        <div className={`mantra-line ${showLine2 ? 'visible' : ''}`}>
          तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
        </div>
        <div className={`mantra-line ${showLine3 ? 'visible' : ''}`}>
          धियो यो नः प्रचोदयात्
        </div>
      </div>

      <div className={`mantra-meaning ${showMeaning ? 'visible' : ''}`}>
        <p>हे परम प्रकाश! जो तीनों लोकों में व्याप्त है,</p>
        <p> जो सर्वश्रेष्ठ है, जो देदीप्यमान है</p>
        <p>उस दिव्य सूर्य का हम ध्यान करते हैं,</p>
        <p> वह हमारी बुद्धि को सद्मार्ग पर प्रेरित करे।</p>
        {/* <p>यह केवल 24 अक्षरों का मंत्र नहीं है। यह संपूर्ण वेद का सार है।</p>
        <p>यह ब्रह्मांड की कुंजी है। यह मुक्ति का द्वार है।</p>
        <p>जो इसे केवल बोलता है, उसे कुछ मिलता है।</p>
        <p>जो इसे समझता है, उसे बहुत मिलता है।</p>
        <p>जो इसे जीता है, वह स्वयं सब कुछ बन जाता है।</p>
        <p>ॐ शांति शांति शांतिः</p> */}
      </div>

      <button className="marg-darshan-button" onClick={handleButtonClick}>
        मार्गदर्शन
      </button>

      <button className="vishwamitra-button" onClick={handleVishwamitraClick}>
        विश्वामित्र का संदेश
      </button>
    </div>
  )
}

export default Homepage

