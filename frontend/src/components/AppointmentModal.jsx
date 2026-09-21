import { useState } from "react";
function AppointmentModal({
  onClose,
  patient,
  onAppointmentCreated,
  setApiLog,
}) {
  const [formData, setFormData] = useState({
    date: "",
    reason: "",
  });

  const handleSubmit = async () => {
    if (!formData.date || !formData.reason.trim()) {
      return;
    }
    try {
      const requestData = {
        date: new Date(formData.date).toISOString(),
        reason: formData.reason,
        patientId: patient.id,
      };

      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      setApiLog({
        method: "POST",
        endpoint: "/appointments",
        status: response.status,
        statusText: response.statusText,
        request: requestData,
        response: data,
      });

      if (response.ok) {
        onAppointmentCreated(data);
        onClose();
      }
    } catch (error) {
      console.error("Fehler beim Erstellen des Termins:", error);
    }
  };

  return (
    <div className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xl mb-5">Neuen Termin hinzufügen</h3>

        <p className="text-sm opacity-60">
          Termin für{" "}
          <span className="font-semibold text-base-content">
            {patient.name}
          </span>{" "}
          erstellen
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
            Termin speichern
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentModal;
