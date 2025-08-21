export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_recommendations: {
        Row: {
          clicked: boolean | null
          confidence: number
          created_at: string
          id: string
          learner_id: string
          reason: string
          recommendation_type: string
          recommended_course_id: string
        }
        Insert: {
          clicked?: boolean | null
          confidence: number
          created_at?: string
          id?: string
          learner_id: string
          reason: string
          recommendation_type: string
          recommended_course_id: string
        }
        Update: {
          clicked?: boolean | null
          confidence?: number
          created_at?: string
          id?: string
          learner_id?: string
          reason?: string
          recommendation_type?: string
          recommended_course_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendations_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_recommendations_recommended_course_id_fkey"
            columns: ["recommended_course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_interactions: {
        Row: {
          conversation: Json
          course_id: string | null
          created_at: string
          id: string
          learner_id: string
          session_id: string
          updated_at: string
        }
        Insert: {
          conversation?: Json
          course_id?: string | null
          created_at?: string
          id?: string
          learner_id: string
          session_id: string
          updated_at?: string
        }
        Update: {
          conversation?: Json
          course_id?: string | null
          created_at?: string
          id?: string
          learner_id?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_interactions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatbot_interactions_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_number: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          owner_name: string | null
          plan: string | null
          plan_price: number | null
          registration_number: string | null
          trial_end_date: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          owner_name?: string | null
          plan?: string | null
          plan_price?: number | null
          registration_number?: string | null
          trial_end_date?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          owner_name?: string | null
          plan?: string | null
          plan_price?: number | null
          registration_number?: string | null
          trial_end_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          certificate_id: string | null
          certificate_issued: boolean | null
          completion_date: string | null
          course_id: string
          created_at: string
          enrollment_date: string
          final_grade: number | null
          id: string
          last_accessed_date: string | null
          learner_id: string
          progress: number
          status: string
          time_spent: number | null
          updated_at: string
        }
        Insert: {
          certificate_id?: string | null
          certificate_issued?: boolean | null
          completion_date?: string | null
          course_id: string
          created_at?: string
          enrollment_date: string
          final_grade?: number | null
          id?: string
          last_accessed_date?: string | null
          learner_id: string
          progress?: number
          status?: string
          time_spent?: number | null
          updated_at?: string
        }
        Update: {
          certificate_id?: string | null
          certificate_issued?: boolean | null
          completion_date?: string | null
          course_id?: string
          created_at?: string
          enrollment_date?: string
          final_grade?: number | null
          id?: string
          last_accessed_date?: string | null
          learner_id?: string
          progress?: number
          status?: string
          time_spent?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          content_type: string
          content_url: string | null
          created_at: string
          duration_minutes: number
          id: string
          is_free: boolean
          module_id: string
          order_index: number
          title: string
          transcript: string | null
        }
        Insert: {
          content_type: string
          content_url?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          is_free?: boolean
          module_id: string
          order_index: number
          title: string
          transcript?: string | null
        }
        Update: {
          content_type?: string
          content_url?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          is_free?: boolean
          module_id?: string
          order_index?: number
          title?: string
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          order_index: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          order_index: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string
          description: string
          duration_weeks: number
          id: string
          image_url: string | null
          instructor_id: string
          is_free: boolean
          learning_objectives: string[]
          level: string
          price: number
          rating: number
          requirements: string[]
          title: string
          total_students: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          duration_weeks: number
          id?: string
          image_url?: string | null
          instructor_id: string
          is_free?: boolean
          learning_objectives?: string[]
          level: string
          price?: number
          rating?: number
          requirements?: string[]
          title: string
          total_students?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          duration_weeks?: number
          id?: string
          image_url?: string | null
          instructor_id?: string
          is_free?: boolean
          learning_objectives?: string[]
          level?: string
          price?: number
          rating?: number
          requirements?: string[]
          title?: string
          total_students?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          approval_status: string | null
          approved_by: string | null
          company_id: string | null
          created_at: string
          created_by: string | null
          custom_fields: Json | null
          document_name: string | null
          document_number: string
          document_type: Database["public"]["Enums"]["document_type"]
          employee_id: string | null
          expiry_date: string
          id: string
          image_url: string | null
          issue_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          approval_status?: string | null
          approved_by?: string | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          document_name?: string | null
          document_number: string
          document_type: Database["public"]["Enums"]["document_type"]
          employee_id?: string | null
          expiry_date: string
          id?: string
          image_url?: string | null
          issue_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          approval_status?: string | null
          approved_by?: string | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          document_name?: string | null
          document_number?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          employee_id?: string | null
          expiry_date?: string
          id?: string
          image_url?: string | null
          issue_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          company_id: string
          created_at: string
          email: string | null
          full_name: string
          id: string
          job_title: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          job_title?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          job_title?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_id: string
          content: string
          course_id: string
          created_at: string
          id: string
          is_pinned: boolean
          likes: number
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          course_id: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          likes?: number
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          course_id?: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          likes?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          is_instructor: boolean
          likes: number
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          is_instructor?: boolean
          likes?: number
          post_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          is_instructor?: boolean
          likes?: number
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          average_rating: number
          bio: string
          created_at: string
          email: string
          expertise: string[]
          id: string
          languages: string[]
          location: string | null
          name: string
          profile_image: string | null
          social_links: Json | null
          title: string
          total_students: number
          updated_at: string
          years_experience: number
        }
        Insert: {
          average_rating?: number
          bio: string
          created_at?: string
          email: string
          expertise?: string[]
          id?: string
          languages?: string[]
          location?: string | null
          name: string
          profile_image?: string | null
          social_links?: Json | null
          title: string
          total_students?: number
          updated_at?: string
          years_experience?: number
        }
        Update: {
          average_rating?: number
          bio?: string
          created_at?: string
          email?: string
          expertise?: string[]
          id?: string
          languages?: string[]
          location?: string | null
          name?: string
          profile_image?: string | null
          social_links?: Json | null
          title?: string
          total_students?: number
          updated_at?: string
          years_experience?: number
        }
        Relationships: []
      }
      learners: {
        Row: {
          age: number | null
          background: string | null
          badges: string[] | null
          created_at: string
          full_name: string
          id: string
          learning_goals: string[] | null
          location: string | null
          preferred_language: string | null
          profile_image: string | null
          skill_level: string
          streak_days: number | null
          timezone: string | null
          total_learning_hours: number | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          age?: number | null
          background?: string | null
          badges?: string[] | null
          created_at?: string
          full_name: string
          id?: string
          learning_goals?: string[] | null
          location?: string | null
          preferred_language?: string | null
          profile_image?: string | null
          skill_level?: string
          streak_days?: number | null
          timezone?: string | null
          total_learning_hours?: number | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          age?: number | null
          background?: string | null
          badges?: string[] | null
          created_at?: string
          full_name?: string
          id?: string
          learning_goals?: string[] | null
          location?: string | null
          preferred_language?: string | null
          profile_image?: string | null
          skill_level?: string
          streak_days?: number | null
          timezone?: string | null
          total_learning_hours?: number | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completion_date: string | null
          created_at: string
          enrollment_id: string
          id: string
          lesson_id: string
          time_spent: number | null
        }
        Insert: {
          completed?: boolean
          completion_date?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          lesson_id: string
          time_spent?: number | null
        }
        Update: {
          completed?: boolean
          completion_date?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          lesson_id?: string
          time_spent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link_url: string | null
          meta: Json
          read_at: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link_url?: string | null
          meta?: Json
          read_at?: string | null
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link_url?: string | null
          meta?: Json
          read_at?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_analytics: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          metric_date: string
          metric_name: string
          metric_value: number
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_date?: string
          metric_name: string
          metric_value: number
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_date?: string
          metric_name?: string
          metric_value?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json
          attempt_number: number
          completed_at: string
          id: string
          learner_id: string
          quiz_id: string
          score: number
        }
        Insert: {
          answers?: Json
          attempt_number?: number
          completed_at?: string
          id?: string
          learner_id: string
          quiz_id: string
          score: number
        }
        Update: {
          answers?: Json
          attempt_number?: number
          completed_at?: string
          id?: string
          learner_id?: string
          quiz_id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "learners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          attempts_allowed: number | null
          course_id: string
          created_at: string
          description: string | null
          id: string
          passing_score: number
          questions: Json
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          attempts_allowed?: number | null
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          passing_score?: number
          questions?: Json
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          attempts_allowed?: number | null
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          passing_score?: number
          questions?: Json
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analytics_funnel: {
        Args: { tz?: string }
        Returns: {
          name: string
          value: number
        }[]
      }
      analytics_kpis: {
        Args: { expiring_window_days?: number; tz?: string }
        Returns: {
          expiring_soon: number
          overdue: number
          renewal_rate: number
          renewals: number
          total_documents: number
        }[]
      }
      analytics_monthly_status: {
        Args: { expiring_window_days?: number; months?: number; tz?: string }
        Returns: {
          expiring: number
          month_label: string
          overdue: number
          valid: number
        }[]
      }
      analytics_trends: {
        Args: { end_date: string; start_date: string; tz?: string }
        Returns: {
          added: number
          day: string
          expiring: number
          overdue: number
          renewed: number
        }[]
      }
      analytics_type_breakdown: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          value: number
        }[]
      }
      analytics_type_status: {
        Args: { expiring_window_days?: number; tz?: string }
        Returns: {
          document_type: string
          expiring: number
          overdue: number
          valid: number
        }[]
      }
      analytics_weekly_summary: {
        Args: { tz?: string; weeks?: number }
        Returns: {
          docs: number
          expiring: number
          overdue: number
          renewal_rate: number
          week_start: string
        }[]
      }
    }
    Enums: {
      document_type:
        | "emirates_id"
        | "passport"
        | "business_license"
        | "visa"
        | "permit"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: [
        "emirates_id",
        "passport",
        "business_license",
        "visa",
        "permit",
        "other",
      ],
    },
  },
} as const
