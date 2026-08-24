// open close sidebar
const iconSidebar = document.getElementById('icon-sidebar');
const iconCloseSidebar = document.getElementById('close-sidebar-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;
if (iconCloseSidebar && iconSidebar && sidebar && overlay) {
    iconSidebar.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-full');
        sidebar.classList.add('translate-x-0');
        body.style.overflow = 'hidden'

        overlay.classList.remove('opacity-0', 'invisible');
        overlay.classList.add('opacity-100', 'visible');
    });
}

if (iconCloseSidebar && iconSidebar && sidebar && overlay) {
    iconCloseSidebar.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('translate-x-full');
        body.style.overflow = 'auto'


        overlay.classList.remove('opacity-100', 'visible');
        overlay.classList.add('opacity-0', 'invisible');
    });
}



// open close fast link in footer
const openFastLink = document.getElementById('open-fast-link');
const listFastLink = document.getElementById('list-fast-link');

if (openFastLink && listFastLink) {
    openFastLink.addEventListener('click', () => {
        listFastLink.classList.toggle('max-h-0');
        listFastLink.classList.toggle('max-h-[500px]');

        listFastLink.classList.toggle('opacity-0');
        listFastLink.classList.toggle('opacity-100');
    });
}


// hide and show password
const togglePasswords = document.querySelectorAll('.toggle-password');

if (togglePasswords) {
    togglePasswords.forEach(togglePassword => {

        togglePassword.addEventListener('click', () => {

            const passwordInput =
                togglePassword.parentElement.querySelector('.password-input');

            if (passwordInput) {
                if (passwordInput.type === 'password') {

                    passwordInput.type = 'text';

                    togglePassword.innerHTML = `
                <i
                    data-lucide="eye"
                    class="w-11 h-11 text-slate-gray border-2 border-light-gray p-3 rounded-full">
                </i>`;

                } else {

                    passwordInput.type = 'password';

                    togglePassword.innerHTML = `
                <i
                    data-lucide="eye-off"
                    class="w-11 h-11 text-slate-gray border-2 border-light-gray p-3 rounded-full">
                </i>`;
                }
            }

            lucide.createIcons();
        });

    });
}


// dropdown search
const dropdowns = document.querySelectorAll('.dropdown');

if (dropdowns) {
    dropdowns.forEach(dropdown => {

        const button = dropdown.querySelector('.dropdown-button');
        const list = dropdown.querySelector('.dropdown-list');

        if (button && list) {
            button.addEventListener('click', (event) => {

                event.stopPropagation();

                // بستن Dropdownهای دیگر
                dropdowns.forEach(otherDropdown => {

                    if (otherDropdown !== dropdown) {

                        const otherList =
                            otherDropdown.querySelector('.dropdown-list');

                        otherList.classList.remove(
                            'opacity-100',
                            'visible'
                        );

                        otherList.classList.add(
                            'opacity-0',
                            'invisible'
                        );
                    }

                });

                // باز و بسته کردن Dropdown فعلی
                list.classList.toggle('opacity-0');
                list.classList.toggle('invisible');

                list.classList.toggle('opacity-100');
                list.classList.toggle('visible');
            });
        }
        const selectedText = dropdown.querySelector('.selected-text');
        const items = dropdown.querySelectorAll('.dropdown-item');
        if (selectedText && items) {
            items.forEach(item => {

                item.addEventListener('click', () => {


                    selectedText.textContent = item.textContent;

                    list.classList.remove(
                        'opacity-100',
                        'visible'
                    );

                    list.classList.add(
                        'opacity-0',
                        'invisible'
                    );
                });

            });
        }


    });
}
document.addEventListener('click', () => {

    dropdowns.forEach(dropdown => {

        const list = dropdown.querySelector('.dropdown-list');

        list.classList.remove(
            'opacity-100',
            'visible'
        );

        list.classList.add(
            'opacity-0',
            'invisible'
        );

    });

});


// apponent date 
const apponentDate = document.getElementById('appointment-date');
const apponentBtnDate = document.getElementById('btn-date-calendar');

if (apponentDate) {
    $('#appointment-date').persianDatepicker({
        format: 'YYYY/MM/DD',
        minDate: new persianDate().valueOf(),
    });
}
// console.log(apponentDate.textContent);

// slider for special list

const swiper = new Swiper('.special-list', {
    direction: 'horizontal',
    loop: false,

    slidesPerView: 'auto',
    spaceBetween: 16,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    observer: true,
    observeParents: true,
});


// infinite-slider

const infiniteSlider = new Swiper('.infinite-slider', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000
    },
    slidesPerView: 'auto',
    spaceBetween: 16,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    observer: true,
    observeParents: true,

});

// open searchbox
const searchIcon = document.getElementById('search');
const searchBox = document.getElementById('searchbox');
const closeIconSearchBox = document.getElementById('close-searchbox');
const searchInput = document.getElementById('search-input');
const clearInputBtn = document.getElementById('clear-input-btn');
const trendSearch = document.getElementById('trend-search');
const resultSearch = document.getElementById('result-search');
const searchedValue = document.getElementById('searched-value');

if (searchBox && searchIcon && overlay) {
    searchIcon.addEventListener('click', () => {
        searchBox.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
        searchBox.classList.add('opacity-100', 'visible', 'pointer-events-auto');
        overlay.classList.remove('opacity-0', 'invisible');
        overlay.classList.add('opacity-100', 'visible');
        body.style.overflow = 'hidden'

    })
}
if (searchBox && closeIconSearchBox) {

    closeIconSearchBox.addEventListener('click', () => {
        searchBox.classList.remove('opacity-100', 'visible' , 'pointer-events-auto');
        searchBox.classList.add('opacity-0', 'invisible', 'pointer-events-none');
        overlay.classList.remove('opacity-100', 'visible');
        overlay.classList.add('opacity-0', 'invisible');
        body.style.overflow = 'auto'

    })

}
if (iconCloseSidebar && iconSidebar && sidebar && overlay) {
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('translate-x-full');
        body.style.overflow = 'auto'
        overlay.classList.remove('opacity-100', 'visible');
        overlay.classList.add('opacity-0', 'invisible');
        searchBox.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
        searchBox.classList.add('opacity-0', 'invisible', 'pointer-events-none');
    })
}
if (searchInput && clearInputBtn && resultSearch && trendSearch) {
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 2) {
            resultSearch.classList.remove('hidden');
            resultSearch.classList.add('flex');
            trendSearch.classList.remove('flex');
            trendSearch.classList.add('hidden');
        }
        if (searchInput.value.length > 0) {
            clearInputBtn.classList.remove('opacity-0', 'invisible');
            clearInputBtn.classList.add('opacity-100', 'visible');
            searchedValue.textContent = searchInput.value;
        }
        else {
            clearInputBtn.classList.remove('opacity-100', 'visible');
            clearInputBtn.classList.add('opacity-0', 'invisible');

            resultSearch.classList.add('hidden');
            resultSearch.classList.remove('flex');
            trendSearch.classList.add('flex');
            trendSearch.classList.remove('hidden');
        }

    })
    clearInputBtn.addEventListener('click', () => {
        searchInput.value = ''
        clearInputBtn.classList.remove('opacity-100', 'visible');
        clearInputBtn.classList.add('opacity-0', 'invisible');
        resultSearch.classList.add('hidden');
        resultSearch.classList.remove('flex');
        trendSearch.classList.add('flex');
        trendSearch.classList.remove('hidden');

    })
}
