// // Semester basis subject_class versioning
// const subject_class = `CREATE TABLE class_subjects (
//     class_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

//     class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
//     subject_id UUID REFERENCES subjects(subject_id),
//     teacher_id UUID REFERENCES teachers(teacher_id),

//     UNIQUE (class_id, subject_id)
// );`

// // It will be added by the college
// const time_slots = `CREATE TABLE time_slots (
//     time_slot_id SERIAL PRIMARY KEY,

//     college_id UUID REFERENCES colleges(college_id) ON DELETE CASCADE,

//     period_number INT NOT NULL,
//     start_time TIME NOT NULL,
//     end_time TIME NOT NULL,

//     UNIQUE (college_id, period_number)
// );`
// day_of_week
// // Already made earlier
// const days = `CREATE TYPE day_of_week AS ENUM (
//     'Monday', 'Tuesday', 'Wednesday',
//     'Thursday', 'Friday', 'Saturday', 'Sunday'
// );`



// Query left
// Now in a new semester timetable is changed so we should make timetable versioning
const timetable_versioning = `CREATE TABLE timetable_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID NOT NULL REFERENCES streams(stream_id) ON DELETE CASCADE,

    semester INT NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const timetable = `CREATE TABLE timetable_entries (
    timetable_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES timetable_versions(version_id) ON DELETE CASCADE,

    calender_id UUID NOT NULL REFERENES academic_calendars(calender_id), -- will be provided by college on creation

    class_subject_id UUID NOT NULL REFERENCES class_subjects(class_subject_id), -- this will provide the class id

    time_slot_id INT NOT NULL REFERENCES time_slots(id) ON DELETE CASCADE,
    day day_of_week NOT NULL,

    CONSTRAINT unique_class_schedule UNIQUE (class_id, time_slot_id, day)
);`

// Handled by teacher
const attendanceSession = `CREATE TABLE attendance_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    timetable_id UUID NOT NULL REFERENCES timetable(timetable_id), -- it will have calender of college

    session_date DATE NOT NULL,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NOT NULL,

    started_by UUID NOT NULL REFERENCES teachers(teacher_id),
    is_closed BOOLEAN DEFAULT FALSE,
    UNIQUE (timetable_id, session_date)
);`

// Attendence handling for every period
const status = `CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT');`
const source = `CREATE TYPE attendance_source AS ENUM ('STUDENT','TEACHER','CLASS_TEACHER');`
const attendence = `CREATE TABLE attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    timetable_id UUID NOT NULL REFERENCES timetable(timetable_id) ON DELETE CASCADE,

    attendance_date DATE NOT NULL,
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status attendance_status DEFAULT 'ABSENT',

    marked_by UUID, -- teacher_id OR student_id
    source attendance_source DEFAULT 'STUDENT',

    UNIQUE (student_id, timetable_id, attendance_date)
);`
// As timetable id is given to both so they will be linked by the timetable id