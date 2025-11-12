
function Contacto () {

    return(
        <div className="p-4 my-3 border rounded shadow">
        <h3 className="mb-3">Formulario de Contacto</h3>
        <input type="text" className="form-control mb-3" placeholder="Nombre" />
        <input type="text" className="form-control mb-2" placeholder="Mensaje" />
        <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" />
        <button className="btn btn-success w-100">Enviar</button>
        </div>
    )
}       

export default Contacto; 
