import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PaginaPrincipal() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(false);
    async function fetchreceitas() {
      try {
        const response = await api.get("/receita/todas");
        setReceitas(response.data);
      } catch (error) {
        console.log(error);
      }
      setloading(true);
    }
    fetchreceitas();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Todas as Receitas 
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading &&
            receitas.map((element) => {
              return (
                <div key={element._id} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={element.imagemurl}
                      alt="..."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/receita/detalhe/${element._id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {element.nome}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {element.dificuldade}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                     {element.tempo} min
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
