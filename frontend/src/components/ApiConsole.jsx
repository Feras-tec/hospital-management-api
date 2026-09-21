import { motion } from "motion/react";

function ApiConsole({ apiLog }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="card bg-neutral text-neutral-content shadow-xl h-full"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">API Test Console</h2>
          <span className="badge badge-success">Online</span>
        </div>

        <div className="divider"></div>

        <div>
          <p className="text-xs opacity-60 mb-1">ENDPOINT</p>
          <div className="mockup-code">
            <pre>
              <code>
                {apiLog.method} {apiLog.endpoint}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs opacity-60 mb-1">STATUS</p>
          <span
            className={`badge badge-lg ${
              apiLog.status >= 200 && apiLog.status < 300
                ? "badge-success"
                : apiLog.status >= 400
                  ? "badge-error"
                  : "badge-ghost"
            }`}
          >
            {apiLog.status
              ? `${apiLog.status} ${apiLog.statusText}`
              : "Waiting..."}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs opacity-60 mb-1">RESPONSE</p>

          <div className="mockup-code text-sm">
            <pre>
              <code>
                {apiLog.response
                  ? JSON.stringify(apiLog.response, null, 2)
                  : "Waiting for API request..."}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <p className="text-xs opacity-60 mb-2">API TESTS</p>

          <div className="flex flex-wrap gap-2">
            <span className="badge badge-success">200</span>
            <span className="badge badge-success">201</span>
            <span className="badge badge-warning">400</span>
            <span className="badge badge-warning">404</span>
            <span className="badge badge-error">409</span>
            <span className="badge badge-error">429</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default ApiConsole;
