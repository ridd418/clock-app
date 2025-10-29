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
    const clearTimer = () => {
        clearInterval(clockInterval)
        clockInterval = null
    }

    // Format and Render Time.
    const renderDisplay = (hours=0, minutes=0, seconds=0) => {
        const formatTime = (time) => String(time).padStart(2, '0')
        displayEL.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }

    // Render Clock.
    const renderClock = () => {
        // Clears any interval if running.
        clearTimer()
        stopwatchControls.classList.add('hidden')
        timerControls.classList.add('hidden')
        
        // Updates time on call.
        const updateTime = () => {
            const dt = new Date()

            const hours = dt.getHours()
            const minutes = dt.getMinutes()
            const seconds = dt.getSeconds()

            renderDisplay(hours, minutes, seconds)
        }

        // Calling immidiately prevents loading delay.
        updateTime()

        // Handles subsequent updates ever 1s.
        clockInterval = setInterval(updateTime, 1000)

        
    }

    // Stopwatch object.
    const Stopwatch = () => {

        // Track running status for clean resume after pause.
        let isRunning = false

        // Countable time variables for stopwatch.
        let hours = minutes = seconds = 0

        // Start Control.
        const start = () => {
            // Avoids simultaneous timer intervals.
            if (clockInterval) return

            const updateTicks = () => {
                renderDisplay(hours, minutes, seconds)
                    
                if (seconds < 59) seconds++
                else if (minutes < 59) seconds = 0, minutes++
                else if (hours < 23) minutes = seconds = 0, hours++ 
                else clearTimer(), hours = minutes = seconds = 0, renderDisplay()
                
            }
                
            // Calling immidiately for first run.
            if (!isRunning) updateTicks()
            clockInterval = setInterval(updateTicks, 1000)
            isRunning = true
        }

        // Pause Control.
        const pause = () => { clearTimer() }

        // Reset Control.
        const reset = () => {
            clearTimer()
            hours = minutes = seconds = 0
            renderDisplay()
            isRunning = false
        }
        
        // Return Controls.
        return {start, pause, reset}
    }

    // Creating stopwatch instance.
    const stopwatch = Stopwatch() 

    // Render Stopwatch.
    const renderStopwatch = () => {
        clearTimer()
        stopwatchControls.classList.remove('hidden')
        timerControls.classList.add('hidden')

        // Resets Display.
        stopwatch.reset()
    }

    // Render Timer.
    const renderTimer = () => {
        clearTimer()
        stopwatchControls.classList.add('hidden')
        timerControls.classList.remove('hidden')
        
        displayEL.textContent = '00:00:00'
    }

    // Default render on page load.
    renderClock()


    // Single EventListener handles all events.
    document.addEventListener('click', (e) => {
        const targetId = e.target.id

        const modeButtons = document.querySelectorAll('.mode-btn')
        const setMode = (mode) => modeButtons.forEach((btn) => btn.classList.toggle('active', btn.id === mode))

        // Event Logic for nav.
        if (targetId === 'clock') {
        renderClock()
        setMode(targetId)
        } else if (targetId === 'stopwatch') {
        setMode(targetId)
        renderStopwatch()
        } else if (targetId === 'timer') {
        setMode(targetId)
        renderTimer()
        }

        // Event Logic for Stopwatch controls.
        if (targetId === 'start-stopwatch') {
            stopwatch.start()
        }else if (targetId === 'pause-stopwatch') {
            stopwatch.pause()
        }else if (targetId === 'reset-stopwatch') {
            stopwatch.reset()
        }
    })

})
