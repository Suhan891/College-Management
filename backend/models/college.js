// there shall be relationship between college and student tables, so we will create a students column in the college table which will be an array of student ids
const college = `
CREATE TABLE IF NOT EXISTS college (
    college_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_name VARCHAR(255) NOT NULL,
    established_year INT,
    college_logo VARCHAR(255),

    students INT DEFAULT 0,
    teachers INT DEFAULT 0,

    departments INT DEFAULT 0,
    streams INT DEFAULT 0,

    location INT REFERENCES address(address_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
`;

const address = `
    CREATE TABLE IF NOT EXISTS address (
        address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id INT REFERENCES college(college_id) ON DELETE CASCADE,

        latitude FLOAT,  // this data will be based on the location acccess college will provide 
        longitude FLOAT, // this data will be based on the location acccess college will provide 

        city VARCHAR(255),
        state VARCHAR(255),
        country VARCHAR(255),
        pincode INT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

module.exports = {
    college,
    address
}