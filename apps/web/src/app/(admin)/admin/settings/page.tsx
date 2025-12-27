export default function SettingsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-slate-400">Platform configuration and admin settings</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <SettingsSection title="General" icon="⚙️">
          <SettingItem
            label="Platform Name"
            description="The name displayed across the platform"
            value="BuilderAI"
          />
          <SettingItem
            label="Support Email"
            description="Contact email for user support"
            value="support@builderai.com"
          />
          <SettingItem
            label="Max Sites per User"
            description="Maximum number of sites a free user can create"
            value="3"
          />
        </SettingsSection>

        {/* AI Settings */}
        <SettingsSection title="AI Configuration" icon="🤖">
          <SettingItem
            label="Default AI Model"
            description="Primary model for content generation"
            value="claude-sonnet-4"
          />
          <SettingItem
            label="Max Tokens"
            description="Maximum tokens per AI request"
            value="8192"
          />
          <SettingItem
            label="Temperature"
            description="Creativity level for AI responses"
            value="0.7"
          />
        </SettingsSection>

        {/* Infrastructure */}
        <SettingsSection title="Infrastructure" icon="🏗️">
          <SettingItem
            label="Database"
            description="Primary database connection"
            value="PostgreSQL (Neon)"
            status="healthy"
          />
          <SettingItem
            label="CDN"
            description="Content delivery network"
            value="Vercel Edge"
            status="healthy"
          />
          <SettingItem
            label="Cache"
            description="Caching layer status"
            value="Redis (Coming Soon)"
            status="pending"
          />
        </SettingsSection>

        {/* Security */}
        <SettingsSection title="Security" icon="🔐">
          <SettingItem
            label="Rate Limiting"
            description="API rate limit per minute"
            value="100 req/min"
          />
          <SettingItem
            label="Session Duration"
            description="User session expiry time"
            value="7 days"
          />
          <SettingItem
            label="2FA"
            description="Two-factor authentication"
            value="Optional"
            status="pending"
          />
        </SettingsSection>

        {/* Admin Access */}
        <SettingsSection title="Admin Access" icon="👑">
          <div className="text-sm text-slate-400 mb-4">
            Admin access is currently controlled via environment variable (ADMIN_EMAIL)
            or hardcoded admin emails. A proper role-based system will be added soon.
          </div>
          <SettingItem
            label="Admin Emails"
            description="Users with admin access"
            value="Configured via env"
          />
        </SettingsSection>
      </div>

      {/* Coming Soon */}
      <div className="mt-8 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
        <ul className="text-sm text-slate-300 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Real-time analytics dashboard with charts
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Role-based access control (RBAC)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Webhook configuration for integrations
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Custom domain management console
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Billing and subscription management
          </li>
        </ul>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function SettingItem({
  label,
  description,
  value,
  status,
}: {
  label: string;
  description: string;
  value: string;
  status?: "healthy" | "warning" | "error" | "pending";
}) {
  const statusStyles = {
    healthy: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
    pending: "bg-slate-500/20 text-slate-400",
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-300">{value}</span>
        {status && (
          <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyles[status]}`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
}
