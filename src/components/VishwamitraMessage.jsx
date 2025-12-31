import { useEffect, useRef } from 'react'
import './VishwamitraMessage.css'

const VishwamitraMessage = ({ onBack }) => {
  const omSymbolsContainerRef = useRef(null)

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
    <div className="vishwamitra-message">
      <div className="mandala mandala-1"></div>
      <div className="mandala mandala-2"></div>
      
      <div className="floating-om-symbols" ref={omSymbolsContainerRef}></div>
      
      <div className="message-container">
        <div className="message-content">
          <p>हे मानव! मैं विश्वामित्र, क्षत्रिय से ब्राह्मण बना, घोर तपस्या और आत्म-संघर्ष से गुजरकर इस मंत्र को प्राप्त किया। यह मंत्र मेरी कल्पना नहीं - यह ब्रह्मांड की उस शाश्वत ध्वनि का साक्षात्कार है जो सृष्टि के पहले क्षण से गूंज रही है।</p>
          
          <p>जब मैं हजारों वर्षों तक तपस्या में बैठा, जब मेरी देह सूख गई और केवल चेतना शेष रही, तब यह मंत्र मुझसे नहीं, मुझ में प्रकट हुआ। यह वेद का हृदय है, सभी मंत्रों की जननी है।</p>
          
          <p>यह मेरी रचना नहीं - यह अनादि सत्य है जो मुझ पर प्रकट हुआ।</p>
          
          <p>इस मंत्र की शक्ति अपार है:</p>
          
          <p>यह सूर्य को आदेश देता है, यह काल को रोक सकता है</p>
          <p>यह मृत्यु को जीत सकता है, यह ब्रह्मांड की सभी शक्तियों को जगा सकता है</p>
          
          <p>पर ध्यान रखो:</p>
          
          <p>यह मंत्र उसी के लिए है जो:</p>
          
          <p>शुद्ध हृदय वाला हो</p>
          <p>सत्य का साधक हो</p>
          <p>त्याग और तप के लिए तैयार हो</p>
          <p>सब प्राणियों का हित चाहता हो</p>
          
          <p>जप की विधि:</p>
          
          <p>प्रातः काल - सूर्योदय से पहले, ब्रह्म मुहूर्त में</p>
          <p>मध्याह्न - जब सूर्य मस्तक पर हो</p>
          <p>संध्या - सूर्यास्त के समय</p>
          <p>दिन में तीन बार, कम से कम 108 बार।</p>
          
          <p>फल:</p>
          
          <p>पहले महीने - मन में शांति</p>
          <p>तीन महीने - विचारों में स्पष्टता</p>
          <p>छह महीने - कुंडलिनी में हलचल</p>
          <p>एक वर्ष - दिव्य दृष्टि का आरंभ</p>
          <p>तीन वर्ष - सिद्धियां प्रकट होना</p>
          <p>बारह वर्ष - ब्रह्म साक्षात्कार</p>
          
          <p>पर याद रखो:</p>
          
          <p>फल की इच्छा से मत करो। केवल प्रकाश की प्यास से करो।</p>
          
          <p>ऋषियों की चेतावनी</p>
          
          <p>यह मंत्र अमोघ है - जो मांगोगे, मिलेगा।</p>
          
          <p>पर:</p>
          
          <p>अगर अहंकार से मांगोगे, अहंकार बढ़ेगा</p>
          <p>अगर सिद्धियों की इच्छा से मांगोगे, सिद्धियां मिलेंगी पर बंधन भी</p>
          <p>अगर शुद्ध हृदय से मांगोगे, मुक्ति मिलेगी</p>
          
          <p>इसलिए सावधान रहो। यह मंत्र तुम्हें वही देगा जो तुम सच में हो, जो तुम गहराई से चाहते हो।</p>
          
          <p>अंतिम वचन</p>
          
          <p className="mantra-text">ॐ भूर्भुवः स्वः</p>
          <p className="mantra-text">तत्सवितुर्वरेण्यं</p>
          <p className="mantra-text">भर्गो देवस्य धीमहि</p>
          <p className="mantra-text">धियो यो नः प्रचोदयात्</p>
          
          <p>यह केवल 24 अक्षरों का मंत्र नहीं है।</p>
          <p>यह संपूर्ण वेद का सार है।</p>
          <p>यह ब्रह्मांड की कुंजी है।</p>
          <p>यह मुक्ति का द्वार है।</p>
          <p>जो इसे केवल बोलता है, उसे कुछ मिलता है।</p>
          <p>जो इसे समझता है, उसे बहुत मिलता है।</p>
          <p>जो इसे जीता है, वह स्वयं सब कुछ बन जाता है।</p>
          
          <p>गायत्री पूछती है: "तुम कौन हो?"</p>
          
          <p>अज्ञानी कहता है: "मैं शरीर हूँ।"</p>
          <p>साधक कहता है: "मैं आत्मा हूँ।"</p>
          <p>ज्ञानी कहता है: "मैं ब्रह्म हूँ।"</p>
          <p>सिद्ध चुप रह जाता है - क्योंकि वह स्वयं उत्तर बन चुका है।</p>
          
          <p className="mantra-text">ॐ शांति शांति शांतिः</p>
        </div>
      </div>
      
      <button className="back-arrow-button" onClick={onBack}>
        ←
      </button>
    </div>
  )
}

export default VishwamitraMessage

