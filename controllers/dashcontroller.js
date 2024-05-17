
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const Enquiry = require('../models/enquiry');
const Gallery = require('../models/portfolio');
const bcrypt = require('bcrypt');
const mailer = require('../controllers/mailcontroller');
const generatePassword = require('generate-password');
const { uploadImage } = require('./uploadImage');
const path = require('path');
const Company = require('../models/company');
const Invoice = require('../models/invoice');
const Payment = require('../models/payment');
const Credential = require('../models/credential');
const Project = require('../models/project');
const Services = require('../models/services');



exports.dashboard = async (req, res) => {
  // Check if session is active
  if (req.session && req.session.isLoggedIn) {
      // Session is active, render dashboard
      res.render('dashboard/');
  } else {
      // Session is not active, redirect to account
      res.redirect('/account');
  }
}

exports.enquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.find();
    res.render('dashboard/enquiry', { enquiry });
  } catch (error) {
    // Handle errors
    console.error('Error fetching enquiry:', error);
    res.status(500).send('An error occurred while fetching enquiry.');
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.find();
    res.render('dashboard/users', { users });
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).send('An error occurred while fetching users.');
  }
};

exports.addUser = async (req, res) => {
  const users = await User.find();
  res.render('dashboard/embed/embedUser', { users,type:'add' });
}
exports.editUser = async (req, res) => {
  const userId = req.query.id; 
      if (!userId) {
        return res.status(400).send('User ID is required'); // Send a bad request response if ID is missing
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('dashboard/embed/embedUser', { users: user, type:'edit' });
};

exports.embedUser = async (req, res) => {
  try {
    const type = req.body.type;

    if (type === 'add') {
      const { name, role, email, Status , password } = req.body;
  
      try {
          // Generate a random password
        //   const password = generatePassword.generate({
        //     length: 10, // You can adjust the length as needed
        //     numbers: true,
        //     symbols: true,
        //     uppercase: true,
        //     excludeSimilarCharacters: true,
        // });
          console.log(password);
          mailer.sendEmail(email, 'Welcome to our platform!', `
          <p>Hello  ${name},</p>
                         <p>Your username (email) is: ${email}</p>
                         <p>Please use this email to log in to our platform.</p>
                         <p>Your password is: ${password}</p>
                         <p>Please keep this password secure and do not share it with anyone.</p>
                         `);
          // Hash the generated password
          const saltRounds = 10; // Number of salt rounds
          const hashedPassword = await bcrypt.hash(password, saltRounds);
  
          // Create the new user with the generated password
          const newUser = new User({ name, email, role, Status, password: hashedPassword });
          await newUser.save();
          res.redirect('/dashboard/users');
      } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).send('An error occurred while creating user.');
      }
  }
   else {
      const userId = req.query.id; 
      const { name,role,email,Status } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId,{ name,email,role,Status}, { new: true });
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.redirect('/dashboard/users');
      }
  } catch (error) {
    // Handle errors
    console.error('Error fetching service:', error);
    res.status(500).send('An error occurred while fetching service.');
  }
};

exports.deleteuser = async (req, res) => {
  const id = req.query.id;
  await User.findByIdAndDelete(id);
  res.redirect('/dashboard/users');
}



exports.company = async (req, res) => {
  const company = await Company.find();
  res.render('dashboard/company',{company});
}
exports.addCompany = async (req, res) => {
  res.render('dashboard/embed/embedCompany',{type:'add',company:''});
}
exports.editCompany = async (req, res) => {
    const id = req.query.id;
    const company = await Company.findById(id);
    res.render('dashboard/embed/embedCompany', { type: 'edit', company });
}
exports.deleteCompany = async (req, res) => {
  const id = req.query.id;
  await Company.findByIdAndDelete(id);
  res.redirect('/dashboard/company');
}
exports.embedCompany = async (req, res) => {
  const type = req.body.type;
  const companyData = req.body;
  if(type === "edit"){
    const companyId = req.query.id;
    const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).send("Company not found");
    }
    res.redirect('/dashboard/company');
    }else{
      await Company.create(companyData);
      res.redirect('/dashboard/company');
    }
  }
exports.invoice = async (req, res) => {
  const invoice = await Invoice.find();
  const company = await Company.find();
  res.render('dashboard/invoice',{invoice,company});
}

exports.addinvoice = async (req, res) => {
  const users = await User.find();
  const company = await Company.find();
  res.render('dashboard/embed/embedInvoice',{type:'add',project:'',company,invoice:''});
}
exports.viewinvoice = async (req, res) => {
  const company = await Company.find();
    const id = req.query.id;
    const invoice = await Invoice.findOne({_id:id});
    res.render('dashboard/invoiceBill', {invoice,company });
}
exports.editinvoice = async (req, res) => {
  const company = await Company.find();
    const id = req.query.id;
    const invoice = await Invoice.findOne({_id:id});
    res.render('dashboard/embed/embedInvoice', { type: 'edit',invoice,company });
}
exports.deleteinvoice = async (req, res) => {
  const id = req.query.id;
  await Invoice.findByIdAndDelete(id);
  res.redirect('/dashboard/invoice');
}
exports.embedinvoice = async (req, res) => {
  const type = req.body.type;
  const Data = req.body;
  if(type === "edit"){
    const Id = req.query.id;
    const updated = await Invoice.findByIdAndUpdate(Id, req.body, { new: true });
    if (!updated) {
      return res.status(404).send("not found");
    }
    res.redirect('/dashboard/invoice');
    }else{
      await Invoice.create(Data);
      res.redirect('/dashboard/invoice');
    }
  }




exports.payment = async (req, res) => {
  const payment = await Payment.find();
  res.render('dashboard/payment',{payment});
}


exports.project = async (req, res) => {
  const project = await Project.find();
  res.render('dashboard/project',{project});
}
exports.addproject = async (req, res) => {
  const users = await User.find();
  const company = await Company.find();
  res.render('dashboard/embed/embedProject',{type:'add',project:'',company,users});
}
exports.editproject = async (req, res) => {
  const company = await Company.find();
  const users = await User.find();
    const id = req.query.id;
    const project = await Project.findById(id);
    res.render('dashboard/embed/embedProject', { type: 'edit', project,company,users });
}
exports.deleteproject = async (req, res) => {
  const id = req.query.id;
  await Project.findByIdAndDelete(id);
  res.redirect('/dashboard/project');
}
exports.embedproject = async (req, res) => {
  const type = req.body.type;
  const Data = req.body;
  if(type === "edit"){
    const Id = req.query.id;
    const updated = await Project.findByIdAndUpdate(Id, req.body, { new: true });
    if (!updated) {
      return res.status(404).send("not found");
    }
    res.redirect('/dashboard/project');
    }else{
      await Project.create(Data);
      res.redirect('/dashboard/project');
    }
  }



exports.credentials = async (req, res) => {
  const credentials = await Credential.find();
  res.render('dashboard/credentials',{credentials});
}
exports.addcredentials = async (req, res) => {
  res.render('dashboard/embed/embedCredentials',{type:'add',credential:''});
}
exports.editcredentials = async (req, res) => {
    const id = req.query.id;
    const credential = await Credential.findById(id);
    res.render('dashboard/embed/embedCredentials', { type: 'edit', credential });
}
exports.deletecredentials = async (req, res) => {
  const id = req.query.id;
  await Credential.findByIdAndDelete(id);
  res.redirect('/dashboard/credentials');
}
exports.embedcredentials = async (req, res) => {
  const type = req.body.type;
  const Data = req.body;
  if(type === "edit"){
    const Id = req.query.id;
    const updated = await Credential.findByIdAndUpdate(Id, req.body, { new: true });
    if (!updated) {
      return res.status(404).send("Company not found");
    }
    res.redirect('/dashboard/credentials');
    }else{
      await Credential.create(Data);
      res.redirect('/dashboard/credentials');
    }
  }




exports.services = async (req, res) => {
  const services = await Services.find();
  res.render('dashboard/services',{ services });
}
exports.addservices = async (req, res) => {
  const enquiries = await Enquiry.find();
  res.render('dashboard/embed/embedservices',{ enquiries,type:'add',service:'' });
}
exports.deleteservices = async (req, res) => {
  try {
    const serviceId = req.query.id;
    await Services.findByIdAndDelete(serviceId);
    res.redirect('/dashboard/services');
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).send('An error occurred while deleting the service.');
  }
};

exports.editservices = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    const serviceId = req.query.id;
    const service = await Services.findById(serviceId);
    if (!service) {
      return res.status(404).send('Service not found');
    }
    res.render('dashboard/embed/embedservices', { enquiries, type: 'edit', service });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).send('An error occurred while fetching service.');
  }
}

exports.embedservice = async (req, res) => {
  try {
    const type = req.body.type;
    if (type === 'add') {
      const type = req.body.type;
      const { title,shortdescription,description} = req.body;
      const slug = req.body.title.replace(/\s+/g, '_').toLowerCase();
      const imageUrl = req.file ? path.basename(req.file.path) : null;
      const newService = new Services({ title,shortdescription,slug,description,imageUrl });
      await newService.save();
      res.redirect('/dashboard/services');      
    } else {
      const serviceId = req.query.id;
      const service = await Services.findByIdAndUpdate(serviceId, req.body, { new: true });
      if (!service) {
        return res.status(404).send('Service not found');
      }
      res.redirect('/dashboard/services');
      }
  } catch (error) {
    // Handle errors
    console.error('Error fetching service:', error);
    res.status(500).send('An error occurred while fetching service.');
  }
};




exports.servicesenquiry = async (req, res) => {
  const enquiries = await Enquiry.find();
  res.render('dashboard/servicesenquiry',{ enquiries });
}


exports.contact = async (req, res) => {
  try {
    // Fetch all enquiries from the database
    const enquiries = await Enquiry.find();

    // Render the 'dashboard/contact' view and pass the enquiries data to it
    res.render('dashboard/contact', { enquiries });
  } catch (error) {
    // Handle errors
    console.error('Error fetching enquiries:', error);
    res.status(500).send('An error occurred while fetching enquiries.');
  }
};


const generateAccessToken = (id, name, role, permissions) => {
  const token_value = {
    userId: id,
    name: name,
    role: role,
    permissions: permissions,
  };
  return jwt.sign(token_value, "secretkey");
};

// Login Logout controller function
exports.loginform = async (req, res) => {
    const {
      email,
      password
    } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({
        email
      });
  
      // Check if user exists
      if (!user) {
        return res.render('error/error',{error:"User Not Found !"})
      }
      if (user.Status == '0') {
        return res.render('error/error',{error:"User Inactive !"})
      }
              // Compare the stored hashed password with the password provided by the user during login
        bcrypt.compare(password,user.password, function(err, result) {
          if (err) {
              // Handle error
              console.error('Error comparing passwords:', err);
              return res.status(500).json({ message: 'An error occurred' });
          }
          if (result) {
            console.log('Login Successfully', user.email);
            req.session.email = user.email;
            req.session.name = user.name;
            req.session.role = user.role;
            req.session.isLoggedIn = true;
            req.session.token = generateAccessToken(user.email,user.name);

            
            console.log(({success: "Successful Login",
            token: generateAccessToken(user.email,user.name),
            }));


            mailer.sendEmail(user.email, 'Welcome to our platform!', `
            <p>Hello ${user.name},</p>
            <p>You have been logged in on behalf of: ${email} at ${new Date().toLocaleString()}</p>
        `);
            if (user.role === '1') {
              return res.redirect('/dashboard');
            } else {
              return res.redirect('/');
            }
          } else {
              // Passwords don't match
              return res.status(401).json({ message: 'Invalid password' });
          }
        });
  
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Login error:', error);
      // return res.status(500).json({ message: 'Internal server error' });
      return res.redirect('/account');
    }
  };
  
  // Logout controller
  exports.logout = (req, res) => {
    const userEmail = req.session.user ? req.session.user.email : 'Unknown';
    console.log(`Logout: ${userEmail}`);

    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({
          message: 'Internal server error'
        });
      }
      // Redirect to the login page or any other page after logout
      res.redirect('/account');
    });
  };


exports.blog = async (req, res) => {
  const blog = await Blog.find();
  res.render('dashboard/blog',{ blog,session:req.session });
}
exports.addblog = async (req, res) => {
  const blog = await Blog.find();
  res.render('dashboard/embed/embedBlog',{ blog,type:'add',session:req.session.user });
}
exports.deleteblog = async (req, res) => {
  try {
    const Id = req.query.id;
    await Blog.findByIdAndDelete(Id);
    res.redirect('/dashboard/blog');
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).send('An error occurred while deleting the service.');
  }
};

exports.editblog = async (req, res) => {
  try {
    const Id = req.query.id;
    const blog = await Blog.findById(Id);
    if (!blog) {
      return res.status(404).send('blog not found');
    }
    res.render('dashboard/embed/embedBlog', { blog, type: 'edit', });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).send('An error occurred while fetching service.');
  }
}
exports.embedblog = async (req, res) => {
  try {
      const type = req.body.type;
      console.log(req.body);

      if (type === 'add') {
          try {
              // Save the blog post in the database
              const newBlog = new Blog({
                  title: req.body.title,
                  content: req.body.content,
                  author: req.body.author,
                  slug: req.body.title.replace(/\s+/g, '_').toLowerCase(),
                  imageUrl: req.file ? path.basename(req.file.path) : null,
                  tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
                  createdAt: req.body.createdAt ? new Date(req.body.createdAt) : Date.now(),
                  updatedAt: req.body.updatedAt ? new Date(req.body.updatedAt) : null,
                
                  uploadedBy: req.session.name,
                  uploadedByEmail: req.session.email
              });
              console.log('Blog db content which is saving', newBlog);

              await newBlog.save();

              res.redirect('/dashboard/blog');
          } catch (error) {
              console.error('Error saving blog post:', error);
              res.status(500).json({ error: 'An error occurred while saving the blog post' });
          }
      } else {
          const blogId = req.query.id;
          const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
              title: req.body.title,
              content: req.body.content,
              author: req.body.author,
              slug: req.body.title.replace(/\s+/g, '_').toLowerCase(),
              imageUrl: req.file ? path.basename(req.file.path) : null,
              tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
              createdAt: req.body.createdAt ? new Date(req.body.createdAt) : Date.now(),
              updatedAt: req.body.updatedAt ? new Date(req.body.updatedAt) : null,
              comments: req.body.comments ? req.body.comments.split(',') : [],
          }, { new: true });

          if (!updatedBlog) {
              return res.status(404).send('Blog post not found');
          }

          res.redirect('/dashboard/blog');
      }
  } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).send('An error occurred');
  }
};

  
module.exports = exports;