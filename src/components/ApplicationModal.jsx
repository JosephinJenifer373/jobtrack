function ApplicationModal({
  show,
  formData,
  editingId,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {editingId ? "Edit Job Application" : "Add Job Application"}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <form onSubmit={onSubmit}>

              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={onChange}
                    className="form-control"
                    placeholder="e.g. Infosys"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={onChange}
                    className="form-control"
                    placeholder="e.g. React JS Developer"
                    required
                  />
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={onChange}
                      className="form-control"
                      placeholder="Chennai"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Job Type
                    </label>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={onChange}
                      className="form-select"
                    >
                      <option value="Full-time">
                        Full-time
                      </option>

                      <option value="Contract">
                        Contract
                      </option>

                      <option value="Internship">
                        Internship
                      </option>
                    </select>
                  </div>

                </div>

                <div className="row">
                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Expected Salary
                      </label>

                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={onChange}
                        className="form-control"
                        placeholder="e.g. 7.5 LPA"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Recruiter
                      </label>

                      <input
                        type="text"
                        name="recruiter"
                        value={formData.recruiter}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Recruiter name"
                      />
                    </div>

                  </div>
                  <div className="mb-3">

                    <label className="form-label">
                      Job URL
                    </label>

                    <input
                      type="url"
                      name="jobUrl"
                      value={formData.jobUrl}
                      onChange={onChange}
                      className="form-control"
                      placeholder="https://..."
                    />

                  </div>
                  <div className="mb-3">

                    <label className="form-label">
                      Notes
                    </label>

                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={onChange}
                      className="form-control"
                      rows="3"
                      placeholder="Interview details, recruiter notes, follow-up..."
                    />

                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={onChange}
                      className="form-select"
                    >
                      <option value="Applied">
                        Applied
                      </option>

                      <option value="Interview">
                        Interview
                      </option>

                      <option value="Offer">
                        Offer
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Applied Date
                    </label>

                    <input
                      type="date"
                      name="appliedDate"
                      value={formData.appliedDate}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingId ? "Update Application" : "Add Application"}
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationModal;