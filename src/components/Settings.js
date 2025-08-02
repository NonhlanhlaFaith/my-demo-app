import React from "react";

const Settings = ({ user }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>⚙️ Settings</h2>
      <p>Manage your preferences and settings here.</p>
      <div>
        <p><strong>Email:</strong> {user?.email}</p>
        <ul>
          <li>🔔 Notifications (coming soon)</li>
          <li>🎨 Theme: Light/Dark (coming soon)</li>
          <li>🔐 Change Password (coming soon)</li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
