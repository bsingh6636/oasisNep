
import React, { useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import {Input} from "../../component/ui/input"
import { Button } from "../../component/ui/button"
import { postRequest } from "../../services.js/axios"

const signUpFields = [
   'email', 'password', 'confirmPassword', 'username', 'phone', 'fullName'
]
const signInFields = [
  'email', 'password'
]



const SignIn = () =>{
  const [formData ,setFormData] = useState({
    email : "",
    password : "",
    confirmPassword : "",
    username : "",
    phone : "",
    fullName : "",
  })

  const [state , setState ] = useState({
    isSignIn : false,
    error : null,
  })

  const location = useLocation()


  const updateState = updates => {
    setState(prev => ({
      ...prev,
      ...updates
    }))
  }

  React.useEffect(()=>{
    if(location.pathname === "/signup"){
      updateState({
        isSignIn : false
      })
    }
  },[])

  const onSumit = () =>{
     const { isValid , error } = validateInputs(state.isSignIn, formData);

     if(!isValid){
      console.log(isValid , error)
      return updateState({ error })
     }
     signin()
  }

  const signin = async () =>{
    try {
      const api = state.isSignIn ? 'user/signin' : 'user/signup';
    const res = await postRequest(api, formData);
    console.log(res);
    } catch (error) {
      console.log(error)
    }
  }


  const { isSignIn } = state
  const fildToMap = isSignIn ? signInFields : signUpFields
  return (
    <div>
      Sign {isSignIn ? "In" : "Up"}
      {fildToMap.map((field) => (
        <div key={field}>
          <label>{field}</label>
          <Input type="text" name={field} value={formData[field]} onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))} />
        </div>
      ))}
      <Button onClick={onSumit} >Sign {isSignIn ? "In" : "Up"}</Button>
    </div>
  )
}

export default SignIn;

const validateInputs = (isSignIn, values) => {
  const requiredFields = isSignIn ? signInFields : signUpFields;
  const error = {};

  // Check for empty fields
  requiredFields.forEach(field => {
    if (!values[field] || values[field].trim() === '') {
      error[field] = `${field} is required.`;
    }
  });

  // Additional validation for sign-up
  if (!isSignIn) {
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      error.confirmPassword = "Passwords do not match.";
    }

    if (values.password && values.password.length < 6) {
      error.password = "Password must be at least 6 characters.";
    }

    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      error.email = "Invalid email format.";
    }

    if (values.phone && !/^\+?\d{10,15}$/.test(values.phone)) {
      error.phone = "Invalid phone number.";
    }
  }

  const isValid = Object.keys(error).length === 0;

  return {
    isValid,
    error
  };
};
