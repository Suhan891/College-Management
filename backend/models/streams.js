

const streams = `
CREATE TABLE IF NOT EXISTS stream (
    stream_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id  UUID REFERENCES college(college_id) ON DELETE CASCADE,

    stream_name VARCHAR(255) NOT NULL,
    stream_code VARCHAR(10) NOT NULL,
    hod UUID REFERENCES users(user_id),

    teachers INT[],
    students INT[],

    total_students INT DEFAULT 0,
    total_teachers INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = streams;