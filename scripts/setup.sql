-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users with additional fields)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question_text TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  options JSONB NOT NULL,
  correct_answer TEXT[] NOT NULL,
  explanation TEXT,
  source_refs TEXT[],
  syllabus_refs TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMPTZ
);
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS syllabus_refs TEXT[] NOT NULL DEFAULT '{}';

-- User progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  answered_correctly BOOLEAN NOT NULL,
  selected_answer TEXT[],
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id, timestamp)
);

-- User sessions table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  login_time TIMESTAMPTZ NOT NULL,
  logout_time TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content modules table
CREATE TABLE IF NOT EXISTS public.content_modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  syllabus_refs TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.content_modules ADD COLUMN IF NOT EXISTS syllabus_refs TEXT[] NOT NULL DEFAULT '{}';

-- CIT scenarios bank (PSRAS Critical Incidents Test approximation)
CREATE TABLE IF NOT EXISTS public.cit_scenarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  syllabus_refs TEXT[] NOT NULL DEFAULT '{}',
  setup TEXT NOT NULL,
  branches JSONB NOT NULL,
  learning_points TEXT[] NOT NULL DEFAULT '{}',
  source_refs TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('draft', 'approved', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scenario sessions table
CREATE TABLE IF NOT EXISTS public.scenario_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  scenario_data JSONB NOT NULL,
  responses JSONB NOT NULL DEFAULT '[]'::jsonb,
  feedback JSONB,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES public.content_modules(id) ON DELETE CASCADE,
  certificate_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Imported sources table
CREATE TABLE IF NOT EXISTS public.imported_sources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('pace_code', 'book', 'case_law', 'other')),
  imported_at TIMESTAMPTZ DEFAULT NOW(),
  parsed_content JSONB,
  metadata JSONB
);

-- AI generated questions table
CREATE TABLE IF NOT EXISTS public.ai_generated_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source_id UUID REFERENCES public.imported_sources(id) ON DELETE CASCADE,
  question_data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'reviewed')),
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.users(id)
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.content_modules(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id),
  UNIQUE(user_id, module_id),
  CHECK ((question_id IS NOT NULL AND module_id IS NULL) OR (question_id IS NULL AND module_id IS NOT NULL))
);

-- Study plans table
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  exam_date DATE NOT NULL,
  daily_hours INTEGER DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Study plan goals table
CREATE TABLE IF NOT EXISTS public.study_plan_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  study_plan_id UUID REFERENCES public.study_plans(id) ON DELETE CASCADE NOT NULL,
  goal_date DATE NOT NULL,
  category TEXT,
  goal_type TEXT NOT NULL,
  target_count INTEGER NOT NULL,
  completed_count INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS public.flashcards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  category TEXT,
  difficulty TEXT,
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ DEFAULT NOW(),
  review_count INTEGER DEFAULT 0,
  ease_factor DECIMAL(5,2) DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mock exam sessions table
CREATE TABLE IF NOT EXISTS public.mock_exam_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  exam_name TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  time_limit_minutes INTEGER NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  answers JSONB DEFAULT '{}'::jsonb,
  score INTEGER,
  percentage DECIMAL(5,2),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned'))
);

-- PACE code sections table
CREATE TABLE IF NOT EXISTS public.pace_code_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code_letter TEXT NOT NULL,
  section_number TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  search_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(code_letter, section_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.questions(status);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_question_id ON public.user_progress(question_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_scenario_sessions_user_id ON public.scenario_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generated_questions_status ON public.ai_generated_questions(status);
CREATE INDEX IF NOT EXISTS idx_ai_generated_questions_source_id ON public.ai_generated_questions(source_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_study_plans_user_id ON public.study_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_study_plan_goals_plan_id ON public.study_plan_goals(study_plan_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_user_id ON public.flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_next_review ON public.flashcards(next_review);
CREATE INDEX IF NOT EXISTS idx_mock_exam_sessions_user_id ON public.mock_exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_pace_code_search ON public.pace_code_sections USING gin(search_keywords);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_module_id ON public.certificates(module_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_logout_time ON public.user_sessions(logout_time) WHERE logout_time IS NULL;
CREATE INDEX IF NOT EXISTS idx_content_modules_category ON public.content_modules(category);
CREATE INDEX IF NOT EXISTS idx_content_modules_order_index ON public.content_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_questions_syllabus_refs ON public.questions USING gin(syllabus_refs);
CREATE INDEX IF NOT EXISTS idx_content_modules_syllabus_refs ON public.content_modules USING gin(syllabus_refs);
CREATE INDEX IF NOT EXISTS idx_cit_scenarios_status ON public.cit_scenarios(status);
CREATE INDEX IF NOT EXISTS idx_cit_scenarios_category ON public.cit_scenarios(category);
CREATE INDEX IF NOT EXISTS idx_cit_scenarios_syllabus_refs ON public.cit_scenarios USING gin(syllabus_refs);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imported_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generated_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plan_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pace_code_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cit_scenarios ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Approved questions are visible to all" ON public.questions;
DROP POLICY IF EXISTS "Admins can manage questions" ON public.questions;
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "System can insert sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Authenticated users can view modules" ON public.content_modules;
DROP POLICY IF EXISTS "Admins can manage modules" ON public.content_modules;
DROP POLICY IF EXISTS "Users can view own scenarios" ON public.scenario_sessions;
DROP POLICY IF EXISTS "Users can insert own scenarios" ON public.scenario_sessions;
DROP POLICY IF EXISTS "Users can update own scenarios" ON public.scenario_sessions;
DROP POLICY IF EXISTS "Users can view own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Users can insert own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admins can manage sources" ON public.imported_sources;
DROP POLICY IF EXISTS "Admins can manage AI questions" ON public.ai_generated_questions;
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can insert own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can manage own study plans" ON public.study_plans;
DROP POLICY IF EXISTS "Users can manage own study goals" ON public.study_plan_goals;
DROP POLICY IF EXISTS "Users can manage own flashcards" ON public.flashcards;
DROP POLICY IF EXISTS "Users can manage own mock exams" ON public.mock_exam_sessions;
DROP POLICY IF EXISTS "Authenticated users can view PACE sections" ON public.pace_code_sections;
DROP POLICY IF EXISTS "Admins can manage PACE sections" ON public.pace_code_sections;
DROP POLICY IF EXISTS "Approved CIT scenarios visible to authenticated" ON public.cit_scenarios;
DROP POLICY IF EXISTS "Admins manage CIT scenarios" ON public.cit_scenarios;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Questions policies
CREATE POLICY "Approved questions are visible to all" ON public.questions FOR SELECT USING (status = 'approved' OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can manage questions" ON public.questions FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- User progress policies
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- User sessions policies
CREATE POLICY "Users can view own sessions" ON public.user_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert sessions" ON public.user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own sessions" ON public.user_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Content modules policies
CREATE POLICY "Authenticated users can view modules" ON public.content_modules FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage modules" ON public.content_modules FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Scenario sessions policies
CREATE POLICY "Users can view own scenarios" ON public.scenario_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scenarios" ON public.scenario_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scenarios" ON public.scenario_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Users can view own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own certificates" ON public.certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Imported sources policies
CREATE POLICY "Admins can manage sources" ON public.imported_sources FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- AI generated questions policies
CREATE POLICY "Admins can manage AI questions" ON public.ai_generated_questions FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Study plans policies
CREATE POLICY "Users can manage own study plans" ON public.study_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own study goals" ON public.study_plan_goals FOR ALL USING ((SELECT user_id FROM public.study_plans WHERE id = study_plan_id) = auth.uid());

-- Flashcards policies
CREATE POLICY "Users can manage own flashcards" ON public.flashcards FOR ALL USING (auth.uid() = user_id);

-- Mock exam sessions policies
CREATE POLICY "Users can manage own mock exams" ON public.mock_exam_sessions FOR ALL USING (auth.uid() = user_id);

-- PACE code sections policies
CREATE POLICY "Authenticated users can view PACE sections" ON public.pace_code_sections FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage PACE sections" ON public.pace_code_sections FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- CIT scenarios policies
CREATE POLICY "Approved CIT scenarios visible to authenticated" ON public.cit_scenarios FOR SELECT USING (status = 'approved' AND auth.role() = 'authenticated');
CREATE POLICY "Admins manage CIT scenarios" ON public.cit_scenarios FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Function to automatically create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.users.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
