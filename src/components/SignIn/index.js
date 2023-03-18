import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';

const SignIn = ({signUpHandler, setCurrentUser}) => {
    const { register, handleSubmit } = useForm();
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

    const submitHandler = (data) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        }

        let responseIsSuccesfull = true

        fetch("http://127.0.0.1:8000/sign-in", requestOptions)
        .then(response => {
            if (!response.ok){
                responseIsSuccesfull = false                
            }
            return response.json()
        })
        .then(data => {
            if (responseIsSuccesfull){
                setCookie('authToken', data['token'])
                setCurrentUser(data['user'])
            }
            else{
                throw new Error(data["message"])
            }
        })
        .catch(message => (
            alert(message)
        ))

    }

    return (
    <form onSubmit={handleSubmit((data) => submitHandler(data))}>
        <input {...register("email")} placeholder="Email" />
        <br/>
        <input {...register("password")} placeholder="Password" type="password"/>
        <br/>
        <input type="submit" value="Sign In"/>
        <button onClick={signUpHandler}>Sign Up(New User)</button>
    </form>
    )
}

export default SignIn;