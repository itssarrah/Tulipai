// src/components/SignUp/types.ts
export interface UserDetailsProps {
  userDetails: {
    name: string;
    email: string;
    password: string;
  };
  handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameError: boolean;
  emailError: boolean;
  passwordError: boolean;
}

export interface OrgDetailsProps {
  orgDetails: {
    orgName: string;
    category: string;
    description: string;
  };
  handleOrgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EmployeesProps {
  employees: Array<{ name: string; email: string; role: string }>;
  handleEmployeeChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addEmployee: () => void;
}
