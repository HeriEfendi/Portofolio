/**
 * Ahmad Heri Efendi - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastNotice');
  const contactForm = document.getElementById('contactForm');

  // 1. Navbar Scroll Style
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll spy
    const sections = document.querySelectorAll('section[id], div[id="hero"]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Nav Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    // Close mobile nav when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      }
    });
  }

  // 3. Project Filter Tabs
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 4. Toast Helper
  const showToast = (message) => {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-text');
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  // 5. Copy to Clipboard
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Tersalin ke clipboard: ${textToCopy}`);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Tersalin ke clipboard: ${textToCopy}`);
      }
    });
  });

  // 6. Interactive WhatsApp / Contact Form Handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput')?.value.trim() || '';
      const subject = document.getElementById('subjectInput')?.value.trim() || '';
      const message = document.getElementById('messageInput')?.value.trim() || '';

      if (!name || !message) {
        alert('Mohon lengkapi nama dan pesan Anda.');
        return;
      }

      // Format WhatsApp Message
      const targetPhone = '6285755137816';
      const formattedText = `Halo Mas Ahmad Heri Efendi,\n\nNama: ${name}\nPerihal: ${subject || 'Diskusi Kerja / Proyek'}\n\nPesan:\n${message}\n\n(Terkirim melalui Portfolio Website)`;
      const encodedText = encodeURIComponent(formattedText);
      const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

      window.open(waUrl, '_blank');
      showToast('Membuka WhatsApp untuk mengirim pesan...');
      contactForm.reset();
    });
  }
});
