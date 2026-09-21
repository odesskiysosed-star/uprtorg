document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.navigation');
if(toggle&&navigation){
  const closeMenu=()=>{navigation.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Відкрити меню');};
  toggle.addEventListener('click',()=>{const open=navigation.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('is-open')){closeMenu();toggle.focus();}});
  navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
}
document.querySelectorAll('[data-print]').forEach(button=>button.addEventListener('click',()=>window.print()));

// A link to a service opens its document list, including links from other pages.
const revealService = () => {
  const id = location.hash.slice(1);
  const service = document.getElementById(id);
  if (service && service.matches('details.cnap-service')) {
    service.open = true;
    requestAnimationFrame(() => service.scrollIntoView({block: 'start'}));
  }
};
window.addEventListener('hashchange', revealService);
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#service-"]');
  if (anchor && anchor.hash === location.hash) revealService();
});
revealService();

const documentQuery = document.querySelector('#doc-query');
if (documentQuery) {
  const normalize = value => value.toLocaleLowerCase('uk').replace(/[’'ʼ`]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const groups = [...document.querySelectorAll('.document-group')];
  const rows = [...document.querySelectorAll('#document-results .doc-row')].map(element => ({element, text: normalize(element.textContent)}));
  documentQuery.addEventListener('input', () => {
    const words = normalize(documentQuery.value).split(' ').filter(Boolean);
    let count = 0;
    rows.forEach(({element, text}) => {
      element.hidden = !words.every(word => text.includes(word));
      if (!element.hidden) count++;
    });
    groups.forEach(group => group.hidden = ![...group.querySelectorAll('.doc-row')].some(row => !row.hidden));
    document.querySelector('#doc-count').textContent = `Знайдено: ${count}`;
    document.querySelector('#doc-empty').hidden = count > 0;
  });
}
