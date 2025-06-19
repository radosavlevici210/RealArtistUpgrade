
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export function QuantumWatermark() {
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  const [trackingLevel, setTrackingLevel] = useState("standard");
  const [alertSettings, setAlertSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    instantNotify: true
  });
  const [protectionStrength, setProtectionStrength] = useState(85);

  const protectionFeatures = [
    {
      name: "Pitch Change Tracking",
      description: "Detects unauthorized pitch modifications",
      enabled: true,
      strength: 95
    },
    {
      name: "Chop & Remix Detection",
      description: "Identifies unauthorized sample usage",
      enabled: true,
      strength: 88
    },
    {
      name: "Speed Alteration Tracking",
      description: "Monitors tempo changes and time-stretching",
      enabled: true,
      strength: 92
    },
    {
      name: "Frequency Analysis",
      description: "Deep spectrum analysis for hidden usage",
      enabled: true,
      strength: 78
    },
    {
      name: "Device Fingerprinting",
      description: "Tracks playback device signatures",
      enabled: watermarkEnabled,
      strength: 85
    }
  ];

  return (
    <Card className="bg-primary-800 border-primary-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            🔐 Quantum-Locked Watermark
          </CardTitle>
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            Military Grade
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-primary-900 rounded-lg">
          <div>
            <h4 className="text-white font-semibold">Enable Quantum Protection</h4>
            <p className="text-gray-400 text-sm">Embeds invisible, unremovable watermarks</p>
          </div>
          <Switch
            checked={watermarkEnabled}
            onCheckedChange={setWatermarkEnabled}
          />
        </div>

        {watermarkEnabled && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Protection Level
                </label>
                <select 
                  value={trackingLevel}
                  onChange={(e) => setTrackingLevel(e.target.value)}
                  className="w-full bg-primary-900 border border-primary-600 text-white rounded-lg px-3 py-2"
                >
                  <option value="basic">Basic - Standard tracking</option>
                  <option value="standard">Standard - Enhanced detection</option>
                  <option value="advanced">Advanced - AI-powered analysis</option>
                  <option value="quantum">Quantum - Unhackable protection</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Watermark ID
                </label>
                <Input
                  value="QW-2025-" + Math.random().toString(36).substr(2, 9).toUpperCase()
                  readOnly
                  className="bg-primary-900 border-primary-600 text-white"
                />
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Protection Features</h4>
              <div className="space-y-3">
                {protectionFeatures.map((feature, index) => (
                  <div key={index} className="p-3 bg-primary-900 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{feature.name}</span>
                      <Badge className={feature.enabled ? "bg-green-600" : "bg-gray-600"}>
                        {feature.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{feature.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-300 text-sm">Strength:</span>
                      <Progress value={feature.strength} className="flex-1" />
                      <span className="text-accent-purple text-sm">{feature.strength}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Alert Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary-900 rounded-lg">
                  <div>
                    <span className="text-white">Email Alerts</span>
                    <p className="text-gray-400 text-sm">Get notified via email for unauthorized usage</p>
                  </div>
                  <Switch
                    checked={alertSettings.emailAlerts}
                    onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, emailAlerts: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary-900 rounded-lg">
                  <div>
                    <span className="text-white">SMS Alerts</span>
                    <p className="text-gray-400 text-sm">Instant SMS notifications for critical violations</p>
                  </div>
                  <Switch
                    checked={alertSettings.smsAlerts}
                    onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, smsAlerts: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary-900 rounded-lg">
                  <div>
                    <span className="text-white">Real-time Monitoring</span>
                    <p className="text-gray-400 text-sm">Continuous scanning across platforms</p>
                  </div>
                  <Switch
                    checked={alertSettings.instantNotify}
                    onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, instantNotify: checked}))}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-4 rounded-lg border border-red-600/30">
              <div className="flex items-start gap-3">
                <i className="fas fa-shield-alt text-red-400 text-xl mt-1"></i>
                <div>
                  <h4 className="text-red-400 font-semibold">Legal Protection Active</h4>
                  <p className="text-gray-300 text-sm">
                    All unauthorized usage will be tracked with IP addresses, device signatures, and timestamps. 
                    Legal action will be automatically triggered for copyright violations.
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-80">
              🔒 Activate Quantum Watermark Protection
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
