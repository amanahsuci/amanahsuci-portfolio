import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminProjectsClient from './client';

export default async function AdminProjects() {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_token');
    
    if (!auth) {
        redirect('/admin');
    }
    
    return <AdminProjectsClient />;
}