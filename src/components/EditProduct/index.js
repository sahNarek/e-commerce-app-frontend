import { useForm } from "react-hook-form";

const EditProduct = ( {getProducts, productId, closeForm} ) => {
    const { register, handleSubmit } = useForm();
    // const [data, setData] = useState("");

    const submitHandler = (data) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"product":  data })
        }

        let responseIsSuccesfull = true

        fetch(`http://127.0.0.1:8000/product/${productId}`, requestOptions)
        .then(response => {
            if (!response.ok){
                responseIsSuccesfull = false                
            }
            return response.json()
        })
        .then(data => {
            if (responseIsSuccesfull){
                alert(data["message"])
                closeForm()
                getProducts()
            }
            else{
                throw new Error(data["message"])
            }
        })
        .catch(message => {
            alert(message)
            closeForm()
        })

    }

    return (
        <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <input {...register("name")} placeholder="Product name" />
            <br/>
            <input {...register("price")} placeholder="Product price" />
            <br/>
            <input type="number" min="1" {...register("in_stock_quantity")} placeholder="Product quantity" />
            <br/>
          <input type="submit"/>
        </form>
    );
}

export default EditProduct