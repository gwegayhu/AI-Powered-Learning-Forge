import { TrendingUp, Users, Award, Globe } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "10M+",
      label: "Active Learners",
      description: "Join millions of students worldwide"
    },
    {
      icon: Award,
      value: "50,000+",
      label: "Courses Available",
      description: "From beginner to expert level"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "Students achieve their learning goals"
    },
    {
      icon: Globe,
      value: "190+",
      label: "Countries",
      description: "Global learning community"
    }
  ];

  return (
    <section className="py-24 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Transforming Lives Through Education
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our AI-powered platform has helped millions of learners achieve their goals and advance their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </h3>
              <p className="text-xl font-semibold text-white/90 mb-2">
                {stat.label}
              </p>
              <p className="text-white/70 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;