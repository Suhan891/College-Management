CREATE TYPE roles_entries AS ENUM (
    'admin', 'college', 'teacher', 'student'
);
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     role roles_entries,

     email VARCHAR(255) UNIQUE NOT NULL, 
     password TEXT NULL,

     name VARCHAR(255),
     date_of_birth DATE DEFAULT NULL,

     is_email_verified BOOLEAN DEFAULT FALSE,
     is_active BOOLEAN DEFAULT FALSE,

     tokenVersion INT DEFAULT 0,
     resetPasswordToken VARCHAR(255) DEFAULT NULL,
     resetPasswordExpires TIME DEFAULT NULL,

     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );   
 CREATE TABLE IF NOT EXISTS colleges (
    college_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    college_name VARCHAR(255) NOT NULL,
    established_year INT,
    college_logo VARCHAR(255),

    creator UUID NOT NULL REFERENCES users(user_id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
CREATE TABLE IF NOT EXISTS address (
    address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID REFERENCES colleges(college_id) ON DELETE SET NULL, 

    latitude FLOAT,  -- this data will be based on the location access college will provide 
    longitude FLOAT, -- this data will be based on the location access college will provide 
    college_radius INT DEFAULT 100, -- To store the radius of the college premises -> For validating attendance 

    location TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    pincode INT NOT NULL,

    UNIQUE(college_id, latitude, longitude),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TYPE day_of_week AS ENUM (
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
);
CREATE TABLE academic_calendars (
    calendar_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID REFERENCES colleges(college_id) ON DELETE CASCADE,

    academic_session VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    working_days day_of_week[] NOT NULL,

    UNIQUE(college_id, academic_session) -- No college can make 2 calendars for the same year. Instead college has to delete existing to create
);
CREATE TYPE day_status_enum AS ENUM (
    'WORKING',
    'HOLIDAY'
);
CREATE TABLE calendar_day_exception (
    day_exceptions_id UUID REFERENCES academic_calendars(calendar_id) ON DELETE CASCADE,

    specific_date DATE NOT NULL,
    day_status day_status_enum NOT NULL,

    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (day_exceptions_id, specific_date)
);

CREATE TABLE courses (
    course_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID REFERENCES colleges(college_id) ON DELETE SET NULL,

    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    duration_years INT NOT NULL,
    total_semesters INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(college_id, course_code)
);

CREATE TABLE IF NOT EXISTS streams (
    stream_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id  UUID REFERENCES courses(course_id) ON DELETE CASCADE,

    stream_name VARCHAR(255) NOT NULL,
    stream_code VARCHAR(10) NOT NULL,
    hod UUID REFERENCES teachers(teacher_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(course_id, stream_id)
);
CREATE TABLE IF NOT EXISTS departments (
    department_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    stream_id UUID REFERENCES streams(stream_id) ON DELETE SET NULL,

    department_name VARCHAR(255) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    hod UUID REFERENCES teacher(teacher_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(stream_id, department_id)
);

CREATE TABLE classes (
    class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    stream_id UUID REFERENCES streams(stream_id) ON DELETE SET NULL,

    class_name VARCHAR(20) NOT NULL,
    class_teacher UUID REFERENCES teacher(teacher_id),
    address_id UUID REFERENCES address(address_id) ON DELETE SET NULL,
    academic_year INT NOT NULL, -- may be removed
    address_id UUID REFERENCES address(address_id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles
CREATE TABLE IF NOT EXISTS students (
    student_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(college_id),

    enrollment_number INT NOT NULL,
    registered_roll_number INT NOT NULL,
    session VARCHAR(100),

    current_year INT,
    current_semester INT,
    current_roll VARCHAR(5),

    stream_id UUID NOT NULL REFERENCES streams(stream_id),
    class_id UUID NOT NULL REFERENCES classes(class_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,

    college_id UUID NOT NULL REFERENCES colleges(college_id),
    registered_batch_number INT NOT NULL,

    department_id UUID NOT NULL REFERENCES departments(department_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE departments 
ADD COLUMN hod UUID REFERENCES teachers(teacher_id) DEFAULT NULL;

ALTER TABLE streams
ADD COLUMN hod UUID REFERENCES teachers(teacher_id) DEFAULT NULL;

ALTER TABLE classes
ADD COLUMN class_teacher UUID REFERENCES teachers(teacher_id) DEFAULT NULL;

-- Subject
CREATE TABLE subjects (
    subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES departments(department_id) ON DELETE CASCADE,
    subject_name VARCHAR(255) NOT NULL
);
CREATE TABLE class_subjects ( 
    class_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(subject_id),
    teacher_id UUID REFERENCES teachers(teacher_id),

    UNIQUE (class_id, subject_id)
);

-- Time Table
CREATE TABLE time_slots (
    time_slot_id SERIAL PRIMARY KEY,

    calendar_id UUID NOT NULL REFERENCES academic_calendars(calendar_id), -- will be confirmed by the college on creation

    period_number INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    UNIQUE (calendar_id, period_number)
);
CREATE TABLE timetable_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID NOT NULL REFERENCES streams(stream_id) ON DELETE CASCADE,

    effective_from DATE NOT NULL,
    effective_to DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,

    --address_id UUID REFERENCES address(address_id) ON DELETE SET NULL, -- college will confirm the address for this timetable creation

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE timetable (
    timetable_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES timetable_versions(version_id) ON DELETE SET NULL,

    class_subject_id UUID NOT NULL REFERENCES class_subjects(class_subject_id) ON DELETE CASCADE, -- this will provide the class id

    time_slot_id INT NOT NULL REFERENCES time_slots(time_slot_id) ON DELETE SET NULL,
    day day_of_week NOT NULL,

    UNIQUE (class_subject_id, time_slot_id, day)
);

-- Attendance
CREATE TABLE attendance_sessions ( -- Created by subject teacher
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    timetable_id UUID NOT NULL REFERENCES timetable(timetable_id) ON DELETE SET NULL, -- it will have calendar of college
    teacher UUID NOT NULL REFERENCES teachers(teacher_id),
    
    session_date DATE NOT NULL,  -- It should be default as current time stamp
    start_time start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '10 minutes'),

   
    is_open BOOLEAN DEFAULT TRUE,
    UNIQUE (timetable_id, session_date)
);
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT');
CREATE TYPE attendance_source AS ENUM ('STUDENT','TEACHER','CLASS_TEACHER');
CREATE TABLE attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    timetable_id UUID NOT NULL REFERENCES timetable(timetable_id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES attendance_sessions(session_id),

     -- attendance_date DATE NOT NULL, -- It has been removed -> we have created at
    
    marking attendance_status DEFAULT 'ABSENT',
    source_role attendance_source DEFAULT 'STUDENT',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Similar to marked at option
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (student_id, timetable_id, attendance_date)
);

-- This removes the column and its foreign key constraint automatically
ALTER TABLE timetable_versions 
DROP COLUMN address_id;

ALTER TABLE classes 
ADD COLUMN address_id UUID REFERENCES address(address_id) ON DELETE SET NULL;
