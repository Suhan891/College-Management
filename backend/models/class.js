
const classes = `
CREATE TABLE class (
    class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id INT REFERENCES college(college_id) ON DELETE CASCADE,
    stream_id UUID REFERENCES stream(stream_id),

    class_name VARCHAR(255) NOT NULL,
    class_teacher UUID REFERENCES users(user_id),
    academic_year INT NOT NULL,

    total_students INT DEFAULT 0,
    students INT[],

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Class Student allocation
const classSudent = `
    create TABLE class_students (
    class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
    student_id UUID REFERENCES student(student_id) ON DELETE CASCADE,
    PRIMARY KEY (class_id, student_id)
    )
`


module.exports = {classes, classSudent};