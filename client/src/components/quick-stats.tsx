import { useQuery } from "@tanstack/react-query";
import type { UserStats } from "@shared/schema";

export function QuickStats() {
  const { data: stats, isLoading } = useQuery<UserStats>({
    queryKey: ["/api/user/stats"],
  });

  if (isLoading) {
    return (
      <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="h-4 bg-primary-600 rounded w-1/2"></div>
              <div className="h-4 bg-primary-600 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
        <p className="text-gray-400">No stats available</p>
      </div>
    );
  }

  const formatStreams = (streams: number) => {
    if (streams >= 1000) {
      return `${(streams / 1000).toFixed(1)}K`;
    }
    return streams.toString();
  };

  const formatRoyalties = (cents: number) => {
    return `$${(cents / 100).toLocaleString()}`;
  };

  return (
    <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Songs Created</span>
          <span className="font-bold text-accent-green">{stats.songsCreated}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Streams</span>
          <span className="font-bold text-accent-blue">{formatStreams(stats.totalStreams)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Royalties Earned</span>
          <span className="font-bold text-accent-purple">{formatRoyalties(stats.royaltiesEarned)}</span>
        </div>
        <div className="h-px bg-primary-700"></div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">AI Credits</span>
          <span className="font-bold text-white">{stats.aiCreditsRemaining} remaining</span>
        </div>
      </div>
    </div>
  );
}
