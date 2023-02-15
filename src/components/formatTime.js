const SECONDS_TO_HOURS = 3600
const SECONDS_TO_MINUTES = 60

export default function formatTime(time) {
    return `${getHours(time)} : ${getMinutes(time)} : ${getSeconds(time)}`

    function getHours(time) {
        let hours = Math.floor(time / SECONDS_TO_HOURS)
        return (hours < 10 ? '0' : '') + hours
    }
    
    function getMinutes(time) {
        /**
         * finds remainder of seconds after
         * converting them to hours, then converts
         * those seconds to minutes
         */
        let minutes = Math.floor(time % SECONDS_TO_HOURS / SECONDS_TO_MINUTES)
        return (minutes < 10 ? '0' : '') + minutes
    }
    
    function getSeconds(time) {
        let seconds = time % SECONDS_TO_MINUTES
        return (seconds < 10 ? '0' : '') + seconds
    }
}