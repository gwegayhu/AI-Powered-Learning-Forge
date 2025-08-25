import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Users, BookOpen, GraduationCap, MessageSquare, BarChart3, Building, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState("courses");

  // Fetch all courses
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all instructors
  const { data: instructors, isLoading: instructorsLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("instructors").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all learners
  const { data: learners, isLoading: learnersLoading } = useQuery({
    queryKey: ["learners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("learners").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all enrollments
  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("course_enrollments").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all forum posts
  const { data: forumPosts, isLoading: forumPostsLoading } = useQuery({
    queryKey: ["forum_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("forum_posts").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["platform_analytics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_analytics").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all course modules
  const { data: courseModules, isLoading: courseModulesLoading } = useQuery({
    queryKey: ["course_modules"],
    queryFn: async () => {
      const { data, error } = await supabase.from("course_modules").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all course lessons
  const { data: courseLessons, isLoading: courseLessonsLoading } = useQuery({
    queryKey: ["course_lessons"],
    queryFn: async () => {
      const { data, error } = await supabase.from("course_lessons").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all quizzes
  const { data: quizzes, isLoading: quizzesLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("quizzes").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all companies
  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("companies").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all employees
  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase.from("employees").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch all documents
  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data, error } = await supabase.from("documents").select("*");
      if (error) throw error;
      return data;
    },
  });

  const formatValue = (value: any, key: string) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "-";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (key.includes("date") || key.includes("_at")) {
      return new Date(value).toLocaleDateString();
    }
    if (key.includes("price") || key.includes("hours")) {
      return parseFloat(value).toFixed(2);
    }
    return String(value);
  };

  const renderTable = (data: any[], tableName: string, isLoading: boolean) => {
    if (isLoading) {
      return <div className="p-8 text-center">Loading {tableName}...</div>;
    }

    if (!data || data.length === 0) {
      return <div className="p-8 text-center text-muted-foreground">No data available for {tableName}</div>;
    }

    const columns = Object.keys(data[0]);

    return (
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold">
                  {column.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column} className="max-w-xs">
                    {column === "id" ? (
                      <Badge variant="outline" className="font-mono text-xs">
                        {String(row[column]).slice(0, 8)}...
                      </Badge>
                    ) : (
                      <div className="truncate">{formatValue(row[column], column)}</div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    );
  };

  const tableStats = [
    { name: "Courses", count: courses?.length || 0, icon: BookOpen },
    { name: "Instructors", count: instructors?.length || 0, icon: Users },
    { name: "Learners", count: learners?.length || 0, icon: GraduationCap },
    { name: "Enrollments", count: enrollments?.length || 0, icon: Database },
    { name: "Forum Posts", count: forumPosts?.length || 0, icon: MessageSquare },
    { name: "Analytics", count: analytics?.length || 0, icon: BarChart3 },
    { name: "Companies", count: companies?.length || 0, icon: Building },
    { name: "Employees", count: employees?.length || 0, icon: Users },
    { name: "Documents", count: documents?.length || 0, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Database Tables</h1>
            <p className="text-muted-foreground">View all data from your database tables</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {tableStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{stat.name}</p>
                        <p className="text-2xl font-bold">{stat.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Database Tables</span>
              </CardTitle>
              <CardDescription>Browse all your database tables and their data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTable} onValueChange={setSelectedTable}>
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="instructors">Instructors</TabsTrigger>
                  <TabsTrigger value="learners">Learners</TabsTrigger>
                  <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                  <TabsTrigger value="forum">Forum</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="courses">
                  {renderTable(courses || [], "courses", coursesLoading)}
                </TabsContent>

                <TabsContent value="instructors">
                  {renderTable(instructors || [], "instructors", instructorsLoading)}
                </TabsContent>

                <TabsContent value="learners">
                  {renderTable(learners || [], "learners", learnersLoading)}
                </TabsContent>

                <TabsContent value="enrollments">
                  {renderTable(enrollments || [], "enrollments", enrollmentsLoading)}
                </TabsContent>

                <TabsContent value="forum">
                  {renderTable(forumPosts || [], "forum posts", forumPostsLoading)}
                </TabsContent>

                <TabsContent value="analytics">
                  {renderTable(analytics || [], "analytics", analyticsLoading)}
                </TabsContent>
              </Tabs>

              {/* Additional Tables Section */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Additional Tables</h3>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Course Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="modules">
                        <TabsList>
                          <TabsTrigger value="modules">Modules</TabsTrigger>
                          <TabsTrigger value="lessons">Lessons</TabsTrigger>
                          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="modules">
                          {renderTable(courseModules || [], "course modules", courseModulesLoading)}
                        </TabsContent>
                        <TabsContent value="lessons">
                          {renderTable(courseLessons || [], "course lessons", courseLessonsLoading)}
                        </TabsContent>
                        <TabsContent value="quizzes">
                          {renderTable(quizzes || [], "quizzes", quizzesLoading)}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Organization Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="companies">
                        <TabsList>
                          <TabsTrigger value="companies">Companies</TabsTrigger>
                          <TabsTrigger value="employees">Employees</TabsTrigger>
                          <TabsTrigger value="documents">Documents</TabsTrigger>
                        </TabsList>
                        <TabsContent value="companies">
                          {renderTable(companies || [], "companies", companiesLoading)}
                        </TabsContent>
                        <TabsContent value="employees">
                          {renderTable(employees || [], "employees", employeesLoading)}
                        </TabsContent>
                        <TabsContent value="documents">
                          {renderTable(documents || [], "documents", documentsLoading)}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tables;