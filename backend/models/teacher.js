

const teacher = `
CREATE TABLE IF NOT EXISTS teacher (
    teacher_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,

    college_id INT REFERENCES college(college_id) ON DELETE CASCADE,
    college_roll_number INT NOT NULL,

    department_id INT REFERENCES departments(department_id) ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;


module.exports = teacher;