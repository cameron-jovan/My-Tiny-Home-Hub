
import AdminRoute from '@/components/AdminRoute';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Listings', href: '/admin/listings' },
    { name: 'Blog Posts', href: '/admin/posts' },
    { name: 'Guides', href: '/admin/guides' },
    { name: 'Categories', href: '/admin/categories' },
    { name: 'Inquiries', href: '/admin/inquiries' },
  ];

  return (
    <AdminRoute>
      <div className={styles.adminContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Admin Hub</h2>
          </div>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className={styles.sidebarFooter}>
            <Link to="/dashboard" className={styles.backLink}>
              ← User Dashboard
            </Link>
          </div>
        </aside>
        <main className={styles.content}>
          <header className={styles.contentHeader}>
            <h1>{navItems.find(item => item.href === pathname)?.name || 'Admin'}</h1>
          </header>
          <div className={styles.scrollArea}>
            {children}
          </div>
        </main>
      </div>
    </AdminRoute>
  );
}
