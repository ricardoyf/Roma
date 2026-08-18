(function(){
  function init(){
    const select=document.getElementById('category');
    if(!select || document.getElementById('categoryButton')) return;

    const button=document.createElement('button');
    button.id='categoryButton';
    button.type='button';
    button.className='category-button';
    select.insertAdjacentElement('beforebegin',button);
    select.classList.add('native-category-hidden');

    const modal=document.createElement('div');
    modal.id='categoryModal';
    modal.className='category-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="category-panel"><div class="category-title">Elige vocabulario</div><div class="category-options" id="categoryOptions"></div><button type="button" class="category-close" id="categoryClose">Cancelar</button></div>';
    document.body.appendChild(modal);

    const optionsBox=modal.querySelector('#categoryOptions');
    const close=modal.querySelector('#categoryClose');

    function label(){
      const opt=select.options[select.selectedIndex];
      button.textContent=(opt?opt.textContent:'Todas')+' ▾';
    }

    function build(){
      optionsBox.innerHTML='';
      [...select.options].forEach(opt=>{
        const b=document.createElement('button');
        b.type='button';
        b.className='category-option'+(opt.value===select.value?' current':'');
        b.textContent=opt.textContent;
        b.dataset.value=opt.value;
        optionsBox.appendChild(b);
      });
      label();
    }

    function open(){build();modal.classList.add('show');modal.setAttribute('aria-hidden','false');}
    function hide(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');}

    button.addEventListener('click',open);
    close.addEventListener('click',hide);
    modal.addEventListener('click',e=>{if(e.target===modal) hide();});
    optionsBox.addEventListener('click',e=>{
      const b=e.target.closest('.category-option');
      if(!b) return;
      select.value=b.dataset.value;
      select.dispatchEvent(new Event('change',{bubbles:true}));
      label();
      hide();
    });
    select.addEventListener('change',label);
    new MutationObserver(()=>{label();}).observe(select,{childList:true,subtree:true});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') hide();});
    label();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
