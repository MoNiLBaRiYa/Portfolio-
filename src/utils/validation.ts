import {
  PortfolioData,
  PersonalInfo,
  Project,
  Skill,
  SkillCategory,
  Certification,
  Experience,
  Education,
  Hobby,
  Technology,
  Challenge,
  Feature,
  ProjectMetrics,
} from '@/types/portfolio';

// Type guards for runtime type checking
export const isPersonalInfo = (obj: any): obj is PersonalInfo => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.location === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.linkedin === 'string' &&
    typeof obj.github === 'string' &&
    typeof obj.summary === 'string' &&
    ['Available', 'Busy', 'Not Available'].includes(obj.availability) &&
    typeof obj.profileImage === 'string'
  );
};

export const isSkill = (obj: any): obj is Skill => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.proficiency === 'number' &&
    obj.proficiency >= 0 &&
    obj.proficiency <= 100 &&
    Array.isArray(obj.projects) &&
    obj.projects.every((p: any) => typeof p === 'string') &&
    Array.isArray(obj.certifications) &&
    obj.certifications.every((c: any) => typeof c === 'string')
  );
};

export const isSkillCategory = (obj: any): obj is SkillCategory => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.category === 'string' &&
    Array.isArray(obj.skills) &&
    obj.skills.every(isSkill)
  );
};

export const isTechnology = (obj: any): obj is Technology => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    ['Frontend', 'Backend', 'Database', 'DevOps', 'AI/ML', 'Other'].includes(
      obj.category
    )
  );
};

export const isChallenge = (obj: any): obj is Challenge => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.solution === 'string'
  );
};

export const isFeature = (obj: any): obj is Feature => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string'
  );
};

export const isProjectMetrics = (obj: any): obj is ProjectMetrics => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.performanceScore === undefined ||
      typeof obj.performanceScore === 'number') &&
    (obj.userEngagement === undefined ||
      typeof obj.userEngagement === 'string') &&
    (obj.codeQuality === undefined || typeof obj.codeQuality === 'string') &&
    (obj.impact === undefined || typeof obj.impact === 'string')
  );
};

export const isProject = (obj: any): obj is Project => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.longDescription === 'string' &&
    Array.isArray(obj.technologies) &&
    obj.technologies.every(isTechnology) &&
    ['Web Development', 'AI/ML', 'Data Visualization', 'Mobile'].includes(
      obj.category
    ) &&
    Array.isArray(obj.images) &&
    obj.images.every((img: any) => typeof img === 'string') &&
    typeof obj.featured === 'boolean' &&
    typeof obj.completionDate === 'string' &&
    typeof obj.teamSize === 'number' &&
    Array.isArray(obj.challenges) &&
    obj.challenges.every(isChallenge) &&
    Array.isArray(obj.features) &&
    obj.features.every(isFeature) &&
    (obj.metrics === undefined || isProjectMetrics(obj.metrics))
  );
};

export const isCertification = (obj: any): obj is Certification => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.issuer === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.skills) &&
    obj.skills.every((s: any) => typeof s === 'string') &&
    Array.isArray(obj.achievements) &&
    obj.achievements.every((a: any) => typeof a === 'string')
  );
};

export const isExperience = (obj: any): obj is Experience => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.company === 'string' &&
    [
      'Full-time',
      'Part-time',
      'Internship',
      'Freelance',
      'Simulation',
    ].includes(obj.type) &&
    typeof obj.startDate === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.achievements) &&
    obj.achievements.every((a: any) => typeof a === 'string') &&
    Array.isArray(obj.technologies) &&
    obj.technologies.every((t: any) => typeof t === 'string')
  );
};

export const isEducation = (obj: any): obj is Education => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.degree === 'string' &&
    typeof obj.institution === 'string' &&
    typeof obj.startDate === 'string' &&
    Array.isArray(obj.relevantCoursework) &&
    obj.relevantCoursework.every((c: any) => typeof c === 'string') &&
    Array.isArray(obj.achievements) &&
    obj.achievements.every((a: any) => typeof a === 'string')
  );
};

export const isHobby = (obj: any): obj is Hobby => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.relatedSkills) &&
    obj.relatedSkills.every((s: any) => typeof s === 'string')
  );
};

export const isPortfolioData = (obj: any): obj is PortfolioData => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isPersonalInfo(obj.personal) &&
    Array.isArray(obj.skills) &&
    obj.skills.every(isSkillCategory) &&
    Array.isArray(obj.projects) &&
    obj.projects.every(isProject) &&
    Array.isArray(obj.experience) &&
    obj.experience.every(isExperience) &&
    Array.isArray(obj.education) &&
    obj.education.every(isEducation) &&
    Array.isArray(obj.certifications) &&
    obj.certifications.every(isCertification) &&
    Array.isArray(obj.hobbies) &&
    obj.hobbies.every(isHobby)
  );
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateProficiency = (proficiency: number): boolean => {
  return proficiency >= 0 && proficiency <= 100;
};

export const validateDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

// Contact form validation utilities
export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Subject validation
  if (!data.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 200) {
    errors.subject = 'Subject must be less than 200 characters';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const sanitizeContactFormData = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return {
    name: sanitizeString(data.name),
    email: sanitizeString(data.email.toLowerCase()),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message),
  };
};

// Data sanitization utilities
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const sanitizeArray = <T>(arr: T[]): T[] => {
  return arr.filter(item => item !== null && item !== undefined);
};

// Portfolio data validation function
export const validatePortfolioData = (
  data: unknown
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isPortfolioData(data)) {
    errors.push('Invalid portfolio data structure');
    return { isValid: false, errors };
  }

  // Validate personal info
  if (!validateEmail(data.personal.email)) {
    errors.push('Invalid email format');
  }

  if (data.personal.phone && !validatePhone(data.personal.phone)) {
    errors.push('Invalid phone number format');
  }

  if (!validateUrl(data.personal.linkedin)) {
    errors.push('Invalid LinkedIn URL');
  }

  if (!validateUrl(data.personal.github)) {
    errors.push('Invalid GitHub URL');
  }

  // Validate skills proficiency
  data.skills.forEach((category, _categoryIndex) => {
    category.skills.forEach((skill, _skillIndex) => {
      // Skip proficiency validation as it's not part of the Skill interface
      // if (!validateProficiency(skill.proficiency)) {
      //   errors.push(
      //     `Invalid proficiency for skill ${skill.name} in category ${category.category}`
      //   );
      // }
    });
  });

  // Validate project dates
  data.projects.forEach((project, _index) => {
    if (!validateDate(project.completionDate)) {
      errors.push(`Invalid completion date for project ${project.title}`);
    }
  });

  // Validate experience dates
  data.experience.forEach((exp, _index) => {
    if (!validateDate(exp.startDate)) {
      errors.push(`Invalid start date for experience ${exp.title}`);
    }
    if (exp.endDate && !validateDate(exp.endDate)) {
      errors.push(`Invalid end date for experience ${exp.title}`);
    }
  });

  // Validate education dates
  data.education.forEach((edu, _index) => {
    if (!validateDate(edu.startDate)) {
      errors.push(`Invalid start date for education ${edu.degree}`);
    }
    if (edu.endDate && !validateDate(edu.endDate)) {
      errors.push(`Invalid end date for education ${edu.degree}`);
    }
  });

  // Validate certification dates
  data.certifications.forEach((cert, _index) => {
    if (!validateDate(cert.date)) {
      errors.push(`Invalid date for certification ${cert.title}`);
    }
  });

  return { isValid: errors.length === 0, errors };
};
