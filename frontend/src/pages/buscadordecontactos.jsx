<section className="d-flex justify-content-between align-items-center mb-4">
  <input
    type="text"
    placeholder="Buscar contacto..."
    className="form-control w-50"
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
  />
  <button className="btn btn-dark" onClick={() => setModalAgregar(true)}>
    + Nuevo contacto
  </button>
</section>
