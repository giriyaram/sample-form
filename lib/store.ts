export interface Lead {
  id: string;
  submittedAt: string;
  firstName: string;
  lastName: string;
  mobile: string;
  alternateName: string;
  alternateNumber: string;
  email: string;
  size: string;
  floorSize: string;
  tower: string;
  facing: string;
  aadharFile: string;
  panFile: string;
  chequeFile: string;
}

export function getLeads(): Lead[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('eoi_leads');
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export function addLead(lead: Omit<Lead, 'id' | 'submittedAt'>): void {
  const leads = getLeads();
  leads.unshift({
    ...lead,
    id: Math.random().toString(36).slice(2),
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem('eoi_leads', JSON.stringify(leads));
}

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('eoi_auth');
}

export function login(username: string, password: string): boolean {
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem('eoi_auth', '1');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('eoi_auth');
}
