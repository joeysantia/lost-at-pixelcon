export default function formatTime(time) {
    return `${getHours(time)} : ${getMinutes(time)} : ${getSeconds(time)}`

    function getHours(time) {
        let hours = Math.floor(time / 3600)
        return (hours.length < 2 ? '0' : '') + hours
    }
    
    function getMinutes(time) {
        let minutes = Math.floor(time % 3600 / 60)
        return (minutes.length < 2 ? '0' : '') + minutes
    }
    
    function getSeconds(time) {
        let seconds = time % 60
        return (seconds.length < 2 ? '0' : '') + seconds
    }
}