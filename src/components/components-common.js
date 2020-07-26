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

import AdminSidebar from './dashboard/adminSidebar';
import AdminDashboardLanding from './dashboard/contents/admin/landing';

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
  Landing: AdminDashboardLanding
}

const Component = {
  Navigation,
  Dashboard,
  AdminDashboard,
  Hamburger,
  DropZone,
  BISTHelmet
}

export default Component;