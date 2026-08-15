import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics({ applications }) {
  const total = applications.length;

  const applied = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const interviewRate =
    total > 0 ? ((interviews / total) * 100).toFixed(1) : 0;

  const chartData = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interviews },
    { name: "Offer", value: offers },
    { name: "Rejected", value: rejected },
  ].filter((item) => item.value > 0);

  return (
    <section className="mb-5">

      <div className="row g-4">

        <div className="col-md-6 col-xl-3">
          <div className="analytics-card">
            <span>Total Applications</span>
            <h2>{total}</h2>
            <small>All tracked applications</small>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="analytics-card">
            <span>Interviews</span>
            <h2>{interviews}</h2>
            <small>Interview opportunities</small>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="analytics-card">
            <span>Offers</span>
            <h2>{offers}</h2>
            <small>Successful applications</small>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="analytics-card">
            <span>Interview Rate</span>
            <h2>{interviewRate}%</h2>
            <small>Applications → interviews</small>
          </div>
        </div>

      </div>

      <div className="row g-4 mt-1">

        <div className="col-lg-7">
          <div className="analytics-panel">

            <h5>Application Status</h5>

            <div className="chart-container">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={
                            [
                              "#0d6efd",
                              "#ffc107",
                              "#198754",
                              "#dc3545",
                            ][index]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-secondary text-center">
                  No application data available.
                </p>
              )}
            </div>

          </div>
        </div>

        <div className="col-lg-5">
          <div className="analytics-panel h-100">

            <h5>Quick Summary</h5>

            <div className="summary-row">
              <span>Applied</span>
              <strong>{applied}</strong>
            </div>

            <div className="summary-row">
              <span>Interviews</span>
              <strong>{interviews}</strong>
            </div>

            <div className="summary-row">
              <span>Offers</span>
              <strong>{offers}</strong>
            </div>

            <div className="summary-row">
              <span>Rejected</span>
              <strong>{rejected}</strong>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

export default Analytics;