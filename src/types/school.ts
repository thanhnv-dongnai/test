export type UserRole =
  | 'super_admin'
  | 'school_admin'
  | 'academic_admin'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'librarian'
  | 'transport_manager'
  | 'hr_manager'
  | 'receptionist';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  schoolId: string;
  role: UserRole;
  permissions: string[];
  status: 'active' | 'inactive';
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id?: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  admissionDate: string;
  gradeLevel: string;
  currentClassId?: string;
  status: 'active' | 'inactive' | 'graduated' | 'withdrawn';
  schoolId: string;
  address?: string;
  email?: string;
  phone?: string;
  profilePhotoUrl?: string;
  parentIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}
