// Inline, render-blocking script that sets the theme BEFORE paint so there's no
// flash of the wrong theme. Dark is the default per the house style; a saved
// preference in localStorage wins. Mirrors the front-end clone pattern.
export default function ThemeScript() {
  const js = `(function(){try{
    var saved = localStorage.getItem('wc-theme');
    var theme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }catch(e){
    document.documentElement.setAttribute('data-theme','dark');
  }
  // Marks that JS is live so the reveal animation can hide-then-reveal.
  // Without this class, .reveal content stays visible (fail-open).
  document.documentElement.classList.add('js-ready');
  })();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
