const Friend = ({ image, extraClass = '' }) => {
    return (
        <img
            className={`col-sm-4 p-1 ${extraClass}`}
            src={image}
            alt="Friend"
        />
    )
}

export default Friend;