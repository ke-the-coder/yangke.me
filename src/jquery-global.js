import $ from 'jquery';

// Bootstrap 3's plugins look for a global jQuery at import time, so it has to be
// on `window` before `import 'bootstrap'` runs. Keeping it in its own module
// guarantees that ordering, since ES imports evaluate in declaration order.
window.jQuery = window.$ = $;

export default $;
