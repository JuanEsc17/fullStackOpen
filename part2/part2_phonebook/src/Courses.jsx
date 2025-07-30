const Course = ({ course }) =>{
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>{course.parts.map((part) => {
                return (
                    <li key={part.id}>
                        <p>{part.name} {part.exercises}</p>
                    </li>
                )
            }
            )}</ul>
            <strong>
                Total of {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises 
            </strong>
        </div>
    )
}

const Courses = ( { courses }) => {
    return (
        <div>
            {courses.map((course) => {
                return <Course key={course.id} course={course}/>
            }
        )}
        </div>
    )
}

export default Courses