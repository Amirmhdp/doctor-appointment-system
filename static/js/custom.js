const iconSidebar = document.getElementById('icon-sidebar');
const iconCloseSidebar = document.getElementById('close-sidebar-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;

iconSidebar.addEventListener('click', () => {
    sidebar.classList.remove('translate-x-full');
    sidebar.classList.add('translate-x-0');
    body.style.overflow = 'hidden'

    overlay.classList.remove('opacity-0', 'invisible');
    overlay.classList.add('opacity-100', 'visible');
});

iconCloseSidebar.addEventListener('click', () => {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('translate-x-full');
    body.style.overflow = 'auto'


    overlay.classList.remove('opacity-100', 'visible');
    overlay.classList.add('opacity-0', 'invisible');
});
overlay.addEventListener('click',()=>{
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('translate-x-full');
    body.style.overflow = 'auto'


    overlay.classList.remove('opacity-100', 'visible');
    overlay.classList.add('opacity-0', 'invisible');
})



const openFastLink = document.getElementById('open-fast-link');
const listFastLink = document.getElementById('list-fast-link');

openFastLink.addEventListener('click', () => {
    listFastLink.classList.toggle('max-h-0');
    listFastLink.classList.toggle('max-h-[500px]');

    listFastLink.classList.toggle('opacity-0');
    listFastLink.classList.toggle('opacity-100');
});

