// here we will make schema which will have all the primary keys of college, student, teacher, department and stream tables and create a relationship between them

const collegeData = `
CREATE TABLE IF NOT EXISTS college_data (
    college_data_id SERIAL PRIMARY KEY,
    college_id INT REFERENCES college(college_id) ON DELETE CASCADE,

    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teacher(teacher_id) ON DELETE CASCADE,

    department_id INT REFERENCES departments(department_id) ON DELETE CASCADE,
    stream_id INT REFERENCES streams(stream_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
module.exports = collegeData;