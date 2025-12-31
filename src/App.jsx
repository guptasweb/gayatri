import { useState, useEffect } from 'react'
import Homepage from './components/Homepage'
import WarningPage from './components/WarningPage'
import SlipSelection from './components/SlipSelection'
import SlipOpening from './components/SlipOpening'
import MeaningPage from './components/MeaningPage'
import VishwamitraMessage from './components/VishwamitraMessage'
import AudioPlayer from './components/AudioPlayer'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('homepage')
  const [selectedWord, setSelectedWord] = useState(null)

  const handleMantraComplete = (screen) => {
    if (screen === 'vishwamitra') {
      setCurrentScreen('vishwamitra')
    } else {
      setCurrentScreen('warning')
    }
  }

  const handleBackToHomepage = () => {
    setCurrentScreen('homepage')
  }

  const handleWarningProceed = () => {
    setCurrentScreen('slip-selection')
  }

  const handleSlipSelected = (word) => {
    setSelectedWord(word)
    setCurrentScreen('opening')
  }

  const handleOpeningComplete = () => {
    setCurrentScreen('meaning')
  }

  const handleBackToSlips = () => {
    setCurrentScreen('slip-selection')
    setSelectedWord(null)
  }

  return (
    <div className="app">
      <AudioPlayer />
      {currentScreen === 'homepage' && (
        <Homepage onComplete={handleMantraComplete} />
      )}
      {currentScreen === 'warning' && (
        <WarningPage onProceed={handleWarningProceed} onBack={handleBackToHomepage} />
      )}
      {currentScreen === 'slip-selection' && (
        <SlipSelection onSlipSelected={handleSlipSelected} />
      )}
      {currentScreen === 'opening' && (
        <SlipOpening 
          word={selectedWord} 
          onComplete={handleOpeningComplete} 
        />
      )}
      {currentScreen === 'meaning' && (
        <MeaningPage 
          word={selectedWord} 
          onBack={handleBackToSlips} 
        />
      )}
      {currentScreen === 'vishwamitra' && (
        <VishwamitraMessage onBack={handleBackToHomepage} />
      )}
    </div>
  )
}

export default App

