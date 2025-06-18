import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { SecurityFooter } from "@/components/security-footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import type { UserStats } from "@shared/schema";

const streamingData = [
  { month: 'Jan', streams: 1200, revenue: 340 },
  { month: 'Feb', streams: 1890, revenue: 520 },
  { month: 'Mar', streams: 2400, revenue: 680 },
  { month: 'Apr', streams: 3200, revenue: 890 },
  { month: 'May', streams: 2800, revenue: 760 },
  { month: 'Jun', streams: 3500, revenue: 920 },
];

const platformData = [
  { name: 'Spotify', streams: 45000, revenue: 1200, color: '#1DB954' },
  { name: 'Apple Music', streams: 28000, revenue: 980, color: '#FA233B' },
  { name: 'YouTube Music', streams: 15000, revenue: 450, color: '#FF0000' },
  { name: 'Amazon Music', streams: 8000, revenue: 320, color: '#00A8E1' },
  { name: 'Other', streams: 4000, revenue: 180, color: '#9B59B6' },
];

const topSongs = [
  { title: "Midnight Dreams", streams: 15420, revenue: 412, trend: "+12%" },
  { title: "Summer Vibes", streams: 12890, revenue: 356, trend: "+8%" },
  { title: "Heartbreak Anthem", streams: 9870, revenue: 298, trend: "+15%" },
  { title: "Electric Nights", streams: 8450, revenue: 234, trend: "-3%" },
  { title: "Golden Hour", streams: 7230, revenue: 198, trend: "+5%" },
];

const geographicData = [
  { country: "United States", streams: 35000, percentage: 35 },
  { country: "United Kingdom", streams: 18000, percentage: 18 },
  { country: "Germany", streams: 12000, percentage: 12 },
  { country: "Canada", streams: 10000, percentage: 10 },
  { country: "Australia", streams: 8000, percentage: 8 },
  { country: "Other", streams: 17000, percentage: 17 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [metric, setMetric] = useState("streams");
  
  const { data: stats } = useQuery<UserStats>({
    queryKey: ["/api/user/stats"],
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-primary-900">
      <NavigationSidebar />
      
      <div className="ml-64 min-h-screen">
        <header className="bg-primary-800 border-b border-primary-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">Track your music performance and earnings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 bg-primary-700 border-primary-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-primary-800 border-primary-600">
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-accent-purple text-accent-purple">
                <i className="fas fa-download mr-2"></i>Export Report
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-primary-800 border-primary-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Streams</p>
                    <p className="text-3xl font-bold text-white">{formatNumber(stats?.totalStreams || 0)}</p>
                    <p className="text-accent-green text-sm">+12.5% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-play text-accent-blue text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-800 border-primary-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-white">{formatCurrency(stats?.royaltiesEarned || 0)}</p>
                    <p className="text-accent-green text-sm">+8.2% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-dollar-sign text-accent-green text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-800 border-primary-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Songs Created</p>
                    <p className="text-3xl font-bold text-white">{stats?.songsCreated || 0}</p>
                    <p className="text-accent-purple text-sm">3 this month</p>
                  </div>
                  <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-music text-accent-purple text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-800 border-primary-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg. per Stream</p>
                    <p className="text-3xl font-bold text-white">$0.023</p>
                    <p className="text-yellow-400 text-sm">Industry average</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-chart-line text-yellow-400 text-xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Streaming Trends */}
            <Card className="bg-primary-800 border-primary-700">
              <CardHeader>
                <CardTitle className="text-white">Streaming Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={streamingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="streams" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Distribution */}
            <Card className="bg-primary-800 border-primary-700">
              <CardHeader>
                <CardTitle className="text-white">Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="streams"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performing Songs */}
            <Card className="bg-primary-800 border-primary-700">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Songs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSongs.map((song, index) => (
                    <div key={song.title} className="flex items-center justify-between p-3 bg-primary-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">{song.title}</p>
                          <p className="text-gray-400 text-sm">{formatNumber(song.streams)} streams</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{formatCurrency(song.revenue)}</p>
                        <Badge className={`text-xs ${song.trend.startsWith('+') ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-400'}`}>
                          {song.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Performance */}
            <Card className="bg-primary-800 border-primary-700">
              <CardHeader>
                <CardTitle className="text-white">Geographic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <i className="fas fa-globe text-accent-blue text-sm"></i>
                        </div>
                        <span className="text-white font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 bg-primary-600 rounded-full h-2">
                          <div 
                            className="bg-accent-blue h-2 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm w-16 text-right">
                          {formatNumber(country.streams)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <Card className="bg-primary-800 border-primary-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <SecurityFooter />
      </div>
    </div>
  );
}