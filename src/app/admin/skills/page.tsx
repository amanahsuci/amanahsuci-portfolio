import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSkillsClient from './client';

export default async function AdminSkills() {
    const cookieStore = await cookies();
    const auth = cookieStore.get('auth');
    
    if (!auth) {
        redirect('/admin');
    }
    
    return <AdminSkillsClient />;
}