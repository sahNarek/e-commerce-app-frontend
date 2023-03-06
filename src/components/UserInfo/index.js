const UserInfo = ({currentUser, logOutHandler}) => {

    return (
        <div>
            <h1>Hi {currentUser?.name}, Welcome to our shop !</h1>
            <button onClick={logOutHandler}>Log out </button>
        </div>
    )

};

export default UserInfo;