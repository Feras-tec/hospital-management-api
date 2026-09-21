import { useState } from "react";

function PatientModal({
  onClose,
  onPatientCreated,
  onPatientUpdated,
  setApiLog,
  patient = null,
}) {
  const isEditMode = Boolean(patient);

  const [formData, setFormData] = useState({
    name: patient?.name ?? "",
    email: patient?.email ?? "",
    birthDate: patient?.birthDate
      ? new Date(patient.birthDate).toISOString().split("T")[0]
      : "",
  });

  const handleSubmit = async () => {
    const method = isEditMode ? "PATCH" : "POST";
    const endpoint = isEditMode ? `/patients/${patient.id}` : "/patients";

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setApiLog({
        method,
        endpoint,
        status: response.status,
        statusText: response.statusText,
        request: formData,
        response: data,
      });

      if (response.ok) {
        if (isEditMode) {
          onPatientUpdated(data);
        } else {
          onPatientCreated(data);
        }

        onClose();
      }
    } catch (error) {
      console.error(
        isEditMode
          ? "Fehler beim Aktualisieren des Patienten:"
          : "Fehler beim Erstellen des Patienten:",
        error,
      );
    }
  };

  return (
    <div className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xl mb-5">
          {isEditMode ? "Patient bearbeiten" : "Neuen Patienten hinzufügen"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="label">Name</label>

            <input
              type="text"
              placeholder="Max Mustermann"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="label">E-Mail</label>

            <input
              type="email"
              placeholder="max@example.com"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="label">Geburtsdatum</label>

            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  birthDate: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Abbrechen
          </button>

          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEditMode ? "Änderungen speichern" : "Patient speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientModal;
