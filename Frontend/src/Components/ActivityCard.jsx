import React from "react";
import { format } from "date-fns";
import { getActionStyle } from "../helpers/Helper.js";

const ActivityCard = ({ log }) => {
  return (
    <div className="p-6 shadow-xl rounded-2xl border border-gray-700 bg-gray-900 text-gray-200">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Task History
      </h3>
      <p
        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium shadow-md bg-gradient-to-r from-gray-800 ${getActionStyle(
          log.action
        )}`}
      >
        {log.action}
      </p>

      {log.action === "Created" && log.newStatus && (
        <p className="text-sm text-gray-400 mt-3">
          <strong className="text-gray-300">New Status:</strong> {log.newStatus}
        </p>
      )}
      {log.action === "Deleted" && log.previousStatus && (
        <p className="text-sm text-gray-400 mt-3">
          <strong className="text-gray-300">Previous Status:</strong>{" "}
          {log.previousStatus}
        </p>
      )}
      {log.previousStatus && log.newStatus && log.action !== "Created" && (
        <p className="text-sm text-gray-400 mt-3">
          <strong className="text-gray-300">Status Change:</strong>{" "}
          {log.previousStatus} → {log.newStatus}
        </p>
      )}

      <div className="mt-3 space-y-2 text-sm text-gray-400">
        <p>
          <strong className="text-gray-300">Task ID:</strong> {log.taskId}
        </p>
        {log.createdBy && (
          <p>
            <strong className="text-gray-300">Created By:</strong>{" "}
            {log.createdBy}
          </p>
        )}
        {log.changedBy && (
          <p>
            <strong className="text-gray-300">Changed By:</strong>{" "}
            {log.changedBy}
          </p>
        )}
        <p>
          <strong className="text-gray-300">Date:</strong>{" "}
          {format(new Date(log.createdAt), "PPP p")}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
