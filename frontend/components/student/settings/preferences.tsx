import { memo, useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Bell, Volume2, Zap, Eye, Clock } from "lucide-react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { getStudentPreferences, updateStudentPreferences } from "@/services/student_service";
import { useSoundEffects } from "@/hooks/shared/useSoundEffects";

interface PreferencesProps {}

const Preferences = memo(function Preferences({}: PreferencesProps) {
  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    examReminders: true,
    soundEnabled: true,
    studyGoals: true,
    analyticsTracking: false,
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize sound effects
  const soundEffects = useSoundEffects();
  
  // Use ref to track if component has mounted (to avoid infinite loops)
  const hasLoadedPreferences = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load preferences from backend on mount (runs only once)
  useEffect(() => {
    if (hasLoadedPreferences.current) return;

    const loadPreferences = async () => {
      try {
        setLoading(true);
        const response = await getStudentPreferences();
        setPreferences({
          pushNotifications: response.data?.pushNotifications ?? true,
          examReminders: response.data?.examReminders ?? true,
          soundEnabled: response.data?.soundEnabled ?? true,
          studyGoals: response.data?.studyGoals ?? true,
          analyticsTracking: response.data?.analyticsTracking ?? false,
        });
        // Sync sound manager with loaded preference
        soundEffects.setSoundEnabled(response.data?.soundEnabled ?? true);
      } catch (err) {
        console.error("Failed to load preferences:", err);
        setError("Failed to load preferences");
        // Fall back to localStorage
        const savedPrefs = localStorage.getItem("userPreferences");
        if (savedPrefs) {
          try {
            setPreferences(JSON.parse(savedPrefs));
          } catch (e) {
            console.error("Failed to load from localStorage:", e);
          }
        }
      } finally {
        setLoading(false);
        hasLoadedPreferences.current = true;
      }
    };

    loadPreferences();

    // Cleanup on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - runs only once on mount

  // Auto-save preferences to backend (with debounce)
  useEffect(() => {
    // Don't save if still loading
    if (loading || !hasLoadedPreferences.current) return;

    const savePreferences = async () => {
      try {
        setSaveStatus("saving");
        await updateStudentPreferences(preferences);
        
        // Also save to localStorage as fallback
        localStorage.setItem("userPreferences", JSON.stringify(preferences));
        
        // Play success sound
        await soundEffects.playSuccess();
        
        setSaveStatus("saved");
        setLastSaved(new Date());
        setError(null);
        
        // Reset saved status after 3 seconds
        setTimeout(() => setSaveStatus("idle"), 3000);
      } catch (err) {
        console.error("Failed to save preferences:", err);
        setSaveStatus("error");
        setError("Failed to save preferences");
        
        // Play error sound
        await soundEffects.playError();
        
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    };

    // Debounce saves - wait 500ms after preference change before saving
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(savePreferences, 500);

    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [preferences, loading]); // Only depends on preferences and loading state

  const handleToggle = (key: keyof typeof preferences) => {
    // Play click sound on toggle
    soundEffects.play("click");
    
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    
    // Update sound manager if toggling soundEnabled
    if (key === "soundEnabled") {
      soundEffects.setSoundEnabled(!preferences[key]);
    }
  };

  const toggleOption = (
    icon: React.ReactNode,
    label: string,
    description: string,
    key: keyof typeof preferences
  ) => (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="bg-muted/40 rounded-lg p-2.5 text-muted-foreground flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground text-sm">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <button
        onClick={() => handleToggle(key)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
          preferences[key] ? "bg-emerald-600" : "bg-muted/40"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            preferences[key] ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <Card className="rounded-lg p-6 border border-border/50 h-full flex flex-col">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading preferences...</div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Notification Preferences */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {toggleOption(
                <Bell size={20} />,
                "Push Notifications",
                "Receive notifications about exams and updates",
                "pushNotifications"
              )}

              {toggleOption(
                <Zap size={20} />,
                "Exam Reminders",
                "Get reminder alerts before exams start",
                "examReminders"
              )}

              {toggleOption(
                <Clock size={20} />,
                "Study Goals",
                "Track and receive notifications about your learning goals",
                "studyGoals"
              )}
            </div>

            {/* Content & Engagement Preferences */}
            <div className="space-y-3 pt-2 border-t border-border/30">
              <h3 className="text-sm font-semibold text-foreground">Content & Engagement</h3>
              {toggleOption(
                <Volume2 size={20} />,
                "Sound Effects",
                "Enable sound effects and audio feedback in the app",
                "soundEnabled"
              )}

              {toggleOption(
                <Eye size={20} />,
                "Analytics",
                "Help us improve by sharing usage data (completely anonymized)",
                "analyticsTracking"
              )}
            </div>

            {/* Error Message */}
            {error && (
              <Card className="rounded-lg p-4 border border-red-200/50 bg-red-50/30">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              </Card>
            )}

            {/* Save Status */}
            <Card className={`rounded-lg p-4 border ${
              saveStatus === "saved"
                ? "border-emerald-200/50 bg-emerald-50/30"
                : saveStatus === "error"
                ? "border-red-200/50 bg-red-50/30"
                : "border-border/50 bg-muted/30"
            }`}>
              <div className="flex items-center gap-2">
                {saveStatus === "saving" && (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground border-t-primary animate-spin" />
                    <p className="text-xs text-muted-foreground">Saving preferences...</p>
                  </>
                )}
                {saveStatus === "saved" && (
                  <>
                    <CheckCircle size={16} className="text-emerald-600" />
                    <p className="text-xs text-emerald-700">
                      Preferences saved{lastSaved && ` at ${lastSaved.toLocaleTimeString()}`}
                    </p>
                  </>
                )}
                {saveStatus === "error" && (
                  <>
                    <AlertCircle size={16} className="text-red-600" />
                    <p className="text-xs text-red-700">Failed to save preferences</p>
                  </>
                )}
                {saveStatus === "idle" && (
                  <>
                    <Bell size={16} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      ℹ️ Preferences are saved automatically as you make changes.
                    </p>
                  </>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </Card>
  );
});

export default Preferences;
