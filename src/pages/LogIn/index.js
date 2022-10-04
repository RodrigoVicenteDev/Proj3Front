import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";

function LogIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
      });

      function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    

      async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post("usuario/login", form)
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            navigate("/profile")
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
        />

        <button type="submit">Login</button>
      </form>
    </div>

      );
}

export default LogIn;