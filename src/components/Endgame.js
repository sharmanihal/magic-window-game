export default function Endgame({turns}) {
    return (
        <div className='gameend'>
            <p>Congratulations! You won.</p>
            <p>Turns: {turns}</p>
        </div>
    )
}
