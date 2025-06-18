import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { SecurityFooter } from "@/components/security-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import type { Project } from "@shared/schema";

export default function Vault() {
  const { data: projects = [], isLoading } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (project.lyrics || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name":
          return a.title.localeCompare(b.title);
        case "streams":
          return (b.totalStreams || 0) - (a.totalStreams || 0);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-accent-green/20 text-accent-green";
      case "processing": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatEarnings = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-primary-800 rounded-xl border border-primary-700 p-6 hover:border-accent-purple/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
            <span>•</span>
            <span>{project.genre} • {project.tempo} BPM</span>
          </div>
        </div>
        <Badge className={getStatusColor(project.status)}>
          {project.status === "complete" ? "Complete" : 
           project.status === "processing" ? "Processing" : "Draft"}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-accent-blue">{project.totalStreams || 0}</p>
          <p className="text-xs text-gray-400">Streams</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent-green">{formatEarnings(project.royaltiesEarned || 0)}</p>
          <p className="text-xs text-gray-400">Earned</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent-purple">{project.currentStep || 1}/6</p>
          <p className="text-xs text-gray-400">Progress</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-primary-700">
        <div className="flex space-x-2">
          {project.audioUrl && (
            <Button size="sm" className="bg-accent-blue hover:bg-accent-blue/80">
              <i className="fas fa-play mr-1"></i>Play
            </Button>
          )}
          {project.bundleUrl && (
            <Button size="sm" variant="outline" className="border-accent-purple text-accent-purple">
              <i className="fas fa-download mr-1"></i>Download
            </Button>
          )}
        </div>
        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
          <i className="fas fa-ellipsis mr-1"></i>More
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-primary-900">
      <NavigationSidebar />
      
      <div className="ml-64 min-h-screen">
        <header className="bg-primary-800 border-b border-primary-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Project Vault</h1>
              <p className="text-gray-400">Manage your music library and track performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                <span className="text-white font-medium">{projects.length}</span> total projects
              </div>
              <Button className="bg-accent-purple hover:bg-accent-purple/80">
                <i className="fas fa-plus mr-2"></i>New Project
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-primary-800 border-primary-600 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-primary-800 border-primary-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-primary-800 border-primary-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-primary-800 border-primary-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-primary-800 border-primary-600">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="streams">Most Streams</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-primary-800 rounded-xl border border-primary-700 p-6 animate-pulse">
                  <div className="h-6 bg-primary-600 rounded mb-4"></div>
                  <div className="h-4 bg-primary-600 rounded mb-2"></div>
                  <div className="h-4 bg-primary-600 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-folder-open text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your filters or search terms"
                  : "Create your first AI-generated song to get started"}
              </p>
              <Button className="bg-accent-purple hover:bg-accent-purple/80">
                <i className="fas fa-plus mr-2"></i>Create First Project
              </Button>
            </div>
          )}
        </div>

        <SecurityFooter />
      </div>
    </div>
  );
}