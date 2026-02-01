import React, { useState, useRef } from 'react'
import './valentine.css'

export default function Valentine() {
  const [noTransform, setNoTransform] = useState('translate(0, 0)')
  const [showOverlay, setShowOverlay] = useState(false)
  const [noAttempts, setNoAttempts] = useState(0)
  const [noChosen, setNoChosen] = useState(false)

  const noRef = useRef(null)

  const moveNo = () => {
    // move the button to a random position but keep it fully inside the viewport
    const btn = noRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const btnW = rect.width
    const btnH = rect.height

    const maxLeft = Math.max(0, vw - btnW)
    const maxTop = Math.max(0, vh - btnH)
    const targetLeft = Math.random() * maxLeft
    const targetTop = Math.random() * maxTop

    const deltaX = Math.round(targetLeft - rect.left)
    const deltaY = Math.round(targetTop - rect.top)
    setNoTransform(`translate(${deltaX}px, ${deltaY}px)`)
  }

  const triggerConfetti = () => {
    const container = document.createElement('div')
    container.className = 'confetti-container'
    const colors = ['#ff4d6d', '#ff9bbf', '#ffd166', '#6ee7b7', '#9ad1ff']
    for (let i = 0; i < 80; i++) {
      const conf = document.createElement('span')
      conf.className = 'confetti'
      const size = Math.floor(Math.random() * 10) + 6
      conf.style.width = `${size}px`
      conf.style.height = `${size * 0.6}px`
      conf.style.left = Math.random() * 100 + '%'
      conf.style.background = colors[Math.floor(Math.random() * colors.length)]
      conf.style.animationDelay = `${Math.random() * 0.6}s`
      conf.style.transform = `rotate(${Math.random() * 360}deg)`
      container.appendChild(conf)
    }
    document.body.appendChild(container)
    // remove after animation
    setTimeout(() => {
      container.classList.add('fade-out')
      setTimeout(() => container.remove(), 1200)
    }, 3800)
  }

  const handleYes = (e) => {
    // prevent anchor navigation
    if (e && e.preventDefault) e.preventDefault()
    setShowOverlay(true)
    setNoAttempts(0)
    triggerConfetti()
  }

  const handleNoPageYes = (e) => {
    // reuse same celebration behavior on gloomy page
    if (e && e.preventDefault) e.preventDefault()
    setShowOverlay(true)
    setNoChosen(false)
    triggerConfetti()
  }

  if (noChosen) {
    return (
      <div className="gloom-page">
        <div className="gloom-card">
          <div className="sad-emoji">😿</div>
          <h2>Oh no... maybe next time?</h2>
          <p className="gloom-text">It looks a bit gloomy here. Want to try saying yes?</p>
          <div className="gloom-actions">
            <button className="yes" type="button" onClick={handleNoPageYes}>Yes</button>
          </div>
        </div>
        {showOverlay && (
          <div className="overlay" onClick={() => setShowOverlay(false)}>
            <div className="celebration" onClick={(e) => e.stopPropagation()}>
              <h1 className="celebration-title">Good choice!</h1>
              <div className="celebration-visuals">
                <div className="dancer">💃</div>
                <div className="flower">🌸</div>
              </div>
              <button className="close" onClick={() => setShowOverlay(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="card-link">
        <div className="card">
          <div className="emoji">🐱💖</div>
          <div className="hearts">
            <span className="heart" />
            <span className="heart" />
            <span className="heart" />
            <span className="heart" />
            <span className="heart" />
            <span className="heart" />
          </div>
          <h2>Manasvi will you be my valentine?</h2>

          <div className="buttons">
            <button
              className="yes"
              type="button"
              onClick={handleYes}
            >
              Yes
            </button>
            <div className="no-wrap">
              <button
                className="no"
                type="button"
                ref={noRef}
                onMouseEnter={moveNo}
                onMouseDown={(e) => { e.preventDefault(); moveNo(); setNoAttempts(a => a + 1); }}
                onClick={(e) => { e.preventDefault(); setNoAttempts(a => a + 1); setNoChosen(true); }}
                onTouchStart={(e) => { e.preventDefault(); moveNo(); setNoAttempts(a => a + 1); }}
                tabIndex={-1}
                aria-hidden="true"
                style={{ transform: noTransform }}
              >
                No
              </button>
              {noAttempts >= 2 && (
                <div className="tooltip">Nice try — can't catch me!</div>
              )}
            </div>
          </div>

          <p className="hint">"No" seems a bit shy 😈</p>
        </div>
      </div>

      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="celebration" onClick={(e) => e.stopPropagation()}>
            <h1 className="celebration-title">Good choice!</h1>
            <div className="celebration-visuals">
              <div className="dancer">💃</div>
              <div className="flower">🌸</div>
            </div>
            <button className="close" onClick={() => setShowOverlay(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}
