const FrontendRoutes = {};
const FrontendURL = "/";

// Guest Routes
FrontendRoutes.home = FrontendURL

// Auth Routes
FrontendRoutes.login = FrontendRoutes.home + "login/"
FrontendRoutes.register = FrontendRoutes.home + "register/"

module.exports = FrontendRoutes