import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Star, 
  DollarSign, 
  Brain,
  MessageSquare,
  Award,
  Globe,
  Clock
} from 'lucide-react';
import analyticsData from '../../sample-data/analytics-dashboard.json';

const Analytics = () => {
  const { platformOverview, revenueMetrics, engagementMetrics, coursePerformance, aiFeatureMetrics, userDemographics } = analyticsData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Platform Analytics
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive insights into AIcademy's performance and user engagement
          </p>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{platformOverview.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">{platformOverview.totalCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{Math.round(platformOverview.courseCompletionRate * 100)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{platformOverview.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Revenue Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Recurring Revenue</span>
                <span className="font-bold">${revenueMetrics.monthlyRecurringRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg Revenue Per User</span>
                <span className="font-bold">${revenueMetrics.averageRevenuePerUser}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subscription Growth</span>
                <Badge variant="default" className="bg-green-500">
                  +{Math.round(revenueMetrics.subscriptionGrowth * 100)}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Revenue</span>
                  <span>${revenueMetrics.courseRevenue.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(revenueMetrics.courseRevenue / (revenueMetrics.courseRevenue + revenueMetrics.subscriptionRevenue)) * 100} 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Daily Active Users</span>
                <span className="font-bold">{engagementMetrics.dailyActiveUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg Session Duration</span>
                <span className="font-bold">{engagementMetrics.averageSessionDuration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Forum Posts/Day</span>
                <span className="font-bold">{engagementMetrics.forumPostsPerDay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Video Watch Time</span>
                <Badge variant="default" className="bg-blue-500">
                  {engagementMetrics.videoWatchTime}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Impact */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Features Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {Math.round(aiFeatureMetrics.recommendationClickRate * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Recommendation Click Rate</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {aiFeatureMetrics.chatbotUsage.dailyInteractions.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Daily Chatbot Interactions</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  +{Math.round(aiFeatureMetrics.adaptiveLearningImpact.completionRateImprovement * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Completion Rate Improvement</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Chatbot Satisfaction</span>
                  <span>{aiFeatureMetrics.chatbotUsage.userSatisfaction}/5.0</span>
                </div>
                <Progress value={(aiFeatureMetrics.chatbotUsage.userSatisfaction / 5) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Resolution Rate</span>
                  <span>{Math.round(aiFeatureMetrics.chatbotUsage.resolutionRate * 100)}%</span>
                </div>
                <Progress value={aiFeatureMetrics.chatbotUsage.resolutionRate * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Courses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePerformance.map((course, index) => (
                <div key={course.courseId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{course.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>👥 {course.enrollments.toLocaleString()} students</span>
                      <span>⭐ {course.averageRating}/5.0</span>
                      <span>✅ {Math.round(course.completionRate * 100)}% completion</span>
                      <span>💰 ${course.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <Badge variant="outline">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(userDemographics.locations).map(([location, percentage]) => (
                  <div key={location}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{location}</span>
                      <span>{Math.round((percentage as number) * 100)}%</span>
                    </div>
                    <Progress value={(percentage as number) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Learner Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(userDemographics.learnerTypes).map(([type, percentage]) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{type}</span>
                      <span>{Math.round((percentage as number) * 100)}%</span>
                    </div>
                    <Progress value={(percentage as number) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;