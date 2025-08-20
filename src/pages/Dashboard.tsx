import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, TrendingUp, MessageSquare, Users, Play, CheckCircle } from 'lucide-react';
import enrollmentsData from '../../sample-data/enrollments.json';
import coursesData from '../../sample-data/courses.json';
import learnersData from '../../sample-data/learners.json';
import forumPostsData from '../../sample-data/forum-posts.json';

const Dashboard = () => {
  // Mock current user (first learner for demo)
  const currentUser = learnersData[0];
  const userEnrollments = enrollmentsData.filter(enrollment => enrollment.userId === currentUser.id);
  
  // Get enrolled courses details
  const enrolledCourses = userEnrollments.map(enrollment => {
    const course = coursesData.find(c => c.id === enrollment.courseId);
    return { ...enrollment, course };
  });

  // Calculate stats
  const totalEnrollments = userEnrollments.length;
  const completedCourses = userEnrollments.filter(e => e.status === 'completed').length;
  const inProgressCourses = userEnrollments.filter(e => e.status === 'in-progress').length;
  const averageProgress = userEnrollments.reduce((acc, e) => acc + e.progress, 0) / totalEnrollments || 0;

  // Recent forum activity
  const userForumPosts = forumPostsData.filter(post => post.author_id === currentUser.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {currentUser.full_name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey with AI-powered personalized recommendations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">{totalEnrollments}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedCourses}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressCourses}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Hours</p>
                  <p className="text-2xl font-bold">{currentUser.total_learning_hours}</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  My Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.map((enrollment) => (
                  <div key={enrollment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{enrollment.course?.title}</h4>
                        <p className="text-sm text-muted-foreground">{enrollment.course?.category}</p>
                      </div>
                      <Badge 
                        variant={enrollment.status === 'completed' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {enrollment.status === 'completed' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Play className="w-3 h-3 mr-1" />
                        )}
                        {enrollment.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>⏱️ {enrollment.timeSpent}h spent</span>
                        <span>📅 Last: {enrollment.lastAccessedDate}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        {enrollment.status === 'completed' ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔥 Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500">{currentUser.streak_days}</p>
                  <p className="text-sm text-muted-foreground">days in a row</p>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  My Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentUser.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      🏆 {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Forum Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Forum Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userForumPosts.length > 0 ? (
                  <div className="space-y-3">
                    {userForumPosts.slice(0, 2).map((post) => (
                      <div key={post.id} className="border-l-2 border-primary pl-3">
                        <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                        <p className="text-xs text-muted-foreground">👍 {post.likes} likes</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      View All Posts
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent forum activity</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;