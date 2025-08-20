import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star, BookOpen, Globe, Clock } from 'lucide-react';
import instructorsData from '../../sample-data/instructors.json';

const Instructors = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Our Expert Instructors
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn from {instructorsData.length} world-class instructors with real industry experience
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorsData.map((instructor) => (
            <Card key={instructor.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <img
                    src={instructor.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20"
                  />
                </div>
                <h3 className="text-xl font-semibold">{instructor.name}</h3>
                <p className="text-primary font-medium">{instructor.title}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location */}
                {instructor.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{instructor.location}</span>
                  </div>
                )}
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">{instructor.yearsExperience}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Years Exp</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">{instructor.totalStudents.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{instructor.averageRating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
                
                {/* Bio */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {instructor.bio}
                </p>
                
                {/* Expertise */}
                <div>
                  <p className="text-sm font-medium mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {instructor.expertise.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{instructor.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Languages */}
                <div>
                  <p className="text-sm font-medium mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Action Button */}
                <Button className="w-full" variant="outline">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;