import { useEffect, useRef } from 'react'
import './WarningPage.css'

const WarningPage = ({ onProceed, onBack }) => {
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
  }, [])

  useEffect(() => {
    // Continuously create floating Om symbols
    const omContainer = omSymbolsContainerRef.current
    let omCount = 0
    const maxOms = 50

    const createOm = () => {
      if (omCount >= maxOms) {
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
      const drift = (Math.random() - 0.5) * 200
      omSymbol.style.left = Math.random() * 100 + '%'
      omSymbol.style.top = '100%'
      omSymbol.style.fontSize = (Math.random() * 4 + 1.5) + 'rem'
      omSymbol.style.animationDuration = (Math.random() * 10 + 20) + 's'
      omSymbol.style.setProperty('--drift', drift)
      omContainer.appendChild(omSymbol)

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
    }, 600)

    return () => {
      clearInterval(omInterval)
    }
  }, [])

  return (
    <div className="warning-page">
      <div className="mandala mandala-1"></div>
      <div className="mandala mandala-2"></div>
      
      <div className="light-particles" ref={particlesContainerRef}></div>
      <div className="floating-om-symbols" ref={omSymbolsContainerRef}></div>
      
      <button className="back-arrow-button" onClick={onBack}>
        ←
      </button>
      
      <div className="warning-page-content">
        <div className="warning-page-instructions">
          <div className="warning-page-instructions-title">इसे कैसे इस्तेमाल करें:</div>
          <ol className="warning-page-instructions-list">
            <li>शांत जगह। दूरभाष मौन। विचलन हटाओ।</li>
            <li>तीन गहरी सांसें लो। अपने केंद्र में आओ।</li>
            <li>अपना सवाल सोचो - या बस खुले मन से पूछो: "मुझे आज क्या जानना चाहिए?"</li>
          </ol>
        </div>
        <div className="warning-page-title">याद रखें:</div>
        <div className="warning-page-text">
          <p>इस दैवी संकेत को बनाते समय हर शब्द में चेतना डाली गई है। यह केवल जानकारी नहीं - यह ऊर्जा संचरण है।</p>
          <p>जो शब्द तुम्हारे पास आया, वो यादृच्छिक नहीं है। यह संयोग है। तुम्हारे अवचेतन को बिल्कुल वो मिला जो तुम्हें सुनना था - भले ही तुम्हारा चेतन मन इसे अभी समझे नहीं।</p>
        </div>
        <button className="warning-page-proceed-button" onClick={onProceed}>
          आगे बढ़ें
        </button>
      </div>
    </div>
  )
}

export default WarningPage

