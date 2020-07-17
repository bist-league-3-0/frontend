const FrontendRoutes = {};
const FrontendURL = "/";

// Frontend Routes
FrontendRoutes.home = FrontendURL;
FrontendRoutes.login = FrontendRoutes.home + "login/";
FrontendRoutes.register = FrontendRoutes.home + "register/";
FrontendRoutes.forgotPassword = FrontendRoutes.home + "forgot-password/";
FrontendRoutes.forgotPasswordValidate = FrontendRoutes.home + "forgot-password/validate";

// Routes to show navigation bar
FrontendRoutes.showNav = [
  FrontendRoutes.home,
  FrontendRoutes.login,
  FrontendRoutes.register,
  FrontendRoutes.forgotPassword,
  FrontendRoutes.forgotPasswordValidate
]



module.exports = FrontendRoutes;
