import { Activity, Package, Cable, Radio, AlertTriangle, Download } from "lucide-react";
import devices from "../data/devices.json";
import connections from "../data/connections.json";

export default function Dashboard() {
  const audioConnections = connections.filter((c) => c.type === "audio").length;
  const midiConnections = connections.filter((c) => c.type === "midi").length;
  const usbConnections = connections.filter((c) => c.type === "usb").length;

  const stats = [
    {
      label: "Geräte",
      value: devices.length,
      icon: Package,
      color: "blue",
    },
    {
      label: "Audio-Verbindungen",
      value: audioConnections,
      icon: Radio,
      color: "green",
    },
    {
      label: "MIDI-Verbindungen",
      value: midiConnections,
      icon: Activity,
      color: "cyan",
    },
    {
      label: "USB-Verbindungen",
      value: usbConnections,
      icon: Cable,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Studio Albert Dashboard
          </h1>
          <p className="text-lg text-gray-400">
            Echtzeit-Überblick über den Studiozustand und die Konfiguration
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorMap = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              cyan: "from-cyan-500 to-cyan-600",
              orange: "from-orange-500 to-orange-600",
            };

            return (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Recent Changes */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-6">Systemstatus</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Kawai ES920</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Aktiv
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Roland JV-1010</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Aktiv
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Yamaha TG500</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Aktiv
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-300">Behringer X32</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Aktiv
                </span>
              </div>
            </div>
          </div>

          {/* Documentation Status */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-6">Dokumentation</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">Geräte dokumentiert</span>
                  <span className="text-green-400 text-sm font-bold">6/6</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">Verbindungen dokumentiert</span>
                  <span className="text-green-400 text-sm font-bold">8/8</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">Kabel dokumentiert</span>
                  <span className="text-orange-400 text-sm font-bold">10/12</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-[83%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-orange-950/30 to-orange-900/20 border border-orange-800/50 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="text-orange-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Schnellzugriff</h3>
              <p className="text-gray-300 mb-6">
                Navigiere direkt zu den wichtigsten Bereichen
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/studio"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <Radio size={20} />
              <span className="font-medium">Studioansicht</span>
            </a>
            <a
              href="/devices"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <Package size={20} />
              <span className="font-medium">Alle Geräte</span>
            </a>
            <a
              href="/errors"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <AlertTriangle size={20} />
              <span className="font-medium">Fehlerlösungen</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
