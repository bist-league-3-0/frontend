const FrontendRoutes = {};
const FrontendURL = "/";

// Frontend Routes
FrontendRoutes.home = FrontendURL;
FrontendRoutes.login = FrontendRoutes.home + "login/";
FrontendRoutes.register = FrontendRoutes.home + "register/";
FrontendRoutes.forgotPassword = FrontendRoutes.home + "forgot-password/";
FrontendRoutes.forgotPasswordValidate = FrontendRoutes.home + "forgot-password/validate/";
FrontendRoutes.dashboard = FrontendRoutes.home + "dashboard/";
FrontendRoutes.competition = FrontendRoutes.home + "competition/";
FrontendRoutes.BISTalks = FrontendRoutes.home + "BISTalks/";
FrontendRoutes.BISTalks1 = FrontendRoutes.BISTalks + "t1/";
FrontendRoutes.BISTalks2 = FrontendRoutes.BISTalks + "t2/";
FrontendRoutes.challenges = FrontendRoutes.home + "challenges/";
FrontendRoutes.webinar = FrontendRoutes.home + "webinar/";
FrontendRoutes.webinar1 = FrontendRoutes.webinar + "t1/";
FrontendRoutes.webinar2 = FrontendRoutes.webinar + "t2/";

// Error Routes
FrontendRoutes.forbidden = FrontendRoutes.home + "forbidden/";

// Dashboard Routes
FrontendRoutes.dashRoutes = {
  teamManagement: FrontendRoutes.dashboard + "team-management/",
  teamManagementEditable: FrontendRoutes.dashboard + "team-management-editable/",
  memberManagement: FrontendRoutes.dashboard + "member-management/",
  prelimFileSubmission: FrontendRoutes.dashboard + "preliminary-submission/",
  finalFileSubmission: FrontendRoutes.dashboard + "final-submission/",
  settings: FrontendRoutes.dashboard + "settings/"
}

FrontendRoutes.adminRoutes = {
  teams: FrontendRoutes.dashboard + "teams/",
  teamInfo: FrontendRoutes.dashboard + "teams/:id",
  payment: FrontendRoutes.dashboard + "payment/",
  paymentUnpaid: FrontendRoutes.dashboard + "teams/unpaid-teams/",
  paymentUnverified: FrontendRoutes.dashboard + "teams/unverified-teams/",
  paymentVerified: FrontendRoutes.dashboard + "teams/verified-teams/",
  prelimTeams: FrontendRoutes.dashboard + "teams/preliminary-teams/",
  finalTeams: FrontendRoutes.dashboard + "teams/final-teams"
}

FrontendRoutes.dashRoutes.addMember = FrontendRoutes.dashRoutes.memberManagement + "add-member/"

// Routes to show navigation bar
// App not animated? include route here!
let showNav = [
  FrontendRoutes.home,
  FrontendRoutes.login,
  FrontendRoutes.register,
  FrontendRoutes.forgotPassword,
  FrontendRoutes.forgotPasswordValidate,
  FrontendRoutes.competition,
  FrontendRoutes.BISTalks,
  FrontendRoutes.BISTalks1,
  FrontendRoutes.BISTalks2,
  FrontendRoutes.webinar,
  FrontendRoutes.webinar1,
  FrontendRoutes.webinar2,
  FrontendRoutes.challenges
];

let showNavTrimmed = showNav.map(link => {return link.slice(0, -1)});
FrontendRoutes.showNav = showNav.concat(showNavTrimmed);

module.exports = FrontendRoutes;
