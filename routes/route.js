const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const dashcontroller = require('../controllers/dashcontroller');
const isAuthenticated = require('../middlewares/authentication');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});
const upload = multer({ storage: storage });



router.get('/', controller.index);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/portfolio', controller.portfolio);
router.get('/careers', controller.careers);
router.post('/contact', controller.contactform);
router.get('/blog/', controller.blog);
router.get('/blog/:slug', controller.blog);
// router.get('/services/:slug', controller.embedservice);
router.get('/services', controller.services);
router.get('/account', controller.login);
router.get('/lost-password', controller.lostpassword);
router.post('/login', dashcontroller.loginform);
router.get('/gallary',controller.gallery);
router.get('/blazwhats',controller.blazwhats);
router.get('/blazschool',controller.blazschool);
router.get('/privacy-policy',controller.privacyPolicy);
router.get('/refund-policy',controller.refundPolicy);
router.get('/terms-and-conditions',controller.termsAndConditions);

//dashboard
router.get('/dashboard', isAuthenticated, dashcontroller.dashboard);
router.get('/logout',isAuthenticated, dashcontroller.logout);
router.get('/dashboard',isAuthenticated, dashcontroller.dashboard);

router.get('/dashboard/users',isAuthenticated, dashcontroller.users);
router.get('/dashboard/adduser',isAuthenticated, dashcontroller.addUser);
router.post('/dashboard/embedUser',isAuthenticated, dashcontroller.embedUser);
router.get('/dashboard/edituser',isAuthenticated, dashcontroller.editUser);
router.post('/dashboard/edituser',isAuthenticated, dashcontroller.editUser);
router.get('/dashboard/deleteuser',isAuthenticated, dashcontroller.deleteuser);

router.get('/dashboard/addservices',isAuthenticated, dashcontroller.addservices);
router.get('/dashboard/editservices',isAuthenticated, dashcontroller.editservices);
router.post('/dashboard/embedservice',upload.single('image'),isAuthenticated, dashcontroller.embedservice);
router.get('/dashboard/deleteservices',isAuthenticated, dashcontroller.deleteservices);
router.get('/dashboard/services', isAuthenticated,dashcontroller.services);


router.get('/dashboard/blog/', isAuthenticated,dashcontroller.blog);
router.get('/dashboard/addblog',isAuthenticated, dashcontroller.addblog);
router.get('/dashboard/editblog',isAuthenticated, dashcontroller.editblog);
router.post('/dashboard/embedblog',upload.single('image'),isAuthenticated, dashcontroller.embedblog);
router.get('/dashboard/deleteblog',isAuthenticated, dashcontroller.deleteblog);


router.get('/dashboard/servicesenquiry', isAuthenticated,dashcontroller.servicesenquiry);
router.get('/dashboard/contact', isAuthenticated,dashcontroller.contact);



router.get('/dashboard/company',isAuthenticated, dashcontroller.company);
router.get('/dashboard/addCompany',isAuthenticated, dashcontroller.addCompany);
router.get('/dashboard/editCompany',isAuthenticated, dashcontroller.editCompany);
router.post('/dashboard/embedCompany',isAuthenticated, dashcontroller.embedCompany);
router.get('/dashboard/deleteCompany',isAuthenticated, dashcontroller.deleteCompany);

router.get('/dashboard/credentials',isAuthenticated, dashcontroller.credentials);
router.get('/dashboard/addcredentials',isAuthenticated, dashcontroller.addcredentials);
router.get('/dashboard/editcredentials',isAuthenticated, dashcontroller.editcredentials);
router.post('/dashboard/embedcredentials',isAuthenticated, dashcontroller.embedcredentials);
router.get('/dashboard/deletecredentials',isAuthenticated, dashcontroller.deletecredentials);


// router.get('/dashboard/',isAuthenticated, dashcontroller.);
// router.get('/dashboard/add',isAuthenticated, dashcontroller.add);
// router.get('/dashboard/edit',isAuthenticated, dashcontroller.edit);
// router.post('/dashboard/embed',isAuthenticated, dashcontroller.embed);
// router.get('/dashboard/delete',isAuthenticated, dashcontroller.delete);

router.get('/dashboard/project',isAuthenticated, dashcontroller.project);
router.get('/dashboard/addproject',isAuthenticated, dashcontroller.addproject);
router.get('/dashboard/editproject',isAuthenticated, dashcontroller.editproject);
router.post('/dashboard/embedproject',isAuthenticated, dashcontroller.embedproject);
router.get('/dashboard/deleteproject',isAuthenticated, dashcontroller.deleteproject);

router.get('/dashboard/invoice',isAuthenticated, dashcontroller.invoice);
router.get('/dashboard/addinvoice',isAuthenticated, dashcontroller.addinvoice);
router.get('/dashboard/editinvoice',isAuthenticated, dashcontroller.editinvoice);
router.get('/dashboard/viewinvoice',isAuthenticated, dashcontroller.viewinvoice);
router.post('/dashboard/embedinvoice',isAuthenticated, dashcontroller.embedinvoice);
router.get('/dashboard/deleteinvoice',isAuthenticated, dashcontroller.deleteinvoice);




router.get('/dashboard/payment',isAuthenticated, dashcontroller.payment);
router.get('/dashboard/credentials',isAuthenticated, dashcontroller.credentials);

router.get('/dashboard/enquiry',isAuthenticated, dashcontroller.enquiry);


module.exports = router;