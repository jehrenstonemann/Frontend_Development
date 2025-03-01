const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p><strong>{props.major}</strong></p>
        <p>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin ? "is" : "is NOT"} from Wisconsin.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {
                props.interests.map((interest, id) => (
                    <li key={id}>{interest}</li>
                ))
            }
        </ul>
    </div>
}

export default Student;