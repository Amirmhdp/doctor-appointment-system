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
        searchBox.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
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


// faq dropdown
const answerFaq = document.querySelectorAll('.answer-faq');
const faqDropdowns = document.querySelectorAll('.faq-dropdown');

if (answerFaq && faqDropdowns) {
    faqDropdowns.forEach(dropdown => {

        dropdown.addEventListener('click', () => {

            const answer = dropdown.nextElementSibling;
            const plusIcon = dropdown.querySelector('.plus-icon');

            const isClosed = answer.classList.contains('h-0');

            if (isClosed) {


                answer.classList.remove(
                    'invisible',
                    'opacity-0',
                    'h-0'
                );

                answer.classList.add(
                    'visible',
                    'opacity-100',
                    'h-fit'
                );

                plusIcon.setAttribute('data-lucide', 'minus');

            } else {


                answer.classList.remove(
                    'visible',
                    'opacity-100',
                    'h-fit'
                );

                answer.classList.add(
                    'invisible',
                    'opacity-0',
                    'h-0'
                );

                plusIcon.setAttribute('data-lucide', 'plus');
            }

            lucide.createIcons();

        });

    });
}


const navItems = document.querySelectorAll('.nav-item');
const doctorContent = document.querySelectorAll('.content-doctor');


// navigation info doctor page
if (doctorContent && navItems) {
    navItems.forEach(navItem => {

        navItem.addEventListener('click', () => {

            navItems.forEach(item => {

                item.classList.remove('text-primary-special');

                const border = item.querySelector('.nav-item-border');

                border.classList.remove('w-full');
                border.classList.add('w-0');

            });

            // فعال کردن آیتم کلیک شده
            navItem.classList.add('text-primary-special');

            const border = navItem.querySelector('.nav-item-border');

            border.classList.remove('w-0');
            border.classList.add('w-full');

            const getContent = navItem.dataset.content;

            const content = document.getElementById(getContent);
            console.log(content);


            doctorContent.forEach(con => {
                con.classList.add('hidden');
                con.classList.remove('flex');
            })
            content.classList.remove('hidden');
            content.classList.add('flex');

        });

    });
}

// appoiment booking

const bockDayBtns = document.querySelectorAll('.bock-day-btn');
const bookingAppoimentContents = document.querySelectorAll('.booking-appoiment');

if (bockDayBtns) {
    bockDayBtns.forEach(bockDayBtn => {

        bockDayBtn.addEventListener('click', () => {

            bockDayBtns.forEach(btn => {

                btn.classList.remove('border-primary-special');

                const contentBockBtns =
                    btn.querySelectorAll('.content-boock-day-btn');

                contentBockBtns.forEach(content => {
                    content.classList.remove('text-primary-special');
                });

            });

            bockDayBtn.classList.add('border-primary-special');

            const contentBockBtns =
                bockDayBtn.querySelectorAll('.content-boock-day-btn');

            contentBockBtns.forEach(content => {
                content.classList.add('text-primary-special');
            });
            bookingAppoimentContents.forEach(bookingAppoimentContent => {
                bookingAppoimentContent.classList.add('hidden');
            })
            const getbookingAppoimentId = bockDayBtn.dataset.bookingId;
            const bookingAppoimenId = document.getElementById(getbookingAppoimentId);
            bookingAppoimenId.classList.remove('hidden');
            bookingAppoimenId.classList.add('grid');


        });

    });
}

// open close booking appoiment

const bookingBtn = document.getElementById('booking-btn');
const bookingList = document.getElementById('booking-list');
const closeBookingList = document.getElementById('close-booking-list');
bookingBtn.addEventListener('click', () => {
    bookingList.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
    bookingList.classList.add('visible', 'opacity-100', 'pointer-events-auto');
    overlay.classList.remove('opacity-0', 'invisible');
    overlay.classList.add('opacity-100', 'visible');
    body.style.overflow = 'hidden'
})
closeBookingList.addEventListener('click', () => {
    bookingList.classList.add('invisible', 'opacity-0', 'pointer-events-none');
    bookingList.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'invisible');
    overlay.classList.remove('opacity-100', 'visible');
    body.style.overflow = 'auto'
})
overlay.addEventListener('click', () => {
    bookingList.classList.add('invisible', 'opacity-0', 'pointer-events-none');
    bookingList.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'invisible');
    overlay.classList.remove('opacity-100', 'visible');
    body.style.overflow = 'auto'
})


// open close commentbox

const openCommentBoxBtn = document.getElementById('open-comment-box-btn');
const sendCommentBox = document.getElementById('send-comment-box');
const closeCommentBox = document.getElementById('close-commentbox');

if (openCommentBoxBtn, sendCommentBox, closeCommentBox) {
    openCommentBoxBtn.addEventListener('click', () => {
        sendCommentBox.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
        sendCommentBox.classList.add('visible', 'opacity-100', 'pointer-events-auto', 'flex');
        overlay.classList.add('visible', 'opacity-100');
        overlay.classList.remove('invisible', 'opacity-0');
        body.style.overflow = 'hidden';
    });
    closeCommentBox.addEventListener('click', () => {
        sendCommentBox.classList.remove('visible', 'opacity-100', 'pointer-events-auto', 'flex');
        sendCommentBox.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto';
    })
    overlay.addEventListener('click', () => {
        sendCommentBox.classList.remove('visible', 'opacity-100', 'pointer-events-auto', 'flex');
        sendCommentBox.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto';
    })
};

// rating ui for commentbox

const stars = document.querySelectorAll('.star');

stars.forEach(star => {

    star.addEventListener('click', () => {

        const ratingNumber = Number(star.dataset.rating);

        stars.forEach(item => {

            const itemRating = Number(item.dataset.rating);


            if (itemRating <= ratingNumber) {
                item.classList.add('fill-primary-special');
            } else {
                item.classList.remove('fill-primary-special');
            }

        });

    });

});

// like dislike btn

const likeDisLikeBtns = document.querySelectorAll('.like-dislike-btn');
const likeDisLikeIcon = document.querySelectorAll('.like-dislike-icon');

likeDisLikeBtns.forEach(likeDisLikeBtn => {
    likeDisLikeBtn.addEventListener('click', () => {
        likeDisLikeBtns.forEach(btn => {
            btn.classList.remove('bg-primary-special', 'text-white');
            btn.classList.add('bg-white', 'text-primary-special');
            const icon = btn.querySelector('.like-dislike-icon');
            icon.classList.remove('text-white');
            icon.classList.add('text-primary-special');
        })
        likeDisLikeBtn.classList.add('bg-primary-special', 'text-white');
        likeDisLikeBtn.classList.remove('bg-white', 'text-primary-special');
        const icon = likeDisLikeBtn.querySelector('.like-dislike-icon');
        icon.classList.remove('text-primary-special');
        icon.classList.add('text-white');
    })
})

const dayAppoiments = document.querySelectorAll('.booking-appoiment-item');
dayAppoiments.forEach(dayAppoiment => {
    dayAppoiment.addEventListener('click', () => {
        dayAppoiments.forEach(item => {
            item.classList.remove('border-primary-special');
            item.classList.add('border-light-gray');
        })
        dayAppoiment.classList.add('border-primary-special');
        dayAppoiment.classList.remove('border-light-gray');
    })
})