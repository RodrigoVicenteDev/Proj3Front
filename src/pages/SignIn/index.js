import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

function SigIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      /* const imgURL = await handleUpload(); */

      await api.post("/usuario/signup", { ...form });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome:
          </label>
          <input
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label style={{ marginTop: "20px" }}
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail:
          </label>
          <input
            pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <label style={{ marginTop: "20px" }}
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Senha:
          </label>
          <input
            name="password"
            type="password"
            pattern={`(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$`}
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">
            Profile Picture:
          </label>
          <input
           className=" form-control
           block
           w-full
           px-3
           py-1.5
           text-base
           font-normal
           text-gray-700
           bg-white bg-clip-padding
           border border-solid border-gray-300
           rounded
           transition
           ease-in-out
           m-0
           focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
            type="file"
            id="formFile"
          />

          <button
            style={{ marginTop: "20px" }}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}

export default SigIn;
