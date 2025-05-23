import { Course } from "./course.model";

export type User = {
  id: string | null;
  accountId: number | null;
  role: string | null;
  token: string | null;
  title: string | null;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  accountDue: string | null;
  subscriptionType: string | null;
  email: string  | null;
}
