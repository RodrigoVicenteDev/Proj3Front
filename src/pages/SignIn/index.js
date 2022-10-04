import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";


function SigIn() {
    const navigate = useNavigate()
    const[form, setForm] = useState({
        nome:"",
        email:"",
        password:"",

    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }

      async function handleSubmit(e) {
        e.preventDefault();
        try {
          /* const imgURL = await handleUpload(); */
    
          await api.post("/usuario/signup", { ...form});
    
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      }

    return (  
        <>
        <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input
        name="nome"
        type="text"
        value={form.nome}
        onChange={handleChange}
      />

      <label>E-mail:</label>
      <input
      pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <label>Senha:</label>
      <input
        name="password"
        type="password"
        pattern={`(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$`}
        value={form.password}
        onChange={handleChange}
      />

      {/* <label>Profile Picture:</label>
      <input type="file" onChange={handleImage} />
      {img && <img src={preview} alt="" />}
 */}
      <button type="submit">Cadastrar</button>
    </form>
        </>
    );
}

export default SigIn;