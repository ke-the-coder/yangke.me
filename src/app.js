import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';
import './custom.css';

// Collapse and scrollspy wire themselves up from the markup's data-bs-*
// attributes, so importing the two plugins is all the setup they need.

/*** mini top ***/
const header = document.querySelector('header');

if (header) {
    document.addEventListener('scroll', () => {
        header.classList.toggle('mini-top', window.scrollY > 100);
    }, { passive: true });
}
