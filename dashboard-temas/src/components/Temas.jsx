import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';

//Componente para mostrar la información
const Temas = ({ apiUrl }) => {
  const { data: temas, loading, error } = useFetch(apiUrl);
  const [filters, setFilters] = useState({
    display_name: "",
    title: "",
    subscribers: "",
    active_user_count: "",
  });

  const [selectedTema, setSelectedTema] = useState(null); 

  if (loading) return <p className="text-center mt-4">Cargando...</p>;
  if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

  const filteredTemas = Array.isArray(temas)
    ? temas.filter((tema) => 
        tema.display_name.toLowerCase().includes(filters.display_name.toLowerCase()) &&
        tema.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (!filters.subscribers || tema.subscribers?.toString().includes(filters.subscribers)) &&
        (!filters.active_user_count || (tema.active_user_count?.toString() ?? "").includes(filters.active_user_count))
      )
    : [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowClick = (tema) => setSelectedTema(tema);
  const handleCloseModal = () => setSelectedTema(null);

  const renderField = (label, value, isBoolean = false) => (
    <div className="col-md-6 mb-2">
      <strong>{label}:</strong>{" "}
      {isBoolean ? (
        <span className={value ? "text-success fw-bold" : "text-danger fw-bold"}>
          {value ? "Yes" : "No"}
        </span>
      ) : (
        <span>{value ?? "N/A"}</span>
      )}
    </div>
  );

  return (
    <div
      className="container mt-5 p-4"
      style={{
        background: "linear-gradient(145deg, #e0e7ff, #f5f7fa)",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      }}
    >
      <h2 className="mb-4 text-center text-primary" style={{ fontWeight: "700", letterSpacing: "1px" }}>
        Dashboard de Temas
      </h2>

      {/* Tabla */}
      <div className="table-responsive" style={{ maxHeight: "600px", overflowY: "auto" }}>
        <table className="table table-hover table-bordered align-middle" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <thead className="table-dark sticky-top">
            <tr>
              <th>
                Display Name
                <input
                  type="text"
                  name="display_name"
                  value={filters.display_name}
                  onChange={handleFilterChange}
                  className="form-control mt-1"
                  placeholder="Filtrar..."
                  style={{ borderRadius: "5px" }}
                />
              </th>
              <th>
                Title
                <input
                  type="text"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                  className="form-control mt-1"
                  placeholder="Filtrar..."
                  style={{ borderRadius: "5px" }}
                />
              </th>
              <th>
                Subscribers
                <input
                  type="text"
                  name="subscribers"
                  value={filters.subscribers}
                  onChange={handleFilterChange}
                  className="form-control mt-1"
                  placeholder="Filtrar..."
                  style={{ borderRadius: "5px" }}
                />
              </th>
              <th>
                Active Users
                <input
                  type="text"
                  name="active_user_count"
                  value={filters.active_user_count}
                  onChange={handleFilterChange}
                  className="form-control mt-1"
                  placeholder="Filtrar..."
                  style={{ borderRadius: "5px" }}
                />
              </th>
              <th>Over 18</th>
              <th>Allow Videos</th>
              <th>Allow Images</th>
              <th>Allow Polls</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemas.map((tema, index) => (
              <tr
                key={tema.id}
                onClick={() => handleRowClick(tema)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f4f8",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                className="hover-shadow"
              >
                <td>{tema.display_name}</td>
                <td>{tema.title}</td>
                <td>{tema.subscribers}</td>
                <td>{tema.active_user_count ?? "N/A"}</td>
                <td>{tema.over18 ? "Yes" : "No"}</td>
                <td>{tema.allow_videos ? "Yes" : "No"}</td>
                <td>{tema.allow_images ? "Yes" : "No"}</td>
                <td>{tema.allow_polls ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedTema && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTema.display_name}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <div className="row">
                  {renderField("Display Name", selectedTema.display_name)}
                  {renderField("Title", selectedTema.title)}
                  {renderField("Subscribers", selectedTema.subscribers)}
                  {renderField("Active Users", selectedTema.active_user_count)}
                  {renderField("Over 18", selectedTema.over18, true)}
                  {renderField("Allow Videos", selectedTema.allow_videos, true)}
                  {renderField("Allow Images", selectedTema.allow_images, true)}
                  {renderField("Allow Polls", selectedTema.allow_polls, true)}
                  {renderField("Public Description", selectedTema.public_description)}
                  {renderField("Description HTML", selectedTema.description_html)}
                  {renderField("URL", selectedTema.url)}
                  {renderField("Created UTC", selectedTema.created_utc)}
                  {renderField("Subscribers", selectedTema.subscribers)}
                  {/* Puedes agregar más campos aquí */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Temas;
