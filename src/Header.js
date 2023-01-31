import Clock from './Clock'
const Header = ({ mode }) => {
    return (mode === 'level' ? <Clock /> : null)
}

export default Header 