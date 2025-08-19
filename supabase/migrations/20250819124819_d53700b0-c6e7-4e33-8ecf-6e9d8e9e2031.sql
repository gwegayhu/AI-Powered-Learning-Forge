-- Create LMS database schema for AIcademy

-- Instructors table
CREATE TABLE public.instructors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    expertise TEXT[] NOT NULL DEFAULT '{}',
    profile_image TEXT,
    email TEXT NOT NULL,
    location TEXT,
    years_experience INTEGER NOT NULL DEFAULT 0,
    total_students INTEGER NOT NULL DEFAULT 0,
    average_rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
    languages TEXT[] NOT NULL DEFAULT '{"English"}',
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Courses table
CREATE TABLE public.courses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration_weeks INTEGER NOT NULL,
    instructor_id UUID NOT NULL REFERENCES public.instructors(id),
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    is_free BOOLEAN NOT NULL DEFAULT false,
    rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
    total_students INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    learning_objectives TEXT[] NOT NULL DEFAULT '{}',
    requirements TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course modules table
CREATE TABLE public.course_modules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course lessons table
CREATE TABLE public.course_lessons (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('video', 'text', 'quiz', 'assignment')),
    content_url TEXT,
    transcript TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 0,
    order_index INTEGER NOT NULL,
    is_free BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Learners table (extends profiles)
CREATE TABLE public.learners (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    age INTEGER,
    location TEXT,
    learning_goals TEXT[] DEFAULT '{}',
    skill_level TEXT NOT NULL DEFAULT 'beginner',
    background TEXT,
    profile_image TEXT,
    badges TEXT[] DEFAULT '{}',
    total_learning_hours DECIMAL(10,2) DEFAULT 0.00,
    streak_days INTEGER DEFAULT 0,
    preferred_language TEXT DEFAULT 'English',
    timezone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course enrollments table
CREATE TABLE public.course_enrollments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    learner_id UUID NOT NULL REFERENCES public.learners(id),
    course_id UUID NOT NULL REFERENCES public.courses(id),
    status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in-progress', 'completed', 'dropped')),
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    completion_date DATE,
    last_accessed_date DATE,
    time_spent DECIMAL(10,2) DEFAULT 0.00,
    final_grade INTEGER CHECK (final_grade >= 0 AND final_grade <= 100),
    certificate_issued BOOLEAN DEFAULT false,
    certificate_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(learner_id, course_id)
);

-- Course progress tracking
CREATE TABLE public.lesson_progress (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID NOT NULL REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.course_lessons(id),
    completed BOOLEAN NOT NULL DEFAULT false,
    completion_date TIMESTAMP WITH TIME ZONE,
    time_spent DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(enrollment_id, lesson_id)
);

-- Quizzes table
CREATE TABLE public.quizzes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES public.courses(id),
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL DEFAULT '[]',
    passing_score INTEGER NOT NULL DEFAULT 70,
    time_limit_minutes INTEGER DEFAULT 30,
    attempts_allowed INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quiz attempts table
CREATE TABLE public.quiz_attempts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id),
    learner_id UUID NOT NULL REFERENCES public.learners(id),
    score INTEGER NOT NULL,
    answers JSONB NOT NULL DEFAULT '{}',
    attempt_number INTEGER NOT NULL DEFAULT 1,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Forum posts table
CREATE TABLE public.forum_posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES public.courses(id),
    author_id UUID NOT NULL REFERENCES public.learners(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Forum replies table
CREATE TABLE public.forum_replies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.learners(id),
    content TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    is_instructor BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI recommendations table
CREATE TABLE public.ai_recommendations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    learner_id UUID NOT NULL REFERENCES public.learners(id),
    recommended_course_id UUID NOT NULL REFERENCES public.courses(id),
    reason TEXT NOT NULL,
    confidence DECIMAL(3,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    recommendation_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    clicked BOOLEAN DEFAULT false
);

-- AI chatbot interactions table
CREATE TABLE public.chatbot_interactions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    learner_id UUID NOT NULL REFERENCES public.learners(id),
    course_id UUID REFERENCES public.courses(id),
    conversation JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Platform analytics table
CREATE TABLE public.platform_analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access (demo purposes)
CREATE POLICY "Allow public read access" ON public.instructors FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.course_lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.learners FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.course_enrollments FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.lesson_progress FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.quiz_attempts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.ai_recommendations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.chatbot_interactions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.platform_analytics FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_courses_category ON public.courses(category);
CREATE INDEX idx_courses_level ON public.courses(level);
CREATE INDEX idx_courses_instructor ON public.courses(instructor_id);
CREATE INDEX idx_enrollments_learner ON public.course_enrollments(learner_id);
CREATE INDEX idx_enrollments_course ON public.course_enrollments(course_id);
CREATE INDEX idx_enrollments_status ON public.course_enrollments(status);
CREATE INDEX idx_forum_posts_course ON public.forum_posts(course_id);
CREATE INDEX idx_forum_replies_post ON public.forum_replies(post_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON public.instructors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_learners_updated_at BEFORE UPDATE ON public.learners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.course_enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chatbot_updated_at BEFORE UPDATE ON public.chatbot_interactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();