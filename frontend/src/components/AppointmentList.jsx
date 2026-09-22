import { motion } from "motion/react";

function AppointmentList({
  selectedPatient,
  appointments,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="card-title text-2xl">Termine</h2>

            <p className="text-sm opacity-60">
              Termine eines Patienten anzeigen
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={onAddAppointment}
            disabled={!selectedPatient}
          >
            + Termin hinzufügen
          </button>
        </div>

        <div className="divider"></div>

        {!selectedPatient ? (
          <div className="text-center opacity-50 py-10">
            Wähle zuerst einen Patienten aus.
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="font-semibold">
                Patient: {selectedPatient.name}
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center opacity-50 py-10">
                Keine Termine vorhanden.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Datum</th>
                      <th>Grund</th>
                      <th>Aktionen</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => (
                      <motion.tr
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover"
                      >
                        <td>{appointment.id}</td>

                        <td>
                          {new Date(appointment.date).toLocaleString("de-DE")}
                        </td>

                        <td>{appointment.reason}</td>

                        <td>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => onEditAppointment(appointment)}
                              className="btn btn-sm btn-info btn-outline"
                            >
                              Bearbeiten
                            </button>

                            <button
                              onClick={() => onDeleteAppointment(appointment)}
                              className="btn btn-sm btn-error btn-outline"
                            >
                              Löschen
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentList;
