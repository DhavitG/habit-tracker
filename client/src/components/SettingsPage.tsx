import { useState, useEffect } from "react";
import {
  User,
  Globe,
  Calendar,
  Moon,
  Sun,
  Check,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  settings: {
    timezone: string;
    weekStartsOn: string;
    theme: string;
  };
}

export function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [weekStartsOn, setWeekStartsOn] = useState("monday");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = response.data.user;
      setUser(data);
      setFullName(data.fullName);
      setTimezone(data.settings?.timezone || "Asia/Kolkata");
      setWeekStartsOn(data.settings?.weekStartsOn || "monday");
      setTheme(data.settings?.theme || "light");
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,
        {
          fullName,
          settings: { timezone, weekStartsOn, theme },
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = response.data.user;
      setUser(data);

      // Update localStorage so the rest of the app has fresh data
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          fullName: data.fullName,
        }),
      );

      // Apply theme immediately
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error("Failed to update profile:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    // Apply immediately for instant feedback
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Profile
        </h2>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {user?.fullName}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Name field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full h-10 rounded-lg border border-input bg-muted px-3 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Preferences
        </h2>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-6">
          {/* Theme */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <Sun className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">Theme</p>
                <p className="text-xs text-muted-foreground">
                  Choose light or dark mode
                </p>
              </div>
            </div>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Timezone */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Timezone</p>
                <p className="text-xs text-muted-foreground">
                  Used for daily habit resets
                </p>
              </div>
            </div>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Kolkata">
                  Asia/Kolkata (IST)
                </SelectItem>
                <SelectItem value="America/New_York">
                  America/New_York (EST)
                </SelectItem>
                <SelectItem value="America/Chicago">
                  America/Chicago (CST)
                </SelectItem>
                <SelectItem value="America/Los_Angeles">
                  America/Los_Angeles (PST)
                </SelectItem>
                <SelectItem value="Europe/London">
                  Europe/London (GMT)
                </SelectItem>
                <SelectItem value="Europe/Berlin">
                  Europe/Berlin (CET)
                </SelectItem>
                <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                <SelectItem value="Australia/Sydney">
                  Australia/Sydney (AEST)
                </SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Week starts on */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Week Starts On
                </p>
                <p className="text-xs text-muted-foreground">
                  First day of your week
                </p>
              </div>
            </div>
            <Select value={weekStartsOn} onValueChange={setWeekStartsOn}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : null}
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
