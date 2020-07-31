const BackendRoutes = {};
const BackendBase = process.env.REACT_APP_API_URL;
const BackendURL = BackendBase + "api/bistleague3/";
const BistAccount = BackendURL + "bist-account/";

// Guest Routes
BackendRoutes.base = BackendBase;
BackendRoutes.home = BackendURL;

// Auth Routes
BackendRoutes.auth = BackendURL + "auth/";
BackendRoutes.login = BackendRoutes.auth + "login/";
BackendRoutes.register = BackendRoutes.auth + "register/";
BackendRoutes.logout = BackendRoutes.auth + "logout/";
BackendRoutes.check = BackendRoutes.login + "check/";
BackendRoutes.checkAuth = BackendRoutes.login + "check-authentication/";
BackendRoutes.getUser = BackendRoutes.auth + "users/";
BackendRoutes.forgotPassword = BackendRoutes.auth + "forgot-password/";
BackendRoutes.forgotPasswordValidate =
  BackendRoutes.forgotPassword + "forgot-validate/";

BackendRoutes.uploadFile = {
  payment: BackendRoutes.home + "payment/upload/",
};

BackendRoutes.bistAccount = {
  changeAccountCredentials: BistAccount + "account-settings/change-account-credentials/",
  changeTeamData: BistAccount + "team-management/change-team-data/",
  uploadPayment: BistAccount + "team-management/upload-payment/",
  changeMemberData: BistAccount + "member-management/change-member-data/",
  uploadEnrollment: BistAccount + "member-management/upload-proof-of-enrollment/",
  uploadIDCard: BistAccount + "member-management/upload-student-id-card/",
  uploadPortrait: BistAccount + "member-management/upload-portrait-photo/",
  deleteMember: BistAccount + "member-management/delete-member/",
  addMember: BistAccount + "member-management/add-member/",
  uploadPreliminary: BistAccount + "submission/upload-preliminary/",
  uploadFinal: BistAccount + "submission/upload-final/",
};

const AdminAccount = BackendRoutes.auth + "admin/";

BackendRoutes.adminAccount = {
  getDashboardData: AdminAccount + "get-dashboard-data",
  getTeamsData: AdminAccount + "get-teams/",
  toggleTeamRole: AdminAccount + "toggle-team-role/",
  togglePaymentStatus: AdminAccount + "toggle-payment-status/"
}

module.exports = BackendRoutes;
