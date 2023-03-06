import { useForm } from "react-hook-form";

const SignUp = ({signInHandler}) => {
    const { register, handleSubmit } = useForm();
    // const [data, setData] = useState("");

    const submitHandler = (data) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        }

        let responseIsSuccesfull = true

        fetch("http://127.0.0.1:5000/sign-up", requestOptions)
        .then(response => {
            if (!response.ok){
                responseIsSuccesfull = false                
            }
            return response.json()
        })
        .then(data => {
            if (responseIsSuccesfull){
                alert(data["message"])
                // getProducts()
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
        <input {...register("name")} placeholder="Name" />
        <br/>
        <input {...register("email")} placeholder="Email" />
        <br/>
        <input {...register("password")} placeholder="Password" type="password"/>
        <br/>
        <input type="submit" value="Sign Up"/>
        <button onClick={signInHandler}>Switch to Sign in</button>
    </form>
    )
}

export default SignUp;