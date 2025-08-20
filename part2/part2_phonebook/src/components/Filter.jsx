export const Filter = (props) => {
    return (
    <div>
        <form>
            <div>
               filter shown with <input type="text" onChange={props.function}/>
            </div>
        </form>
    </div>
    )
}