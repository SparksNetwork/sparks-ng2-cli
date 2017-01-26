declare interface Command {
  domain: string;
  action: string;
  uid: string;
  payload?: Object;
  key?: string;
}
declare interface ArrivalsCreate {
  values: {
    profileKey: string;
    projectKey: string;
  };
}
declare interface ArrivalsRemove {
  key: string;
}
declare interface AssignmentsCreate {
  values: {
    engagementKey: string;
    oppKey: string;
    profileKey: string;
    shiftKey: string;
    teamKey: string;
  };
}
declare interface AssignmentsRemove {
  key: string;
}
declare interface CommitmentsCreate {
  values: {
    code: string;
    oppKey: string;
    count?: number;
    description?: string;
    allocationRule?: string;
    amount?: number;
    party?: string;
    who?: string;
    ticketType?: string;
    retailValue?: number;
    what?: string;
    minLength?: number;
    maxLength?: number;
  };
}
declare interface CommitmentsUpdate {
  key: string;
  values: {
    count?: number;
    description?: string;
    allocationRule?: string;
    amount?: number;
    party?: string;
    who?: string;
    ticketType?: string;
    retailValue?: number;
    what?: string;
    minLength?: number;
    maxLength?: number;
  };
}
declare interface CommitmentsRemove {
  key: string;
}
declare interface EngagementsCreate {
  values: {
    oppKey: string;
    profileKey: string;
  };
}
declare interface EngagementsUpdate {
  key: string;
  values: {
    oppKey?: string;
    answer?: string;
    declined?: boolean;
    isAccepted?: boolean;
    isApplied?: boolean;
    isAssigned?: boolean;
    priority?: boolean;
  };
}
declare interface EngagementsRemove {
  key: string;
}
declare interface EngagementsConfirm {
  key: string;
}
declare interface EngagementsPay {
  key: string;
  values: {
    paymentNonce: string;
  };
}
declare interface EngagementsReclaim {
  key: string;
}
declare interface FulfillersCreate {
  values: {
    oppKey: string;
    teamKey: string;
  };
}
declare interface FulfillersRemove {
  key: string;
}
declare interface MembershipsCreate {
  values: {
    answer: string;
    engagementKey: string;
    oppKey: string;
    teamKey: string;
  };
}
declare interface MembershipsUpdate {
  key: string;
  values: {
    answer?: string;
    isAccepted?: boolean;
    isApplied?: boolean;
    isConfirmed?: boolean;
    isDeclined?: boolean;
  };
}
declare interface MembershipsRemove {
  key: string;
}
declare interface OppsCreate {
  values: {
    confirmationsOn?: boolean;
    description?: string;
    isPublic?: boolean;
    name: string;
    projectKey: string;
    question?: string;
  };
}
declare interface OppsUpdate {
  key: string;
  values: {
    confirmationsOn?: boolean;
    description?: string;
    isPublic?: boolean;
    name?: string;
    question?: string;
  };
}
declare interface OppsRemove {
  key: string;
}
declare interface OrganizersCreate {
  values: {
    authority: "organizer";
    inviteEmail: string;
    projectKey: string;
  };
}
declare interface OrganizersRemove {
  key: string;
}
declare interface OrganizersAccept {
  key: string;
}
declare interface ProfilesCreate {
  values: {
    email: string;
    fullName: ProfileFullName;
    intro?: string;
    phone?: string;
    portraitUrl?: string;
    skills?: string;
    dob?: number;
    location?: string;
  };
}
declare interface ProfilesUpdate {
  key: string;
  values: {
    email?: string;
    fullName?: ProfileFullName;
    intro?: string;
    phone?: string;
    portraitUrl?: string;
    skills?: string;
    dob?: number;
    location?: string;
  };
}
declare interface ProjectImagesCreate {
  values: {
    key: string;
    dataUrl: string;
  };
}
declare interface ProjectImagesRemove {
  key: string;
}
declare interface ProjectsCreate {
  values: {
    description?: string;
    facebookImageUrl?: string;
    name: string;
  };
}
declare interface ProjectsUpdate {
  key: string;
  values: {
    description?: string;
    facebookImageUrl?: string;
    name?: string;
  };
}
declare interface ProjectsRemove {
  key: string;
}
declare interface ShiftsCreate {
  values: {
    date: string;
    end: string;
    hours: number;
    people: number;
    reserved?: number;
    start: string;
    teamKey: string;
  };
}
declare interface ShiftsUpdate {
  key: string;
  values: {
    date?: string;
    end?: string;
    hours?: number;
    people?: number;
    reserved?: number;
    start?: string;
  };
}
declare interface ShiftsRemove {
  key: string;
}
declare interface TeamImagesUpdate {
  key: string;
  values: {
    dataUrl: string;
  };
}
declare interface TeamImagesRemove {
  key: string;
}
declare interface TeamsCreate {
  values: {
    description?: string;
    name: string;
    projectKey: string;
    question?: string;
  };
}
declare interface TeamsUpdate {
  key: string;
  values: {
    description?: string;
    name?: string;
    question?: string;
  };
}
declare interface TeamsRemove {
  key: string;
}
declare interface UsersMigrate {
  fromUid: string;
  toUid: string;
  profileKey: string;
}
declare interface Data {
  domain: string;
  action: "create" | "update" | "remove";
  key: string;
  values?: any;
}
declare interface DataArrivalsCreate {
  domain: "Arrivals";
  action: "create";
  key: string;
  values: {
    arrivedAt?: number;
    ownerProfileKey: string;
    profileKey: string;
    projectKey: string;
    projectKeyProfileKey?: string;
  };
}
declare interface DataArrivalsUpdate {
  domain: "Arrivals";
  action: "update";
  key: string;
  values: {
    arrivedAt?: number;
  };
}
declare interface DataArrivalsRemove {
  domain: "Arrivals";
  action: "remove";
  key: string;
}
declare interface DataAssignmentsCreate {
  domain: "Assignments";
  action: "create";
  key: string;
  values: {
    engagementKey: string;
    oppKey: string;
    profileKey: string;
    shiftKey: string;
    teamKey: string;
  };
}
declare interface DataAssignmentsUpdate {
  domain: "Assignments";
  action: "update";
  key: string;
  values: {
    engagementKey?: string;
    oppKey?: string;
    profileKey?: string;
    shiftKey?: string;
    teamKey?: string;
  };
}
declare interface DataAssignmentsRemove {
  domain: "Assignments";
  action: "remove";
  key: string;
}
declare interface DataCommitmentsCreate {
  domain: "Commitments";
  action: "create";
  key: string;
  values: {
    code: string;
    oppKey: string;
    count?: number;
    description?: string;
    allocationRule?: string;
    amount?: number;
    party?: string;
    who?: string;
    ticketType?: string;
    retailValue?: number;
    what?: string;
    minLength?: number;
    maxLength?: number;
  };
}
declare interface DataCommitmentsUpdate {
  domain: "Commitments";
  action: "update";
  key: string;
  values: {
    code?: string;
    oppKey?: string;
    count?: number;
    description?: string;
    allocationRule?: string;
    amount?: number;
    party?: string;
    who?: string;
    ticketType?: string;
    retailValue?: number;
    what?: string;
    minLength?: number;
    maxLength?: number;
  };
}
declare interface DataCommitmentsRemove {
  domain: "Commitments";
  action: "remove";
  key: string;
}
declare interface DataEngagementsCreate {
  domain: "Engagements";
  action: "create";
  key: string;
  values: {
    $key: string;
    answer: string;
    assignmentCount: number;
    declined: boolean;
    isAccepted: boolean;
    isApplied: boolean;
    isAssigned: boolean;
    isConfirmed: boolean;
    isPaid: boolean;
    oppKey: string;
    payment?: EngagementPayment;
    depositAmount?: string;
    isDepositPaid?: boolean;
    deposit?: EngagementDeposit;
    paymentClientToken?: string;
    /**
     * deprecated
     */
    paymentError?: boolean;
    priority: boolean;
    profileKey: string;
  };
}
declare interface DataEngagementsUpdate {
  domain: "Engagements";
  action: "update";
  key: string;
  values: {
    $key?: string;
    answer?: string;
    assignmentCount?: number;
    declined?: boolean;
    isAccepted?: boolean;
    isApplied?: boolean;
    isAssigned?: boolean;
    isConfirmed?: boolean;
    isPaid?: boolean;
    oppKey?: string;
    payment?: EngagementPayment;
    depositAmount?: string;
    isDepositPaid?: boolean;
    deposit?: EngagementDeposit;
    paymentClientToken?: string;
    /**
     * deprecated
     */
    paymentError?: boolean;
    priority?: boolean;
    profileKey?: string;
  };
}
declare interface DataEngagementsRemove {
  domain: "Engagements";
  action: "remove";
  key: string;
}
declare interface DataFulfillersCreate {
  domain: "Fulfillers";
  action: "create";
  key: string;
  values: {
    oppKey: string;
    teamKey: string;
  };
}
declare interface DataFulfillersUpdate {
  domain: "Fulfillers";
  action: "update";
  key: string;
  values: {
    oppKey?: string;
    teamKey?: string;
  };
}
declare interface DataFulfillersRemove {
  domain: "Fulfillers";
  action: "remove";
  key: string;
}
declare interface DataGatewayCustomersCreate {
  domain: "GatewayCustomers";
  action: "create";
  key: string;
  values: {
    gatewayId: string;
    profileKey: string;
  };
}
declare interface DataGatewayCustomersUpdate {
  domain: "GatewayCustomers";
  action: "update";
  key: string;
  values: {
    gatewayId?: string;
    profileKey?: string;
  };
}
declare interface DataGatewayCustomersRemove {
  domain: "GatewayCustomers";
  action: "remove";
  key: string;
}
declare interface DataMembershipsCreate {
  domain: "Memberships";
  action: "create";
  key: string;
  values: {
    answer: string;
    engagementKey: string;
    isAccepted: boolean;
    isApplied: boolean;
    isConfirmed: boolean;
    isDeclined: boolean;
    oppKey: string;
    teamKey: string;
  };
}
declare interface DataMembershipsUpdate {
  domain: "Memberships";
  action: "update";
  key: string;
  values: {
    answer?: string;
    engagementKey?: string;
    isAccepted?: boolean;
    isApplied?: boolean;
    isConfirmed?: boolean;
    isDeclined?: boolean;
    oppKey?: string;
    teamKey?: string;
  };
}
declare interface DataMembershipsRemove {
  domain: "Memberships";
  action: "remove";
  key: string;
}
declare interface DataNotificationsCreate {
  domain: "Notifications";
  action: "create";
  key: string;
  values: {
    type: string;
    sendAt?: number;
  };
}
declare interface DataNotificationsUpdate {
  domain: "Notifications";
  action: "update";
  key: string;
  values: {
    type?: string;
    sendAt?: number;
  };
}
declare interface DataNotificationsRemove {
  domain: "Notifications";
  action: "remove";
  key: string;
}
declare interface DataOppsCreate {
  domain: "Opps";
  action: "create";
  key: string;
  values: {
    ownerProfileKey: string;
    confirmationsOn: boolean;
    description: string;
    isPublic: boolean;
    name: string;
    projectKey: string;
    question: string;
  };
}
declare interface DataOppsUpdate {
  domain: "Opps";
  action: "update";
  key: string;
  values: {
    ownerProfileKey?: string;
    confirmationsOn?: boolean;
    description?: string;
    isPublic?: boolean;
    name?: string;
    projectKey?: string;
    question?: string;
  };
}
declare interface DataOppsRemove {
  domain: "Opps";
  action: "remove";
  key: string;
}
declare interface DataOrganizersCreate {
  domain: "Organizers";
  action: "create";
  key: string;
  values: {
    authority: string;
    inviteEmail: string;
    projectKey: string;
    acceptedAt?: number;
    invitedByProfileKey: string;
    isAccepted?: boolean;
    profileKey?: string;
  };
}
declare interface DataOrganizersUpdate {
  domain: "Organizers";
  action: "update";
  key: string;
  values: {
    authority?: string;
    inviteEmail?: string;
    projectKey?: string;
    acceptedAt?: number;
    invitedByProfileKey?: string;
    isAccepted?: boolean;
    profileKey?: string;
  };
}
declare interface DataOrganizersRemove {
  domain: "Organizers";
  action: "remove";
  key: string;
}
declare interface DataProfilesCreate {
  domain: "Profiles";
  action: "create";
  key: string;
  values: {
    email: string;
    fullName: ProfileFullName;
    intro?: string;
    isAdmin: boolean;
    isConfirmed?: boolean;
    phone: string;
    portraitUrl: string;
    skills?: string;
    uid: string;
    isEAP?: boolean;
    location?: string;
    dob?: number;
  };
}
declare interface DataProfilesUpdate {
  domain: "Profiles";
  action: "update";
  key: string;
  values: {
    email?: string;
    fullName?: ProfileFullName;
    intro?: string;
    isAdmin?: boolean;
    isConfirmed?: boolean;
    phone?: string;
    portraitUrl?: string;
    skills?: string;
    uid?: string;
    isEAP?: boolean;
    location?: string;
    dob?: number;
  };
}
declare interface DataProfilesRemove {
  domain: "Profiles";
  action: "remove";
  key: string;
}
declare interface DataProjectImagesCreate {
  domain: "ProjectImages";
  action: "create";
  key: string;
  values: {
    dataUrl: string;
  };
}
declare interface DataProjectImagesUpdate {
  domain: "ProjectImages";
  action: "update";
  key: string;
  values: {
    dataUrl?: string;
  };
}
declare interface DataProjectImagesRemove {
  domain: "ProjectImages";
  action: "remove";
  key: string;
}
declare interface DataProjectsCreate {
  domain: "Projects";
  action: "create";
  key: string;
  values: {
    description?: string;
    facebookImageUrl?: string;
    name: string;
    ownerProfileKey: string;
  };
}
declare interface DataProjectsUpdate {
  domain: "Projects";
  action: "update";
  key: string;
  values: {
    description?: string;
    facebookImageUrl?: string;
    name?: string;
    ownerProfileKey?: string;
  };
}
declare interface DataProjectsRemove {
  domain: "Projects";
  action: "remove";
  key: string;
}
declare interface DataShiftsCreate {
  domain: "Shifts";
  action: "create";
  key: string;
  values: {
    assigned: number;
    date: string;
    end: string;
    hours: number;
    ownerProfileKey: string;
    people: number;
    reserved?: number;
    start: string;
    teamKey: string;
  };
}
declare interface DataShiftsUpdate {
  domain: "Shifts";
  action: "update";
  key: string;
  values: {
    assigned?: number;
    date?: string;
    end?: string;
    hours?: number;
    ownerProfileKey?: string;
    people?: number;
    reserved?: number;
    start?: string;
    teamKey?: string;
  };
}
declare interface DataShiftsRemove {
  domain: "Shifts";
  action: "remove";
  key: string;
}
declare interface DataStatusesCreate {
  domain: "Statuses";
  action: "create";
  key: string;
  values: {
    amount: string;
    status: string;
    timestamp: string;
    transactionSource: string;
    user: string;
  };
}
declare interface DataStatusesUpdate {
  domain: "Statuses";
  action: "update";
  key: string;
  values: {
    amount?: string;
    status?: string;
    timestamp?: string;
    transactionSource?: string;
    user?: string;
  };
}
declare interface DataStatusesRemove {
  domain: "Statuses";
  action: "remove";
  key: string;
}
declare interface DataTeamImagesCreate {
  domain: "TeamImages";
  action: "create";
  key: string;
  values: {
    dataUrl: string;
  };
}
declare interface DataTeamImagesUpdate {
  domain: "TeamImages";
  action: "update";
  key: string;
  values: {
    dataUrl?: string;
  };
}
declare interface DataTeamImagesRemove {
  domain: "TeamImages";
  action: "remove";
  key: string;
}
declare interface DataTeamsCreate {
  domain: "Teams";
  action: "create";
  key: string;
  values: {
    ownerProfileKey: string;
    description?: string;
    name: string;
    projectKey: string;
    question?: string;
  };
}
declare interface DataTeamsUpdate {
  domain: "Teams";
  action: "update";
  key: string;
  values: {
    ownerProfileKey?: string;
    description?: string;
    name?: string;
    projectKey?: string;
    question?: string;
  };
}
declare interface DataTeamsRemove {
  domain: "Teams";
  action: "remove";
  key: string;
}
declare interface EmailsAccepted {
  templateId: "dec62dab-bf8e-4000-975a-0ef6b264dafe";
  substitutions: {
    username: string;
    opp_name: string;
    project_name: string;
    engagementUrl: string;
  };
  [k: string]: any;
}
declare interface EmailsOrganizerInvite {
  templateId: "a005f2a2-74b0-42f4-8ac6-46a4b137b7f1";
  substitutions: {
    project_name: string;
    inviteUrl: string;
  };
  [k: string]: any;
}
declare interface Arrival {
  arrivedAt?: number;
  ownerProfileKey: string;
  profileKey: string;
  projectKey: string;
  projectKeyProfileKey?: string;
}
declare interface Assignment {
  engagementKey: string;
  oppKey: string;
  profileKey: string;
  shiftKey: string;
  teamKey: string;
}
declare interface Commitment {
  code: string;
  oppKey: string;
  count?: number;
  description?: string;
  allocationRule?: string;
  amount?: number;
  party?: string;
  who?: string;
  ticketType?: string;
  retailValue?: number;
  what?: string;
  minLength?: number;
  maxLength?: number;
}
declare interface Engagement {
  $key: string;
  answer: string;
  assignmentCount: number;
  declined: boolean;
  isAccepted: boolean;
  isApplied: boolean;
  isAssigned: boolean;
  isConfirmed: boolean;
  isPaid: boolean;
  oppKey: string;
  payment?: EngagementPayment;
  depositAmount?: string;
  isDepositPaid?: boolean;
  deposit?: EngagementDeposit;
  paymentClientToken?: string;
  /**
   * deprecated
   */
  paymentError?: boolean;
  priority: boolean;
  profileKey: string;
}
declare interface EngagementDeposit {
  billingDate?: string;
  paymentError?: string;
}
declare interface EngagementPayment {
  transactionId?: string;
  subscriptionId?: string;
  error: boolean | string;
  amountPaid?: string;
  paidAt?: number;
}
declare interface Fulfiller {
  oppKey: string;
  teamKey: string;
}
declare interface GatewayCustomer {
  gatewayId: string;
  profileKey: string;
}
declare interface Membership {
  answer: string;
  engagementKey: string;
  isAccepted: boolean;
  isApplied: boolean;
  isConfirmed: boolean;
  isDeclined: boolean;
  oppKey: string;
  teamKey: string;
}
declare interface Notification {
  type: string;
  sendAt?: number;
  [k: string]: any;
}
declare interface Opp {
  ownerProfileKey: string;
  confirmationsOn: boolean;
  description: string;
  isPublic: boolean;
  name: string;
  projectKey: string;
  question: string;
}
declare interface Organizer {
  authority: string;
  inviteEmail: string;
  projectKey: string;
  acceptedAt?: number;
  invitedByProfileKey: string;
  isAccepted?: boolean;
  profileKey?: string;
}
declare interface PaymentDue {
  payment: number;
  deposit: number;
  payable: number;
}
declare interface Profile {
  email: string;
  fullName: ProfileFullName;
  intro?: string;
  isAdmin: boolean;
  isConfirmed?: boolean;
  phone: string;
  portraitUrl: string;
  skills?: string;
  uid: string;
  isEAP?: boolean;
  location?: string;
  dob?: number;
}
declare type ProfileFullName = string;
declare interface Project {
  description?: string;
  facebookImageUrl?: string;
  name: string;
  ownerProfileKey: string;
}
declare interface ProjectImage {
  dataUrl: string;
}
declare interface Shift {
  assigned: number;
  date: string;
  end: string;
  hours: number;
  ownerProfileKey: string;
  people: number;
  reserved?: number;
  start: string;
  teamKey: string;
}
declare interface Status {
  amount: string;
  status: string;
  timestamp: string;
  transactionSource: string;
  user: string;
}
declare interface Team {
  ownerProfileKey: string;
  description?: string;
  name: string;
  projectKey: string;
  question?: string;
}
declare interface TeamImage {
  dataUrl: string;
}
declare interface TransactionEmail {
  fromEmail?: string;
  fromName?: string;
  toEmail: string;
  [k: string]: any;
}
declare interface CommandArrivalsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: ArrivalsCreate;
  key?: string;
}
declare interface CommandArrivalsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: ArrivalsRemove;
  key?: string;
}
declare interface CommandAssignmentsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: AssignmentsCreate;
  key?: string;
}
declare interface CommandAssignmentsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: AssignmentsRemove;
  key?: string;
}
declare interface CommandCommitmentsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: CommitmentsCreate;
  key?: string;
}
declare interface CommandCommitmentsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: CommitmentsUpdate;
  key?: string;
}
declare interface CommandCommitmentsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: CommitmentsRemove;
  key?: string;
}
declare interface CommandEngagementsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: EngagementsCreate;
  key?: string;
}
declare interface CommandEngagementsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: EngagementsUpdate;
  key?: string;
}
declare interface CommandEngagementsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: EngagementsRemove;
  key?: string;
}
declare interface CommandEngagementsConfirm {
  domain: string;
  action: "confirm";
  uid: string;
  payload: EngagementsConfirm;
  key?: string;
}
declare interface CommandEngagementsPay {
  domain: string;
  action: "pay";
  uid: string;
  payload: EngagementsPay;
  key?: string;
}
declare interface CommandEngagementsReclaim {
  domain: string;
  action: "reclaim";
  uid: string;
  payload: EngagementsReclaim;
  key?: string;
}
declare interface CommandFulfillersCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: FulfillersCreate;
  key?: string;
}
declare interface CommandFulfillersRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: FulfillersRemove;
  key?: string;
}
declare interface CommandMembershipsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: MembershipsCreate;
  key?: string;
}
declare interface CommandMembershipsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: MembershipsUpdate;
  key?: string;
}
declare interface CommandMembershipsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: MembershipsRemove;
  key?: string;
}
declare interface CommandOppsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: OppsCreate;
  key?: string;
}
declare interface CommandOppsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: OppsUpdate;
  key?: string;
}
declare interface CommandOppsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: OppsRemove;
  key?: string;
}
declare interface CommandOrganizersCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: OrganizersCreate;
  key?: string;
}
declare interface CommandOrganizersRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: OrganizersRemove;
  key?: string;
}
declare interface CommandOrganizersAccept {
  domain: string;
  action: "accept";
  uid: string;
  payload: OrganizersAccept;
  key?: string;
}
declare interface CommandProfilesCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: ProfilesCreate;
  key?: string;
}
declare interface CommandProfilesUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: ProfilesUpdate;
  key?: string;
}
declare interface CommandProjectImagesCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: ProjectImagesCreate;
  key?: string;
}
declare interface CommandProjectImagesRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: ProjectImagesRemove;
  key?: string;
}
declare interface CommandProjectsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: ProjectsCreate;
  key?: string;
}
declare interface CommandProjectsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: ProjectsUpdate;
  key?: string;
}
declare interface CommandProjectsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: ProjectsRemove;
  key?: string;
}
declare interface CommandShiftsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: ShiftsCreate;
  key?: string;
}
declare interface CommandShiftsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: ShiftsUpdate;
  key?: string;
}
declare interface CommandShiftsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: ShiftsRemove;
  key?: string;
}
declare interface CommandTeamImagesUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: TeamImagesUpdate;
  key?: string;
}
declare interface CommandTeamImagesRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: TeamImagesRemove;
  key?: string;
}
declare interface CommandTeamsCreate {
  domain: string;
  action: "create";
  uid: string;
  payload: TeamsCreate;
  key?: string;
}
declare interface CommandTeamsUpdate {
  domain: string;
  action: "update";
  uid: string;
  payload: TeamsUpdate;
  key?: string;
}
declare interface CommandTeamsRemove {
  domain: string;
  action: "remove";
  uid: string;
  payload: TeamsRemove;
  key?: string;
}
declare interface CommandUsersMigrate {
  domain: string;
  action: "migrate";
  uid: string;
  payload: UsersMigrate;
  key?: string;
}