import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import ComingSoonModal from '@/components/ComingSoonModal'
import ChatWidget from '@/components/ChatWidget'

// Pages
import HomePage from '@/app/page'
import BrowsePage from '@/app/browse/page'
import ListingDetailPage from '@/app/listings/[id]/page'
import BlogPage from '@/app/blog/page'
import BlogSlugPage from '@/app/blog/[slug]/page'
import GuidesPage from '@/app/guides/page'
import ConciergePage from '@/app/concierge/page'
import ListYourHomePage from '@/app/list-your-home/page'
import ValuationPage from '@/app/whats-my-tiny-home-worth/page'
import LoginPage from '@/app/login/page'
import SignupPage from '@/app/signup/page'
import DashboardPage from '@/app/dashboard/page'
import ProfilePage from '@/app/profile/page'
import SellerNewListingPage from '@/app/seller/listings/new/page'

// Admin pages
import AdminLayout from '@/app/admin/layout'
import AdminDashboard from '@/app/admin/page'
import AdminListings from '@/app/admin/listings/page'
import AdminListingsNew from '@/app/admin/listings/new/page'
import AdminListingsEdit from '@/app/admin/listings/edit/[id]/page'
import AdminPosts from '@/app/admin/posts/page'
import AdminPostsNew from '@/app/admin/posts/new/page'
import AdminPostsEdit from '@/app/admin/posts/edit/[id]/page'
import AdminGuides from '@/app/admin/guides/page'
import AdminGuidesNew from '@/app/admin/guides/new/page'
import AdminGuidesEdit from '@/app/admin/guides/edit/[id]/page'
import AdminCategories from '@/app/admin/categories/page'
import AdminInquiries from '@/app/admin/inquiries/page'

// Legal pages
import PrivacyPolicyPage from '@/app/privacy-policy/page'
import TermsOfServicePage from '@/app/terms-of-service/page'
import CookiePolicyPage from '@/app/cookie-policy/page'

export default function App() {
  return (
    <AuthProvider>
      <ComingSoonModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogSlugPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/concierge" element={<ConciergePage />} />
        <Route path="/list-your-home" element={<ListYourHomePage />} />
        <Route path="/whats-my-tiny-home-worth" element={<ValuationPage />} />
        {/* Redirect short alias to canonical URL */}
        <Route path="/whats-my-tiny-worth" element={<Navigate to="/whats-my-tiny-home-worth" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller/listings/new" element={<SellerNewListingPage />} />

        {/* Admin — uses AdminLayout which wraps AdminRoute */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/listings" element={<AdminLayout><AdminListings /></AdminLayout>} />
        <Route path="/admin/listings/new" element={<AdminLayout><AdminListingsNew /></AdminLayout>} />
        <Route path="/admin/listings/edit/:id" element={<AdminLayout><AdminListingsEdit /></AdminLayout>} />
        <Route path="/admin/posts" element={<AdminLayout><AdminPosts /></AdminLayout>} />
        <Route path="/admin/posts/new" element={<AdminLayout><AdminPostsNew /></AdminLayout>} />
        <Route path="/admin/posts/edit/:id" element={<AdminLayout><AdminPostsEdit /></AdminLayout>} />
        <Route path="/admin/guides" element={<AdminLayout><AdminGuides /></AdminLayout>} />
        <Route path="/admin/guides/new" element={<AdminLayout><AdminGuidesNew /></AdminLayout>} />
        <Route path="/admin/guides/edit/:id" element={<AdminLayout><AdminGuidesEdit /></AdminLayout>} />
        <Route path="/admin/categories" element={<AdminLayout><AdminCategories /></AdminLayout>} />
        <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />

        {/* Legal */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Routes>
      <ChatWidget />
    </AuthProvider>
  )
}
