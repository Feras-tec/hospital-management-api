import { useState } from "react";

function AppointmentModal({
  onClose,
  patient,
  appointment = null,
  onAppointmentCreated,
  onAppointmentUpdated,
  setApiLog,
}) {
  const isEditMode = Boolean(appointment);

  const [formData, setFormData] = useState({
    date: appointment?.date
      ? new Date(appointment.date).toISOString().slice(0, 16)
      : "",
    reason: appointment?.reason ?? "",
  });

  const handleSubmit = async () => {
    if (!formData.date || !formData.reason.trim()) {
      return;
    }

    const method = isEditMode ? "PATCH" : "POST";

    const endpoint = isEditMode
      ? `/appointments/${appointment.id}`
      : "/appointments";

    try {
      const requestData = {
        date: new Date(formData.date).toISOString(),
        reason: formData.reason.trim(),
        patientId: patient.id,
      };

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      setApiLog({
        method,
        endpoint,
        status: response.status,
        statusText: response.statusText,
        request: requestData,
        response: data,
      });

      if (response.ok) {
        if (isEditMode) {
          onAppointmentUpdated(data);
        } else {
          onAppointmentCreated(data);
        }

        onClose();
      }
    } catch (error) {
      console.error(
        isEditMode
          ? "Fehler beim Aktualisieren des Termins:"
          : "Fehler beim Erstellen des Termins:",
        error,
      );
    }
  };

  return (
    <div className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xl mb-5">
          {isEditMode ? "Termin bearbeiten" : "Neuen Termin hinzufügen"}
        </h3>

        <p className="text-sm opacity-60">
          Termin für{" "}
          <span className="font-semibold text-base-content">
            {patient.name}
          </span>{" "}
          {isEditMode ? "bearbeiten" : "erstellen"}
        </p>

        <div className="space-y-4 mt-5">
          <div>
            <label className="label">Datum und Uhrzeit</label>

            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="label">Grund</label>

            <input
              type="text"
              placeholder="z. B. Kontrolluntersuchung"
              className="input input-bordered w-full"
              value={formData.reason}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reason: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Abbrechen
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!formData.date || !formData.reason.trim()}
          >
            {isEditMode ? "Änderungen speichern" : "Termin speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentModal;
