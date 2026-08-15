import { useEffect, useState } from "react";

import initialApplications from "./data/initialApplications";
import ApplicationModal from "./components/ApplicationModal";
import ApplicationTable from "./components/ApplicationTable";
import Analytics from "./components/Analytics";
import ApplicationDetails from "./components/ApplicationDetails";
import KanbanBoard from "./components/KanbanBoard";
import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const emptyForm = {
  company: "",
  role: "",
  location: "",
  type: "Full-time",
  status: "Applied",
  appliedDate: "",
  salary: "",
  jobUrl: "",
  recruiter: "",
  notes: "",
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem(
      "jobtrack-applications"
    );

    return savedApplications
      ? JSON.parse(savedApplications)
      : initialApplications;
  });

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("jobtrack-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "jobtrack-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "jobtrack-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setApplications((previous) =>
        previous.map((application) =>
          application.id === editingId
            ? {
              ...application,
              ...formData,
            }
            : application
        )
      );
      toast.success("Application updated successfully!");
    } else {
      const newApplication = {
        id: Date.now(),
        ...formData,
      };

      setApplications((previous) => [
        ...previous,
        newApplication,
      ]);
      toast.success("Application added successfully!");
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowModal(false);
  };
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    setApplications((previous) =>
      previous.filter(
        (application) => application.id !== id
      )
    );
    toast.success("Application deleted successfully!");
  };

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) =>
      application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const rejectedCount = applications.filter(
    (application) =>
      application.status === "Rejected"
  ).length;

  const offerCount = applications.filter(
    (application) =>
      application.status === "Offer"
  ).length;

  const handleEdit = (application) => {
    setEditingId(application.id);
    setFormData(application);
    setShowModal(true);
  };
  const filteredApplications = applications.filter((application) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      application.company.toLowerCase().includes(search) ||
      application.role.toLowerCase().includes(search) ||
      application.location.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedApplications = applications.map(
      (application) =>
        String(application.id) === result.draggableId
          ? {
            ...application,
            status: result.destination.droppableId,
          }
          : application
    );

    setApplications(updatedApplications);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>

      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid px-3 px-md-4">

          <span className="navbar-brand fw-bold">
            JobTrack
          </span>

          <div className="d-flex align-items-center flex-wrap gap-2">

            <button
              className="btn btn-outline-light"
              onClick={() => setDarkMode((previous) => !previous)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              + Add
            </button>

          </div>

        </div>
      </nav>

      <main className="container p-3 main-content">

        <div className="mb-4">
          <h1 className="fw-bold">
            Job Application Dashboard
          </h1>

          <p className="text-secondary">
            Track and manage your job applications in one place.
          </p>
        </div>

        {/* <div className="row g-4 mb-5">

          <div className="col-6 col-lg-3">
            <div className="card stat-card">
              <div className="card-body">
                <p>Total Applications</p>
                <h2>{totalApplications}</h2>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card stat-card">
              <div className="card-body">
                <p>Applied</p>
                <h2>{appliedCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card stat-card">
              <div className="card-body">
                <p>Interviews</p>
                <h2>{interviewCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card stat-card">
              <div className="card-body">
                <p>Offers</p>
                <h2>{offerCount}</h2>
              </div>
            </div>
          </div>

        </div> */}

        <Analytics applications={applications} />
        <div className="mb-5">
          <h4 className="mb-4">
            Application Pipeline
          </h4>

          <KanbanBoard
            applications={applications}
            onDragEnd={handleDragEnd}
          />
        </div>
        <div className="card">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">
                Applications
              </h4>

              <span className="text-secondary">
                {applications.length} applications
              </span>
            </div>
            <div className="row g-3 mb-4">

              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search company, role or location..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  <option value="All">All Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

            </div>
            <p className="text-secondary small mb-3">
              Showing {filteredApplications.length} of{" "}
              {applications.length} applications
            </p>

            <ApplicationTable
              applications={filteredApplications}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={setSelectedApplication}
            />

            <ApplicationDetails
              application={selectedApplication}
              onClose={() => setSelectedApplication(null)}
              onEdit={(application) => {
                setSelectedApplication(null);
                handleEdit(application);
              }}
            />

          </div>
        </div>

      </main>

      <ApplicationModal
        show={showModal}
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={() => {
          setShowModal(false);
          setFormData(emptyForm);
          setEditingId(null);
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme={darkMode ? "dark" : "light"}
        newestOnTop
      />

    </div>
  );
}

export default App;