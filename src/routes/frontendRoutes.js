const FrontendRoutes = {};
const FrontendURL = "/";

// Guest Routes
FrontendRoutes.home = FrontendURL;

// Auth Routes
FrontendRoutes.login = FrontendRoutes.home + "login/";
FrontendRoutes.register = FrontendRoutes.home + "register/";
FrontendRoutes.forgotPassword = FrontendRoutes.home + "forgot-password/";
FrontendRoutes.forgotPasswordValidate =
  FrontendRoutes.home + "forgot-password/validate";

module.exports = FrontendRoutes;
