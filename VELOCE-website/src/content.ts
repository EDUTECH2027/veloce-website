export type Detail = {
  icon: string
  title: string
  short: string
  heading: string
  intro: string[]
  listTitle?: string
  /** [title, description]; description is empty for plain bullet lists */
  items: [string, string][]
  outroTitle: string
  outro: string[]
}

const plain = (xs: string[]): [string, string][] => xs.map((x) => [x, ''])

export const SECTION_INTRO = {
  title: 'One Platform for Your Entire Educational Institution',
  lead: [
    'EduTech brings your entire school community together in one intelligent, secure and easy-to-use platform.',
    'From administration and teachers to students and parents, every user gets the tools they need to perform their responsibilities efficiently. EduTech replaces scattered paperwork, disconnected tools and repetitive manual processes with a centralized digital system that makes school management simpler, faster and more transparent.',
  ],
}

export const ROLE_DETAILS: Detail[] = [
  {
    icon: '👨‍💼',
    title: 'Administration',
    short: 'Manage your entire school.',
    heading: 'Take complete control of your institution',
    intro: [
      'School administrators need visibility over almost every aspect of an institution. Managing students, teachers, classes, attendance, academic results, fees and communication through notebooks, spreadsheets or disconnected systems can become time-consuming and difficult to monitor.',
      'EduTech gives administrators a centralized platform from which they can manage and monitor the entire institution.',
    ],
    listTitle: 'With EduTech, administrators can:',
    items: [
      ['Manage students', 'Register students, maintain their profiles, organize them into classes and keep their academic and administrative information in one place.'],
      ['Manage teachers and staff', 'Create and manage teacher accounts, assign roles and responsibilities, monitor teacher attendance and provide controlled access to the information they need.'],
      ['Manage classes and subjects', 'Create classes, assign students and teachers, configure subjects and establish the academic structure of the institution.'],
      ['Monitor attendance', 'Track student and teacher attendance and quickly identify absences, lateness and attendance patterns.'],
      ['Manage academic results', 'Configure subjects and coefficients, record marks, calculate averages, monitor rankings and generate academic reports.'],
      ['Manage school fees', 'Configure fees, track payments, monitor outstanding balances and maintain student payment information.'],
      ['Generate reports', 'Access organized information and reports that help administrators understand the academic and administrative performance of their institution.'],
      ['Control user access', 'EduTech uses role-based access so that administrators, teachers, students and parents only access the information relevant to their responsibilities.'],
    ],
    outroTitle: 'The result? Less paperwork. Fewer manual errors. Better visibility. Faster decisions.',
    outro: [
      'Administrators can spend less time searching for information and more time focusing on improving the institution.',
      'EduTech transforms school administration from a collection of manual tasks into one connected digital operation.',
    ],
  },
  {
    icon: '👩‍🏫',
    title: 'Teachers',
    short: 'Manage classes, marks & attendance.',
    heading: 'Give teachers the tools to teach, manage and track progress',
    intro: [
      'Teachers are at the heart of education, but they often spend significant time dealing with administrative tasks.',
      'EduTech simplifies these tasks and gives teachers a dedicated environment where they can manage their academic responsibilities from one place.',
    ],
    listTitle: 'Teachers can:',
    items: [
      ['Manage their classes', 'Access the classes and students assigned to them without having to work through unnecessary administrative processes.'],
      ['Record student marks', 'Enter marks directly into the platform and keep academic information organized.'],
      ['Track attendance', 'Record student attendance and monitor absences, helping teachers identify students who may need additional attention.'],
      ['Access their timetable', 'View their scheduled classes and teaching activities from their dashboard.'],
      ['Monitor student performance', 'Follow student academic progress and identify areas where students may need additional support.'],
      ['Provide behaviour and progress comments', "Record relevant observations about students, helping create a more complete picture of each student's development."],
      ['Manage their own attendance', 'EduTech can support digital teacher attendance, including QR-based attendance, allowing schools to maintain more accurate attendance records.'],
      ['Access relevant information securely', 'Teachers only see the information required for their responsibilities, helping maintain privacy and organized access.'],
    ],
    outroTitle: 'The benefit for teachers',
    outro: [
      'Less administrative work means more time to focus on teaching and supporting students.',
      'EduTech helps teachers move from manual record keeping to a more organized digital workflow.',
    ],
  },
  {
    icon: '👨‍🎓',
    title: 'Students',
    short: 'Follow your academic performance.',
    heading: 'Give students greater visibility into their academic journey',
    intro: [
      'Students should not have to depend entirely on paper documents or wait until the end of a term to understand their academic performance.',
      'With EduTech, students have access to a dedicated digital environment where they can follow important information about their education.',
    ],
    listTitle: 'Students can:',
    items: [
      ['View academic results', 'Access their marks and academic performance through their personal dashboard.'],
      ['Follow attendance', 'Monitor attendance information and become more aware of their participation and presence at school.'],
      ['Track academic progress', 'Understand how they are performing across subjects and academic periods.'],
      ['Access their personal information', 'Keep important student information organized and accessible through the platform.'],
      ['Follow their academic history', 'Maintain a centralized digital record of their academic progress.'],
    ],
    outroTitle: 'The benefit for students',
    outro: [
      'EduTech encourages students to become more involved in their own education.',
      'Instead of simply receiving a report card at the end of an academic period, students can have greater visibility into their progress throughout the year.',
      'Better information helps students understand their strengths, identify areas for improvement and take greater responsibility for their academic journey.',
    ],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parents',
    short: 'Stay informed about your child.',
    heading: "Keep parents connected to their child's education",
    intro: [
      'Parents want to know how their children are performing, whether they are attending school regularly and whether important school obligations are being handled.',
      'However, traditional communication often means waiting for meetings, report cards, phone calls or paper documents.',
      'EduTech creates a more connected relationship between parents and the school.',
    ],
    listTitle: 'Parents can:',
    items: [
      ['Monitor academic performance', "Access their child's marks and academic results."],
      ['Follow attendance', 'See attendance information and become aware of repeated absences or attendance issues.'],
      ['Follow school fees', 'Access relevant information about school fees and outstanding payments.'],
      ['Stay informed', 'Receive important information and updates from the school through the available communication channels.'],
      ['Monitor progress', "Get a broader view of their child's academic development rather than relying only on end-of-term reports."],
    ],
    outroTitle: 'The benefit for parents',
    outro: [
      "Parents become active participants in their child's education rather than simply receiving information after decisions have already been made.",
      'EduTech helps create a stronger connection between School → Teacher → Student → Parent, for a more transparent and collaborative educational environment.',
    ],
  },
]

export const INSTITUTION_DETAILS: Detail[] = [
  {
    icon: '🧒',
    title: 'Primary Schools',
    short: 'Simple registration, attendance and report cards for younger learners.',
    heading: 'Build a strong foundation for young learners',
    intro: [
      'Primary schools manage large amounts of student information while also maintaining close relationships between teachers, parents and administrators.',
      'EduTech provides a simple way to organize these activities digitally.',
    ],
    listTitle: 'EduTech can help primary schools manage:',
    items: plain(['Student registration', 'Student profiles', 'Classes', 'Teachers', 'Attendance', 'Subjects', 'Marks', 'Report cards', 'Parent follow-up', 'School fees', 'Academic records']),
    outroTitle: 'Why it is beneficial',
    outro: [
      'Primary education requires strong communication between teachers, parents and administrators.',
      'EduTech makes it easier for teachers to record student progress while giving administrators better visibility and parents better access to relevant information.',
      "Keep every learner's information organized from the beginning of their educational journey.",
    ],
  },
  {
    icon: '📚',
    title: 'Secondary Schools',
    short: 'Subjects, coefficients, rankings and parent follow-up across every class.',
    heading: 'Bring academic management under control',
    intro: [
      'Secondary schools generally have more complex academic structures, with multiple subjects, teachers, classes, coefficients, examinations and academic periods.',
      'EduTech helps bring these processes together.',
    ],
    listTitle: 'Secondary schools can manage:',
    items: plain(['Multiple classes', 'Subjects', 'Subject coefficients', 'Teachers', 'Student attendance', 'Examinations', 'Marks', 'Academic averages', 'Rankings', 'Report cards', 'School fees', 'Parent access', 'Teacher timetables', 'Student performance']),
    outroTitle: 'Academic performance becomes easier to manage',
    outro: [
      'EduTech can centralize marks and academic information so administrators and teachers do not have to depend on multiple spreadsheets or paper records.',
      'Teachers enter academic information, the system processes the relevant calculations, and administrators can access organized results. Parents and students can then follow academic performance through their respective dashboards.',
      'From classroom marks to final results, EduTech keeps the academic process organized and connected.',
    ],
  },
  {
    icon: '🎓',
    title: 'Colleges',
    short: 'Structured academic records, timetables and fee tracking.',
    heading: 'Simplify growing academic and administrative operations',
    intro: [
      'Colleges often have a larger number of students, teachers, classes and academic activities.',
      'Managing these elements manually can become increasingly difficult as the institution grows.',
      'EduTech provides a centralized environment for managing students, academic information, attendance, fees and administrative processes.',
    ],
    listTitle: 'Colleges can benefit from:',
    items: plain(['Centralized student records', 'Student registration', 'Class management', 'Teacher management', 'Subject management', 'Attendance tracking', 'Marks and results', 'Timetables', 'Fee management', 'Academic reports', 'Parent communication', 'Role-based access']),
    outroTitle: 'Why it matters',
    outro: [
      'As an institution grows, information becomes harder to manage.',
      'EduTech provides a structured digital environment that allows administrators to maintain better visibility while giving teachers and students access to the information they need.',
      'Grow your institution without letting administrative complexity grow with it.',
    ],
  },
  {
    icon: '🏛️',
    title: 'Universities',
    short: 'Scalable administration for large cohorts and multiple departments.',
    heading: 'A scalable digital foundation for higher education',
    intro: [
      'Universities have significantly more complex structures, including large student populations, departments, academic programs, lecturers and administrative units.',
      'EduTech can provide a centralized foundation for organizing these operations.',
    ],
    listTitle: 'Universities can use EduTech for:',
    items: plain(['Student registration', 'Student profiles', 'Matricule generation', 'Academic records', 'Departments', 'Classes or programs', 'Subjects', 'Marks', 'Results', 'Academic performance', 'Attendance', 'Timetables', 'Fees', 'Reports', 'User management', 'Role-based access']),
    outroTitle: 'Student matricule and digital identity',
    outro: [
      'Universities can register students and provide each student with a unique matricule that can be used to access the platform. This creates a more structured digital identity for students and makes it easier to connect their academic information to their profile.',
      'Universities can also centralize academic results, allowing authorized users to review and manage student performance through dedicated dashboards.',
      "From student registration to academic results, EduTech provides a centralized environment for managing the university's digital academic records.",
    ],
  },
]

export const WHY = {
  title: 'More than school management. A complete digital ecosystem.',
  lead: 'EduTech helps institutions move from:',
  shifts: [
    ['Paperwork', 'Digital records'],
    ['Scattered information', 'Centralized information'],
    ['Manual calculations', 'Automated processes'],
    ['Limited visibility', 'Real-time access'],
    ['Disconnected users', 'Connected school community'],
    ['Administrative complexity', 'Simplified workflows'],
  ],
  benefitsTitle: 'With EduTech, your institution gets:',
  benefits: [
    ['📊', 'Better decision-making', 'Access organized information that helps administrators understand what is happening across the institution.'],
    ['⏱️', 'Time savings', 'Reduce repetitive administrative tasks and spend more time on activities that create value.'],
    ['🔐', 'Controlled access', 'Give each user access to the information and functionality appropriate to their role.'],
    ['📱', 'Accessibility', 'Allow authorized users to access relevant school information through the digital platform.'],
    ['📈', 'Scalability', 'Build a digital foundation that can grow with your institution.'],
    ['🤝', 'Better communication', 'Create stronger connections between administrators, teachers, students and parents.'],
  ],
} as const
