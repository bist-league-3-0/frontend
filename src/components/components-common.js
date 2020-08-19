import Navigation from './navigation/Navigation';
import Hamburger from './navigation/hamburger';
import ParticipantSidebar from './dashboard/participantSidebar';
import DashboardHeader from './dashboard/header';
import DashboardLanding from './dashboard/contents/dashboard';
import TeamManagementContent from './dashboard/contents/teamManagement';
import MemberManagementContent from './dashboard/contents/memberManagement';
import PreliminaryFileSubmission from './dashboard/contents/preliminaryFileSubmission';
import FinalFileSubmission from './dashboard/contents/finalFileSubmission';
import MemberConfig from './dashboard/contents/memberConfig';
import AddTeamMember from './dashboard/contents/addMember';
import SettingContent from "./dashboard/contents/setting";
import DropZone from './dropzone';
import BISTHelmet from "./bist-helmet";
import BISTFooter from "./bist-footer";
import EventsCard from "./landing/events-card";
import BISTalks1Component from "./BISTalks/bistalks1";
import BISTalks2Component from "./BISTalks/bistalks2";
import Webinar1Component from "./webinar/webinar1";
import Webinar2Component from "./webinar/webinar2";

import AdminSidebar from './dashboard/adminSidebar';
import AdminDashboardLanding from './dashboard/contents/admin/landing';
import AdminTeamsContent from './dashboard/contents/admin/teams';
import AdminTeamInfo from './dashboard/contents/admin/teamInfo';
import ScrollToTop from './scroll-to-top';

const Dashboard = {
  Header: DashboardHeader, 
  ParticipantSidebar: ParticipantSidebar,
  Landing: DashboardLanding,
  TeamManagement: TeamManagementContent,
  MemberManagement: MemberManagementContent,
  PreliminarySubmission: PreliminaryFileSubmission,
  FinalSubmission: FinalFileSubmission,
  MemberConfig: MemberConfig,
  AddTeamMember: AddTeamMember,
  Setting: SettingContent,
}

const AdminDashboard = {
  Sidebar: AdminSidebar,
  Landing: AdminDashboardLanding,
  Teams: AdminTeamsContent,
  TeamInfo: AdminTeamInfo
}

const Component = {
  Navigation,
  Dashboard,
  AdminDashboard,
  Hamburger,
  DropZone,
  BISTHelmet,
  BISTFooter,
  EventsCard,
  BISTalks1Component,
  BISTalks2Component,
  Webinar1Component,
  Webinar2Component,
  ScrollToTop
}

export default Component;