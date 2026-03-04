
// Later college id shoould be removed to user
const students = `
CREATE TABLE IF NOT EXISTS student (
    student_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

    college_id INT REFERENCES college(college_id) ON DELETE CASCADE, 
    enrollment_number INT PRIMARY KEY,
    college_roll_number INT NOT NULL,

    current_year INT,
    current_semester INT,
    current_class VARCHAR(5),
    session VARCHAR(100),

    class_id INT REFERENCES class(class_id) ON DELETE SET NULL,
    stream_id INT REFERENCES stream(stream_id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (college_id, enrollment_number),
    UNIQUE (college_id, college_roll_number)
);
`;


module.exports = students;