export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'software_development', label: 'Software Development' },
  { value: 'web_development', label: 'Web Development' },
  { value: 'full_stack', label: 'Full Stack' },
  { value: 'data_analysis', label: 'Data Analysis' },
  { value: 'machine_learning', label: 'Machine Learning & AI' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'cloud_devops', label: 'Cloud & DevOps' },
  { value: 'mobile_development', label: 'Mobile Development' },
  { value: 'embedded_systems', label: 'Embedded Systems' },
  { value: 'networking', label: 'Networking' },
  { value: 'database', label: 'Database Engineering' },
  { value: 'mechanical', label: 'Mechanical Engineering' },
  { value: 'electrical', label: 'Electrical Engineering' },
  { value: 'civil', label: 'Civil Engineering' },
  { value: 'chemical', label: 'Chemical Engineering' },
  { value: 'biomedical', label: 'Biomedical Engineering' },
  { value: 'robotics', label: 'Robotics & Automation' },
  { value: 'other', label: 'Other' },
];

// All except 'all' — used for dropdowns in forms
export const FORM_CATEGORIES = PROJECT_CATEGORIES.filter(c => c.value !== 'all');