import Navigation from './navigation/Navigation';
import Hamburger from './navigation/hamburger';
import DashboardSidebar from './dashboard/sidebar';
import DashboardHeader from './dashboard/header';
import DashboardLanding from './dashboard/contents/dashboard';
import TeamManagementContent from './dashboard/contents/teamManagement';
import MemberManagementContent from './dashboard/contents/memberManagement';
import PreliminaryFileSubmission from './dashboard/contents/preliminaryFileSubmission';
import FinalFileSubmission from './dashboard/contents/finalFileSubmission';
import DropZone from './dropzone';
import MemberConfig from './dashboard/contents/memberConfig';
import AddTeamMember from './dashboard/contents/addMember';
import SettingContent from "./dashboard/contents/setting";

const Dashboard = {
  Header: DashboardHeader, 
  Sidebar: DashboardSidebar,
  Landing: DashboardLanding,
  TeamManagement: TeamManagementContent,
  MemberManagement: MemberManagementContent,
  PreliminarySubmission: PreliminaryFileSubmission,
  FinalSubmission: FinalFileSubmission,
  MemberConfig: MemberConfig,
  AddTeamMember: AddTeamMember,
  Setting: SettingContent,
}

const Component = {
  Navigation,
  Dashboard,
  Hamburger,
  DropZone
}

export default Component;