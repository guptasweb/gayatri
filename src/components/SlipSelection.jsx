import { useState, useEffect, useRef } from 'react'
import './SlipSelection.css'
import scrollImage from '../assets/scroll.jpg'

// Gayatri Mantra words
const mantraWords = [
  'ॐ',
  'भूः',
  'भुवः',
  'स्वः',
  'तत्',
  'सवितुः',
  'वरेण्यम्',
  'भर्गः',
  'देवस्य',
  'धीमहि',
  'धियो',
  'यः',
  'नः',
  'प्रचोदयात्'
]

// Word details mapping
const wordDetails = {
  'ॐ': {
    sanskrit: 'ॐ (ओम्)',
    meaning: 'सृष्टि का मूल नाद, प्रणव',
    guidance: 'तुम वह कंपन हो जो सृष्टि से पहले था। अ-उ-म - जागृत, स्वप्न और सुषुप्ति - तुम्हारे भीतर ये तीनों अवस्थाएं हैं। जब "ओम्" तुम्हारे सामने आए, तो जान लो: तुम केवल शरीर नहीं, केवल मन नहीं - तुम वह शून्य हो जिससे सब ध्वनि प्रकट होती है। तुम्हारी श्वास में, तुम्हारे हृदय की धड़कन में, तुम्हारे विचारों के बीच की खामोशी में - ओम् निरंतर गूंज रहा है।\n\nयह शब्द याद दिलाता है: तुम अनंत के साथ एक स्वर में हो। हर पल एक नया सृजन है, और तुम सृष्टिकर्ता भी हो, सृष्टि भी, और साक्षी भी।'
  },
  'भूः': {
    sanskrit: 'भूः (भूलोक)',
    meaning: 'पृथ्वी, स्थूल जगत, भौतिक धरातल',
    guidance: 'तुम्हारे पैरों के नीचे की यह धरती तुम्हारी पहली गुरु है। हर पत्थर, हर मिट्टी का कण धैर्य सिखाता है। जब "भूः" तुम्हें पुकारे, समझ लो: तुम्हारा शरीर मंदिर है, जेलखाना नहीं। यह मांस-हड्डी का ढांचा परमात्मा का प्रयोग है स्थूल में सूक्ष्म को अनुभव करने का।\n\nतुम्हारी हर भूख, हर थकान, हर दर्द एक संदेश है। भौतिकता से भागो मत - इसे साधो। गृहस्थी, रोजगार, रिश्ते - ये सब भूलोक की साधना हैं। जो व्यक्ति पृथ्वी पर अपने कर्तव्य से भागता है, वह स्वर्ग में भी भटकेगा।\n\nयह धरती तुम्हें जड़ें देती है, ताकि तुम आकाश को छू सको।'
  },
  'भुवः': {
    sanskrit: 'भुवः (भुवर्लोक)',
    meaning: 'अंतरिक्ष, सूक्ष्म जगत, प्राण का क्षेत्र',
    guidance: 'तुम दो दुनियाओं के बीच झूल रहे हो - एक पैर जमीन पर, एक पैर आकाश में। यह "भुवः" तुम्हारी भावनाओं का, तुम्हारी ऊर्जा का, तुम्हारे प्राण का लोक है। जब यह शब्द तुम्हारे मार्ग में आए, पहचान लो: तुम्हारी भावनाएं अराजकता नहीं, बल्कि रूपांतरण का पवित्र स्थान हैं।\n\nक्रोध, प्रेम, भय, आनंद - ये सब ऊर्जा के रूप हैं। इन्हें दबाओ मत, इन्हें जानो। यह मध्य लोक सबसे कठिन है क्योंकि यहां न तुम पूरी तरह भौतिक हो, न पूरी तरह आध्यात्मिक।\n\nतुम पुल हो। और हर पुल को दोनों किनारों का दबाव सहना पड़ता है। लेकिन पुल के बिना कोई पार नहीं जाता। तुम्हारा यह संक्रमण काल, यह तनाव, यह द्वंद्व - सब साधना का हिस्सा है।'
  },
  'स्वः': {
    sanskrit: 'स्वः (स्वर्गलोक)',
    meaning: 'स्वर्ग, दिव्य लोक, चेतना का शुद्ध आकाश',
    guidance: 'स्वर्ग कोई मरने के बाद मिलने वाला स्थान नहीं - यह तुम्हारे भीतर अभी मौजूद चेतना की शुद्ध अवस्था है। जब "स्वः" की झलक मिले, समझ लो: तुम अनंत को अपने भीतर धारण किए हो।\n\nहर वह क्षण जब तुम पूर्णतः वर्तमान में होते हो, हर वह पल जब तुम्हें सौंदर्य की अनुभूति होती है, हर वह झटका जब "मैं" खो जाता है और केवल "अस्तित्व" रह जाता है - वही स्वर्ग है।\n\nबच्चे की हंसी में, सूर्यास्त की लालिमा में, प्रेम में, ध्यान की गहराई में - स्वर्ग बार-बार झांक रहा है। तुम्हें कहीं जाना नहीं है। तुम्हें केवल जागना है जहां तुम पहले से हो।'
  },
  'तत्': {
    sanskrit: 'तत् (वह)',
    meaning: 'वह, परम तत्व',
    guidance: '"तत्" - यह शब्द इशारा करता है बिना पकड़े। जब यह शब्द तुम्हारे जीवन में आए, याद करो: परम सत्य को शब्दों में बांधा नहीं जा सकता, केवल पहचाना जा सकता है।\n\nउपनिषद कहते हैं "तत् त्वम् असि" - वह तू ही है। तुम जिसे खोज रहे हो, वह खोजने वाला ही है। जैसे आंख खुद को नहीं देख सकती, वैसे ही चेतना अपने से परे नहीं जा सकती क्योंकि उससे परे कुछ है ही नहीं।\n\n"तत्" याद दिलाता है: चांद को देखो, उंगली को नहीं। सब शास्त्र, सब गुरु, सब शब्द केवल इशारे हैं। सत्य की अनुभूति तुम्हें स्वयं करनी होगी।'
  },
  'सवितुः': {
    sanskrit: 'सवितुः (सविता का, सूर्य का)',
    meaning: 'सूर्य देव का, जीवनदाता का, प्रेरक शक्ति का',
    guidance: 'सविता केवल आकाश का सूर्य नहीं - यह वह दिव्य ऊर्जा है जो सब कुछ संचालित करती है। जब "सवितुः" चमके, समझ लो: वही शक्ति जो आकाशगंगाओं को घुमाती है, तुम्हारे हृदय को भी धड़काती है।\n\nतुम सांस नहीं ले रहे - तुम्हें सांस दी जा रही है। तुम जी नहीं रहे - तुम्हें जिलाया जा रहा है। पौधा सूर्य की ओर बढ़ता है बिना निर्णय लिए। पक्षी उड़ता है बिना सोचे। तुम भी उसी बुद्धि से संचालित हो।\n\nजब तुम थक जाओ अपनी छोटी-सी इच्छाशक्ति से, तब सवितुः को याद करो। समर्पण करो उस महाशक्ति को जो पहले से ही तुम्हारे भीतर काम कर रही है। तुम नदी हो, सागर की ओर बह रहे हो - बहाव से लड़ो मत।'
  },
  'वरेण्यम्': {
    sanskrit: 'वरेण्यम् (वरणीय, सर्वश्रेष्ठ)',
    meaning: 'चुनने योग्य, सबसे उत्कृष्ट, पूजनीय',
    guidance: 'तुम सिद्धता से घिरे हो, लेकिन तुम इसे "साधारण" कहकर नकार देते हो। जब "वरेण्यम्" तुम्हें पुकारे, जाग जाओ: परमात्मा छिपा है हर चेहरे में, हर पत्ती में, हर परिस्थिति में।\n\nपूजा का अर्थ है - पहचानना। मंदिर में भगवान को ढूंढने की जरूरत नहीं जब तुम यह समझ लो कि हर पल पूजा का अवसर है। तुम्हारी मां, तुम्हारा काम, तुम्हारा संघर्ष, तुम्हारी असफलता - सब वरेण्यम् हैं, सब उत्कृष्ट हैं क्योंकि सब उसी एक से आए हैं।\n\nजो तुम्हारे सामने है, वही तुम्हारा गुरु है। इस क्षण को ठुकराओ मत। यह क्षण ही वरेण्य है - चुनने योग्य, प्रेम करने योग्य, पूजने योग्य।'
  },
  'भर्गः': {
    sanskrit: 'भर्गः (तेज, दीप्ति)',
    meaning: 'दिव्य प्रकाश, चमक, वह तेज जो अंधकार को नष्ट करे',
    guidance: 'अंधकार क्या है? वह प्रकाश है जिसे तुमने अभी पहचाना नहीं। जब "भर्गः" तुम्हारे मार्ग को रोशन करे, जान लो: तुम्हारी चेतना ही वह दीपक है जो छिपे हुए को प्रकट करती है।\n\nतुम्हारा अज्ञान, तुम्हारा भय, तुम्हारी भ्रांतियां - ये अंधकार नहीं, ये अनदेखे कोने हैं जहां तुमने अपनी जागरूकता का प्रकाश नहीं डाला। जैसे ही तुम किसी भय को गौर से देखते हो, वह घुलने लगता है।\n\nभर्गः तुम्हें याद दिलाता है: तुम्हीं प्रकाश हो। बाहर से कोई दीपक लाने की जरूरत नहीं। तुम्हारे भीतर की चेतना ही वह तेज है जो सारे भ्रमों को जला देता है। बस इसे ढंके हुए बादलों को हटाना है।'
  },
  'देवस्य': {
    sanskrit: 'देवस्य (देव का, दिव्यता का)',
    meaning: 'दिव्य का, देवता का, प्रकाशमान सत्ता का',
    guidance: '"देव" शब्द की जड़ है "दिव्" - चमकना, प्रकाश देना। जब "देवस्य" तुम्हारे जीवन में प्रवेश करे, समझ लो: तुम देवता से अलग नहीं हो, तुम उसकी अभिव्यक्ति हो।\n\nहिंदू धर्म में 33 करोड़ देवता हैं - इसका अर्थ है कि परमात्मा अनगिनत रूपों में प्रकट है। तुम भी उन्हीं में से एक हो। तुम्हारी अनूठी प्रतिभा, तुम्हारा विशेष स्वभाव, तुम्हारा जीवन का उद्देश्य - यह सब देवत्व की अभिव्यक्ति है।\n\nपवित्र कहीं और नहीं है - यह तुम्हारे होने की सबसे गहरी सच्चाई है। जब तुम प्रेम करते हो, तुम देव हो। जब तुम सृजन करते हो, तुम देव हो। जब तुम करुणा दिखाते हो, तुम देव हो। देवस्य - तुम उस दिव्यता के हो, और वह दिव्यता तुम्हारी है।'
  },
  'धीमहि': {
    sanskrit: 'धीमहि (हम ध्यान करें)',
    meaning: 'हम धारण करें, हम चिंतन करें, हम ध्यान में स्थिर हों',
    guidance: 'ध्यान कोई तकनीक नहीं - यह जीने का तरीका है। जब "धीमहि" की पुकार आए, याद करो: तुम जहां ध्यान देते हो, वहीं तुम्हारी जीवन-ऊर्जा जाती है।\n\nअगर तुम पूरा दिन अपनी समस्याओं पर ध्यान दोगे, तुम समस्या बन जाओगे। अगर तुम सौंदर्य पर ध्यान दोगे, तुम्हारा जीवन सुंदर होगा। ध्यान माने - चुनाव। हर पल तुम चुन रहे हो कि तुम क्या बनोगे।\n\nधीमहि कहता है: सचेतन रहो। तुम्हारा मन भटकेगा - उसे वापस लाओ। हजार बार भटके, हजार बार लौटाओ। यही साधना है। और धीरे-धीरे, तुम्हारा ध्यान इतना स्थिर हो जाएगा कि तुम और तुम्हारा ध्येय एक हो जाएंगे।'
  },
  'धियो': {
    sanskrit: 'धियो (बुद्धि, प्रज्ञा)',
    meaning: 'बुद्धि, समझ, चेतना, प्रज्ञा',
    guidance: 'तुम्हारी बुद्धि तुम्हारा शत्रु नहीं - यह तुम्हारा सबसे सूक्ष्म उपकरण है। जब "धियो" जागे, पहचानो: सही दिशा में लगी बुद्धि वह दूरबीन है जिससे अनंत स्वयं को देखता है।\n\nबुद्धि को दबाने से आध्यात्मिकता नहीं आती। बुद्धि को परिष्कृत करने से आती है। तुम्हारी बुद्धि अभी छोटी-छोटी चीजों में उलझी है - उसे बड़े प्रश्नों की ओर मोड़ो। "मैं कौन हूं?" "मृत्यु क्या है?" "प्रेम क्या है?" - ये प्रश्न बुद्धि को उसकी सीमा तक ले जाते हैं।\n\nऔर जब बुद्धि अपनी सीमा पर पहुंचती है, तब कुछ अद्भुत होता है - वह शांत हो जाती है। और उस शांति में, उससे परे जो है, वह प्रकट होता है। धियो - तुम्हारी बुद्धि सीढ़ी है। चढ़ो, और फिर सीढ़ी को भी पीछे छोड़ दो।'
  },
  'यः': {
    sanskrit: 'यः (जो, कौन)',
    meaning: 'जो, कौन, which (सर्वनाम)',
    guidance: 'हर प्रश्न पवित्र है। जब "यः" तुम्हें प्रश्न पूछने को प्रेरित करे, समझ लो: जो पूछता है "कौन?" वह उस व्यक्ति से सत्य के ज्यादा करीब है जो आसान उत्तर स्वीकार कर लेता है।\n\n"यः" - यह शब्द खोज की ओर इशारा करता है। विषय की खोज, विषयी की खोज। तुम हमेशा पूछ रहे हो - "यह क्या है?" "वह कौन है?" लेकिन सबसे महत्वपूर्ण प्रश्न है: "मैं कौन हूं?"\n\nजो व्यक्ति इस प्रश्न को जिंदा रखता है, वह कभी सो नहीं सकता। वह जागेगा और जागेगा, जब तक कि प्रश्न खुद ही उत्तर न बन जाए। यः - जिज्ञासा को मारो मत। उसे तीव्र करो। क्योंकि जिज्ञासा ही तुम्हारे भीतर का परमात्मा है जो अपने को जानना चाहता है।'
  },
  'नः': {
    sanskrit: 'नः (हमारा, हमारी)',
    meaning: 'हमारा, हमारी, हमें',
    guidance: 'तुम अकेले नहीं हो। जब "नः" प्रकट हो, याद आए: चेतना सामूहिक है। तुम्हारा जागरण सबका जागरण है।\n\nयह "मैं" और "हम" के बीच का पुल है। जब तुम केवल "मैं" में जीते हो, तुम सिकुड़ जाते हो। जब तुम "हम" में फैलते हो, तुम विस्तृत होते हो। लेकिन सावधान - "हम" का मतलब अपनी पहचान खोना नहीं है। यह अपनी पहचान को विस्तार देना है।\n\nनः कहता है: तुम्हारी मुक्ति निजी नहीं है - वह सार्वभौमिक है। जब तुम शांति पाते हो, तुम्हारे आसपास शांति की लहरें फैलती हैं। जब तुम प्रेम से भरते हो, सृष्टि प्रेममय होती है। तुम और संसार दो नहीं हैं। नः - हमारी यात्रा, हमारा जागरण, हमारा स्वर्ग।'
  },
  'प्रचोदयात्': {
    sanskrit: 'प्रचोदयात् (प्रेरित करे)',
    meaning: 'प्रेरित करे, प्रज्वलित करे, दिशा दे',
    guidance: 'यह समर्पण का शब्द है। जब "प्रचोदयात्" तुम्हें छू जाए, जान लो: तुम नियंत्रण में नहीं हो, और यही तुम्हारी मुक्ति है।\n\nतुम बांसुरी हो, सांस नहीं। तुम नदी हो, स्रोत नहीं। कितनी राहत है यह जानने में कि तुम्हें सब कुछ खुद करना नहीं है! समर्पण कमजोरी नहीं, परम शक्ति है।\n\nप्रचोदयात् - वह दिव्य बुद्धि तुम्हारी बुद्धि को दिशा दे। वह तुम्हारे भीतर से आवाज दे, और तुम सुनो। जब तुम अपनी छोटी-सी इच्छाशक्ति से थक जाओ, तब उस महाशक्ति को आमंत्रित करो जो पहले से ही तुम्हारे भीतर काम कर रही है।\n\nतुम बीज हो - फूल बनना तुम्हारा निर्णय नहीं, तुम्हारी नियति है। बस मिट्टी में समर्पित हो जाओ, बाकी सूर्य और पानी देख लेंगे। प्रचोदयात् - हे प्रभु, मुझे प्रेरित करो, मुझे प्रकाशित करो, मुझसे वह करवा जो मेरे करने का है।'
  }
}

// Create 14 slips
const createSlips = () => {
  return Array.from({ length: 14 }, (_, i) => ({
    id: i + 1
  }))
}

// Randomly assign words to slips on initialization
const initializeSlipWords = (slips) => {
  // Assign each slip a random starting word index
  return slips.map((slip) => ({
    ...slip,
    currentWordIndex: Math.floor(Math.random() * mantraWords.length)
  }))
}

const SlipSelection = ({ onSlipSelected }) => {
  const [isMixing, setIsMixing] = useState(false)
  const [slipPositions, setSlipPositions] = useState(() => {
    const initialSlips = createSlips()
    return initializeSlipWords(initialSlips)
  })
  const [unfoldedSlip, setUnfoldedSlip] = useState(null)
  const [showOpeningScreen, setShowOpeningScreen] = useState(false)
  const [openingSlipData, setOpeningSlipData] = useState(null)
  const [isMuted, setIsMuted] = useState(true)
  const containerRef = useRef(null)
  const lastShakeTime = useRef(0)
  const particlesContainerRef = useRef(null)

  useEffect(() => {
    // Device motion for shaking
    const handleMotion = (e) => {
      const acceleration = e.accelerationIncludingGravity || e.acceleration
      if (!acceleration) return

      const magnitude = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      )

      const now = Date.now()
      if (magnitude > 15 && now - lastShakeTime.current > 1000) {
        lastShakeTime.current = now
        mixSlips()
      }
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion)
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion)
      }
    }
  }, [])

  const mixSlips = () => {
    setIsMixing(true)
    
    // Shuffle positions and randomize word assignments
    const shuffled = [...slipPositions].sort(() => Math.random() - 0.5)
    const withNewWords = shuffled.map(slip => ({
      ...slip,
      currentWordIndex: Math.floor(Math.random() * mantraWords.length)
    }))
    setSlipPositions(withNewWords)

    setTimeout(() => {
      setIsMixing(false)
    }, 2000)
  }

  // Get current word for a slip
  const getSlipWord = (slip) => {
    return mantraWords[slip.currentWordIndex]
  }

  // Get symbol for a slip (only 'ॐ' if word is 'ॐ', otherwise empty)
  const getSlipSymbol = (slip) => {
    const word = getSlipWord(slip)
    return word === 'ॐ' ? 'ॐ' : ''
  }

  // Rotate word for a slip
  const rotateSlipWord = (slipId) => {
    setSlipPositions(prev => prev.map(slip => {
      if (slip.id === slipId) {
        return {
          ...slip,
          currentWordIndex: (slip.currentWordIndex + 1) % mantraWords.length
        }
      }
      return slip
    }))
  }

  useEffect(() => {
    // Prevent body scroll when scroll is open or opening screen is showing
    if (unfoldedSlip || showOpeningScreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [unfoldedSlip, showOpeningScreen])

  // Create particles when opening screen is shown
  useEffect(() => {
    if (showOpeningScreen && particlesContainerRef.current) {
      particlesContainerRef.current.innerHTML = ''
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'unfold-particle'
        particle.style.left = (20 + Math.random() * 60) + '%'
        particle.style.top = (30 + Math.random() * 40) + '%'
        particle.style.animationDelay = (Math.random() * 1) + 's'
        particlesContainerRef.current.appendChild(particle)
      }
    }
  }, [showOpeningScreen])

  // Keep openingSlipData in sync with slipPositions
  useEffect(() => {
    if (openingSlipData) {
      const currentSlip = slipPositions.find(s => s.id === openingSlipData.id)
      if (currentSlip) {
        const word = getSlipWord(currentSlip)
        const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
        setOpeningSlipData({
          ...currentSlip,
          word: word,
          sanskrit: details.sanskrit,
          meaning: details.meaning,
          guidance: details.guidance,
          symbol: getSlipSymbol(currentSlip)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slipPositions])

  const handleSlipClick = (slip, e) => {
    e.stopPropagation()
    if (unfoldedSlip === slip.id) {
      // If already unfolded, rotate word (useEffect will sync openingSlipData)
      rotateSlipWord(slip.id)
    } else if (showOpeningScreen) {
      // If scroll is already open, switch to clicked slip or rotate if same
      if (openingSlipData && openingSlipData.id === slip.id) {
        // Same slip clicked - rotate word (useEffect will sync openingSlipData)
        rotateSlipWord(slip.id)
      } else {
        // Different slip clicked - switch to it
        const currentSlip = slipPositions.find(s => s.id === slip.id)
        if (currentSlip) {
          const word = getSlipWord(currentSlip)
          const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
          setOpeningSlipData({
            ...currentSlip,
            word: word,
            sanskrit: details.sanskrit,
            meaning: details.meaning,
            guidance: details.guidance,
            symbol: getSlipSymbol(currentSlip)
          })
        }
      }
    } else {
      // Show opening animation - stays open until user closes it
      const currentSlip = slipPositions.find(s => s.id === slip.id)
      if (currentSlip) {
        const word = getSlipWord(currentSlip)
        const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
        setOpeningSlipData({
          ...currentSlip,
          word: word,
          sanskrit: details.sanskrit,
          meaning: details.meaning,
          guidance: details.guidance,
          symbol: getSlipSymbol(currentSlip)
        })
        setShowOpeningScreen(true)
      }
    }
  }

  const handleCloseScroll = (e) => {
    e.stopPropagation()
    setShowOpeningScreen(false)
    setOpeningSlipData(null)
  }

  // Get audio element from AudioPlayer component
  const getAudioElement = () => {
    const audioElement = document.querySelector('audio')
    return audioElement
  }

  // Sync mute state with audio element
  useEffect(() => {
    if (!showOpeningScreen) return
    
    const audioElement = getAudioElement()
    if (audioElement) {
      setIsMuted(audioElement.muted)
      
      // Poll for changes in muted state (since muted property changes don't fire events)
      const interval = setInterval(() => {
        if (audioElement) {
          setIsMuted(audioElement.muted)
        }
      }, 100)
      
      return () => {
        clearInterval(interval)
      }
    }
  }, [showOpeningScreen])

  const toggleMute = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const audioElement = getAudioElement()
    if (audioElement) {
      const newMutedState = !audioElement.muted
      audioElement.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const handleCloseFolder = (e) => {
    e.stopPropagation()
    setUnfoldedSlip(null)
  }

  const handleSwipe = (e) => {
    // Don't allow mixing when scroll is open or opening screen is showing
    if (unfoldedSlip || showOpeningScreen) return
    
    let startX = 0
    let startY = 0

    const handleStart = (evt) => {
      startX = evt.touches ? evt.touches[0].clientX : evt.clientX
      startY = evt.touches ? evt.touches[0].clientY : evt.clientY
    }

    const handleEnd = (evt) => {
      const endX = evt.changedTouches ? evt.changedTouches[0].clientX : evt.clientX
      const endY = evt.changedTouches ? evt.changedTouches[0].clientY : evt.clientY
      const diffX = Math.abs(endX - startX)
      const diffY = Math.abs(endY - startY)

      if (diffX > 50 || diffY > 50) {
        mixSlips()
      }
    }

    if (e.type === 'mousedown') {
      handleStart(e)
      document.addEventListener('mouseup', handleEnd, { once: true })
    } else if (e.type === 'touchstart') {
      handleStart(e)
      document.addEventListener('touchend', handleEnd, { once: true })
    }
  }

  return (
    <>
      {/* Opening Screen with Scroll Animation */}
      {showOpeningScreen && openingSlipData && (
        <div className={`opening-screen ${showOpeningScreen ? 'show' : ''}`} onClick={handleCloseScroll}>
          {/* Keep mantra circles visible in background */}
          <div className="mantra-circles-wrapper">
            <svg className="mantra-circles" viewBox="0 0 20000 20000" preserveAspectRatio="xMidYMid meet">
              <defs>
                <path id="circle1-opening" d="M 10000,8400 A 1600,1600 0 1,1 9999.9,8400" />
                <path id="circle2-opening" d="M 10000,-240 A 10240,10240 0 1,1 9999.9,-240" />
                <path id="circle3-opening" d="M 10000,-6000 A 16000,16000 0 1,1 9999.9,-6000" />
                <path id="circle4-opening" d="M 10000,-11760 A 21760,21760 0 1,1 9999.9,-11760" />
                <path id="circle5-opening" d="M 10000,-17520 A 27520,27520 0 1,1 9999.9,-17520" />
              </defs>
              <g className="circle-group-1">
                <text className="mantra-text-circle circle-1" fill="rgba(255,255,255,0.5)" fontSize="860" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle1-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
                  </textPath>
                </text>
              </g>
              <g className="circle-group-2">
                <text className="mantra-text-circle circle-2" fill="rgba(255,255,255,0.45)" fontSize="968" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle2-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
                  </textPath>
                </text>
              </g>
              <g className="circle-group-3">
                <text className="mantra-text-circle circle-3" fill="rgba(255,255,255,0.4)" fontSize="1076" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle3-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
                  </textPath>
                </text>
              </g>
              <g className="circle-group-4">
                <text className="mantra-text-circle circle-4" fill="rgba(255,255,255,0.35)" fontSize="1184" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle4-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः
                  </textPath>
                </text>
              </g>
              <g className="circle-group-5">
                <text className="mantra-text-circle circle-5" fill="rgba(255,255,255,0.3)" fontSize="1292" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle5-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
                  </textPath>
                </text>
              </g>
            </svg>
          </div>
          <div className="scroll-container" onClick={(e) => e.stopPropagation()}>
            <div className="scroll-wrapper">
              <div className="scroll-ribbon"></div>
              <div className="scroll-rod-top"></div>
              <div className="scroll-top-roll"></div>
              <div className="scroll-paper">
                <div className="scroll-close-button" onClick={handleCloseScroll}>×</div>
                <button 
                  className="scroll-audio-toggle-button" 
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="#8B4513"/>
                      <line x1="2" y1="2" x2="22" y2="22" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C17.01 19.86 20 16.28 20 12C20 7.72 17.01 4.14 14 3.23Z" fill="#8B4513"/>
                    </svg>
                  )}
                </button>
                <div className="scroll-content-animated">
                  {openingSlipData.symbol && <div className="scroll-symbol">{openingSlipData.symbol}</div>}
                  <div className="scroll-word-sanskrit">{openingSlipData.sanskrit}</div>
                  <div className="scroll-word-meaning-label">शाब्दिक अर्थ:</div>
                  <div className="scroll-word-meaning">{openingSlipData.meaning}</div>
                  <div className="scroll-word-guidance-label">ब्रह्मांडीय पथप्रदर्शक:</div>
                  <div className="scroll-word-guidance">{openingSlipData.guidance}</div>
                </div>
              </div>
              <div className="scroll-bottom-roll"></div>
              <div className="scroll-rod-bottom"></div>
            </div>
          </div>
          <div className="unfold-particles" ref={particlesContainerRef}></div>
        </div>
      )}

      <div 
        className="slip-selection"
        ref={containerRef}
        onMouseDown={handleSwipe}
        onTouchStart={handleSwipe}
        style={{ '--scroll-image': `url(${scrollImage})` }}
      >
      <div className="mantra-circles-wrapper">
        <svg className="mantra-circles" viewBox="0 0 20000 20000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <path id="circle1" d="M 10000,8400 A 1600,1600 0 1,1 9999.9,8400" />
            <path id="circle2" d="M 10000,-240 A 10240,10240 0 1,1 9999.9,-240" />
            <path id="circle3" d="M 10000,-6000 A 16000,16000 0 1,1 9999.9,-6000" />
            <path id="circle4" d="M 10000,-11760 A 21760,21760 0 1,1 9999.9,-11760" />
            <path id="circle5" d="M 10000,-17520 A 27520,27520 0 1,1 9999.9,-17520" />
          </defs>
          <g className="circle-group-1">
            <text className="mantra-text-circle circle-1" fill="rgba(255,255,255,0.5)" fontSize="860" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle1" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
              </textPath>
            </text>
          </g>
          <g className="circle-group-2">
            <text className="mantra-text-circle circle-2" fill="rgba(255,255,255,0.45)" fontSize="968" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle2" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
              </textPath>
            </text>
          </g>
          <g className="circle-group-3">
            <text className="mantra-text-circle circle-3" fill="rgba(255,255,255,0.4)" fontSize="1076" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle3" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
              </textPath>
            </text>
          </g>
          <g className="circle-group-4">
            <text className="mantra-text-circle circle-4" fill="rgba(255,255,255,0.35)" fontSize="1184" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle4" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः
              </textPath>
            </text>
          </g>
          <g className="circle-group-5">
            <text className="mantra-text-circle circle-5" fill="rgba(255,255,255,0.3)" fontSize="1292" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle5" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      <div className="slip-title">चुनें अपना 2026 मार्गदर्शक शब्द</div>

      <div className={`bowl-container ${isMixing ? 'mixing' : ''}`}>
        <div className="copper-plate"></div>
        <div className="slips-pyramid">
          {slipPositions.map((slip, index) => (
            <div
              key={slip.id}
              className={`slip scroll-slip ${unfoldedSlip === slip.id ? 'unfolded' : ''} ${unfoldedSlip && unfoldedSlip !== slip.id ? 'hidden' : ''}`}
              style={{
                '--rotation': `${-15 + (index % 3) * 15}deg`,
                '--delay': `${index * 0.5}s`,
              }}
              onClick={(e) => handleSlipClick(slip, e)}
            >
              {unfoldedSlip === slip.id ? (
                <div className="scroll-content">
                  <div className="scroll-close" onClick={handleCloseFolder}>×</div>
                  <div className="slip-sanskrit">{getSlipWord(slip)}</div>
                  {(() => {
                    const word = getSlipWord(slip)
                    const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
                    return (
                      <>
                        <div className="slip-meaning-label">शाब्दिक अर्थ:</div>
                        <div className="slip-meaning">{details.meaning}</div>
                        <div className="slip-guidance-label">ब्रह्मांडीय पथप्रदर्शक:</div>
                        <div className="slip-guidance">{details.guidance}</div>
                      </>
                    )
                  })()}
                  <button 
                    className="select-slip-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      const word = getSlipWord(slip)
                      const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
                      onSlipSelected({
                        ...slip,
                        sanskrit: details.sanskrit,
                        meaning: details.meaning,
                        guidance: details.guidance,
                        symbol: getSlipSymbol(slip)
                      })
                    }}
                  >
                    चुनें
                  </button>
                </div>
              ) : (
                <div className="scroll-rolled">
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default SlipSelection

