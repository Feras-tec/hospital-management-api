import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ApiConsole from "./components/ApiConsole";
import PatientModal from "./components/PatientModal";
import AppointmentModal from "./components/AppointmentModal";
import PatientList from "./components/PatientList";
import AppointmentList from "./components/AppointmentList";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [apiLog, setApiLog] = useState({
    method: "GET",
    endpoint: "/patients",
    status: null,
    statusText: "",
    request: null,
    response: null,
  });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await fetch("http://localhost:3000/patients");
        const data = await response.json();

        setApiLog({
          method: "GET",
          endpoint: "/patients",
          status: response.status,
          statusText: response.statusText,
          request: null,
          response: data,
        });

        setPatients(data);
      } catch (error) {
        console.error("Fehler beim Laden der Patienten:", error);
      }
    };

    loadPatients();
  }, []);

  const loadAppointments = async (patient) => {
    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patient.id}/appointments`,
      );

      const data = await response.json();

      setApiLog({
        method: "GET",
        endpoint: `/patients/${patient.id}/appointments`,
        status: response.status,
        statusText: response.statusText,
        request: null,
        response: data,
      });

      setSelectedPatient(patient);

      if (response.ok && Array.isArray(data)) {
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Termine:", error);
      setAppointments([]);
    }
  };

  const deletePatient = async (patient) => {
    const confirmed = window.confirm(
      `Möchten Sie ${patient.name} wirklich löschen?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patient.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      setApiLog({
        method: "DELETE",
        endpoint: `/patients/${patient.id}`,
        status: response.status,
        statusText: response.statusText,
        request: null,
        response: data,
      });

      if (response.ok) {
        setPatients((prevPatients) =>
          prevPatients.filter(
            (currentPatient) => currentPatient.id !== patient.id,
          ),
        );

        if (selectedPatient?.id === patient.id) {
          setSelectedPatient(null);
          setAppointments([]);
        }
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Patienten:", error);
    }
  };
  const deleteAppointment = async (appointment) => {
    const confirmed = window.confirm(
      `Möchten Sie den Termin "${appointment.reason}" wirklich löschen?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/appointments/${appointment.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      setApiLog({
        method: "DELETE",
        endpoint: `/appointments/${appointment.id}`,
        status: response.status,
        statusText: response.statusText,
        request: null,
        response: data,
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (currentAppointment) => currentAppointment.id !== appointment.id,
          ),
        );
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Termins:", error);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold">Hospital Management</h1>

          <p className="text-base-content/60 mt-1">
            Patienten und Termine verwalten
          </p>
        </motion.div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hospital UI */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Statistics */}
            <div className="stats stats-vertical sm:stats-horizontal shadow bg-base-100 w-full">
              <div className="stat">
                <div className="stat-title">Patienten</div>
                <div className="stat-value">{patients.length}</div>
                <div className="stat-desc">Registrierte Patienten</div>
              </div>

              <div className="stat">
                <div className="stat-title">Termine</div>
                <div className="stat-value">{appointments.length}</div>
                <div className="stat-desc">Aktuelle Termine</div>
              </div>
            </div>

            {/* Patients */}
            <PatientList
              patients={patients}
              onLoadAppointments={loadAppointments}
              onAddPatient={() => setShowPatientForm(true)}
              onEditPatient={(patient) => setEditingPatient(patient)}
              onDeletePatient={deletePatient}
            />

            {/* Appointments */}
            <AppointmentList
              selectedPatient={selectedPatient}
              appointments={appointments}
              onAddAppointment={() => setShowAppointmentForm(true)}
              onEditAppointment={(appointment) =>
                setEditingAppointment(appointment)
              }
              onDeleteAppointment={deleteAppointment}
            />
          </motion.section>

          {/* API Console */}
          <section className="lg:col-span-1">
            <ApiConsole apiLog={apiLog} />
          </section>
        </div>
      </div>

      {showPatientForm && (
        <PatientModal
          onClose={() => setShowPatientForm(false)}
          onPatientCreated={(newPatient) =>
            setPatients((prevPatients) => [...prevPatients, newPatient])
          }
          setApiLog={setApiLog}
        />
      )}

      {editingPatient && (
        <PatientModal
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
          onPatientUpdated={(updatedPatient) => {
            setPatients((prevPatients) =>
              prevPatients.map((patient) =>
                patient.id === updatedPatient.id ? updatedPatient : patient,
              ),
            );

            if (selectedPatient?.id === updatedPatient.id) {
              setSelectedPatient(updatedPatient);
            }
          }}
          setApiLog={setApiLog}
        />
      )}

      {showAppointmentForm && (
        <AppointmentModal
          onClose={() => setShowAppointmentForm(false)}
          patient={selectedPatient}
          onAppointmentCreated={(newAppointment) =>
            setAppointments((prevAppointments) => [
              ...prevAppointments,
              newAppointment,
            ])
          }
          setApiLog={setApiLog}
        />
      )}
      {editingAppointment && (
        <AppointmentModal
          patient={selectedPatient}
          appointment={editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onAppointmentUpdated={(updatedAppointment) => {
            setAppointments((prevAppointments) =>
              prevAppointments.map((appointment) =>
                appointment.id === updatedAppointment.id
                  ? updatedAppointment
                  : appointment,
              ),
            );
          }}
          setApiLog={setApiLog}
        />
      )}
    </main>
  );
}

export default App;
