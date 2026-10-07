export type Block =
  | { t: 'p'; x: string }
  | { t: 'h'; x: string }
  | { t: 'ul'; x: string[] }
  | { t: 'steps'; x: string[] }
  | { t: 'diagram'; x: string; caption?: string }
  | { t: 'formula'; x: string }
  | { t: 'note'; title: string; x: string }

export type DocSection = { n: number; id: string; title: string; group: string; blocks: Block[] }

const p = (x: string): Block => ({ t: 'p', x })
const h = (x: string): Block => ({ t: 'h', x })
const ul = (...x: string[]): Block => ({ t: 'ul', x })
const steps = (...x: string[]): Block => ({ t: 'steps', x })
const diagram = (x: string, caption?: string): Block => ({ t: 'diagram', x, caption })
const formula = (x: string): Block => ({ t: 'formula', x })
const note = (title: string, x: string): Block => ({ t: 'note', title, x })

const raw: [string, string, Block[]][] = [
  ['Introduction', 'What is EduTech?', [
    p('EduTech is a digital school and university management system designed to centralize the administrative, academic and communication activities of an educational institution.'),
    p('Instead of managing information through paper documents, notebooks, spreadsheets and disconnected applications, EduTech brings the main activities of an institution together in one platform.'),
    h('The system allows authorized users to manage'),
    ul('Students', 'Teachers', 'Parents', 'Classes', 'Subjects', 'Attendance', 'Marks', 'Results', 'Report cards', 'School fees', 'Timetables', 'Student behaviour', 'Teacher attendance', 'Academic records', 'Reports', 'Communication', 'University students and matricules'),
    p('The system uses role-based access, meaning that each user sees the features and information appropriate to their responsibilities.'),
  ]],
  ['Introduction', 'How EduTech Works', [
    p('At a high level, EduTech works around four main groups of users:'),
    diagram(`                    EDUTECH
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   ADMINISTRATOR     TEACHER       STUDENT
        │                              │
        └──────────────┬───────────────┘
                       │
                     PARENT`),
    ul('The administrator manages the institution.', 'Teachers manage academic activities and students.', 'Students access their academic information.', "Parents monitor their children's education."),
    p('Above the individual schools is the Super Administrator, who manages the EduTech platform and the schools registered on it.'),
  ]],
  ['Introduction', 'User Roles', [
    p('EduTech supports different roles with different responsibilities.'),
    h('3.1 Super Administrator'),
    p('The Super Administrator operates at the platform level and can:'),
    ul('Create schools', 'Manage registered schools', 'Monitor school status', 'Manage school administrators', 'Control school environments', 'Access platform-level information', 'Manage plans/status where applicable'),
    p('Each school is designed to have its own environment and data.'),
    h('3.2 School Administrator'),
    p('The School Administrator manages a particular school, including:'),
    ul('Students', 'Teachers', 'Parents', 'Classes', 'Subjects', 'Attendance', 'Fees', 'Marks', 'Results', 'Timetables', 'Reports', 'School settings', 'User access'),
    h('3.3 Teacher'),
    p('Teachers use EduTech for their daily academic responsibilities. They can:'),
    ul('View assigned classes', 'View students', 'Enter marks', 'Record attendance', 'Report absences', 'View their timetable', 'Comment on student behaviour', 'Monitor student performance', 'View relevant salary information', 'Manage teacher attendance'),
    h('3.4 Student'),
    p("Students can access their personal academic information. Depending on the school's configuration, students can view:"),
    ul('Profile', 'Classes', 'Subjects', 'Marks', 'Results', 'Attendance', 'Academic performance', 'Other information made available by the school'),
    h('3.5 Parent'),
    p("Parents can follow their children's education. They can access information such as:"),
    ul("Child's profile", 'Marks', 'Results', 'Attendance', 'Fees', 'Academic performance', 'School information and communication'),
  ]],
  ['Getting Started', 'Accessing EduTech', [
    h('4.1 Login'),
    p('To access EduTech:'),
    steps('Open the EduTech login URL provided by your institution.', 'Enter your username, email, matricule or other assigned identifier.', 'Enter your password.', 'Select Login.', 'The system verifies your credentials.', 'You are redirected to the dashboard associated with your role.'),
    note('Important', 'A teacher should not receive the same dashboard as an administrator. Students access the Student Portal, parents access the Parent Portal, teachers access the Teacher Portal, and administrators access the Administration Dashboard.'),
  ]],
  ['Getting Started', 'First-Time Login', [
    p('When a new school is created, the initial school administrator account can be created by the platform. The administrator receives:'),
    ul('School access link', 'Username/login information', 'Initial password or temporary credentials'),
    p('The credentials should be used to access the platform for the first time. After successful login, the administrator should review the account information and configure the school.'),
    note('Security recommendation', 'The initial credentials should never be shared publicly. Users should keep their passwords private and change temporary credentials when required by the system.'),
  ]],
  ['Administration', 'Super Administrator', [
    p('The Super Administrator is responsible for managing schools on the EduTech platform.'),
    h('6.1 Creating a School'),
    p('To create a new school:'),
    steps('Log in as Super Administrator.', 'Open the Schools section.', 'Select Create School.', "Enter the school's information.", "Enter the school's contact information.", "Enter the WhatsApp-enabled phone number where the administrator's credentials should be sent.", 'Enter the initial administrator information.', 'Submit the form.'),
    p('The system then creates the school environment.'),
    h('6.2 School Provisioning'),
    p('When a school is created, the system creates an independent school environment. This separation is important because School A must not see or modify School B\'s information.'),
    p('The architecture therefore keeps each school\'s information isolated. The school administrator can then configure their institution without interfering with another school\'s data.'),
  ]],
  ['Administration', 'School Administrator Dashboard', [
    p('After logging in, the administrator reaches the main dashboard, which provides an overview of the institution. Typical information includes:'),
    ul('Number of students', 'Number of teachers', 'Classes', 'Attendance', 'Academic information', 'Fees', 'Other relevant school statistics'),
    p('The administrator can use the dashboard as the starting point for managing the institution.'),
  ]],
  ['Administration', 'School Configuration', [
    p('Before registering students and starting academic activities, the administrator should configure the school. The administrator should establish:'),
    ul('Academic year', 'Academic terms', 'Classes', 'Subjects', 'Subject coefficients', 'School fees', 'User roles', 'Other institution-specific settings'),
    note('Why it matters', 'Proper configuration is important because many other modules depend on these settings.'),
  ]],
  ['People & Structure', 'Student Management', [
    h('9.1 Registering a Student'),
    steps('Open Students.', 'Select Add Student.', "Enter the student's personal information.", 'Enter guardian/parent information.', 'Select the appropriate class.', 'Enter the required financial information.', 'Save the student.'),
    p("The student's profile becomes available in the system."),
    h('9.2 Student Profile'),
    p('A student profile can contain information such as:'),
    ul('Name', 'Date of birth', 'Gender', 'Contact information', 'Guardian information', 'Class', 'Academic information', 'Attendance', 'Fees', 'Results'),
    p("The profile provides administrators and authorized users with a centralized view of the student's information."),
  ]],
  ['People & Structure', 'Student Fees During Registration', [
    p("EduTech can use the school's configured fee amount when registering a student. For example, suppose the configured annual fee is 500,000 FCFA and a student pays 200,000 FCFA. The system can record:"),
    diagram(`Total fee:       500,000 FCFA
Amount paid:     200,000 FCFA
Remaining:       300,000 FCFA`),
    p("This reduces the need for administrators to calculate balances manually. The system maintains the student's payment status."),
  ]],
  ['People & Structure', 'Active and Inactive Students', [
    p('The administrator can control whether a student is active.'),
    h('Active'),
    p("An active student is currently participating in the school's academic activities."),
    h('Inactive'),
    p('An inactive student can be retained in the system without being treated as an actively enrolled student. This is useful when a student leaves the institution or is temporarily no longer active.'),
  ]],
  ['People & Structure', 'Parent and Guardian Information', [
    p('During student registration, the administrator can associate the student with a parent or guardian. The system can maintain:'),
    ul('Parent name', 'Phone number', 'Relationship', 'Contact information'),
    p('Phone number validation should follow the selected country format. This ensures that contact information is stored consistently.'),
  ]],
  ['People & Structure', 'Teacher Management', [
    h('13.1 Adding a Teacher'),
    steps('Open Teachers.', 'Select Add Teacher.', "Enter the teacher's personal information.", 'Enter contact information.', 'Assign relevant responsibilities.', "Configure the teacher's access.", 'Save.'),
    p('The teacher can then receive credentials to access the Teacher Portal.'),
  ]],
  ['People & Structure', 'Teacher Dashboard', [
    p("The teacher dashboard provides access to the teacher's responsibilities. A teacher can access:"),
    ul('Assigned classes', 'Students', 'Subjects', 'Marks', 'Attendance', 'Timetable', 'Behaviour comments', 'Absence reporting', 'Teacher attendance', 'Relevant salary information'),
    p('The teacher should only see the information associated with their authorized responsibilities.'),
  ]],
  ['People & Structure', 'Class Management', [
    p('Administrators can create and manage classes. For each class, the administrator can organize:'),
    ul('Class name', 'Students', 'Teachers', 'Subjects', 'Academic information'),
    p('Students can then be assigned to their respective classes. Teachers can access the classes assigned to them.'),
  ]],
  ['People & Structure', 'Subject Management', [
    p('The administrator configures the subjects offered by the institution. A subject can include:'),
    ul('Subject name', 'Subject code where applicable', 'Coefficient', 'Class association'),
    note('Coefficients', 'The coefficient is particularly important for academic calculations.'),
  ]],
  ['Academics', 'Academic Management', [
    p('Academic management is one of the central components of EduTech. The process is:'),
    diagram(`Subjects
   ↓
Coefficients
   ↓
Student Marks
   ↓
Sequence Average
   ↓
Term Average
   ↓
Final Average
   ↓
Ranking / Promotion`),
  ]],
  ['Academics', 'Entering Student Marks', [
    p('Teachers or authorized users can enter student marks. The process is:'),
    steps('Open Marks/Results.', 'Select the class.', 'Select the subject.', 'Select the academic period.', 'Select the student.', 'Enter the mark.', 'Save.'),
    p('The system stores the mark against the correct student, subject, class and academic period.'),
  ]],
  ['Academics', 'Academic Calculation', [
    p('EduTech supports weighted academic calculations based on subject coefficients. The sequence average is calculated using:'),
    formula('Sequence Average = Σ(Mark × Coefficient) / Σ(Coefficients)'),
    p('For example, if a student has:'),
    diagram(`Mathematics: 15 × 4
English:     14 × 3
Physics:     12 × 3`),
    p('The weighted average is calculated using the respective coefficients rather than treating every subject equally.'),
  ]],
  ['Academics', 'Term Calculation', [
    p('The academic structure uses sequence results to calculate term results.'),
    formula('Term 1 = (Sequence 1 + Sequence 2) / 2'),
    formula('Term 2 = (Sequence 3 + Sequence 4) / 2'),
    formula('Term 3 = (Sequence 5 + Sequence 6) / 2'),
  ]],
  ['Academics', 'Final Average', [
    p('The final academic average is calculated from the three term averages:'),
    formula('Final Average = (Term 1 + Term 2 + Term 3) / 3'),
    p("This final result can then be used for academic evaluation, including promotion or repetition according to the school's configured rules."),
  ]],
  ['Attendance & Teaching', 'Attendance Management', [
    p('Attendance allows schools to monitor student presence. A teacher can:'),
    steps('Open the attendance module.', 'Select the class.', 'Select the date.', 'Mark students according to their attendance status.', 'Save the attendance.'),
    p('The system keeps attendance records associated with the student and date.'),
  ]],
  ['Attendance & Teaching', 'Teacher Attendance', [
    p("EduTech also supports teacher attendance. The system can generate a monthly attendance QR code through the school's settings."),
    diagram(`Administrator
      ↓
Generates monthly QR code
      ↓
Teacher opens Teacher Portal
      ↓
Teacher scans QR code
      ↓
System records attendance time`, 'Teacher attendance process'),
    p('The system can classify attendance based on the configured attendance time. For example:'),
    diagram(`Before 07:30 → ON TIME
After 07:30  → LATE`),
    p('The attendance information can then be used as part of teacher attendance and payment management.'),
  ]],
  ['Attendance & Teaching', 'Reporting Teacher Absence', [
    p('Teachers can report an absence through their portal. The absence information can be recorded and made available to authorized administrators.'),
    p('This creates a digital record rather than relying solely on verbal or paper-based reporting.'),
  ]],
  ['Attendance & Teaching', 'Teacher Timetable', [
    p('Teachers can access their timetable from their dashboard. The timetable helps them identify:'),
    ul('Classes', 'Subjects', 'Teaching periods', 'Scheduled activities'),
    p('This reduces confusion about daily teaching assignments.'),
  ]],
  ['Attendance & Teaching', 'Student Behaviour', [
    p('Teachers can provide comments about student behaviour. For example, a teacher may record observations relating to:'),
    ul('Participation', 'Discipline', 'Classroom behaviour', 'Progress', 'Areas requiring improvement'),
    p("These observations can contribute to a broader understanding of the student's development."),
  ]],
  ['Fees & Reports', 'Fees Management', [
    p('The fees module allows administrators to manage financial obligations associated with students. Administrators can:'),
    ul('Configure total fees', 'Record student payments', 'View amounts paid', 'View outstanding balances', 'Monitor payment status', 'Review financial information'),
    p('Example:'),
    diagram(`School fee:       400,000 FCFA
Paid:             250,000 FCFA
Outstanding:      150,000 FCFA`),
    p("This information remains associated with the student's financial record."),
  ]],
  ['Fees & Reports', 'Reports and Report Cards', [
    p('EduTech can generate academic information for students. A report card can include:'),
    ul('Student information', 'Class', 'Subjects', 'Marks', 'Coefficients', 'Averages', 'Ranking', 'Academic period', 'Final result'),
    p('The objective is to transform the marks stored in the system into an organized academic report.'),
  ]],
  ['Portals & Communication', 'Parent Portal', [
    p('When a parent logs into EduTech, the parent sees information related to their child or children. The parent can monitor:'),
    h('Academic performance'),
    p('View marks and results.'),
    h('Attendance'),
    p('Monitor attendance and absences.'),
    h('Fees'),
    p('Review relevant school fee information.'),
    h('School information'),
    p('Access information made available by the institution.'),
    p('The Parent Portal reduces the need for parents to physically visit the school for every routine information request.'),
  ]],
  ['Portals & Communication', 'Student Portal', [
    p('The Student Portal provides students with their own academic environment. Students can access:'),
    ul('Profile', 'Subjects', 'Marks', 'Results', 'Attendance', 'Academic performance'),
    p("The student's information is protected by their account permissions. A student cannot access another student's academic information."),
  ]],
  ['Portals & Communication', 'Communication', [
    p('EduTech is designed to improve communication between the institution and its users. Communication can include:'),
    ul('School announcements', 'Important information', 'Academic information', 'Attendance notifications', 'Parent communication', 'Account information'),
    p('The platform can also be integrated with WhatsApp for appropriate school communications.'),
  ]],
  ['Portals & Communication', 'WhatsApp Account Communication', [
    p("When a new school is created, the system can send the initial administrator's access information to the WhatsApp number entered during school creation. The intended workflow is:"),
    diagram(`Super Admin
     ↓
Creates School
     ↓
Creates Initial Administrator
     ↓
Generates School Access Information
     ↓
WhatsApp
     ↓
School Administrator`),
    p('The WhatsApp integration uses the official WhatsApp Business/Cloud API.'),
    note('Security', 'The credentials or activation information should be handled securely and should not be exposed in application logs or to unauthorized users.'),
  ]],
  ['University', 'University Management', [
    p('EduTech can also support higher education institutions.'),
    h('33.1 Registering a University Student'),
    p("The authorized administrator opens the university student registration module and enters the student's information. After registration, the system can generate a unique matricule."),
    diagram(`Student:
John Doe

Matricule:
UNI202600145`, 'Example'),
    p("The matricule serves as the student's unique academic identifier and can be used for platform access according to the university's configuration."),
  ]],
  ['University', 'University Student Dashboard', [
    p('University students can use their matricule/account to access their academic environment. The dashboard can provide access to:'),
    ul('Profile', 'Academic information', 'Subjects', 'Marks', 'Results', 'Academic history'),
  ]],
  ['University', 'University Results Management', [
    p('Authorized university users can access a results management/review dashboard. This allows them to:'),
    ul('Review student results', 'Review academic performance', 'Organize results', 'Access student academic records'),
    p('The objective is to centralize academic information for large student populations.'),
  ]],
  ['Security & Access', 'User Profiles', [
    p('Each user has a profile appropriate to their role. A profile may contain:'),
    ul('Name', 'Contact information', 'Role', 'Institution', 'Other relevant information'),
    p('Users should keep their personal information accurate.'),
  ]],
  ['Security & Access', 'Role-Based Access Control', [
    p('One of the most important security features of EduTech is role-based access control. For example:'),
    diagram(`SUPER ADMIN                 SCHOOL ADMIN
     │                           │
     ├── Schools                 ├── Students
     └── Platform management     ├── Teachers
                                 ├── Classes
TEACHER                          ├── Fees
     │                           ├── Results
     ├── Classes                 └── Settings
     ├── Marks
     ├── Attendance              STUDENT
     └── Students                     │
                                      ├── Results
PARENT                                ├── Attendance
     │                                └── Profile
     ├── Child Results
     ├── Attendance
     └── Fees`),
    p('This ensures that users do not automatically receive access to functions belonging to other roles.'),
  ]],
  ['Security & Access', 'Data Separation Between Schools', [
    p("EduTech is designed as a multi-school platform. If multiple schools use EduTech, each school's information must remain isolated."),
    diagram(`School A                    School B
 ├── Students                ├── Students
 ├── Teachers                ├── Teachers
 ├── Results                 ├── Results
 └── Fees                    └── Fees`),
    p("School A users should not be able to access School B's information. This is fundamental to the SaaS architecture."),
  ]],
  ['Workflows', 'Recommended School Setup Procedure', [
    p('When a school starts using EduTech, the administrator should follow this order.'),
    steps(
      "Configure school information — enter the school's basic information.",
      'Configure academic settings — set the academic year, terms, sequences and other academic settings.',
      'Configure subjects — create the subjects and their coefficients.',
      'Configure classes — create the classes available in the institution.',
      'Register teachers — create teacher accounts and assign responsibilities.',
      'Register students — add students and their parent/guardian information.',
      'Configure fees — define the applicable fees.',
      'Assign students to classes — ensure each student belongs to the correct class.',
      'Assign teachers — assign teachers to the appropriate classes and subjects.',
      'Configure timetable — create teaching schedules.',
      'Start attendance — begin recording student and teacher attendance.',
      'Enter marks — teachers enter marks throughout the academic period.',
      'Review results — administrators review calculated academic information.',
      'Generate reports — generate report cards and other reports.',
    ),
  ]],
  ['Workflows', 'Typical Academic-Year Workflow', [
    p('Once the school is configured, the normal workflow becomes:'),
    diagram(`              SCHOOL SETUP
                   ↓
          STUDENT REGISTRATION
                   ↓
           CLASS ASSIGNMENT
                   ↓
          SUBJECT CONFIGURATION
                   ↓
          TEACHER ASSIGNMENT
                   ↓
             TIMETABLE
                   ↓
             ATTENDANCE
                   ↓
          SEQUENCE 1 MARKS
                   ↓
          SEQUENCE 2 MARKS
                   ↓
              TERM 1
                   ↓
          SEQUENCE 3 + 4
                   ↓
              TERM 2
                   ↓
          SEQUENCE 5 + 6
                   ↓
              TERM 3
                   ↓
           FINAL AVERAGE
                   ↓
        REPORT CARD / RANKING
                   ↓
       PROMOTION / REPETITION`),
  ]],
  ['Workflows', 'Daily Teacher Workflow', [
    p("A teacher's typical day can look like:"),
    diagram(`Login
  ↓
View Dashboard
  ↓
Check Timetable
  ↓
Open Assigned Class
  ↓
Record Attendance
  ↓
Teach Class
  ↓
Enter Marks When Required
  ↓
Add Student Comments When Necessary
  ↓
Review Student Performance
  ↓
Report Absence If Necessary`),
  ]],
  ['Workflows', 'Daily Administrator Workflow', [
    p('An administrator can:'),
    diagram(`Login
  ↓
Review Dashboard
  ↓
Check Attendance
  ↓
Monitor Teachers
  ↓
Review Student Records
  ↓
Monitor Fees
  ↓
Review Academic Activities
  ↓
Manage Users
  ↓
Generate Reports`),
  ]],
  ['Workflows', 'Parent Workflow', [
    p('A parent can:'),
    diagram(`Login
  ↓
Select Child
  ↓
View Dashboard
  ↓
Check Attendance
  ↓
Check Marks
  ↓
Review Results
  ↓
Check Fees
  ↓
Read School Information`),
  ]],
  ['Workflows', 'Student Workflow', [
    p('A student can:'),
    diagram(`Login
  ↓
Open Dashboard
  ↓
View Profile
  ↓
View Subjects
  ↓
View Marks
  ↓
View Attendance
  ↓
View Results
  ↓
Monitor Academic Progress`),
  ]],
  ['Best Practices & Summary', 'Important Security Practices', [
    p('Every user should follow basic security rules.'),
    h('Never share your password'),
    p('Your password gives access to your account and potentially sensitive school information.'),
    h("Do not use another person's account"),
    p('Each person should use their own account.'),
    h('Log out on shared computers'),
    p('Especially when using school laboratories or administrative computers.'),
    h('Protect student information'),
    p('Student academic and personal information should only be accessed by authorized users.'),
    h('Administrators should carefully manage permissions'),
    p('Users should receive only the access required for their responsibilities.'),
  ]],
  ['Best Practices & Summary', 'What EduTech Changes for a School', [
    h('Without EduTech'),
    diagram(`Paper documents
      +
Excel files
      +
Manual calculations
      +
Phone calls
      +
Multiple disconnected records
      ↓
More administrative work`),
    h('With EduTech'),
    diagram(`                    EDUTECH
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
 Administration    Academics     Communication
        │              │              │
        ↓              ↓              ↓
 Students          Teachers        Parents
        │              │              │
        └──────────────┼──────────────┘
                       ↓
             Centralized Information
                       ↓
              Better School Management`),
  ]],
  ['Best Practices & Summary', 'Main Benefits', [
    h('For administrators'),
    p('Better control and visibility over the institution.'),
    h('For teachers'),
    p('Less administrative work and easier academic management.'),
    h('For students'),
    p('Better access to academic information and progress.'),
    h('For parents'),
    p("Greater visibility into their child's education."),
    h('For the institution'),
    p('A centralized, structured and scalable digital management system.'),
  ]],
  ['Best Practices & Summary', 'Final User Journey', [
    p('The complete EduTech experience can be summarized as:'),
    note('The EduTech journey', 'Create the institution → Configure the school → Add users → Organize classes and subjects → Manage attendance → Manage academics → Manage fees → Communicate with users → Generate reports → Monitor performance.'),
    p('EduTech is therefore not simply a student database or a marks application. It is designed as a complete digital management environment for educational institutions, connecting administration, teachers, students and parents around the same source of information.'),
  ]],
]

export const DOC_SECTIONS: DocSection[] = raw.map(([group, title, blocks], i) => ({
  n: i + 1,
  id: `s${i + 1}`,
  title,
  group,
  blocks,
}))
