import { useState } from "react";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { SecurityFooter } from "@/components/security-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";

const securityLogs = [
  { id: 1, action: "Login", ipAddress: "192.168.1.105", location: "New York, US", timestamp: new Date(Date.now() - 30 * 60 * 1000), status: "success" },
  { id: 2, action: "Song Download", ipAddress: "192.168.1.105", location: "New York, US", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), status: "success" },
  { id: 3, action: "Failed Login", ipAddress: "45.123.67.89", location: "Unknown", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), status: "blocked" },
  { id: 4, action: "API Access", ipAddress: "192.168.1.105", location: "New York, US", timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), status: "success" },
  { id: 5, action: "Unauthorized Download Attempt", ipAddress: "203.45.67.12", location: "Unknown", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), status: "blocked" },
];

const theftAlerts = [
  { id: 1, songTitle: "Midnight Dreams", platform: "SoundCloud", confidence: 95, watermarkMatch: true, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), status: "investigating" },
  { id: 2, songTitle: "Summer Vibes", platform: "YouTube", confidence: 87, watermarkMatch: true, timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), status: "takedown_sent" },
  { id: 3, songTitle: "Heartbreak Anthem", platform: "TikTok", confidence: 92, watermarkMatch: true, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: "resolved" },
];

const deviceSessions = [
  { id: 1, device: "MacBook Pro", browser: "Chrome 120", location: "New York, US", lastActive: new Date(Date.now() - 5 * 60 * 1000), status: "active" },
  { id: 2, device: "iPhone 15", browser: "Safari Mobile", location: "New York, US", lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), status: "active" },
  { id: 3, device: "Windows PC", browser: "Edge 119", location: "Los Angeles, US", lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), status: "inactive" },
];

export default function Security() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    downloadTracking: true,
    deviceNotifications: false,
    ipRestriction: false,
    autoLogout: true,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": case "active": case "resolved": return "bg-accent-green/20 text-accent-green";
      case "blocked": case "investigating": return "bg-red-500/20 text-red-400";
      case "takedown_sent": return "bg-yellow-500/20 text-yellow-400";
      case "inactive": return "bg-gray-500/20 text-gray-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Login": return "fas fa-sign-in-alt";
      case "Song Download": return "fas fa-download";
      case "Failed Login": return "fas fa-exclamation-triangle";
      case "API Access": return "fas fa-code";
      case "Unauthorized Download Attempt": return "fas fa-shield-alt";
      default: return "fas fa-info-circle";
    }
  };

  return (
    <div className="min-h-screen bg-primary-900">
      <NavigationSidebar />
      
      <div className="ml-64 min-h-screen">
        <header className="bg-primary-800 border-b border-primary-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Security Center</h1>
              <p className="text-gray-400">Monitor and protect your content with advanced security features</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                <span className="text-accent-green">All Systems Secure</span>
              </div>
              <Button variant="outline" className="border-accent-blue text-accent-blue">
                <i className="fas fa-shield-alt mr-2"></i>Security Report
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="bg-primary-800 border border-primary-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-accent-purple">Overview</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-accent-purple">Activity Logs</TabsTrigger>
              <TabsTrigger value="theft" className="data-[state=active]:bg-accent-purple">Theft Detection</TabsTrigger>
              <TabsTrigger value="devices" className="data-[state=active]:bg-accent-purple">Device Management</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-accent-purple">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Security Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Security Score</p>
                        <p className="text-3xl font-bold text-accent-green">98/100</p>
                        <p className="text-accent-green text-sm">Excellent</p>
                      </div>
                      <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-shield-check text-accent-green text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Active Sessions</p>
                        <p className="text-3xl font-bold text-white">{deviceSessions.filter(d => d.status === 'active').length}</p>
                        <p className="text-accent-blue text-sm">2 devices online</p>
                      </div>
                      <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-laptop text-accent-blue text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Blocked Threats</p>
                        <p className="text-3xl font-bold text-white">12</p>
                        <p className="text-red-400 text-sm">This month</p>
                      </div>
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Content Protected</p>
                        <p className="text-3xl font-bold text-white">47</p>
                        <p className="text-accent-purple text-sm">Songs secured</p>
                      </div>
                      <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-lock text-accent-purple text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <Card className="bg-primary-800 border-primary-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-4 bg-primary-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            log.status === 'success' ? 'bg-accent-green/20' : 'bg-red-500/20'
                          }`}>
                            <i className={`${getActionIcon(log.action)} ${
                              log.status === 'success' ? 'text-accent-green' : 'text-red-400'
                            }`}></i>
                          </div>
                          <div>
                            <p className="text-white font-medium">{log.action}</p>
                            <p className="text-gray-400 text-sm">{log.ipAddress} • {log.location} • {formatDistanceToNow(log.timestamp, { addSuffix: true })}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Security Activity Logs</h2>
                <div className="flex space-x-4">
                  <Input 
                    placeholder="Search logs..."
                    className="w-64 bg-primary-800 border-primary-600 text-white"
                  />
                  <Button variant="outline" className="border-accent-blue text-accent-blue">
                    <i className="fas fa-filter mr-2"></i>Filter
                  </Button>
                </div>
              </div>

              <Card className="bg-primary-800 border-primary-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary-700">
                        <tr>
                          <th className="text-left p-4 text-gray-300">Action</th>
                          <th className="text-left p-4 text-gray-300">IP Address</th>
                          <th className="text-left p-4 text-gray-300">Location</th>
                          <th className="text-left p-4 text-gray-300">Time</th>
                          <th className="text-left p-4 text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {securityLogs.map((log) => (
                          <tr key={log.id} className="border-t border-primary-700">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <i className={`${getActionIcon(log.action)} text-gray-400`}></i>
                                <span className="text-white">{log.action}</span>
                              </div>
                            </td>
                            <td className="p-4 text-white font-mono text-sm">{log.ipAddress}</td>
                            <td className="p-4 text-gray-400">{log.location}</td>
                            <td className="p-4 text-gray-400">{formatDistanceToNow(log.timestamp, { addSuffix: true })}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="theft" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Theft Detection & Protection</h2>
                <Button className="bg-accent-purple hover:bg-accent-purple/80">
                  <i className="fas fa-scan mr-2"></i>Scan All Content
                </Button>
              </div>

              <Alert className="bg-red-500/10 border-red-500/20">
                <i className="fas fa-exclamation-triangle text-red-400"></i>
                <AlertDescription className="text-red-400">
                  1 potential theft detected. Immediate action recommended.
                </AlertDescription>
              </Alert>

              <Card className="bg-primary-800 border-primary-700">
                <CardHeader>
                  <CardTitle className="text-white">Theft Detection Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {theftAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 bg-primary-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-white font-medium">"{alert.songTitle}" detected on {alert.platform}</h3>
                            <p className="text-gray-400 text-sm">{formatDistanceToNow(alert.timestamp, { addSuffix: true })}</p>
                          </div>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Confidence:</span>
                            <span className="text-white ml-2 font-medium">{alert.confidence}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Watermark:</span>
                            <span className={`ml-2 font-medium ${alert.watermarkMatch ? 'text-accent-green' : 'text-red-400'}`}>
                              {alert.watermarkMatch ? 'Match' : 'No Match'}
                            </span>
                          </div>
                          <div className="text-right">
                            <Button size="sm" className="bg-red-500 hover:bg-red-600">
                              <i className="fas fa-gavel mr-1"></i>Send Takedown
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Device Management</h2>
                <Button variant="outline" className="border-red-500 text-red-400">
                  <i className="fas fa-sign-out-alt mr-2"></i>Sign Out All Devices
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deviceSessions.map((device) => (
                  <Card key={device.id} className="bg-primary-800 border-primary-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-accent-blue/20 rounded-full flex items-center justify-center">
                            <i className={`fas ${device.device.includes('iPhone') ? 'fa-mobile-alt' : device.device.includes('MacBook') ? 'fa-laptop' : 'fa-desktop'} text-accent-blue`}></i>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{device.device}</h3>
                            <p className="text-gray-400 text-sm">{device.browser}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location:</span>
                          <span className="text-white">{device.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Active:</span>
                          <span className="text-white">{formatDistanceToNow(device.lastActive, { addSuffix: true })}</span>
                        </div>
                      </div>
                      {device.status === 'active' && device.id !== 1 && (
                        <Button size="sm" variant="outline" className="w-full mt-4 border-red-500 text-red-400">
                          <i className="fas fa-sign-out-alt mr-1"></i>Sign Out
                        </Button>
                      )}
                      {device.id === 1 && (
                        <div className="mt-4 text-center">
                          <Badge className="bg-accent-green/20 text-accent-green">Current Device</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Security Settings</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-primary-800 border-primary-700">
                  <CardHeader>
                    <CardTitle className="text-white">Authentication & Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Login Alerts</h3>
                        <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
                      </div>
                      <Switch 
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, loginAlerts: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Auto Logout</h3>
                        <p className="text-gray-400 text-sm">Automatically sign out after 30 minutes of inactivity</p>
                      </div>
                      <Switch 
                        checked={securitySettings.autoLogout}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, autoLogout: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary-800 border-primary-700">
                  <CardHeader>
                    <CardTitle className="text-white">Content Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Download Tracking</h3>
                        <p className="text-gray-400 text-sm">Monitor all content downloads and access</p>
                      </div>
                      <Switch 
                        checked={securitySettings.downloadTracking}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, downloadTracking: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Device Notifications</h3>
                        <p className="text-gray-400 text-sm">Alert when content is accessed from new devices</p>
                      </div>
                      <Switch 
                        checked={securitySettings.deviceNotifications}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, deviceNotifications: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">IP Restriction</h3>
                        <p className="text-gray-400 text-sm">Limit access to specific IP addresses</p>
                      </div>
                      <Switch 
                        checked={securitySettings.ipRestriction}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, ipRestriction: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary-800 border-primary-700">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Security Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="border-accent-blue text-accent-blue">
                    <i className="fas fa-key mr-2"></i>Generate New API Keys
                  </Button>
                  <Button variant="outline" className="border-yellow-500 text-yellow-400">
                    <i className="fas fa-download mr-2"></i>Download Security Report
                  </Button>
                  <Button variant="outline" className="border-red-500 text-red-400">
                    <i className="fas fa-trash mr-2"></i>Delete All Sessions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <SecurityFooter />
      </div>
    </div>
  );
}