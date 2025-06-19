import User from '../models/authModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, company } = req.body;

    console.log("req.body",    req.body)

    // TODO: Add database logic here to save user
    console.log('Registering user:', { name, email, password, role, company });

       // ✅ You need to define newUser before calling .save()
    const newUser = new User({
      name,
      email,
      password,
      role,
      company,
    });


     // ✅ This is critical!
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
