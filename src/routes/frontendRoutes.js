const FrontendRoutes = {};
const FrontendURL = "/";

// Frontend Routes
FrontendRoutes.home = FrontendURL;
FrontendRoutes.login = FrontendRoutes.home + "login/";
FrontendRoutes.register = FrontendRoutes.home + "register/";
FrontendRoutes.forgotPassword = FrontendRoutes.home + "forgot-password/";
FrontendRoutes.forgotPasswordValidate = FrontendRoutes.home + "forgot-password/validate";
FrontendRoutes.dashboard = FrontendRoutes.home + "dashboard/";
FrontendRoutes.competition = FrontendRoutes.home + "competition/"

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

FrontendRoutes.adminRoutes = {
  teams: FrontendRoutes.dashboard + "teams/",
  payment: FrontendRoutes.dashboard + "payment/",
  paymentUnpaid: FrontendRoutes.dashboard + "payment/unpaid-teams",
  paymentUnverified: FrontendRoutes.dashboard + "payment/unverified-teams",
  paymentVerified: FrontendRoutes.dashboard + "payment/verified-teams",
}

FrontendRoutes.dashRoutes.addMember = FrontendRoutes.dashRoutes.memberManagement + "add-member/"

// Routes to show navigation bar
// App not animated? include route here!
FrontendRoutes.showNav = [
  FrontendRoutes.home,
  FrontendRoutes.login,
  FrontendRoutes.register,
  FrontendRoutes.forgotPassword,
  FrontendRoutes.forgotPasswordValidate,
  FrontendRoutes.competition
]

module.exports = FrontendRoutes;
