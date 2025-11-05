// Ensures App loads after DOM is initialized.
document.addEventListener('DOMContentLoaded', () => {
    console.log('App Ready!')

    // Taking control of necessary elements.
    const displayEL = document.getElementById('display')
    const stopwatchControls = document.getElementById('stopwatch-controls')
    const timerControls = document.getElementById('timer-controls')

    // Store current interval.
    let clockInterval = null
    
    // Shared interval between Clock, Stopwatch, and Timer.
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

        // Calling immediately prevents loading delay.
        updateTime()

        // Handles subsequent updates ever 1s.
        clockInterval = setInterval(updateTime, 1000)

        
    }

    // Stopwatch Factory Function.
    const Stopwatch = () => {

        // Track running status for clean resume after pause.
        let isRunning = false

        // Countable time variables for stopwatch.
        let hours = minutes = seconds = 0

        // Start Control.
        const start = () => {
            // Avoids simultaneous timer intervals.
            if (clockInterval) return

            // Time Update Logic
            const updateTicks = () => {
                renderDisplay(hours, minutes, seconds)
                    
                if (seconds < 59) seconds++
                else if (minutes < 59) seconds = 0, minutes++
                else if (hours < 23) minutes = seconds = 0, hours++ 
                else clearTimer(), hours = minutes = seconds = 0, renderDisplay()
                
            }
                
            // Calling immediately for first run.
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

    // Timer Factory Function.
    const Timer = () => {

        // Track running status for clean resume after pause.
        let isRunning = false

        // Countable time variables for stopwatch.
        let hours = minutes = seconds = 0

        // Storing Input elements.
        const hoursInput = document.getElementById('input-hours')
        const minutesInput = document.getElementById('input-minutes')
        const secondsInput = document.getElementById('input-seconds')

        // Start Control.
        const start = () => {
            // Avoids simultaneous timer intervals.
            if (clockInterval) return

            // Pulling values when not running.
            if (!isRunning) { 
                hours = Number(hoursInput.value) || 0
                minutes = Number(minutesInput.value) || 0
                seconds = Number(secondsInput.value) || 0
                hoursInput.value = minutesInput.value = secondsInput.value = ''
            }    

            // Time Update Logic
            const updateTicks = () => {
                renderDisplay(hours, minutes, seconds)
                    
                if (seconds > 0) seconds--
                else if (minutes > 0) seconds = 59, minutes--
                else if (hours > 0) minutes = seconds = 59, hours-- 
                else clearTimer(), hours = minutes = seconds = 0, renderDisplay()
                
            }
                
            // Calling immediately for first run.
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

    // Creating Timer instance.
    const timer = Timer()

    // Render Timer.
    const renderTimer = () => {
        clearTimer()
        stopwatchControls.classList.add('hidden')
        timerControls.classList.remove('hidden')
        
        // Resets Display.
        timer.reset()
    }

    // Default render on page load.
    renderClock()


    // Single EventListener handles all events.
    document.addEventListener('click', (e) => {
        const targetId = e.target.id

        const modeButtons = document.querySelectorAll('.mode-btn')
        const setMode = (mode) => modeButtons.forEach((btn) => btn.classList.toggle('active', btn.id === mode))

        // Event Logic for nav.
        if (targetId === 'clock') setMode(targetId), renderClock()
        else if (targetId === 'stopwatch') setMode(targetId), renderStopwatch()
        else if (targetId === 'timer') setMode(targetId), renderTimer()

        // Event Logic for Stopwatch controls.
        if (targetId === 'start-stopwatch') stopwatch.start()
        else if (targetId === 'pause-stopwatch') stopwatch.pause()
        else if (targetId === 'reset-stopwatch') stopwatch.reset()
        

        // Event Logic for the timer
        if (targetId === 'start-timer') timer.start()
        else if (targetId === 'pause-timer') timer.pause()
        else if (targetId === 'reset-timer') timer.reset()
    })

})
