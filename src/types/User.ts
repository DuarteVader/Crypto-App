enum Role {
  Admin = "Admin",
  User = "User",
}

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  role?: Role | null;
  avatarUrl?: string | null;
  password_reset_token?: string | null;
  password_reset_expires?: Date | null;
  created_at: Date;
  updated_at: Date;
};
