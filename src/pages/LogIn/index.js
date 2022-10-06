import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { Link } from "react-router-dom";

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
    }
  }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
          <svg style={{margin:"auto"}}width="350" height="350" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="150" height="150" fill="white"/>
<path d="M20.3235 97L27.5678 53.3636H46.4031C49.6417 53.3636 52.3761 53.9531 54.6062 55.1321C56.8363 56.3111 58.4414 58.0085 59.4215 60.2244C60.4016 62.4403 60.636 65.0966 60.1246 68.1932C59.6133 71.3182 58.484 73.9531 56.7369 76.098C55.0039 78.2287 52.7951 79.848 50.1104 80.956C47.44 82.0497 44.4428 82.5966 41.119 82.5966H29.869L31.4031 73.392H40.2667C41.6587 73.392 42.8803 73.2216 43.9315 72.8807C44.9826 72.5256 45.8349 71.9716 46.4883 71.2188C47.1417 70.4517 47.5678 69.4432 47.7667 68.1932C47.9656 66.9432 47.8661 65.9276 47.4684 65.1463C47.0707 64.3509 46.4102 63.7685 45.4869 63.3991C44.5636 63.0156 43.4201 62.8239 42.0565 62.8239H37.8803L32.1701 97H20.3235ZM49.2156 76.9716L56.8008 97H43.9315L36.6019 76.9716H49.2156ZM67.8058 97.6818C66.1438 97.6818 64.7873 97.1065 63.7362 95.956C62.6992 94.7912 62.266 93.3778 62.4364 91.7159C62.6069 90.0966 63.3384 88.7116 64.631 87.5611C65.9379 86.4105 67.4222 85.8352 69.0842 85.8352C70.6609 85.8352 71.9748 86.4105 73.0259 87.5611C74.0913 88.7116 74.5387 90.0966 74.3683 91.7159C74.2546 92.8239 73.864 93.8324 73.1964 94.7415C72.543 95.6364 71.7333 96.3537 70.7674 96.8935C69.8157 97.419 68.8285 97.6818 67.8058 97.6818ZM124.738 53.3636L117.493 97H107.607L95.6751 74.0739H95.4194L91.5842 97H79.7376L86.9819 53.3636H97.0387L108.8 76.2045H109.141L112.891 53.3636H124.738ZM129.915 97.6818C128.253 97.6818 126.897 97.1065 125.846 95.956C124.809 94.7912 124.375 93.3778 124.546 91.7159C124.716 90.0966 125.448 88.7116 126.74 87.5611C128.047 86.4105 129.532 85.8352 131.194 85.8352C132.77 85.8352 134.084 86.4105 135.135 87.5611C136.201 88.7116 136.648 90.0966 136.478 91.7159C136.364 92.8239 135.973 93.8324 135.306 94.7415C134.652 95.6364 133.843 96.3537 132.877 96.8935C131.925 97.419 130.938 97.6818 129.915 97.6818Z" fill="#4F46E5"/>
</svg>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Entre para compartilhar e experimentar deliciosas receitas
            </h2>
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
                <p>Criar Usuario</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
