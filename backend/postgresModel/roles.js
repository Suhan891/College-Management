// Confusion with should I remove college id
// Later make college info which will link all 


const student = `
    CREATE TABLE students (
    student_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

    enrollment_number INT PRIMARY KEY,
    college_roll_number INT NOT NULL,
    session VARCHAR(100),

    current_year INT,
    current_semester INT,
    current_roll VARCHAR(5),

    stream_id UUID REFERENCES stream(stream_id),
    class_id INT REFERENCES class(class_id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
`

const teacher = `
    teacher_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,

    college_id INT REFERENCES college(college_id) ON DELETE CASCADE,
    college_roll_number INT NOT NULL,

    department_id INT REFERENCES departments(department_id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`