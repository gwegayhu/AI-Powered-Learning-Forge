import { Brain, Users, TrendingUp, Zap, Target, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Adaptive learning paths that evolve with your progress, ensuring optimal learning outcomes tailored to your unique style.",
    },
    {
      icon: Users,
      title: "Global Learning Community",
      description: "Connect with millions of learners worldwide. Collaborate, discuss, and grow together in our vibrant educational ecosystem.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track your progress with intelligent insights. Identify strengths, discover areas for improvement, and stay motivated.",
    },
    {
      icon: Zap,
      title: "Instant AI Tutoring",
      description: "Get immediate help from our advanced AI tutor. Available 24/7 to answer questions and provide personalized explanations.",
    },
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "AI helps you set achievable learning goals and creates personalized milestones to keep you on track for success.",
    },
    {
      icon: Shield,
      title: "Industry Certifications",
      description: "Earn verifiable credentials from top universities and companies. Build your professional portfolio with recognized certificates.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Why Choose AIcademy?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of education with our cutting-edge AI technology that adapts to your unique learning style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-card rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border border-border/50"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;