const FrontendRoutes = {};
const FrontendURL = "http://localhost:3000/";

// Guest Routes
FrontendRoutes.home = FrontendURL

// Auth Routes
FrontendRoutes.login = FrontendRoutes.home + "login/"
FrontendRoutes.register = FrontendRoutes.home + "register/"

module.exports = FrontendRoutes