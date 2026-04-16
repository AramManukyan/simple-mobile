export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface UserProfilePatch {
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  bio?: string;
}
