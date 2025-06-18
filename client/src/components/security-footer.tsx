export function SecurityFooter() {
  return (
    <footer className="ml-64 bg-primary-800 border-t border-primary-700 px-8 py-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6 text-gray-400">
          <span>© 2025 RealArtist AI Platform</span>
          <span>•</span>
          <span>Created by Ervin Remus Radosavlevici</span>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent-green rounded-full"></div>
            <span>Secure Connection</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <span className="font-mono text-xs">IP: 192.168.1.***</span>
          <span className="font-mono text-xs">Session: ***-***-***</span>
          <i className="fas fa-shield-halved text-accent-green"></i>
        </div>
      </div>
    </footer>
  );
}
