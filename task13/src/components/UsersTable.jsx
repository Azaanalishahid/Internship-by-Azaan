import React from 'react'
import UserRow from './UserRow'
import UserCard from './UserCard'

export default function UsersTable({
  users,
  viewMode,
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
  onViewUser,
  onEditUser,
  onDeleteUser
}) {
  const isAllSelected = users.length > 0 && selectedIds.length === users.length

  if (viewMode === 'grid') {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={selectedIds.includes(user.id)}
            onToggleSelect={onToggleSelect}
            onView={onViewUser}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="custom-table-container">
      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '40px', paddingLeft: '1.25rem' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="custom-checkbox"
                />
              </th>
              <th>Profile & Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Role</th>
              <th>Status</th>
              <th>Reg Date</th>
              <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserRow
                key={user.id}
                user={user}
                isSelected={selectedIds.includes(user.id)}
                onToggleSelect={onToggleSelect}
                onView={onViewUser}
                onEdit={onEditUser}
                onDelete={onDeleteUser}
              />
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .custom-table-container table { display: none; }
        }
      `}</style>
    </div>
  )
}
