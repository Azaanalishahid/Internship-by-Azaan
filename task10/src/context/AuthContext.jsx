import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS_DB = [
  {
    name: 'Muhammad',
    email: 'muhammad@careerconnect.com',
    password: 'password123',
    avatar: '/images/avatar.jpg',
    role: 'candidate',
    title: 'Senior React Developer & Tech Lead',
    location: 'San Francisco, CA',
    completion: 85,
    phone: '+1 (555) 234-5678',
    country: 'United States',
    github: 'github.com/muhammad-dev',
    linkedin: 'linkedin.com/in/muhammad-tech',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'System Architecture', level: 88 }
    ],
    experience: [
      { role: 'Senior React Engineer', company: 'TechCorp Inc.', duration: '2024 - Present' }
    ]
  },
  {
    name: 'Sarah Jenkins',
    email: 'sarah@google.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'employer',
    title: 'Principal Talent Recruiter at Google',
    location: 'Mountain View, CA',
    completion: 100,
    phone: '+1 (555) 888-9999',
    country: 'United States',
    skills: [{ name: 'Talent Acquisition', level: 98 }],
    experience: [{ role: 'Lead Recruiter', company: 'Google', duration: '2020 - Present' }]
  }
];

export const AuthProvider = ({ children }) => {
  // Simulated persistent User Database Table
  const [usersDB, setUsersDB] = useState(() => {
    const savedDB = localStorage.getItem('careerconnect_users_db');
    return savedDB ? JSON.parse(savedDB) : DEFAULT_USERS_DB;
  });

  // Active Session User (defaults to null if not logged in)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('careerconnect_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('careerconnect_lang') || 'EN';
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('careerconnect_saved_jobs');
    return saved ? JSON.parse(saved) : [1, 3, 5];
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    const applied = localStorage.getItem('careerconnect_applied_jobs');
    return applied ? JSON.parse(applied) : [
      { id: 1, title: 'Senior React & Frontend Architect', company: 'Google', date: '2026-08-01', status: 'Interviewing' },
      { id: 2, title: 'Senior UI/UX Product Designer', company: 'Meta', date: '2026-07-28', status: 'Shortlisted' },
      { id: 3, title: 'Lead Cloud Infrastructure Engineer', company: 'Amazon', date: '2026-07-20', status: 'Under Review' }
    ];
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Interview Scheduled', msg: 'Google tech recruiter scheduled your Systems Interview for Aug 10.', time: '2 hours ago', unread: true },
    { id: 2, title: 'Application Shortlisted', msg: 'Meta team shortlisted your application for Product Designer!', time: '1 day ago', unread: true },
    { id: 3, title: 'Profile View', msg: '3 executive recruiters from Netflix viewed your profile today.', time: '2 days ago', unread: false }
  ]);

  const [messages, setMessages] = useState([
    { id: 101, sender: 'Google Talent Team', text: 'Hi Muhammad, we reviewed your React portfolio and would love to connect!', time: '10:30 AM', online: true },
    { id: 102, sender: 'Meta Recruiting', text: 'Thanks for sending over your updated resume PDF.', time: 'Yesterday', online: false }
  ]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('careerconnect_dark') === 'true';
  });

  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('careerconnect_dark', darkMode);
  }, [darkMode]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('careerconnect_lang', lang);
    addToast(`Language changed to ${lang}`);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // REGISTER: Insert user into Database Table
  const registerUser = (userData) => {
    const existing = usersDB.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      addToast(`Error: ${userData.email} is already registered. Please log in.`);
      return { success: false, error: 'Email is already registered in database.' };
    }

    const newUserRecord = {
      ...userData,
      avatar: userData.avatar || '/images/avatar.jpg',
      completion: 80,
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Problem Solving', level: 92 }
      ],
      experience: [
        { role: 'Software Engineer', company: 'Tech Startup', duration: '2024 - Present' }
      ]
    };

    const updatedDB = [...usersDB, newUserRecord];
    setUsersDB(updatedDB);
    localStorage.setItem('careerconnect_users_db', JSON.stringify(updatedDB));

    addToast(`Account created for ${userData.name}! Please log in with your password.`);
    return { success: true };
  };

  // LOGIN: Validate credentials against Database Table
  const login = (email, password) => {
    const foundUser = usersDB.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      addToast(`Error: User ${email} not found. Please register first.`);
      return { success: false, error: 'User account not found. Please register.' };
    }

    if (foundUser.password !== password) {
      addToast(`Error: Incorrect password for ${email}.`);
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    // Credentials match -> Create active session
    setUser(foundUser);
    localStorage.setItem('careerconnect_user', JSON.stringify(foundUser));
    addToast(`Welcome back, ${foundUser.name}! Logged in successfully.`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careerconnect_user');
    addToast('Logged out successfully.');
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const isSaved = prev.includes(jobId);
      const updated = isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId];
      localStorage.setItem('careerconnect_saved_jobs', JSON.stringify(updated));
      addToast(isSaved ? 'Job removed from saved items' : 'Job saved to your bookmarks!');
      return updated;
    });
  };

  const applyForJob = (job) => {
    if (appliedJobs.some(j => j.id === job.id)) {
      addToast(`Already applied for ${job.title} at ${job.company}`);
      return;
    }
    const newApplication = {
      id: job.id,
      title: job.title,
      company: job.company,
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review'
    };
    const updated = [newApplication, ...appliedJobs];
    setAppliedJobs(updated);
    localStorage.setItem('careerconnect_applied_jobs', JSON.stringify(updated));
    addToast(`Application submitted successfully for ${job.title}!`);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    addToast('Notifications marked as read.');
  };

  return (
    <AuthContext.Provider value={{
      user,
      usersDB,
      login,
      registerUser,
      logout,
      language,
      changeLanguage,
      savedJobs,
      toggleSaveJob,
      appliedJobs,
      applyForJob,
      notifications,
      markAllNotificationsRead,
      notifDrawerOpen,
      setNotifDrawerOpen,
      messages,
      darkMode,
      toggleDarkMode,
      addToast
    }}>
      {children}
      {/* Global Toast Alert Render */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span>✨</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
