import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AIcademy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/courses" 
              className={`transition-colors ${isActive('/courses') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Courses
            </Link>
            <Link 
              to="/instructors" 
              className={`transition-colors ${isActive('/instructors') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Instructors
            </Link>
            <Link 
              to="/dashboard" 
              className={`transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/forum" 
              className={`transition-colors ${isActive('/forum') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Forum
            </Link>
            <Link 
              to="/analytics" 
              className={`transition-colors ${isActive('/analytics') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Analytics
            </Link>
            <Link 
              to="/tables" 
              className={`transition-colors ${isActive('/tables') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Tables
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/courses" 
                className={`transition-colors ${isActive('/courses') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/instructors" 
                className={`transition-colors ${isActive('/instructors') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Instructors
              </Link>
              <Link 
                to="/dashboard" 
                className={`transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/forum" 
                className={`transition-colors ${isActive('/forum') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Forum
              </Link>
              <Link 
                to="/analytics" 
                className={`transition-colors ${isActive('/analytics') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link 
                to="/tables" 
                className={`transition-colors ${isActive('/tables') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tables
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost">Sign In</Button>
                <Button>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;