import { Home, BarChart3, Archive, Settings } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("today");

  const navItems = [
    { id: "today", icon: Home, label: "Today" },
    { id: "statistics", icon: BarChart3, label: "Statistics" },
    { id: "archived", icon: Archive, label: "Archived" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Habit Tracker</h1>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeTab === item.id
                  ? "bg-green-50 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
