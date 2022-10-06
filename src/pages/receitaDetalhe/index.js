import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReceitaEditar from "../ReceitaEditar";
import ComentarioCriar from "../ComentarioCriar";
import MapComentarios from "../../componentes/MapComentarios";
import style from "./style.module.css";
import Receitascriar from "../ReceitaCriar";

function ReceitaDetalhe() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [receita, setReceita] = useState({});
  const [form, setForm] = useState({});
  const [comentariosarray, setComentarios] = useState([]);
  const [editar, setEditar] = useState(false);
  const[reload, setReload] = useState(false)

  useEffect(() => {
    setLoading(false);
    async function fetchreceita() {
      try {
        const response = await api.get(`/receita/busca/${id}`);
        const rescomentarios = await api.get(`/comentario/popular/${id}`);
        setComentarios(rescomentarios.data);
        setReceita(response.data);
        setForm(response.data);
        console.log(rescomentarios.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(true);
    }
    fetchreceita();
  }, [reload]);

  async function handleFavoritas(){
    try {
      await api.put(`/receita/favoritos/adicionar/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(editar);
  return (
    <>
      
       
          <div className={style.container}>
            <h1 className={style.tituloprincipal}>{receita.nome}</h1>
            <div className={style.flex}>
            <img className={style.img} src={receita.imagemurl} alt="..." />
            <div className={style.div}>
            {loading&&(
              <>
            <p><b> Autor:</b> {receita.autor.nome}</p>
            <p><b>categoria:</b> {receita.categoria}</p>
           <p><b>dificuldade:</b> {receita.dificuldade}</p> 
           <p><b>Tempo de preparo:</b> {receita.tempo} min</p>
           <p><b>Rende:</b> {receita.porcoes} porções</p>
           <p><b>Likes:</b> {receita.favoritos}</p>

           </>
           )}
            </div>
            </div>
            <h2>Ingredientes</h2>
            <ul>
            
            {loading && ( receita.ingredientes.map((element) => {
                return <li>{element}</li>;
              }))}
            </ul>
            <h2>Modo de preparo</h2>
            <ol>
            {loading && ( receita.preparo.map((element) => {
                return <li>{element}</li>;
              }))}
            </ol>
            <button
            className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                setEditar(!editar);
              }}
            >
              Editar Receita
            </button>
            <button
            className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleFavoritas}
            >
              Adicionar as favoritas
            </button>
          </div>
          
          {editar && (
            <ReceitaEditar
              id={id}
              form={form}
              loading={loading}
              setForm={setForm}
              show={editar}
              setShow={setEditar}
            />
          )}
          {loading && (
            <div className={style.container}>
              <MapComentarios
                idreceita={id}
                comentariosarray={comentariosarray}
                setComentarios={setComentarios}
                reload={reload}
                setReload={setReload}
              />
             <p></p>
              <ComentarioCriar id={id} reload={reload} setReload={setReload} />
            </div>
            )}
          
        
        
    </>
  );
}


export default ReceitaDetalhe;
