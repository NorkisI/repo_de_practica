const API_URL = 'https://repo-de-practica.onrender.com/api/auth';

// Mostrar mensajes
function showMessage(text, type = 'success') {
  const messageEl = document.getElementById('message');
  if (!messageEl) return;
  
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.classList.remove('hidden');
  
  setTimeout(() => {
    messageEl.classList.add('hidden');
  }, 5000);
}

// Guardar/Limpiar sesión
function saveSession(user, token) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  updateUI();
}

function clearSession() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  updateUI();
}

function getSession() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return { user: user ? JSON.parse(user) : null, token };
}

// Actualizar UI según sesión
function updateUI() {
  const { user } = getSession();
  
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const authSection = document.getElementById('authSection');
    const userSection = document.getElementById('userSection');
    
    if (user) {
      authSection?.classList.add('hidden');
      userSection?.classList.remove('hidden');
      document.getElementById('userName').textContent = user.name;
      document.getElementById('userEmail').textContent = user.email;
      document.getElementById('userRole').textContent = user.level === 'admin' ? 'Administrador 👑' : 'Usuario 👤';
    } else {
      authSection?.classList.remove('hidden');
      userSection?.classList.add('hidden');
    }
  }
}

// Registrar usuario
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      level: document.getElementById('level').value
    };
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage(data.message, 'success');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (error) {
      showMessage('Error de conexión', 'error');
    }
  });
}

// Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        saveSession(data.user, data.token);
        showMessage(data.message, 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (error) {
      showMessage('Error de conexión', 'error');
    }
  });
}

// Logout
if (document.getElementById('btnLogout')) {
  document.getElementById('btnLogout').addEventListener('click', () => {
    clearSession();
    showMessage('Sesión cerrada', 'success');
  });
}

// Navegación
if (document.getElementById('btnLogin')) {
  document.getElementById('btnLogin').addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

if (document.getElementById('btnRegister')) {
  document.getElementById('btnRegister').addEventListener('click', () => {
    window.location.href = 'register.html';
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', updateUI);