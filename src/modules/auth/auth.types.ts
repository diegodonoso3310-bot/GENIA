export type RegisterWithCompanyInput = {
  email: string;
  fullName: string;
  password: string;
  companyName: string;
  companySlug: string;
};

export type LoginInput = {
  email: string;
  password: string;
  companySlug: string;
  ipAddress?: string;
  userAgent?: string;
};
