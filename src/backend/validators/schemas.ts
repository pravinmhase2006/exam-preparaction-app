export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface SubmitTestPayload {
  answers: Record<string, string>;
  timeTakenSeconds: number;
}

export function validateLogin(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data?.email || !data.email.includes('@')) errors.push('Valid email is required');
  if (!data?.password || data.password.length < 6) errors.push('Password must be at least 6 characters');
  return { valid: errors.length === 0, errors };
}

export function validateRegister(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data?.name || data.name.trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!data?.email || !data.email.includes('@')) errors.push('Valid email is required');
  if (!data?.password || data.password.length < 6) errors.push('Password must be at least 6 characters');
  return { valid: errors.length === 0, errors };
}

export function validateSubmitTest(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data?.answers || typeof data.answers !== 'object') errors.push('Answers object is required');
  if (typeof data?.timeTakenSeconds !== 'number' || data.timeTakenSeconds < 0) {
    errors.push('Valid timeTakenSeconds is required');
  }
  return { valid: errors.length === 0, errors };
}
