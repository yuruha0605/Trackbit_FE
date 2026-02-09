import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import api from "../../api/axios";

const FORM_FIELDS = [
  { label: "ID", name: "id", type: "text" },
  { label: "Name", name: "name", type: "text" },
  { label: "Job", name: "job", type: "text" },
  { label: "Password", name: "password", type: "password" },
  { label: "What are you interest about?", name: "interest", type: "text" },
];

function SignUp() {
  const [form, setForm] = useState({
    name : '',
    email : '',
    password : ''
  });
  
  const handlerChange = (e) => {
    const {name, value} = e.target ;  
    setForm({...form , [name]: value })
  };

  const moveUrl = useNavigate();

  const handlerSubmit = async (e) => {       
    e.preventDefault() ;
    try{
      const response = await api.post("/users/signUp" , {
        name : form.name ,
        email : form.email,
        password : form.password
      }) 
      moveUrl("/signin"); 
    } catch (err) {
      console.log(">>>> axios err : " , err );    
    }
  }
  return (
    <div className="register-page">
      <form className="register-form">
        <div className="form-grid">
          {FORM_FIELDS.map(({ label, name, type, full }) => (
            <div
              key={name}
              className={`form-field ${full ? "full" : ""}`}
            >
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={name}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
