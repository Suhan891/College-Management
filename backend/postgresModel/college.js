// const colleges = `CREATE TABLE IF NOT EXISTS colleges (
//     college_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
//     college_name VARCHAR(255) NOT NULL,
//     established_year INT,
//     college_logo VARCHAR(255),

//     creator UUID REFERENCES users(user_id) NOT NULL,

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
// );`

// const address = `
//     CREATE TABLE IF NOT EXISTS adress (
//         adress_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//         college_id UUID REFERENCES colleges(colleg_id) ON DELETE SET NULL, 

//         latitude FLOAT,  -- this data will be based on the location acccess college will provide 
//         longitude FLOAT, -- this data will be based on the location acccess college will provide 

//         location TEXT NOT NULL,
//         city VARCHAR(255) NOT NULL,
//         state VARCHAR(255) NOT NULL,
//         country VARCHAR(255) NOT NULL,
//         pincode INT NOT NULL,

//          UNIQUE(college_id, latitude, longitude)

//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//     `;

