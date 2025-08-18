import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CoursesSection = () => {
  const featuredCourses = [
    {
      title: "Complete AI & Machine Learning Bootcamp 2024",
      instructor: "Dr. Sarah Chen",
      rating: 4.9,
      students: "127K",
      duration: "42h",
      level: "Intermediate",
      price: "$89.99",
      originalPrice: "$199.99",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=entropy&auto=format",
      category: "AI & ML"
    },
    {
      title: "Full Stack Web Development with React & Node.js",
      instructor: "Alex Rodriguez",
      rating: 4.8,
      students: "89K",
      duration: "55h",
      level: "Beginner",
      price: "$79.99",
      originalPrice: "$159.99",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=entropy&auto=format",
      category: "Development"
    },
    {
      title: "Data Science & Analytics Masterclass",
      instructor: "Prof. Michael Zhang",
      rating: 4.9,
      students: "156K",
      duration: "38h",
      level: "Advanced",
      price: "$99.99",
      originalPrice: "$249.99",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=entropy&auto=format",
      category: "Data Science"
    },
    {
      title: "Digital Marketing & Growth Hacking",
      instructor: "Emma Williams",
      rating: 4.7,
      students: "67K",
      duration: "28h",
      level: "Beginner",
      price: "$69.99",
      originalPrice: "$139.99",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy&auto=format",
      category: "Marketing"
    },
    {
      title: "UI/UX Design Psychology & Principles",
      instructor: "James Thompson",
      rating: 4.8,
      students: "92K",
      duration: "35h",
      level: "Intermediate",
      price: "$84.99",
      originalPrice: "$169.99",
      image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400&h=300&fit=crop&crop=entropy&auto=format",
      category: "Design"
    },
    {
      title: "Blockchain & Cryptocurrency Fundamentals",
      instructor: "David Kumar",
      rating: 4.6,
      students: "43K",
      duration: "22h",
      level: "Beginner",
      price: "$59.99",
      originalPrice: "$119.99",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=entropy&auto=format",
      category: "Blockchain"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Featured Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our most popular courses, carefully curated by industry experts and enhanced with AI-powered learning features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            Browse All Courses
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;