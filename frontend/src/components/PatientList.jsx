import { motion } from "motion/react";

function PatientList({
  patients,
  onLoadAppointments,
  onAddPatient,
  onEditPatient,
  onDeletePatient,
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="card-title text-2xl">Patienten</h2>
            <p className="text-sm opacity-60">
              Patienten verwalten und Termine anzeigen
            </p>
          </div>

          <button onClick={onAddPatient} className="btn btn-primary">
            + Patient hinzufügen
          </button>
        </div>

        <div className="divider"></div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Geburtsdatum</th>
                <th>Aktionen</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover"
                >
                  <td>{patient.id}</td>

                  <td className="font-semibold">{patient.name}</td>

                  <td>{patient.email}</td>

                  <td>
                    {new Date(patient.birthDate).toLocaleDateString("de-DE")}
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onLoadAppointments(patient)}
                        className="btn btn-sm btn-outline"
                      >
                        Termine
                      </button>

                      <button
                        onClick={() => onEditPatient(patient)}
                        className="btn btn-sm btn-info btn-outline"
                      >
                        Bearbeiten
                      </button>

                      <button
                        onClick={() => onDeletePatient(patient)}
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
      </div>
    </div>
  );
}

export default PatientList;
