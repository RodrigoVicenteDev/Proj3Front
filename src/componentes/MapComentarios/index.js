import ComentariosComponente from "../comentariosComponentes";
function MapComentarios({ idreceita, setComentarios, comentariosarray, reload, setReload}) {
return(
  <ComentariosComponente idreceita={idreceita} setComentarios={setComentarios} comentariosarray={comentariosarray} reload={ reload} setReload={setReload}/>
)
}
export default MapComentarios;