import { useState } from "react";
import { Plus, Settings, Database } from "lucide-react";
import DeviceManagement from "../components/management/DeviceManagement";
import ConnectorManagement from "../components/management/ConnectorManagement";
import CableManagement from "../components/management/CableManagement";
import ConnectionManagement from "../components/management/ConnectionManagement";
import DataManagement from "../components/management/DataManagement";

export default function Management() {
  const [activeTab, setActiveTab] = useState("devices");

  const tabs = [
    { id: "devices", label: "Geräte", icon: "📦" },
    { id: "connectors", label: "Anschlüsse", icon: "🔌" },
    { id: "cables", label: "Kabel", icon: "🔗" },
    { id: "connections", label: "Verbindungen", icon: "⚡" },
    { id: "data", label: "Datenverwaltung", icon: "💾" },
  ];

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
            <Settings size={40} />
            Studio verwalten
          </h1>
          <p className="text-lg text-gray-400">
            Bearbeite Geräte, Anschlüsse, Kabel und Verbindungen
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-700 flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-orange-600 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "devices" && <DeviceManagement />}
        {activeTab === "connectors" && <ConnectorManagement />}
        {activeTab === "cables" && <CableManagement />}
        {activeTab === "connections" && <ConnectionManagement />}
        {activeTab === "data" && <DataManagement />}
      </div>
    </div>
  );
}
