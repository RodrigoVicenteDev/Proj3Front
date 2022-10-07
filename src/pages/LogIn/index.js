import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { Link } from "react-router-dom";
import style from "./style.module.css";

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
      const response = await api.post("usuario/login", form);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/profile");
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);
    }
  }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        
        <div
          className="w-full max-w-xl space-y-8"
          style={{ margin: "auto", textAlign: "center" }}
        >
          <h1 className={style.logo}>
            <spam style={{ color: "#4F46E5" }}>L</spam>a
            <span style={{ color: "#4F46E5" }}>R</span>ecette
          </h1>

          <div style={{ margin: "auto", textAlign: "center" }}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Entre para compartilhar e experimentar deliciosas receitas
            </h2>
            <div
          className="w-full max-w-xl space-y-8"
          style={{ margin: "auto", textAlign: "center" }}
        >
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={form.email}
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={form.password}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
              <Link to="/usuario/signup">
                <div style={{textAlign:"sart"}}>
                <p >Criar Usuario</p>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default LogIn;
