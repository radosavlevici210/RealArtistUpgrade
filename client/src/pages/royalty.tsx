import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { SecurityFooter } from "@/components/security-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import type { UserStats } from "@shared/schema";

const royaltyPayments = [
  { id: 1, date: "2025-01-15", amount: 1250.75, platform: "Spotify", status: "paid", songs: 12 },
  { id: 2, date: "2025-01-10", amount: 890.25, platform: "Apple Music", status: "paid", songs: 8 },
  { id: 3, date: "2025-01-05", amount: 456.80, platform: "YouTube Music", status: "pending", songs: 15 },
  { id: 4, date: "2024-12-30", amount: 2100.45, platform: "All Platforms", status: "paid", songs: 25 },
];

const collaborators = [
  { id: 1, name: "Alex Chen", role: "Producer", royaltyShare: 25, earnings: 15670, songs: 8, status: "active" },
  { id: 2, name: "Maria Rodriguez", role: "Songwriter", royaltyShare: 15, earnings: 8940, songs: 5, status: "active" },
  { id: 3, name: "David Kim", role: "Vocalist", royaltyShare: 20, earnings: 12340, songs: 3, status: "pending" },
];

const contracts = [
  { id: 1, title: "Standard Collaboration Agreement", collaborator: "Alex Chen", startDate: "2024-11-01", royaltyRate: 25, status: "active" },
  { id: 2, title: "Songwriter Partnership", collaborator: "Maria Rodriguez", startDate: "2024-12-15", royaltyRate: 15, status: "active" },
  { id: 3, title: "Featured Artist Agreement", collaborator: "David Kim", startDate: "2025-01-10", royaltyRate: 20, status: "pending" },
];

export default function Royalty() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showContractModal, setShowContractModal] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState("all");

  const { data: stats } = useQuery<UserStats>({
    queryKey: ["/api/user/stats"],
  });

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-accent-green/20 text-accent-green";
      case "pending": return "bg-yellow-500/20 text-yellow-400";
      case "active": return "bg-accent-blue/20 text-accent-blue";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const totalEarnings = stats?.royaltiesEarned ? stats.royaltiesEarned / 100 : 0;
  const pendingPayouts = royaltyPayments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-primary-900">
      <NavigationSidebar />
      
      <div className="ml-64 min-h-screen">
        <header className="bg-primary-800 border-b border-primary-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Royalty Dashboard</h1>
              <p className="text-gray-400">Manage royalties, collaborations, and contracts</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-accent-blue text-accent-blue"
                onClick={() => setShowContractModal(true)}
              >
                <i className="fas fa-file-contract mr-2"></i>New Contract
              </Button>
              <Button className="bg-accent-purple hover:bg-accent-purple/80">
                <i className="fas fa-download mr-2"></i>Tax Documents
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="bg-primary-800 border border-primary-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-accent-purple">Overview</TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-accent-purple">Payments</TabsTrigger>
              <TabsTrigger value="collaborators" className="data-[state=active]:bg-accent-purple">Collaborators</TabsTrigger>
              <TabsTrigger value="contracts" className="data-[state=active]:bg-accent-purple">Contracts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Earnings</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(totalEarnings)}</p>
                        <p className="text-accent-green text-sm">+12.5% this month</p>
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
                        <p className="text-gray-400 text-sm">Pending Payouts</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(pendingPayouts)}</p>
                        <p className="text-yellow-400 text-sm">Processing</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-clock text-yellow-400 text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Active Collaborators</p>
                        <p className="text-3xl font-bold text-white">{collaborators.filter(c => c.status === 'active').length}</p>
                        <p className="text-accent-blue text-sm">2 new this month</p>
                      </div>
                      <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-users text-accent-blue text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary-800 border-primary-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Avg. per Song</p>
                        <p className="text-3xl font-bold text-white">$186.50</p>
                        <p className="text-accent-purple text-sm">+5.2% increase</p>
                      </div>
                      <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-chart-line text-accent-purple text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-primary-800 border-primary-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Royalty Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {royaltyPayments.slice(0, 5).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-primary-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-accent-green/20 rounded-full flex items-center justify-center">
                            <i className="fas fa-money-bill text-accent-green"></i>
                          </div>
                          <div>
                            <p className="text-white font-medium">{payment.platform} Royalty Payment</p>
                            <p className="text-gray-400 text-sm">{payment.songs} songs • {formatDistanceToNow(new Date(payment.date), { addSuffix: true })}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{formatCurrency(payment.amount)}</p>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Payment History</h2>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-40 bg-primary-800 border-primary-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-primary-800 border-primary-600">
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="bg-primary-800 border-primary-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary-700">
                        <tr>
                          <th className="text-left p-4 text-gray-300">Date</th>
                          <th className="text-left p-4 text-gray-300">Platform</th>
                          <th className="text-left p-4 text-gray-300">Songs</th>
                          <th className="text-left p-4 text-gray-300">Amount</th>
                          <th className="text-left p-4 text-gray-300">Status</th>
                          <th className="text-left p-4 text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {royaltyPayments
                          .filter(payment => paymentFilter === "all" || payment.status === paymentFilter)
                          .map((payment) => (
                          <tr key={payment.id} className="border-t border-primary-700">
                            <td className="p-4 text-white">{new Date(payment.date).toLocaleDateString()}</td>
                            <td className="p-4 text-white">{payment.platform}</td>
                            <td className="p-4 text-gray-400">{payment.songs}</td>
                            <td className="p-4 text-white font-bold">{formatCurrency(payment.amount)}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(payment.status)}>
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <i className="fas fa-download mr-1"></i>Receipt
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaborators" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Collaborators</h2>
                <Button className="bg-accent-purple hover:bg-accent-purple/80">
                  <i className="fas fa-plus mr-2"></i>Invite Collaborator
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collaborators.map((collaborator) => (
                  <Card key={collaborator.id} className="bg-primary-800 border-primary-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{collaborator.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-bold">{collaborator.name}</h3>
                            <p className="text-gray-400 text-sm">{collaborator.role}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(collaborator.status)}>
                          {collaborator.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Royalty Share</span>
                          <span className="text-white font-medium">{collaborator.royaltyShare}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Earnings</span>
                          <span className="text-white font-medium">{formatCurrency(collaborator.earnings / 100)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Songs</span>
                          <span className="text-white font-medium">{collaborator.songs}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-primary-700">
                        <Button size="sm" variant="outline" className="w-full border-accent-blue text-accent-blue">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Royalty Contracts</h2>
                <Button 
                  className="bg-accent-purple hover:bg-accent-purple/80"
                  onClick={() => setShowContractModal(true)}
                >
                  <i className="fas fa-plus mr-2"></i>Create Contract
                </Button>
              </div>

              <Card className="bg-primary-800 border-primary-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary-700">
                        <tr>
                          <th className="text-left p-4 text-gray-300">Contract Title</th>
                          <th className="text-left p-4 text-gray-300">Collaborator</th>
                          <th className="text-left p-4 text-gray-300">Start Date</th>
                          <th className="text-left p-4 text-gray-300">Royalty Rate</th>
                          <th className="text-left p-4 text-gray-300">Status</th>
                          <th className="text-left p-4 text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map((contract) => (
                          <tr key={contract.id} className="border-t border-primary-700">
                            <td className="p-4 text-white font-medium">{contract.title}</td>
                            <td className="p-4 text-white">{contract.collaborator}</td>
                            <td className="p-4 text-gray-400">{new Date(contract.startDate).toLocaleDateString()}</td>
                            <td className="p-4 text-white">{contract.royaltyRate}%</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(contract.status)}>
                                {contract.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                  <i className="fas fa-eye mr-1"></i>View
                                </Button>
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                  <i className="fas fa-edit mr-1"></i>Edit
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <SecurityFooter />
      </div>

      {/* Contract Creation Modal */}
      <Dialog open={showContractModal} onOpenChange={setShowContractModal}>
        <DialogContent className="bg-primary-800 border border-primary-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Royalty Contract</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contract Title</label>
                <Input 
                  placeholder="e.g., Producer Collaboration Agreement"
                  className="bg-primary-900 border-primary-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Collaborator Email</label>
                <Input 
                  placeholder="collaborator@example.com"
                  className="bg-primary-900 border-primary-600 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <Select>
                  <SelectTrigger className="bg-primary-900 border-primary-600 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-primary-800 border-primary-600">
                    <SelectItem value="producer">Producer</SelectItem>
                    <SelectItem value="songwriter">Songwriter</SelectItem>
                    <SelectItem value="vocalist">Vocalist</SelectItem>
                    <SelectItem value="musician">Musician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Royalty Share (%)</label>
                <Input 
                  type="number"
                  placeholder="25"
                  min="1"
                  max="50"
                  className="bg-primary-900 border-primary-600 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowContractModal(false)}
                className="border-gray-600 text-gray-400"
              >
                Cancel
              </Button>
              <Button className="bg-accent-purple hover:bg-accent-purple/80">
                Create Contract
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}