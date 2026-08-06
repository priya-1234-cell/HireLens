function FeatureCard({ title, description, icon }) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
        <div className="text-5xl text-cyan-400 mb-6">
  {icon}
</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
  
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    );
  }
  
  export default FeatureCard;