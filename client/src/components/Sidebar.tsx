import {
  Home,
  BarChart3,
  Archive,
  Settings,
  Sparkles,
  LogOut,
  CalendarDays,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedDate?: string | null;
  onClearDate?: () => void;
}

const navItems = [
  { id: "today", icon: Home, label: "Today" },
  { id: "statistics", icon: BarChart3, label: "Statistics" },
  { id: "archived", icon: Archive, label: "Archived" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const Sidebar = ({
  activeTab,
  onTabChange,
  selectedDate,
  onClearDate,
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin", { replace: true });
  };

  return (
    <aside className="hidden md:flex w-64 h-screen sticky top-0 bg-card border-r border-border flex-col">
      <div className="p-6 flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-bold text-foreground">Habits</h1>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>

              {/* Selected date sub-item under Statistics */}
              {item.id === "statistics" &&
                isActive &&
                selectedDate && (
                  <button
                    onClick={() => onClearDate?.()}
                    className="w-full flex items-center gap-2 pl-10 pr-3 py-1.5 mb-1 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group"
                  >
                    <CalendarDays className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">
                      {format(parseISO(selectedDate), "MMM d, yyyy")}
                    </span>
                    <X className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </button>
                )}
            </div>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
