const BackendRoutes = {};
const BackendBase = "http://localhost:9000/"
const BackendURL = BackendBase + "api/bistleague3/";

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

BackendRoutes.uploadFile = {
  payment: BackendRoutes.home + "payment/upload/"
}

module.exports = BackendRoutes;