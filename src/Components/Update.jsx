import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup"; 

const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    mobile: yup.string().required("Mobile is required").matches(/^\d{10}$/, "Invalid mobile number"),
  })

const Update = ({fill ,setfill}) => {
    const [errors, setErrors] = useState({ name: '', address: '', mobile: '' });
    const API_URL = "https://656dc64dbcc5618d3c23ec70.mockapi.io/v1/users";

    const navigate = useNavigate();
    const  fill_value=(event)=>{
        const {name,value} = event.target;
        setfill((values) => ({
              ...values,
              [name]: value,
          }));

          validationSchema
          .validateAt(name, { [name]: value })
          .then(() => setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })))
          .catch((error) => setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message })));
      
      }

      const updateData = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.put(`${API_URL}/${fill.id}`, fill);
          console.log('API Response:', response.data); // Log the response
          alert('Updated successfully');
          navigate('/view');
        } catch (error) {
          // Handle the error (e.g., show an error message)
          if (error.name === 'ValidationError') {
            // Handle validation errors
            const fieldErrors = {};
            error.inner.forEach((e) => {
              fieldErrors[e.path] = e.message;
            });
            setErrors(fieldErrors);
          } else {
            console.error('Error updating user:', error);
            // Handle other errors
          }
        }
      };
      
      

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-700">
      <h1 className="text-3xl text-center text-white">Update User</h1>
      <div className="flex flex-col w-1/2 p-8 mt-5 rounded-lg bg-slate-500">
        <form className='text-center' onSubmit={(e)=>updateData(e)}>
          <input
            type="text"
            placeholder="name"
            onChange={fill_value}
            autoComplete="off"
            className="w-full p-3 mb-5 text-white placeholder-white bg-transparent border-2 border-white rounded-md outline-none"
            name="name"
value={fill.name}
          />
             {errors.name && <div className="mb-2 text-red-500">{errors.name}</div>}
          <input
            type="text"
            placeholder="Location "
            onChange={fill_value}
            autoComplete=""
            className="w-full p-3 mb-5 text-white placeholder-white bg-transparent border-2 border-white rounded-md outline-none"
            name="address"
       value={fill.address}
          />
{errors.address && <div className="mb-2 text-red-500">{errors.address}</div>}
          <input
            placeholder="Enter Mobile Number"
            onChange={fill_value}
            autoComplete="new-password"
            className="w-full p-3 mb-5 text-white placeholder-white bg-transparent border-2 border-white rounded-md outline-none"
            type="text"
            name="mobile"
           value={fill.mobile}
          />
           {errors.mobile && <div className="mb-2 text-red-500">{errors.mobile}</div>}
          <button
           
            className="w-1/2 px-8 py-2 mx-auto text-center bg-white border border-white rounded text-slate-700 hover:border-transparent"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
      
    
  )
}

export default Update
