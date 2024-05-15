const Enquiry = require('../models/enquiry');
const Gallery = require('../models/portfolio');
const Blog = require('../models/blog');
const mailer = require('../controllers/mailcontroller');

exports.index = async (req, res) => {
    res.render('index');
}
exports.about = async (req, res) => {
    res.render('about');
}
exports.services = async (req, res) => {
    res.render('services');
}
exports.privacyPolicy = async (req, res) => {
    res.render('privacy-policy');
}

exports.blazwhats = async (req, res) => {
    res.render('blazwhats');
}
exports.blazschool = async (req, res) => {
    res.render('blazschool');
}
exports.termsAndConditions = async (req, res) => {
    res.render('terms-and-conditions');
}
exports.refundPolicy = async (req, res) => {
    res.render('refund-policy');
}
exports.gallery = async (req, res) => {
    const type = req.query.type?req.query.type:null;
    const gallery = await Gallery.find();
    res.render('gallery',{ gallery,type });
}

exports.portfolio = async (req, res) => {
    res.render('portfolio');
}

exports.careers = async (req, res) => {
    res.render('careers');
}
exports.contact = async (req, res) => {
    res.render('contact');
}
exports.contactform = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const enquiry = new Enquiry(data); 
      await enquiry.save();
      console.log(enquiry);
      mailer.sendEmail(enquiry.email?enquiry.email:'', 'Thanks for showing intrest', `
      <p>Hello  ${enquiry.name},</p>
                     <p>Thanks for showing intrest. our representative call you back shortly <br> Thanks and Regards <br> Twins Brothers Threapy.</p>
                     `);
      res.redirect(req.headers.referer || '/');
      console.log('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      res.status(500).send('An error occurred while processing your enquiry.');
    }
  };



// Controller function


exports.blog = async (req, res) => {

    const slug = req.params.slug;
   if(slug){
    try {
        
        const blog = await Blog.findOne({ slug: slug });
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('blogview', { blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('An error occurred while fetching the blog.');
    }
   }else{
    const blog = await Blog.find();
        res.render('blog', { blog });
   }
};

exports.login = async (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        // Session is active, render dashboard
        res.redirect('dashboard');
    } else {
        res.render('login');
    }
}
exports.lostpassword = async (req, res) => {
    res.render('lost-password');
}
module.exports = exports;