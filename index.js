/**
 * TuniTalk - Script de validation pour inscription et connexion
 */

// Fonction de validation d'email
function validateEmail(email) {
    // Expression régulière pour valider le format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Fonction de validation de formulaire d'inscription
  function validateRegisterForm(event) {
    event.preventDefault();
    
    // Récupération des éléments du formulaire
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    
    // Récupération des valeurs
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsChecked = termsCheckbox.checked;
    
    // Supprimer les erreurs précédentes
    clearErrors();
    
    // Validation du pseudo
    if (username === '') {
      showError('Veuillez entrer un pseudo', usernameInput);
      return false;
    }
    
    // Validation de l'email
    if (email === '') {
      showError('Veuillez entrer une adresse email', emailInput);
      return false;
    }
    
    if (!validateEmail(email)) {
      showError('Veuillez entrer une adresse email valide', emailInput);
      return false;
    }
    
    // Validation du mot de passe
    if (password === '') {
      showError('Veuillez entrer un mot de passe', passwordInput);
      return false;
    }
    
    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      showError('Le mot de passe doit contenir au moins 8 caractères', passwordInput);
      return false;
    }
    
    // Vérification de la complexité du mot de passe (au moins une lettre minuscule et un chiffre)
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      showError('Le mot de passe doit contenir au moins une lettre minuscule et un chiffre', passwordInput);
      return false;
    }
    
    // Vérification de la confirmation du mot de passe
    if (password !== confirmPassword) {
      showError('Les mots de passe ne correspondent pas', confirmPasswordInput);
      return false;
    }
    
    // Vérification des conditions d'utilisation
    if (!termsChecked) {
      showError('Vous devez accepter les conditions d\'utilisation', termsCheckbox);
      return false;
    }
    
    // Si tout est valide, inscription réussie
    saveUserData(username, email, password);
    showSuccess('Inscription réussie! Redirection vers la page de connexion...');
    
    // Redirection vers la page de connexion après 2 secondes
    setTimeout(function() {
      window.location.href = 'login.html';
    }, 2000);
    
    return true;
  }
  
  // Fonction de validation de formulaire de connexion
  function validateLoginForm(event) {
    event.preventDefault();
    
    // Récupération des valeurs
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Supprimer les erreurs précédentes
    clearErrors();
    
    // Validation de l'email
    if (email === '') {
      showError('Veuillez entrer votre adresse email', emailInput);
      return false;
    }
    
    if (!validateEmail(email)) {
      showError('Format d\'email invalide', emailInput);
      return false;
    }
    
    // Validation du mot de passe
    if (password === '') {
      showError('Veuillez entrer votre mot de passe', passwordInput);
      return false;
    }
    
    // Vérification des identifiants (simulée)
    if (!checkCredentials(email, password)) {
      showError('Email ou mot de passe incorrect');
      return false;
    }
    
    // Si tout est valide, connexion réussie
    showSuccess('Connexion réussie! Redirection vers l\'accueil...');
    
    // Redirection vers l'accueil après 2 secondes
    setTimeout(function() {
      window.location.href = 'home.html';
    }, 2000);
    
    return true;
  }
  
  // Afficher un message d'erreur
  function showError(message, field = null) {
    // Si un champ spécifique est fourni, appliquer le style d'erreur à ce champ
    if (field) {
      field.classList.add("error");
      
      // Vérifier si un message d'erreur existe déjà pour ce champ
      const parent = field.closest(".form-group");
      const existingErrorText = parent.querySelector(".error-text");
      
      if (existingErrorText) {
        existingErrorText.textContent = message;
      } else {
        const errorElement = document.createElement("small");
        errorElement.classList.add("error-text");
        errorElement.innerText = message;
        parent.appendChild(errorElement);
      }
    } 
    // Sinon afficher une alerte générale
    else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'alert alert-error';
      errorDiv.textContent = message;
      
      // Ajouter le message au formulaire
      const form = document.querySelector('.auth-form');
      const title = document.querySelector('.auth-card h1');
      
      // Supprimer les messages d'erreur précédents
      const existingAlert = document.querySelector('.alert');
      if (existingAlert) {
        existingAlert.remove();
      }
      
      // Insérer le message après le titre
      form.insertBefore(errorDiv, title.nextSibling);
      
      // Faire disparaître après 3 secondes
      setTimeout(function() {
        errorDiv.style.opacity = '0';
        setTimeout(function() {
          errorDiv.remove();
        }, 300);
      }, 3000);
    }
  }
  
  // Afficher un message de succès
  function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.textContent = message;
    
    // Ajouter le message au formulaire
    const form = document.querySelector('.auth-form');
    const title = document.querySelector('.auth-card h1');
    
    // Supprimer les messages précédents
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // Insérer le message après le titre
    form.insertBefore(successDiv, title.nextSibling);
  }
  
  // Simuler le stockage des données utilisateur (utilisation de localStorage)
  function saveUserData(username, email, password) {
    // Dans une vraie application, ces données seraient envoyées à un serveur
    // Ici, on utilise localStorage pour la démonstration
    const userData = {
      username: username,
      email: email,
      password: password, // En production, ne jamais stocker les mots de passe en clair!
      createdAt: new Date().toISOString()
    };
    
    // Récupérer les utilisateurs existants ou initialiser un tableau vide
    let users = JSON.parse(localStorage.getItem('tunitalk_users') || '[]');
    
    // Ajouter le nouvel utilisateur
    users.push(userData);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('tunitalk_users', JSON.stringify(users));
  }
  
  // Vérifier les identifiants (simulé avec localStorage)
  function checkCredentials(email, password) {
    // Récupérer les utilisateurs
    const users = JSON.parse(localStorage.getItem('tunitalk_users') || '[]');
    
    // Chercher l'utilisateur avec l'email correspondant
    const user = users.find(user => user.email === email);
    
    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (user && user.password === password) {
      // Stocker l'utilisateur connecté
      localStorage.setItem('tunitalk_current_user', JSON.stringify(user));
      return true;
    }
    
    return false;
  }
  
  // Ajouter la fonctionnalité de toggle pour la visibilité du mot de passe
  function setupPasswordToggle() {
    // Ajouter un bouton de toggle pour le mot de passe
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
      // Créer le bouton de toggle
      const toggleBtn = document.createElement('i');
      toggleBtn.className = 'fas fa-eye';
      toggleBtn.style.position = 'absolute';
      toggleBtn.style.right = '10px';
      toggleBtn.style.top = '50%';
      toggleBtn.style.transform = 'translateY(-50%)';
      toggleBtn.style.cursor = 'pointer';
      toggleBtn.style.color = '#666';
      
      // Envelopper le champ de mot de passe dans un div pour le positionnement relatif
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      
      // Placer le champ et le bouton dans le wrapper
      field.parentNode.insertBefore(wrapper, field);
      wrapper.appendChild(field);
      wrapper.appendChild(toggleBtn);
      
      // Ajouter l'écouteur d'événement pour le toggle
      toggleBtn.addEventListener('click', function() {
        if (field.type === 'password') {
          field.type = 'text';
          toggleBtn.className = 'fas fa-eye-slash';
        } else {
          field.type = 'password';
          toggleBtn.className = 'fas fa-eye';
        }
      });
    });
  }
  
  // Supprimer tous les messages d'erreur
  function clearErrors() {
    // Supprimer les classes d'erreur des champs
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    
    // Supprimer tous les messages d'erreur
    document.querySelectorAll('.error-text').forEach(errorText => errorText.remove());
    
    // Supprimer les alertes
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
  }
  
  // Initialiser les formulaires au chargement de la page
  document.addEventListener('DOMContentLoaded', function() {
    // Détecter si nous sommes sur la page d'inscription ou de connexion
    const form = document.querySelector('.auth-form');
    
    if (form) {
      // Vérifier la page actuelle
      const isRegisterPage = window.location.href.includes('register');
      const isLoginPage = window.location.href.includes('login');
      
      // Configurer la validation du formulaire
      if (isRegisterPage) {
        form.addEventListener('submit', validateRegisterForm);
      } else if (isLoginPage) {
        form.addEventListener('submit', validateLoginForm);
      }
      
      // Configurer le toggle de mot de passe
      setupPasswordToggle();
      
      // Ajouter des validations en temps réel sur les champs de saisie
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          // Supprimer la classe d'erreur quand l'utilisateur corrige l'entrée
          this.classList.remove('error');
          const errorText = this.closest('.form-group').querySelector('.error-text');
          if (errorText) {
            errorText.remove();
          }
        });
      });
    }
  });
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.auth-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;

            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas.");
                return;
            }

            if (!termsAccepted) {
                alert("Veuillez accepter les conditions d'utilisation.");
                return;
            }

            // Simulate successful registration (replace with actual backend logic)
            alert('Inscription réussie !');
            window.location.href = 'home.html';
        });
    }
    const loginForm = document.querySelector('.auth-form.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Simulate login validation (replace with real logic later)
            if (email  && password ) {
                alert('Connexion réussie !');
                window.location.href = 'home.html';
            } else {
                alert('Email ou mot de passe incorrect.');
            }
        });
    }
});
