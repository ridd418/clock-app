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
    const renderDisplay = (hours, minutes, seconds) => {
        const formatTIme = (time) => String(time).padStart(2, '0')
        displayEL.textContent = `${formatTIme(hours)}:${formatTIme(minutes)}:${formatTIme(seconds)}`
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

        // Track running status
        let isRunning = false

        // Countable time variables for stopwatch.
        let hours = 0, minutes = 0, seconds = 0

        // Renders to Display when called.
        const renderTicks = () => renderDisplay(hours, minutes, seconds)
        
        // Reset h,m,s hand.
        const resetHMS = (h, m, s) => {
            hours = h
            minutes = m
            seconds = s            
        }

        // Start Control.
        const start = () => {
            // Avoids simultaneous timer intervals.
            if (clockInterval !== null) return

            const updateTicks = () => {
                renderTicks()
                    
                if (seconds < 59) {
                    seconds++
                }else if (minutes < 59) {
                    resetHMS(hours, minutes, 0)
                    minutes++
                }else if (hours < 23) {
                    resetHMS(hours, 0, 0)
                    hours++
                }else {
                    clearTimer()
                    resetHMS(0, 0, 0)
                    renderTicks()
                } 
            }
                
            // Calling immidiately for first run, same as clock.
            if (!isRunning) updateTicks()
            clockInterval = setInterval(updateTicks, 1000)
            isRunning = true
        }

        // Pause Control.
        const pause = () => {
            clearTimer()
            isRunning = false
        }

        // Reset Control.
        const reset = () => {
            clearTimer()
            resetHMS(0, 0, 0)
            renderTicks()
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
