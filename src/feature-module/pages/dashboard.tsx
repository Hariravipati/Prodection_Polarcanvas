import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/dashboard.css'
import { fetchAddressTypes } from '../../services/addressService'
import { 
  DollarSign,
  TrendingUp,
  Folder,
  UserPlus,
  CalendarCheck,
  LogOut,
  ScrollText,
  ClipboardList
} from 'lucide-react';

const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchAddressTypes()
      setData(res)
    } catch (e) {
      setError(e?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }
  const navigationItems = [
  {
    id: 'e-onboarding',
    title: 'E-Onboarding',
    icon: UserPlus,
    accent: 'accent-green',
    path: '/onboarding'
  },
  {
    id: 'attendance',
    title: 'Attendance',
    icon: CalendarCheck,
    accent: 'accent-blue',
    path: '/attendance'
  },
  {
    id: 'reimbursement',
    title: 'Reimbursement',
    icon: DollarSign,
    accent: 'accent-gray',
    path: '/reimbursement'
  },
  {
    id: 'logout',
    title: 'Exit',
    icon: LogOut,
    accent: 'accent-red',
    path: '/logout'
  },
  {
    id: 'hr-policy',
    title: 'HR Policy',
    icon: ScrollText,
    accent: 'accent-green',
    path: '/hr-policy'
  },
  {
    id: 'it-declaration',
    title: 'IT Declaration',
    icon: ClipboardList,
    accent: 'accent-blue',
    path: '/itdeclaration'
  },
  {
    id: 'pms',
    title: 'PMS',
    icon: TrendingUp,
    accent: 'accent-yellow',
    path: '/pms'
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: Folder,
    accent: 'accent-teal',
    path: '/documents'
  },
  {
    id: 'e-onboarding',
    title: 'E-Onboarding',
    icon: UserPlus,
    accent: 'accent-green',
    path: '/onboarding'
  },
  {
    id: 'attendance',
    title: 'Attendance',
    icon: CalendarCheck,
    accent: 'accent-blue',
    path: '/attendance'
  },
  {
    id: 'reimbursement',
    title: 'Reimbursement',
    icon: DollarSign,
    accent: 'accent-gray',
    path: '/reimbursement'
  },
  {
    id: 'logout',
    title: 'Exit',
    icon: LogOut,
    accent: 'accent-red',
    path: '/logout'
  },
  {
    id: 'hr-policy',
    title: 'HR Policy',
    icon: ScrollText,
    accent: 'accent-green',
    path: '/hr-policy'
  },
  {
    id: 'it-declaration',
    title: 'IT Declaration',
    icon: ClipboardList,
    accent: 'accent-blue',
    path: '/itdeclaration'
  },
  {
    id: 'pms',
    title: 'PMS',
    icon: TrendingUp,
    accent: 'accent-yellow',
    path: '/pms'
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: Folder,
    accent: 'accent-teal',
    path: '/documents'
  }
];

  return (
    <div className="dashboard-page">
      

  <div className="dashboard-surface">
        <div className="page-header mb-6">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="page-title text-2xl font-bold">Features</h1>
            </div>
          </div>
        </div>
    
    {/* Services Grid */}
    <div className="services-grid">
      
      {navigationItems.map((item) => {
        const IconComponent = item.icon
        return (
          <Link
            to={item.path}
            key={item.id}
            className="service-card group"
          >
            <div className="service-inner">

                <div className={`service-icon-tile ${item.accent}`}>
                  <IconComponent className={`service-icon w-7 h-7`} />
                </div>

                <p className="service-label">{item.title}</p>
              
            </div>
          </Link>
        )
      })}
    </div>
  </div>
</div>

    
  )
}

export default DashboardPage
