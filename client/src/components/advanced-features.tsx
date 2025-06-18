const features = [
  {
    id: "multi-language",
    title: "Multi-Language AI",
    description: "Translate and sing in 100+ languages while preserving rhyme and emotion.",
    icon: "fas fa-language",
    gradient: "from-accent-purple to-pink-500",
    badge: "Elite Feature",
    badgeColor: "text-accent-purple",
    hoverBorder: "hover:border-accent-purple/50",
  },
  {
    id: "voice-fusion",
    title: "Voice Fusion",
    description: "Blend multiple artist vocal styles to create unique AI voices.",
    icon: "fas fa-dna",
    gradient: "from-accent-blue to-cyan-500",
    badge: "Pro Feature",
    badgeColor: "text-accent-blue",
    hoverBorder: "hover:border-accent-blue/50",
  },
  {
    id: "emotion-mapping",
    title: "Emotion Mapping",
    description: "Dynamic instrumental evolution matching lyrical emotion flow.",
    icon: "fas fa-heart-pulse",
    gradient: "from-accent-green to-emerald-500",
    badge: "Premium Feature",
    badgeColor: "text-accent-green",
    hoverBorder: "hover:border-accent-green/50",
  },
  {
    id: "ai-director",
    title: "AI Director",
    description: "Automatic music video direction with scene-by-scene control.",
    icon: "fas fa-video",
    gradient: "from-yellow-500 to-orange-500",
    badge: "Coming Soon",
    badgeColor: "text-yellow-500",
    hoverBorder: "hover:border-yellow-500/50",
  },
];

export function AdvancedFeatures() {
  return (
    <div className="mt-12 max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Advanced AI Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`bg-primary-800 rounded-2xl border border-primary-700 p-6 ${feature.hoverBorder} transition-all cursor-pointer group`}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <i className={`${feature.icon} text-white text-xl`}></i>
            </div>
            <h4 className="font-bold text-white mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
            <div className={`text-xs font-medium ${feature.badgeColor}`}>
              {feature.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
