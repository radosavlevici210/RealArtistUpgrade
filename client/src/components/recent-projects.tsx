import { useProjects } from "@/hooks/use-projects";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

export function RecentProjects() {
  const { data: projects = [], isLoading } = useProjects();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-accent-green/20 text-accent-green";
      case "processing":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      "from-accent-green to-accent-blue",
      "from-accent-purple to-accent-blue",
      "from-red-500 to-pink-500",
      "from-yellow-500 to-orange-500",
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Projects</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-primary-700 rounded-xl animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-primary-600 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-primary-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Recent Projects</h3>
      
      <div className="space-y-3">
        {recentProjects.map((project, index) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <div className="p-3 bg-primary-700 rounded-xl hover:bg-primary-600 cursor-pointer transition-all">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getGradientColors(index)} rounded-lg flex items-center justify-center`}>
                  <i className="fas fa-music text-white text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{project.title}</h4>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status === "complete" ? "Complete" : 
                   project.status === "processing" ? "In Progress" : "Draft"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/vault">
        <button className="w-full mt-4 text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
          View All Projects <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </Link>
    </div>
  );
}
