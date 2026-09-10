import React, { useState, useEffect, useMemo } from 'react'
import WelcomeSection from '../components/WelcomeSection'
import StatsCards from '../components/StatsCards'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import UsersTable from '../components/UsersTable'
import UserModal from '../components/UserModal'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorCard from '../components/ErrorCard'
import EmptyState from '../components/EmptyState'
import SqlSetupModal from '../components/SqlSetupModal'
import BulkActionBar from '../components/BulkActionBar'
import Pagination from '../components/Pagination'
import { exportToCSV, exportToJSON } from '../utils/exportUtils'
import {
  fetchUsersFromSupabase,
  createNewUser,
  deleteUserById,
  updateUserRecord,
  bulkDeleteUsers,
  bulkUpdateStatus,
  isSupabaseConfigured
} from '../services/supabase'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

export default function Dashboard({ activeTab, onOpenSqlModal, isSqlModalOpen, onCloseSqlModal }) {
  // Main Data States
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const [isMockData, setIsMockData] = useState(!isSupabaseConfigured)

  // Multi-Selection State
  const [selectedIds, setSelectedIds] = useState([])

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [countryFilter, setCountryFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('table') // 'table' | 'grid'

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view' | 'edit' | 'add'
    user: null
  })

  // Toast Notifications
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Load users from Supabase
  const loadUsers = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    setFetchError(null)

    try {
      const { data, isMock, error } = await fetchUsersFromSupabase()
      if (error && !isMock) {
        setFetchError(error)
      } else {
        setUsers(data || [])
        setIsMockData(isMock)
        if (isManualRefresh) {
          showToast(`Successfully synced ${data?.length || 0} user records!`, 'success')
        }
      }
    } catch (err) {
      setFetchError(err.message || 'Failed to connect to Supabase')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // Derived available countries
  const availableCountries = useMemo(() => {
    const countries = new Set()
    users.forEach(u => {
      if (u.country) countries.add(u.country)
    })
    return Array.from(countries).sort()
  }, [users])

  // Filter & Sort Logic
  const filteredAndSortedUsers = useMemo(() => {
    return users.filter(user => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch = !q || (
        user.full_name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.role?.toLowerCase().includes(q) ||
        user.city?.toLowerCase().includes(q) ||
        user.country?.toLowerCase().includes(q)
      )

      const matchesRole = roleFilter === 'All' || user.role === roleFilter
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter
      const matchesCountry = countryFilter === 'All' || user.country === countryFilter

      return matchesSearch && matchesRole && matchesStatus && matchesCountry
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      if (sortBy === 'oldest') return new Date(a.created_at || 0) - new Date(b.created_at || 0)
      if (sortBy === 'name_asc') return (a.full_name || '').localeCompare(b.full_name || '')
      if (sortBy === 'name_desc') return (b.full_name || '').localeCompare(a.full_name || '')
      return 0
    })
  }, [users, searchQuery, roleFilter, statusFilter, countryFilter, sortBy])

  // Paginated Subset
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredAndSortedUsers.slice(start, start + pageSize)
  }, [filteredAndSortedUsers, currentPage, pageSize])

  const activeFilterCount = (roleFilter !== 'All' ? 1 : 0) + 
                            (statusFilter !== 'All' ? 1 : 0) + 
                            (countryFilter !== 'All' ? 1 : 0) + 
                            (searchQuery ? 1 : 0)

  const handleResetFilters = () => {
    setRoleFilter('All')
    setStatusFilter('All')
    setCountryFilter('All')
    setSearchQuery('')
    setSortBy('newest')
    setCurrentPage(1)
    showToast('Filters reset to default', 'info')
  }

  // Interactive Stat Card Filter Handler
  const handleStatCardFilter = (filterType) => {
    if (filterType === 'reset') {
      handleResetFilters()
    } else if (filterType === 'Admin') {
      setRoleFilter('Admin')
      setStatusFilter('All')
      setCurrentPage(1)
      showToast('Filtered list to Admin users', 'info')
    } else {
      setStatusFilter(filterType)
      setRoleFilter('All')
      setCurrentPage(1)
      showToast(`Filtered list to ${filterType} status`, 'info')
    }
  }

  // Selection Handlers
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredAndSortedUsers.map(u => u.id))
    } else {
      setSelectedIds([])
    }
  }

  // Batch Operations
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedIds.length} selected users from Supabase?`)
    if (!confirmDelete) return

    await bulkDeleteUsers(selectedIds)
    setUsers(prev => prev.filter(u => !selectedIds.includes(u.id)))
    showToast(`Successfully deleted ${selectedIds.length} users!`, 'success')
    setSelectedIds([])
  }

  const handleBulkStatusChange = async (newStatus) => {
    if (!selectedIds.length) return
    await bulkUpdateStatus(selectedIds, newStatus)
    setUsers(prev => prev.map(u => selectedIds.includes(u.id) ? { ...u, status: newStatus } : u))
    showToast(`Updated status to ${newStatus} for ${selectedIds.length} users`, 'success')
    setSelectedIds([])
  }

  const handleExportSelected = () => {
    const selectedUsers = users.filter(u => selectedIds.includes(u.id))
    exportToCSV(selectedUsers, `userhub_selected_export_${Date.now()}.csv`)
    showToast(`Exported ${selectedUsers.length} selected users to CSV`, 'success')
  }

  const handleExportAllCSV = () => {
    exportToCSV(filteredAndSortedUsers, `userhub_users_export_${Date.now()}.csv`)
    showToast(`Exported ${filteredAndSortedUsers.length} users to CSV`, 'success')
  }

  // CRUD Handlers
  const handleViewUser = (user) => setModalState({ isOpen: true, mode: 'view', user })
  const handleEditUser = (user) => setModalState({ isOpen: true, mode: 'edit', user })
  const handleAddUser = () => setModalState({ isOpen: true, mode: 'add', user: null })

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user from Supabase?')
    if (!confirmDelete) return

    await deleteUserById(id)
    setUsers(prev => prev.filter(u => u.id !== id))
    setSelectedIds(prev => prev.filter(i => i !== id))
    showToast('User record successfully deleted', 'success')
  }

  const handleSaveUser = async (formData) => {
    if (modalState.mode === 'add') {
      const { data } = await createNewUser(formData)
      if (data) {
        setUsers(prev => [data, ...prev])
        showToast(`User ${data.full_name} created successfully!`, 'success')
      }
    } else if (modalState.mode === 'edit') {
      const { data } = await updateUserRecord(formData.id, formData)
      if (data) {
        setUsers(prev => prev.map(u => u.id === data.id ? data : u))
        showToast(`Updated profile for ${data.full_name}`, 'success')
      }
    }
  }

  return (
    <div className="animate-fade-in">
      
      {/* Toast Popup */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1.25rem',
          borderRadius: '0.75rem',
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} style={{ color: 'var(--status-active-text)' }} />
          ) : (
            <AlertCircle size={20} style={{ color: 'var(--accent-orange)' }} />
          )}
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{toast.message}</span>
          <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <WelcomeSection
        onAddUserClick={handleAddUser}
        onRefreshClick={() => loadUsers(true)}
        isRefreshing={isRefreshing}
        onOpenSqlModal={onOpenSqlModal}
        onExportCSV={handleExportAllCSV}
        totalUsers={users.length}
      />

      {/* Stats Cards with click-to-filter */}
      <StatsCards
        users={users}
        isLoading={isLoading}
        onStatCardClick={handleStatCardFilter}
        activeFilter={statusFilter !== 'All' ? statusFilter : (roleFilter === 'Admin' ? 'Admin' : 'total')}
      />

      {/* Search Header */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1); }}
          resultCount={filteredAndSortedUsers.length}
          totalCount={users.length}
        />
      </div>

      {/* Filter Bar */}
      <FilterBar
        roleFilter={roleFilter}
        setRoleFilter={(r) => { setRoleFilter(r); setCurrentPage(1); }}
        statusFilter={statusFilter}
        setStatusFilter={(s) => { setStatusFilter(s); setCurrentPage(1); }}
        countryFilter={countryFilter}
        setCountryFilter={(c) => { setCountryFilter(c); setCurrentPage(1); }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
        availableCountries={availableCountries}
      />

      {/* Table / Cards Content */}
      {isLoading ? (
        <LoadingSkeleton rowCount={pageSize} />
      ) : fetchError ? (
        <ErrorCard
          error={fetchError}
          onRetry={() => loadUsers(false)}
          onOpenSqlModal={onOpenSqlModal}
        />
      ) : filteredAndSortedUsers.length === 0 ? (
        <EmptyState
          onResetFilters={handleResetFilters}
          onAddUser={handleAddUser}
        />
      ) : (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            padding: '0 0.25rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}>
            <span>
              Showing <strong style={{ color: 'var(--text-main)' }}>{paginatedUsers.length}</strong> of <strong style={{ color: 'var(--text-main)' }}>{filteredAndSortedUsers.length}</strong> filtered users
            </span>
            {isMockData && (
              <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>
                (Interactive Demo Dataset)
              </span>
            )}
          </div>

          <UsersTable
            users={paginatedUsers}
            viewMode={viewMode}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            onViewUser={handleViewUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalItems={filteredAndSortedUsers.length}
          />
        </>
      )}

      {/* Floating Multi-select Bulk Actions Bar */}
      <BulkActionBar
        selectedIds={selectedIds}
        onClearSelection={() => setSelectedIds([])}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
        onExportSelected={handleExportSelected}
      />

      {/* Modals */}
      <UserModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, mode: 'view', user: null })}
        mode={modalState.mode}
        user={modalState.user}
        onSave={handleSaveUser}
      />

      <SqlSetupModal
        isOpen={isSqlModalOpen}
        onClose={onCloseSqlModal}
      />
    </div>
  )
}
