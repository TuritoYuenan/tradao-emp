// Import CSS files here for hot module reloading to work.
import './assets/styles.css';
import 'beercss';
import 'material-dynamic-colors';

ui('mode', 'auto');
await ui('theme', getComputedStyle(document.body).getPropertyValue('--green').trim() || 'blue');
