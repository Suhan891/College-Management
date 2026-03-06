// Semester basis subject_class versioning
const subject_class = `CREATE TABLE class_subjects ( -- Changes has to be done
    class_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(subject_id),
    teacher_id UUID REFERENCES teachers(teacher_id),

    UNIQUE (class_id, subject_id)
);`

// // It will be added by the college
const time_slots = `CREATE TABLE time_slots (
    time_slot_id SERIAL PRIMARY KEY,

     -- Removed college_id UUID instead kept callenderId
    calender_id UUID NOT NULL REFERENES academic_calendars(calender_id), -- will be confirmed confirmed from college on creation

    period_number INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    UNIQUE (calender_id, period_number)
);`
// day_of_week
// // Already made earlier
// const days = `CREATE TYPE day_of_week AS ENUM (
//     'Monday', 'Tuesday', 'Wednesday',
//     'Thursday', 'Friday', 'Saturday', 'Sunday'
// );`




const timetable_versioning = `CREATE TABLE timetable_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID NOT NULL REFERENCES streams(stream_id) ON DELETE CASCADE,

    effective_from DATE NOT NULL,
    effective_to DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,

    adress_id UUID REFERENCES adress(adress_id) ON DELETE SET NULL, -- college will confirm the adress for this timetable creation

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const timetable = `CREATE TABLE timetable (
    timetable_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES timetable_versions(version_id) ON DELETE CASCADE,

    class_subject_id UUID NOT NULL REFERENCES class_subjects(class_subject_id) ON DELETE CASCADE, -- this will provide the class id

    time_slot_id INT NOT NULL REFERENCES time_slots(id) ON DELETE CASCADE,
    day day_of_week NOT NULL,

    UNIQUE (class_subject_id, time_slot_id, day)
);`

// Handled by teacher
const attendanceSession = `CREATE TABLE attendance_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    timetable_id UUID NOT NULL REFERENCES timetable(timetable_id) ON DELETE SET NULL, -- it will have calender of college
    teacher UUID NOT NULL REFERENCES teachers(teacher_id),
    
    session_date DATE NOT NULL,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NOT NULL,

    -- Most probably better not to use -> class_subject_id UUID NOT NULL REFERENCES class_subjects(class_subject_id),
    is_open BOOLEAN DEFAULT TRUE,
    UNIQUE (timetable_id, session_date)
);`

// Attendence handling for every period
const status = `CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT');`
const source = `CREATE TYPE attendance_source AS ENUM ('STUDENT','TEACHER','CLASS_TEACHER');`
const attendence = `CREATE TABLE attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    timetable_id UUID NOT NULL REFERENCES timetable(timetable_id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES attendance_sessions(sessions_id)

    attendance_date DATE NOT NULL,
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    marking_attendance_status DEFAULT 'ABSENT',

    source_role attendance_source DEFAULT 'STUDENT',

    UNIQUE (student_id, timetable_id, attendance_date)
);`
// As timetable id is given to both so they will be linked by the timetable id