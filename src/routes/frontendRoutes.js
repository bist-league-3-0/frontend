const FrontendRoutes = {};
const FrontendURL = "/";

// Frontend Routes
FrontendRoutes.home = FrontendURL;
FrontendRoutes.login = FrontendRoutes.home + "login/";
FrontendRoutes.register = FrontendRoutes.home + "register/";
FrontendRoutes.forgotPassword = FrontendRoutes.home + "forgot-password/";
FrontendRoutes.forgotPasswordValidate = FrontendRoutes.home + "forgot-password/validate";
FrontendRoutes.dashboard = FrontendRoutes.home + "dashboard/";

// Error Routes
FrontendRoutes.forbidden = FrontendRoutes.home + "forbidden/";

// Dashboard Routes
FrontendRoutes.dashRoutes = {
  teamManagement: FrontendRoutes.dashboard + "team-management/",
  memberManagement: FrontendRoutes.dashboard + "member-management/",
  prelimFileSubmission: FrontendRoutes.dashboard + "preliminary-submission/",
  finalFileSubmission: FrontendRoutes.dashboard + "final-submission/",
  settings: FrontendRoutes.dashboard + "settings/"
}

FrontendRoutes.dashRoutes.addMember = FrontendRoutes.dashRoutes.memberManagement + "add-member/"

// Routes to show navigation bar
FrontendRoutes.showNav = [
  FrontendRoutes.home,
  FrontendRoutes.login,
  FrontendRoutes.register,
  FrontendRoutes.forgotPassword,
  FrontendRoutes.forgotPasswordValidate
]

module.exports = FrontendRoutes;
