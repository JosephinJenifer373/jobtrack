function ApplicationDetails({
  application,
  onClose,
  onEdit,
}) {
  if (!application) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <div>
                <h4 className="modal-title mb-1">
                  {application.role}
                </h4>

                <p className="text-secondary mb-0">
                  {application.company}
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">

              <div className="row g-4">

                <div className="col-md-6">
                  <div className="detail-item">
                    <span>Status</span>
                    <strong>
                      {application.status}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="detail-item">
                    <span>Location</span>
                    <strong>
                      {application.location}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="detail-item">
                    <span>Applied Date</span>
                    <strong>
                      {application.appliedDate}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="detail-item">
                    <span>Job Type</span>
                    <strong>
                      {application.type}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="detail-item">
                    <span>Salary</span>
                    <strong>
                      {application.salary || "Not specified"}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="detail-item">
                    <span>Recruiter</span>
                    <strong>
                      {application.recruiter || "Not specified"}
                    </strong>
                  </div>
                </div>

              </div>

              <hr />

              <div className="mb-4">
                <h6>Notes</h6>

                <p className="text-secondary">
                  {application.notes ||
                    "No notes added for this application."}
                </p>
              </div>

              {application.jobUrl && (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-primary"
                >
                  Open Job Posting ↗
                </a>
              )}

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>

              <button
                className="btn btn-primary"
                onClick={() => onEdit(application)}
              >
                Edit Application
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationDetails;