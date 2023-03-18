import { useForm } from "react-hook-form";

const AddProduct = ( {getProducts} ) => {
    const { register, handleSubmit } = useForm();
    // const [data, setData] = useState("");

    const submitHandler = (data) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"product":  data })
        }

        let responseIsSuccesfull = true

        fetch("http://127.0.0.1:8000/products", requestOptions)
        .then(response => {
            if (!response.ok){
                responseIsSuccesfull = false                
            }
            return response.json()
        })
        .then(data => {
            if (responseIsSuccesfull){
                alert(data["message"])
                getProducts()
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
            <input {...register("name")} placeholder="Product name" />
            <br/>
            <input {...register("price")} placeholder="Product price" />
            <br/>
            <input type="number" min="1" {...register("in_stock_quantity")} placeholder="Product quantity" />
            <br/>
          <input type="submit" value="Add"/>
        </form>
    );
}

export default AddProduct