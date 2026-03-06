
const departments = `CREATE TABLE IF NOT EXISTS departments (
    department_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    stream_id UUID REFERENCES streams(stream_id) ON DELETE SET NULL,

    department_name VARCHAR(255) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    hod UUID REFERENCES teachers(teacher_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    UNIQUE(stream_id, department_id)
    );`

const course = `CREATE TABLE courses (
    course_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID REFERENCES colleges(college_id) ON DELETE SET NULL,

    course_name VARCHAR(100) NOT NULL,  -- B.Tech, M.Tech, MBA
    course_code VARCHAR(20) NOT NULL,
    duration_years INT NOT NULL,        -- 4, 2, 3
    total_semesters INT NOT NULL,       -- 8, 4, 6

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(college_id, course_code)
);`

const streams = `CREATE TABLE IF NOT EXISTS streams (
    stream_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id  UUID REFERENCES course(course_id) ON DELETE CASCADE,

    stream_name VARCHAR(255) NOT NULL,
    stream_code VARCHAR(10) NOT NULL,
    hod UUID REFERENCES teacherS(teacher_id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

     UNIQUE(course_id, stream_id)
);`

// // Year based class versioning

// const classVersioning = `CREATE TABLE class_versioning ( --> Not REQUIRED as class will remain always fixed 
// //     class_version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
// //     college_id UUID NOT NULL REFERENCES colleges(college_id) ON DELETE SET NULL, 
// //
// //     effective_from DATE NOT NULL,
// //     effective_to DATE NOT NULL,
// //     is_active BOOLEAN DEFAULT TRUE,

// //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP        
// )`
const classes = `CREATE TABLE classes (
    class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    stream_id UUID REFERENCES stream(stream_id) ON DELETE SET NULL,

    class_name VARCHAR(20) NOT NULL,
    class_teacher UUID REFERENCES teacher(teacher_id),
    academic_year INT NOT NULL, --may be eremoved

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

// // To link a specific department(Mathematics) with subject like (Calculus, Probability,...) for making timetable handle better 
const subject = `CREATE TABLE subjects (
    subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES departments(department_id) ON DELETE CASCADE,
    subject_name VARCHAR(255) NOT NULL
);`