// Ensures App loads after DOM is initialized.
document.addEventListener('DOMContentLoaded', () => {
    console.log('App Ready!')

    // Taking control of necessary elements.
    const displayEL = document.getElementById('display')
    const stopwatchControls = document.getElementById('stopwatch-controls')
    const timerControls = document.getElementById('timer-controls')

    // Store current interval.
    let clockInterval = null
    
    // Kills current interval.
    const clearTime = () => {
        clearInterval(clockInterval)
        clockInterval = null
    }

    // Render Clock.
    const renderClock = () => {
        // Clears any interval if running.
        clearTime()
        stopwatchControls.classList.add('hidden')
        timerControls.classList.add('hidden')
        
        // Updates time on call.
        const updateTime = () => {
            const dt = new Date()

            const hours = String(dt.getHours()).padStart(2, '0')
            const minutes = String(dt.getMinutes()).padStart(2, '0')
            const seconds = String(dt.getSeconds()).padStart(2, '0')

            const time = `${hours}:${minutes}:${seconds}`

            displayEL.textContent = time
        }

        // Calling immidiately prevents loading delay.
        updateTime()

        // Handles subsequent updates ever 1s.
        clockInterval = setInterval(updateTime, 1000)

        
    }

    // Render Stopwatch.
    const renderStopwatch = () => {
        stopwatchControls.classList.remove('hidden')
        timerControls.classList.add('hidden')
        clearTime()
        displayEL.textContent = '00:00:00'
    }

    // Render Timer.
    const renderTimer = () => {
        stopwatchControls.classList.add('hidden')
        timerControls.classList.remove('hidden')
        clearTime()
        displayEL.textContent = '00:00:00'
    }

    // Default render on page load.
    renderClock()


    // Single EventListener handles all events.
    document.addEventListener('click', (e) => {
        const targetId = e.target.id

        if (targetId === 'clock') {
        renderClock()
        } else if (targetId === 'stopwatch') {
        renderStopwatch()
        } else if (targetId === 'timer') {
        renderTimer()
        }
    })
})
