import { FaEdit, FaTrash } from "react-icons/fa";

function ApplicationTable({
  applications,
  onEdit,
  onDelete,
  onView,
}) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <h5>No applications found</h5>
        <p>
          Add a job application to start tracking your progress.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Location</th>
            <th>Applied Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              onClick={() => onView(application)}
              className="application-row"
            >
              <td className="fw-semibold">
                {application.company}
              </td>

              <td>{application.role}</td>

              <td>
                <span
                  className={`status-badge status-${application.status.toLowerCase()}`}
                >
                  {application.status}
                </span>
              </td>

              <td>{application.location}</td>

              <td>{application.appliedDate}</td>

              <td>
                <div className="d-flex justify-content-end gap-2">

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit(application);
                    }}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(application.id);
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;