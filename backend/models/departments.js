

const department = `
CREATE TABLE IF NOT EXISTS department (
    department_id UUID PRIMARY KEY DEFAULT gen_random_uuid(,
    college_id INT REFERENCES college(college_id) ON DELETE CASCADE,

    department_name VARCHAR(255) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    hod REFERENCES users(user_id),

    total_teachers INT DEFAULT 0,
    teachers INT[],

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = department;