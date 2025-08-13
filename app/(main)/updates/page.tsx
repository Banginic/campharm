'use client'
import { useState, ReactNode } from "react";
import { 
  Smartphone, Bell, Star, Bug, Shield, Zap, Calendar, Download,
  CheckCircle, AlertTriangle, Info, Sparkles, Pill, Clock,
  Users, Heart, Settings, ArrowRight, ExternalLink, PlayCircle
} from "lucide-react";

// ---------- TYPES ----------
type UpdateTypeId = 'All' | 'feature' | 'improvement' | 'bugfix' | 'security';

interface UpdateType {
  id: UpdateTypeId;
  name: string;
  color: string;
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface UpdateItem {
  id: number;
  version: string;
  date: string;
  type: Exclude<UpdateTypeId, 'All'>;
  status: 'latest' | 'stable';
  title: string;
  description: string;
  highlights: string[];
  features: Feature[];
  downloadSize: string;
  installTime: string;
}

interface Stat {
  label: string;
  value: string;
  icon: ReactNode;
}

// ---------- COMPONENT ----------
export default function PharmacyUpdatesPage() {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<UpdateTypeId>('All');

  const updateTypes: UpdateType[] = [
    { id: 'All', name: 'All Updates', color: 'gray' },
    { id: 'feature', name: 'New Features', color: 'green' },
    { id: 'improvement', name: 'Improvements', color: 'blue' },
    { id: 'bugfix', name: 'Bug Fixes', color: 'yellow' },
    { id: 'security', name: 'Security', color: 'red' }
  ];

  const updates: UpdateItem[] = [
    {
      id: 1,
      version: "3.2.0",
      date: "2025-08-10",
      type: "feature",
      status: "latest",
      title: "Enhanced Prescription Management",
      description: "Introducing smart medication reminders, drug interaction alerts, and simplified refill requests.",
      highlights: [
        "Smart medication reminders with customizable schedules",
        "Real-time drug interaction checking",
        "One-tap prescription refills",
        "Enhanced medication history tracking"
      ],
      features: [
        { icon: <Bell className="w-5 h-5" />, title: "Smart Reminders", description: "Never miss a dose with intelligent reminder scheduling" },
        { icon: <Shield className="w-5 h-5" />, title: "Safety Alerts", description: "Get notified about potential drug interactions" },
        { icon: <Zap className="w-5 h-5" />, title: "Quick Refills", description: "Request refills with a single tap" }
      ],
      downloadSize: "12.3 MB",
      installTime: "2-3 minutes"
    },
    // ...rest of updates (unchanged, just follow the same type structure)
  ];

  const stats: Stat[] = [
    { label: "Active Users", value: "25,000+", icon: <Users className="w-6 h-6" /> },
    { label: "App Rating", value: "4.8", icon: <Star className="w-6 h-6" /> },
    { label: "Updates Released", value: "24", icon: <Download className="w-6 h-6" /> },
    { label: "Bug Fixes", value: "156", icon: <Bug className="w-6 h-6" /> }
  ];

  const filteredUpdates = filterType === 'All' 
    ? updates 
    : updates.filter(update => update.type === filterType);

  const getTypeColor = (type: UpdateItem['type']) => {
    const colors: Record<UpdateItem['type'], string> = {
      feature: 'bg-green-100 text-green-700 border-green-200',
      improvement: 'bg-blue-100 text-blue-700 border-blue-200',
      bugfix: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      security: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[type];
  };

  const getTypeIcon = (type: UpdateItem['type']) => {
    const icons: Record<UpdateItem['type'], ReactNode> = {
      feature: <Sparkles className="w-4 h-4" />,
      improvement: <Zap className="w-4 h-4" />,
      bugfix: <Bug className="w-4 h-4" />,
      security: <Shield className="w-4 h-4" />
    };
    return icons[type];
  };

  const getStatusBadge = (status: UpdateItem['status']) => {
    if (status === 'latest') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-200">
          <CheckCircle className="w-4 h-4" />
          Latest
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
        Stable
      </span>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* ... your JSX stays exactly the same, no functional change */}
    </div>
  );
}
