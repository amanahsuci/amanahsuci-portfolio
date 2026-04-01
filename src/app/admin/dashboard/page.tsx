import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './client';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    console.log('All cookies on dashboard:', JSON.stringify(allCookies));
    
    const auth = cookieStore.get('admin_token');
    console.log('Auth cookie:', auth);
    
    if (!auth) {
        redirect('/admin');
    }
    
    return <AdminDashboardClient />;
}