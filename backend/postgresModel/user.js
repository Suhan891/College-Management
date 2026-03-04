
const roles = `
    CREATE TYPE roles_entries AS ENUM (
    'admin', 'college', 'teacher', 'student'
    )
);
`

const user = `
    CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role roles_entries,

    email VARCHAR(255) UNIQUE NOT NULL, 
    password TEXT NOT NULL,

    name VARCHAR(255),
    date_of_birth DATE,

    is_Email_verified BOOLEAN FALSE,
    is_active BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
