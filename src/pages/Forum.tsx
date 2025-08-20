import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageSquare, Heart, Pin, Reply } from 'lucide-react';
import forumPostsData from '../../sample-data/forum-posts.json';
import learnersData from '../../sample-data/learners.json';
import instructorsData from '../../sample-data/instructors.json';
import coursesData from '../../sample-data/courses.json';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Get unique courses that have forum posts
  const coursesWithPosts = [...new Set(forumPostsData.map(post => post.course_id))];
  const availableCourses = coursesWithPosts.map(courseId => 
    coursesData.find(course => course.id === courseId)
  ).filter(Boolean);

  const filteredPosts = forumPostsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || post.course_id === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  const getAuthorInfo = (authorId: string) => {
    const learner = learnersData.find(l => l.id === authorId);
    const instructor = instructorsData.find(i => i.id === authorId);
    
    if (learner) {
      return {
        name: learner.full_name,
        image: learner.profile_image,
        type: 'learner'
      };
    }
    
    if (instructor) {
      return {
        name: instructor.name,
        image: instructor.profileImage,
        type: 'instructor'
      };
    }
    
    return {
      name: 'Unknown User',
      image: null,
      type: 'learner'
    };
  };

  const getCourseTitle = (courseId: string) => {
    const course = coursesData.find(c => c.id === courseId);
    return course?.title || 'Unknown Course';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with learners and instructors across all courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search discussions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-3 py-2 border rounded-md bg-background min-w-[200px]"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {availableCourses.map(course => (
              <option key={course?.id} value={course?.id}>
                {course?.title}
              </option>
            ))}
          </select>
          
          <Button>
            Start Discussion
          </Button>
        </div>

        {/* Forum Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const author = getAuthorInfo(post.author_id);
            const courseTitle = getCourseTitle(post.course_id);
            
            return (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={author.image || ''} />
                        <AvatarFallback>
                          {author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          {post.is_pinned && (
                            <Pin className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="font-medium">{author.name}</span>
                          {author.type === 'instructor' && (
                            <Badge variant="secondary" className="text-xs">
                              Instructor
                            </Badge>
                          )}
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {courseTitle}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 whitespace-pre-line">
                    {post.content}
                  </p>
                  
                  <Button variant="ghost" size="sm">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forum;