export interface RegisterResponse {
  email: string;
  profile: Profile;
}

export interface Profile {
  id: number;
  full_name: string;
  phone: string;
  address: string;
  gender: string;
  birth_date: string;
  avatar: string;
  created_at: string;
  modified_on: string;
}
