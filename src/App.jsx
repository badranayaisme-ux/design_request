import React, { useState, useEffect } from 'react';
import { 
  Terminal, ShieldCheck, Palette, Plus, LayoutGrid, 
  History, User, CheckCircle2, Clock, ChevronRight,
  LogOut, Layers, Sparkles, AlertCircle
} from 'lucide-react';

// --- Konfigurasi & Data Dummy ---
const ADMIN_CREDENTIALS = { user: 'awal', pass: 'udin2026' };

const INITIAL_REQUESTS = [
  { id: 1, title: 'LOGO QUANTUM', type: 'BRANDING', status: 'SELESAI', date: '12 FEB', desc: 'Gaya teknologi minimalis dengan aksen neon.', requester: 'Budi Santoso', budget: 'Rp 500rb', usage: 'CETAK' },
  { id: 2, title: 'POSTER CYBER', type: 'MOTION', status: 'AKTIF', date: '14 FEB', desc: 'Gaya retro-futuristik dengan efek glitch.', requester: 'Client Demo', budget: 'Rp 200rb', usage: 'DIGITAL' }
];

// --- Komponen Utilitas UI ---

const GlassCard = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-5 shadow-xl ${className}`}
  >
    {children}
  </div>
);

const GradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const Button = ({ children, onClick, variant = 'primary', className = "" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/20 text-white",
    success: "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/20 text-white",
    ghost: "bg-transparent text-slate-400 hover:text-white border border-white/5",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
  };

  return (
    <button 
      onClick={onClick}
      className={`w-full py-4 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase shadow-lg active:scale-95 transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>}
    <input 
      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
      {...props}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>}
    <select 
      className="w-full p-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-colors text-sm appearance-none"
      {...props}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// --- Halaman & Fitur ---

const Gate = ({ onSelectRole }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in px-4">
    <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/30 rotate-3 animate-pulse-slow">
      <Terminal size={40} className="text-white" />
    </div>
    <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
      <GradientText>DESIGNCORE</GradientText>
    </h1>
    <p className="text-[10px] text-slate-500 font-bold tracking-[0.4em] uppercase mb-12">Portal Akses Protokol v3.0</p>
    
    <div className="space-y-4 w-full max-w-sm">
      <GlassCard onClick={() => onSelectRole('client')} className="flex items-center justify-between group cursor-pointer hover:border-emerald-500/50 transition-all">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
            <Palette size={20} />
          </div>
          <div>
            <p className="text-xs font-black italic uppercase text-slate-200">Akses Client</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Ajukan & Pantau</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
      </GlassCard>

      <GlassCard onClick={() => onSelectRole('login')} className="flex items-center justify-between group cursor-pointer hover:border-indigo-500/50 transition-all">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-black italic uppercase text-slate-200">Terminal Admin</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Manajemen Inti</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-500 transition-colors" />
      </GlassCard>
    </div>
  </div>
);

const Login = ({ onLogin, onBack }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (user.toLowerCase() === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-slide-up">
      <GlassCard className={`w-full max-w-sm p-8 border-indigo-500/30 ${error ? 'border-red-500 animate-shake' : ''}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-xl font-black italic text-white">ADMIN LOGIN</h2>
          <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-2">Verifikasi Protokol</p>
        </div>
        
        <div className="space-y-4">
          <Input 
            placeholder="USERNAME" 
            value={user} 
            onChange={e => setUser(e.target.value)} 
            className="text-center tracking-widest uppercase"
          />
          <Input 
            type="password" 
            placeholder="PASSWORD" 
            value={pass} 
            onChange={e => setPass(e.target.value)} 
            className="text-center tracking-widest"
          />
          <Button onClick={handleSubmit} className="mt-4">Verifikasi</Button>
          <button onClick={onBack} className="w-full text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-white mt-4">
            Batalkan
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

const Dashboard = ({ role, requests, onViewChange }) => {
  const isClient = role === 'client';
  const filteredRequests = isClient 
    ? requests.filter(r => r.requester.toLowerCase().includes('client') || r.requester === 'Anda') 
    : requests;
  
  const activeCount = filteredRequests.filter(r => r.status === 'AKTIF').length;

  return (
    <div className="animate-fade-in pb-24">
      {/* Hero Stats */}
      <GlassCard className={`mb-8 relative overflow-hidden ${isClient ? 'border-emerald-500/20' : 'border-blue-500/20'}`}>
        <div className={`absolute -right-10 -top-10 w-40 h-40 blur-3xl rounded-full opacity-20 ${isClient ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
        <div className="relative z-10">
          <h3 className={`text-xs font-bold tracking-[0.2em] mb-1 uppercase ${isClient ? 'text-emerald-400' : 'text-blue-400'}`}>
            {isClient ? 'Proyek Anda' : 'Total Protokol'}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black italic tracking-tighter text-white">{activeCount.toString().padStart(2, '0')}</p>
            <span className="text-xs text-slate-500 font-bold uppercase">Aktif</span>
          </div>
          
          {isClient && (
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
              <button onClick={() => onViewChange('add')} className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-3 py-2 rounded-lg hover:bg-emerald-500/20 transition-colors">
                <Plus size={12} /> Request Baru
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Recent List */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">Aktivitas Terkini</h3>
        <LayoutGrid size={14} className="text-slate-600" />
      </div>

      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.slice().reverse().map(req => (
            <ProjectCard key={req.id} data={req} role={role} simple />
          ))
        ) : (
          <div className="text-center py-10 text-slate-600 text-xs uppercase tracking-widest">
            Tidak ada data protokol
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ data, role, onToggleStatus, simple = false }) => {
  const isComplete = data.status === 'SELESAI';
  const statusColor = isComplete ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

  return (
    <GlassCard className="group hover:border-slate-600/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <button 
            onClick={() => role === 'admin' && !simple && onToggleStatus(data.id)}
            disabled={role !== 'admin' || simple}
            className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest border flex items-center gap-2 ${statusColor} ${role === 'admin' && !simple ? 'cursor-pointer hover:bg-white/5' : ''}`}
          >
            {isComplete ? <CheckCircle2 size={10} /> : <Clock size={10} />}
            {data.status}
          </button>
          {!simple && (
            <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest border border-white/10 text-slate-400 flex items-center gap-1">
              {data.usage === 'CETAK' ? 'PRT' : 'WEB'}
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-600 font-bold">{data.date}</span>
      </div>
      
      <h4 className="text-lg font-bold uppercase italic tracking-tight text-slate-200 group-hover:text-white transition-colors">
        {data.title}
      </h4>
      
      {!simple && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
            <User size={10} /> {data.requester}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{data.desc}</p>
          <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-3">
             <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">{data.type}</span>
             <span className="text-[10px] text-emerald-400 font-bold">{data.budget}</span>
          </div>
        </div>
      )}

      {simple && (
         <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{data.type}</span>
            <span className="text-[10px] text-slate-400 font-bold">{data.budget || '-'}</span>
         </div>
      )}
    </GlassCard>
  );
};

const ProjectForm = ({ role, onSubmit }) => {
  const [form, setForm] = useState({ requester: '', title: '', type: 'BRANDING', budget: '', desc: '', usage: 'DIGITAL' });

  const handleSubmit = () => {
    if (!form.title || !form.desc) return; // Simple validation
    onSubmit(form);
  };

  return (
    <div className="animate-fade-in pb-24">
      <h2 className="text-2xl font-black mb-6 italic uppercase tracking-tighter text-white">
        {role === 'admin' ? 'Catat Pesanan' : 'Ajukan Desain'}
      </h2>
      <div className="space-y-5">
        <Input 
          label="Nama Pemohon"
          placeholder="MISAL: BUDI SANTOSO"
          value={form.requester}
          onChange={e => setForm({...form, requester: e.target.value})}
        />
        <Input 
          label="Judul Proyek"
          placeholder="MISAL: LOGO CAFE"
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
           <Select 
            label="Kategori"
            options={['BRANDING', 'SOCIAL MEDIA', 'UI/UX', 'PRINTING']}
            value={form.type}
            onChange={e => setForm({...form, type: e.target.value})}
          />
           <Select 
            label="Peruntukan"
            options={['DIGITAL', 'CETAK']}
            value={form.usage}
            onChange={e => setForm({...form, usage: e.target.value})}
          />
        </div>
        <Input 
          label="Estimasi Budget"
          placeholder="MISAL: 500rb"
          value={form.budget}
          onChange={e => setForm({...form, budget: e.target.value})}
        />
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Brief Lengkap</label>
          <textarea 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors text-sm h-32"
            placeholder="Deskripsikan detail desain..."
            value={form.desc}
            onChange={e => setForm({...form, desc: e.target.value})}
          />
        </div>
        <Button 
          variant={role === 'admin' ? 'primary' : 'success'} 
          onClick={handleSubmit}
          className="mt-4"
        >
          Kirim Data
        </Button>
      </div>
    </div>
  );
};

const ProjectHistory = ({ role, requests, onToggleStatus }) => {
  const isClient = role === 'client';
  const filteredRequests = isClient 
  ? requests.filter(r => r.requester.toLowerCase().includes('client') || r.requester === 'Anda') 
  : requests;

  return (
    <div className="animate-fade-in pb-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Arsip Proyek</h3>
        <span className="text-[10px] font-bold text-slate-500 border border-white/10 px-3 py-1 rounded-full">{filteredRequests.length} ITEM</span>
      </div>
      <div className="space-y-4">
        {filteredRequests.map(req => (
          <ProjectCard key={req.id} data={req} role={role} onToggleStatus={onToggleStatus} />
        ))}
        {filteredRequests.length === 0 && <p className="text-center text-slate-600 text-xs py-10">Arsip Kosong</p>}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [role, setRole] = useState(null); // 'admin' | 'client' | null
  const [view, setView] = useState('gate'); // 'gate' | 'login' | 'home' | 'add' | 'history'
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [toast, setToast] = useState(null);

  // --- Handlers ---

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRoleSelection = (selectedRole) => {
    if (selectedRole === 'login') {
      setView('login');
    } else {
      setRole('client');
      setView('home');
    }
  };

  const handleLogin = () => {
    setRole('admin');
    setView('home');
    showToast('Akses Admin Diterima');
  };

  const handleLogout = () => {
    if (window.confirm('Akhiri sesi saat ini?')) {
      setRole(null);
      setView('gate');
    }
  };

  const handleAddRequest = (formData) => {
    const newRequest = {
      id: Date.now(),
      ...formData,
      status: 'AKTIF',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }).toUpperCase(),
      requester: formData.requester || (role === 'client' ? 'Anda' : 'Anonymous')
    };
    setRequests([...requests, newRequest]);
    setView('history');
    showToast('Proyek Berhasil Ditambahkan');
  };

  const toggleRequestStatus = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: req.status === 'SELESAI' ? 'AKTIF' : 'SELESAI' } : req
    ));
    showToast('Status Diperbarui');
  };

  // --- Render Helpers ---

  const renderContent = () => {
    switch (view) {
      case 'home': return <Dashboard role={role} requests={requests} onViewChange={setView} />;
      case 'add': return <ProjectForm role={role} onSubmit={handleAddRequest} />;
      case 'history': return <ProjectHistory role={role} requests={requests} onToggleStatus={toggleRequestStatus} />;
      default: return null;
    }
  };

  // --- Base Layout ---

  if (view === 'gate') return <div className="bg-slate-950 min-h-screen text-slate-200 font-sans p-6 flex flex-col justify-center"><Gate onSelectRole={handleRoleSelection} /></div>;
  if (view === 'login') return <div className="bg-slate-950 min-h-screen text-slate-200 font-sans p-6 flex flex-col justify-center"><Login onLogin={handleLogin} onBack={() => setView('gate')} /></div>;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans relative overflow-hidden flex flex-col max-w-md mx-auto shadow-2xl shadow-black">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-20%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-20%] w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="p-6 flex justify-between items-center sticky top-0 z-30 backdrop-blur-md bg-slate-950/70 border-b border-white/5">
        <div>
          <h1 className="text-xl font-black tracking-tighter italic">
            <GradientText>DESIGNCORE</GradientText>
          </h1>
          <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase">Sistem v3.0</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-2 py-1 rounded-md border text-[8px] font-bold tracking-widest uppercase ${role === 'admin' ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'}`}>
            {role === 'admin' ? 'ADMIN MODE' : 'CLIENT'}
          </div>
          <button onClick={handleLogout} className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 transition-all">
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-6 scrollbar-hide">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto backdrop-blur-xl bg-slate-900/80 border-t border-white/5 px-6 py-4 rounded-t-[32px] flex justify-around items-center z-40">
        <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'home' ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}>
          <LayoutGrid size={20} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Utama</span>
        </button>
        
        <button onClick={() => setView('add')} className="relative -top-8 group">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform transition-all group-active:scale-95 border-2 border-slate-900 ${role === 'admin' ? 'bg-indigo-500 shadow-indigo-500/40 text-white' : 'bg-emerald-500 shadow-emerald-500/40 text-white'}`}>
            <Plus size={24} />
          </div>
        </button>

        <button onClick={() => setView('history')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'history' ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}>
          {role === 'admin' ? <Layers size={20} /> : <History size={20} />}
          <span className="text-[9px] font-bold uppercase tracking-widest">{role === 'admin' ? 'Arsip' : 'Proyek'}</span>
        </button>
      </nav>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-full shadow-2xl animate-bounce-in z-50 whitespace-nowrap">
          <Sparkles size={14} className="text-yellow-400" />
          <span className="text-xs font-bold tracking-wide uppercase">{toast}</span>
        </div>
      )}

      {/* Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;900&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-shake { animation: shake 0.4s linear; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
      `}</style>
    </div>
  );
}