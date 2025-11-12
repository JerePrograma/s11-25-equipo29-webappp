import MetricPanel from "../components/metricpanel.jsx";

import { FaUsers, FaTasks, FaEnvelope } from "react-icons/fa";

function Dashboard() {
  return (  
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-primary">Panel de Métricas</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <MetricPanel titulo="Leads Activos" valor="45" icono={<FaUsers />} color="info" />
        </div>

        <div className="col-md-4">
          <MetricPanel titulo="Tareas Pendientes" valor="12" icono={<FaTasks />} color="warning" />
        </div>

        <div className="col-md-4">
          <MetricPanel titulo="Emails Enviados" valor="89" icono={<FaEnvelope />} color="success" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
