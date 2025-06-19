import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

const navigationItems = [
  { href: "/", icon: "fas fa-waveform-lines", label: "Production Studio", active: true },
  { href: "/vault", icon: "fas fa-folder-open", label: "Project Vault" },
  { href: "/analytics", icon: "fas fa-chart-line", label: "Analytics" },
  { href: "/royalty", icon: "fas fa-handshake", label: "Royalty Dashboard" },
  { href: "/security", icon: "fas fa-shield-halved", label: "Security Center" },
  { href: "/elite", icon: "fas fa-rocket", label: "Elite Features" },
];

export function NavigationSidebar() {
  const [location] = useLocation();
  const { data: user } = useQuery<User>({ queryKey: ["/api/user"] });

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-primary-800 border-r border-primary-700 z-50">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center">
            <i className="fas fa-music text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">RealArtist AI</h1>
            <p className="text-xs text-gray-400 font-mono">v2025.1</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                      : "hover:bg-primary-700 text-gray-300 hover:text-white"
                  }`}
                >
                  <i className={`${item.icon} w-5`}></i>
                  <span className={isActive ? "font-medium" : ""}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-primary-700 rounded-xl p-4 border border-primary-600">
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-8 h-8 bg-gradient-to-br from-accent-green to-accent-blue rounded-full bg-cover bg-center"
              style={{ 
                backgroundImage: user?.profileImage ? `url(${user.profileImage})` : undefined 
              }}
            ></div>
            <div>
              <p className="text-sm font-medium">{user?.name || "Loading..."}</p>
              <p className="text-xs text-gray-400">{user?.accountType || "Pro"} Account</p>
            </div>
          </div>
          <button className="w-full text-xs bg-primary-600 hover:bg-primary-500 px-3 py-2 rounded-lg transition-colors">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}