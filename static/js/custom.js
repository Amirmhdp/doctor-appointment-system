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
const specialList = document.getElementsByClassName('special-list');
if (specialList.length > 0) {

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
}


// infinite-slider
const infiniteSlider = document.getElementsByClassName('infinite-slider');

if (specialList.length > 0) {
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
}

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
        } else {
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


// navigation info doctor page
document.addEventListener('click', (event) => {

    // پیدا کردن nav-item که روی آن کلیک شده
    const navItem = event.target.closest('.nav-item');

    // اگر کلیک مربوط به nav-item نبود، کاری نکن
    if (!navItem) return;

    // گرفتن nav-item های فعلی صفحه
    const navItems = document.querySelectorAll('.nav-item');

    // گرفتن محتواهای مربوط به هر nav


    // غیرفعال کردن همه nav ها
    navItems.forEach(item => {

        item.classList.remove('text-primary-special');

        const border = item.querySelector('.nav-item-border');

        if (border) {
            border.classList.remove('w-full');
            border.classList.add('w-0');
        }
    });


    navItem.classList.add('text-primary-special');

    const border = navItem.querySelector('.nav-item-border');

    if (border) {
        border.classList.remove('w-0');
        border.classList.add('w-full');
    }


    const getContent = navItem.dataset.content;

    const content = document.getElementById(getContent);

    if (!content) return;

    const doctorContent = document.querySelectorAll('.content-doctor');


    // مخفی کردن همه محتواها
    doctorContent.forEach(con => {
        con.classList.add('hidden');
        con.classList.remove('flex');
    });


    // نمایش محتوای انتخاب شده
    content.classList.remove('hidden');
    content.classList.add('flex');

});

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
if (bookingBtn, bookingList, closeBookingList) {
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
}


// open close commentbox

// ===== المنت‌های ثابت (هیچ‌وقت با AJAX جایگزین نمی‌شن) =====
const sendCommentBox = document.getElementById('send-comment-box');
const closeCommentBox = document.getElementById('close-commentbox');

if (sendCommentBox && closeCommentBox && overlay) {

    document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('#open-comment-box-btn');
        if (!openBtn) return;

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
    });

    overlay.addEventListener('click', () => {
        sendCommentBox.classList.remove('visible', 'opacity-100', 'pointer-events-auto', 'flex');
        sendCommentBox.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto';
    });
}

// rating ui for commentbox

document.addEventListener('DOMContentLoaded', () => {
    const ratingStars = document.getElementById('rating-stars');
    const ratingInput = document.getElementById('rating-input');

    if (ratingStars && ratingInput) {

        ratingStars.addEventListener('click', (event) => {

            const star = event.target.closest('.star');

            if (!star) return;

            const ratingNumber = Number(star.dataset.rating);

            ratingInput.value = ratingNumber;

            const stars = ratingStars.querySelectorAll('.star');

            stars.forEach(item => {
                const itemRating = Number(item.dataset.rating);

                if (itemRating <= ratingNumber) {
                    item.classList.add('fill-primary-special');
                } else {
                    item.classList.remove('fill-primary-special');
                }
            });
        });
    }
});

// like dislike btn

const likeDisLikeBtns = document.querySelectorAll('.like-dislike-btn');
const likeDisLikeIcon = document.querySelectorAll('.like-dislike-icon');
const isLikeInput = document.getElementById('is-like');
if (likeDisLikeBtns, likeDisLikeIcon) {
    likeDisLikeBtns.forEach(likeDisLikeBtn => {
        likeDisLikeBtn.addEventListener('click', () => {
            isLikeInput.value = likeDisLikeBtn.dataset.isLike;
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
}

const dayAppoiments = document.querySelectorAll('.booking-appoiment-item');
if (dayAppoiments) {
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

}
// active btn in doctor panel

const doctorPanelBtns = document.querySelectorAll('.item-nav-panel');
const doctorPanelInfos = document.querySelectorAll('.doctor-info-panel');

if (doctorPanelBtns) {
    doctorPanelBtns.forEach(doctorPanelBtn => {
        doctorPanelBtn.addEventListener('click', () => {
            doctorPanelBtns.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('text-slate-500');
                const DocotrpanelIcon = btn.querySelector('.icon-docotr-panel');
                DocotrpanelIcon.classList.remove('text-white');
                DocotrpanelIcon.classList.add('text-slate-500');
            });
            doctorPanelBtn.classList.remove('text-slate-500');
            doctorPanelBtn.classList.add('bg-blue-600', 'text-white');
            const DocotrpanelIcon = doctorPanelBtn.querySelector('.icon-docotr-panel');
            DocotrpanelIcon.classList.remove('text-slate-500');
            DocotrpanelIcon.classList.add('text-white');

            doctorPanelInfos.forEach(doctorPanelInfo => {
                doctorPanelInfo.classList.add('hidden')
            })
            const getAttPanelBtn = doctorPanelBtn.dataset.panelId;
            const datapanelId = document.getElementById(getAttPanelBtn);

            datapanelId.classList.remove('hidden');

        });
    });
}

//  open close doctor today appoiment

const todayAppoimentBtn = document.getElementById('open-today-appoiment');
const openNextAppoiment = document.getElementById('open-next-appoiment');
const todayModal = document.getElementById('todayModal');
const upcomingModal = document.getElementById('upcomingModal');
const closeUpcomingModal = document.getElementById('closeupcomingModal');
const closeTodayModal = document.getElementById('closeTodayModal');
const exceptionModal = document.getElementById('exceptionModal');
const closeExceptionModal = document.getElementById('closeExceptionModal');
const openExceptionModal = document.getElementById('openExceptionModal');
const closeexceptionModal2 = document.getElementById('closeexceptionModal2');
const patientDetailsModal = document.getElementById('patientDetailsModal');
const closePatientDetailsModal = document.getElementById('closePatientDetailsModal');
const closePatientDetailsModal2 = document.getElementById('closePatientDetailsModal2');
const detailPatients = document.querySelectorAll('.detail-patient');
const openEditStates = document.querySelectorAll('.open-edit-state');
const editStatusModal = document.getElementById('editStatusModal');
const closeEditStatusModal = document.getElementById('closeEditStatusModal');
const closeEditStatusModal2 = document.getElementById('closeEditStatusModal2');
const closeDayModal = document.querySelectorAll('.closeDayModal');
const dayModal = document.getElementById('dayModal');
const editAppoimentDays = document.querySelectorAll('.edit-appoiment-day');

if (todayAppoimentBtn, openNextAppoiment, todayModal, upcomingModal, closeUpcomingModal, closeTodayModal, closeexceptionModal2) {

    todayAppoimentBtn.addEventListener('click', () => {
        todayModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
        todayModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
        overlay.classList.remove('invisible', 'opacity-0');
        overlay.classList.add('visible', 'opacity-100');
        body.style.overflow = 'hidden'

    })
    closeTodayModal.addEventListener('click', () => {
        todayModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        todayModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    })
    overlay.addEventListener('click', () => {
        todayModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        todayModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    })

    openNextAppoiment.addEventListener('click', () => {
        upcomingModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
        upcomingModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
        overlay.classList.remove('invisible', 'opacity-0');
        overlay.classList.add('visible', 'opacity-100');
        body.style.overflow = 'hidden'

    });
    closeUpcomingModal.addEventListener('click', () => {
        upcomingModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        upcomingModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    });
    overlay.addEventListener('click', () => {
        upcomingModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        upcomingModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    });
    openExceptionModal.addEventListener('click', () => {
        exceptionModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
        exceptionModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
        overlay.classList.remove('invisible', 'opacity-0');
        overlay.classList.add('visible', 'opacity-100');
        body.style.overflow = 'hidden'

    });
    closeExceptionModal.addEventListener('click', () => {
        exceptionModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        exceptionModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    });
    overlay.addEventListener('click', () => {
        exceptionModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        exceptionModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'
    });
    closeexceptionModal2.addEventListener('click', () => {
        exceptionModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        exceptionModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    });


    detailPatients.forEach(detailPatient => {

        detailPatient.addEventListener('click', () => {
            patientDetailsModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
            patientDetailsModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
            overlay.classList.remove('invisible', 'opacity-0');
            overlay.classList.add('visible', 'opacity-100');
            body.style.overflow = 'hidden'

        });

    });
    closePatientDetailsModal.addEventListener('click', () => {
        patientDetailsModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        patientDetailsModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'
    });
    closePatientDetailsModal2.addEventListener('click', () => {
        patientDetailsModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        patientDetailsModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'
    });
    overlay.addEventListener('click', () => {
        patientDetailsModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        patientDetailsModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    });

    openEditStates.forEach(openEditState => {
        openEditState.addEventListener('click', () => {
            editStatusModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
            editStatusModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
            overlay.classList.remove('invisible', 'opacity-0');
            overlay.classList.add('visible', 'opacity-100');
            body.style.overflow = 'hidden'

        });
        closeEditStatusModal.addEventListener('click', () => {
            editStatusModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
            editStatusModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
            overlay.classList.remove('visible', 'opacity-100');
            overlay.classList.add('invisible', 'opacity-0');
            body.style.overflow = 'auto'
        });
        closeEditStatusModal2.addEventListener('click', () => {
            editStatusModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
            editStatusModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
            overlay.classList.remove('visible', 'opacity-100');
            overlay.classList.add('invisible', 'opacity-0');
            body.style.overflow = 'auto';
        });
        overlay.addEventListener('click', () => {
            editStatusModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
            editStatusModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
            overlay.classList.remove('visible', 'opacity-100');
            overlay.classList.add('invisible', 'opacity-0');
            body.style.overflow = 'auto';

        });
    })

    editAppoimentDays.forEach(editAppoimentDay => {

        editAppoimentDay.addEventListener('click', () => {
            dayModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
            dayModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
            overlay.classList.remove('invisible', 'opacity-0');
            overlay.classList.add('visible', 'opacity-100');
            body.style.overflow = 'hidden'

        });

    });
    closeDayModal.forEach(closeDay => {
        closeDay.addEventListener('click', () => {
            dayModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
            dayModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
            overlay.classList.remove('visible', 'opacity-100');
            overlay.classList.add('invisible', 'opacity-0');
            body.style.overflow = 'auto'
        });
    })
    overlay.addEventListener('click', () => {
        dayModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        dayModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    });


}
;

// active or inactive day appoiment

const actInactAppoimentDays = document.querySelectorAll('.active-day-appoiment');

if (actInactAppoimentDays) {
    actInactAppoimentDays.forEach(actInactAppoimentDay => {
        actInactAppoimentDay.addEventListener('click', () => {
            const getAtt = actInactAppoimentDay.dataset.actInact;
            if (getAtt === 'false') {
                actInactAppoimentDay.dataset.actInact = 'true';
                actInactAppoimentDay.classList.remove('bg-slate-300');
                actInactAppoimentDay.classList.add('bg-blue-600');
                const innerSpan = actInactAppoimentDay.querySelector('span');
                innerSpan.classList.remove('right-0.5');
                innerSpan.classList.add('left-0.5');
                const parentBtn = actInactAppoimentDay.parentElement;
                parentBtn.classList.remove('bg-slate-50/50');
                parentBtn.classList.add('bg-slate-50');
                const getSpans = parentBtn.querySelectorAll('span');
                getSpans.forEach(getSpan => {
                    getSpan.classList.remove('text-slate-400');
                    getSpan.classList.add('text-slate-600');
                })
                const numberOfAppoiment = parentBtn.querySelector('.number-of-appoiment');

                numberOfAppoiment.classList.remove('text-green-300', 'bg-green-50', 'text-slate-600');
                numberOfAppoiment.classList.add('text-green-700', 'bg-green-50');

                const editAppoimentDay = parentBtn.querySelector('.edit-appoiment-day');
                editAppoimentDay.classList.remove('text-slate-300');
                editAppoimentDay.classList.add('text-slate-400');
            }
            if (getAtt === 'true') {
                actInactAppoimentDay.dataset.actInact = 'false';
                actInactAppoimentDay.classList.remove('bg-blue-600');
                actInactAppoimentDay.classList.add('bg-slate-300');
                const innerSpan = actInactAppoimentDay.querySelector('span');
                innerSpan.classList.remove('left-0.5');
                innerSpan.classList.add('right-0.5');
                const parentBtn = actInactAppoimentDay.parentElement;
                parentBtn.classList.remove('bg-slate-50');
                parentBtn.classList.add('bg-slate-50/50');
                const getSpans = parentBtn.querySelectorAll('span');
                getSpans.forEach(getSpan => {
                    getSpan.classList.remove('text-slate-600');
                    getSpan.classList.add('text-slate-400');
                })
                const numberOfAppoiment = parentBtn.querySelector('.number-of-appoiment');

                numberOfAppoiment.classList.remove('text-green-700', 'bg-green-50', 'text-slate-600', 'text-slate-400');
                numberOfAppoiment.classList.add('text-green-300', 'bg-green-50');

                const editAppoimentDay = parentBtn.querySelector('.edit-appoiment-day');
                editAppoimentDay.classList.remove('text-slate-400');
                editAppoimentDay.classList.add('text-slate-300');
            }
            ;
        });
    });
}


// go to oppoiment list

const seeAllAppoiments = document.querySelectorAll('.see-all-appoiment');

if (seeAllAppoiments) {
    seeAllAppoiments.forEach(seeAllAppoiment => {
        seeAllAppoiment.addEventListener('click', () => {
            const itemNavPanels = document.querySelectorAll('.item-nav-panel');

            itemNavPanels.forEach(itemNavPanel => {
                itemNavPanel.classList.remove('bg-blue-600', 'text-white');
                itemNavPanel.classList.add('text-slate-500');
            });
            const appoimentBtn = document.getElementById('appoiment-btn');
            const appoimentSvg = document.getElementById('appoiment-svg');
            appoimentBtn.classList.remove('bg-white', 'text-slate-500');
            appoimentBtn.classList.add('bg-blue-600', 'text-white');
            const iconDocotrPanels = document.querySelectorAll('.icon-docotr-panel');
            iconDocotrPanels.forEach(iconDocotrPanel => {
                iconDocotrPanel.classList.remove('text-white');
                iconDocotrPanel.classList.add('text-slate-500');
            });
            appoimentSvg.classList.remove('text-slate-500');
            appoimentSvg.classList.add('text-white');
            const doctorInfoPanels = document.querySelectorAll('.doctor-info-panel');
            const appoiment = document.getElementById('appoiment');

            doctorInfoPanels.forEach(doctorInfoPanel => {
                doctorInfoPanel.classList.add('hidden');

            });
            appoiment.classList.remove('hidden');

            const myAppoimentTaps = document.querySelectorAll('.my-appoiment-taps');

            const getAttSeeAllBtn = seeAllAppoiment.dataset.getTimeAppoiment;


            if (getAttSeeAllBtn == 'future-appoiment') {
                myAppoimentTaps.forEach(item => {
                    item.classList.remove('bg-blue-600', 'text-white');
                    item.classList.add('text-slate-500');
                    if (item.dataset.timeAppoiment == 'future-appoiment') {
                        item.classList.remove('text-slate-500');
                        item.classList.add('bg-blue-600', 'text-white');

                        const listAppoimentTimes = document.querySelectorAll('.list-appoiment-time');
                        listAppoimentTimes.forEach(listAppoimentTime => {
                            listAppoimentTime.classList.add('hidden');
                        });

                        const getAtt = item.dataset.timeAppoiment;
                        const timeAppoimentContent = document.getElementById(getAtt);
                        timeAppoimentContent.classList.remove('hidden');
                    }

                });

            }
            if (getAttSeeAllBtn == 'past-appoiment') {
                myAppoimentTaps.forEach(item => {
                    item.classList.remove('bg-blue-600', 'text-white');
                    item.classList.add('text-slate-500');
                    if (item.dataset.timeAppoiment == 'past-appoiment') {
                        item.classList.remove('text-slate-500');
                        item.classList.add('bg-blue-600', 'text-white');

                        const listAppoimentTimes = document.querySelectorAll('.list-appoiment-time');
                        listAppoimentTimes.forEach(listAppoimentTime => {
                            listAppoimentTime.classList.add('hidden');
                        });

                        const getAtt = item.dataset.timeAppoiment;
                        const timeAppoimentContent = document.getElementById(getAtt);
                        timeAppoimentContent.classList.remove('hidden');
                    }

                });
            }
            if (getAttSeeAllBtn == 'cancel-appoiment') {
                myAppoimentTaps.forEach(item => {
                    item.classList.remove('bg-blue-600', 'text-white');
                    item.classList.add('text-slate-500');
                    if (item.dataset.timeAppoiment == 'cancel-appoiment') {
                        item.classList.remove('text-slate-500');
                        item.classList.add('bg-blue-600', 'text-white');

                        const listAppoimentTimes = document.querySelectorAll('.list-appoiment-time');
                        listAppoimentTimes.forEach(listAppoimentTime => {
                            listAppoimentTime.classList.add('hidden');
                        });

                        const getAtt = item.dataset.timeAppoiment;
                        const timeAppoimentContent = document.getElementById(getAtt);
                        timeAppoimentContent.classList.remove('hidden');
                    }

                });
            }


        })
    })
}


// go to intersted doctors

const interstedDoctors = document.getElementById('intersted-doctors');

if (interstedDoctors) {
    interstedDoctors.addEventListener('click', () => {
        const itemNavPanels = document.querySelectorAll('.item-nav-panel');

        itemNavPanels.forEach(itemNavPanel => {
            itemNavPanel.classList.remove('bg-blue-600', 'text-white');
            itemNavPanel.classList.add('text-slate-500');
        })
        const iconDocotrPanels = document.querySelectorAll('.icon-docotr-panel');
        iconDocotrPanels.forEach(iconDocotrPanel => {
            iconDocotrPanel.classList.remove('text-white');
            iconDocotrPanel.classList.add('text-slate-500');
        })
        const listDoctorsInterstedBtn = document.getElementById('list-doctors-intersted-btn');
        listDoctorsInterstedBtn.classList.remove('bg-white', 'text-slate-500');
        listDoctorsInterstedBtn.classList.add('bg-blue-600', 'text-white');

        const interstedDoctorSvg = document.getElementById('intersted-doctor-svg');
        interstedDoctorSvg.classList.remove('text-slate-500');
        interstedDoctorSvg.classList.add('text-white');

        const doctorInfoPanels = document.querySelectorAll('.doctor-info-panel');
        const interstedDoctorsContent = document.getElementById('patients');

        doctorInfoPanels.forEach(doctorInfoPanel => {
            doctorInfoPanel.classList.add('hidden')

        })
        interstedDoctorsContent.classList.remove('hidden')
    })
}


// active inactive appoiment taps

const myAppoimentTaps = document.querySelectorAll('.my-appoiment-taps');

if (myAppoimentTaps) {
    myAppoimentTaps.forEach(myAppoimentTap => {
        myAppoimentTap.addEventListener('click', () => {
            myAppoimentTaps.forEach(item => {
                item.classList.remove('bg-blue-600', 'text-white');
                item.classList.add('text-slate-500');
            });
            myAppoimentTap.classList.add('bg-blue-600', 'text-white');
            myAppoimentTap.classList.remove('text-slate-500');


            const listAppoimentTimes = document.querySelectorAll('.list-appoiment-time');
            listAppoimentTimes.forEach(listAppoimentTime => {
                listAppoimentTime.classList.add('hidden');
            });

            const getAtt = myAppoimentTap.dataset.timeAppoiment;
            const timeAppoimentContent = document.getElementById(getAtt);
            timeAppoimentContent.classList.remove('hidden');


        });
    });
}

const cancelAppoimentBtns = document.querySelectorAll('.cancel-appoiment-btn');
const cancelModal = document.getElementById('cancelModal');
const closeCancleModal = document.getElementById('cancelModal');

if (cancelAppoimentBtns, cancelModal, closeCancleModal) {
    cancelAppoimentBtns.forEach(cancelAppoimentBtn => {
        cancelAppoimentBtn.addEventListener('click', () => {
            cancelModal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
            cancelModal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
            overlay.classList.remove('invisible', 'opacity-0');
            overlay.classList.add('visible', 'opacity-100');
            body.style.overflow = 'hidden'
        })

    })
    closeCancleModal.addEventListener('click', () => {
        cancelModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        cancelModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    })
    overlay.addEventListener('click', () => {
        cancelModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
        cancelModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
        body.style.overflow = 'auto'

    })
}


// counter

const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 4000;

            let startTime = null;

            function updateCounter(currentTime) {

                if (startTime === null) {
                    startTime = currentTime;
                }

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const currentValue = Math.floor(progress * target);

                counter.textContent = currentValue + '+';

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }

            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);
        }

    });

});

if (counters) {
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// focus next input


const otpInputs = document.querySelectorAll('.otp-input');

if (otpInputs) {

    otpInputs.forEach((input, index) => {

        input.addEventListener('input', () => {

            input.value = input.value.replace(/\D/g, '');

            if (input.value.length === 1) {

                const nextInput = otpInputs[index + 1];

                if (nextInput) {
                    nextInput.focus();
                }


                if (index === otpInputs.length - 1) {

                    const otpCode = [...otpInputs]
                        .map(input => input.value)
                        .join('');


                    const otpCodeInput = document.querySelector('#id_otp_code');

                    if (otpCodeInput) {
                        otpCodeInput.value = otpCode;
                    }


                    formOtp.requestSubmit();
                }
            }
        });

        input.addEventListener('keydown', (e) => {

            if (e.key === 'Backspace' && input.value === '') {

                const previousInput = otpInputs[index - 1];

                if (previousInput) {
                    previousInput.focus();
                    previousInput.value = '';
                }
            }

        });

    });
}

// otp verification counter
const formOtp = document.querySelector('#form-otp');
const otpTimer = document.querySelector('#otp-timer');
const resendCode = document.querySelector('#resend-code');
const resendCodeBtn = document.querySelector('#resend-code-btn');
const otpVerificationCounter = document.querySelector('#otp-verification-counter');

let timer;

if (
    formOtp &&
    otpTimer &&
    resendCode &&
    resendCodeBtn &&
    otpVerificationCounter
) {

    function startOtpTimer() {

        clearInterval(timer);

        otpVerificationCounter.classList.remove('hidden');
        resendCode.classList.add('hidden');

        const createdAt = new Date(
            formOtp.dataset.otpCreatedAt
        ).getTime();

        const resendTime = createdAt + (80 * 1000);

        function updateTimer() {

            const remainingTime = Math.max(
                0,
                Math.ceil((resendTime - Date.now()) / 1000)
            );

            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            otpTimer.textContent =
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (remainingTime <= 0) {

                clearInterval(timer);

                otpVerificationCounter.classList.add('hidden');
                resendCode.classList.remove('hidden');
            }
        }

        updateTimer();

        timer = setInterval(updateTimer, 1000);
    }

    startOtpTimer();
}


// resend otp code
if (resendCodeBtn) {

    resendCodeBtn.addEventListener('click', async () => {

        try {

            const csrfToken = document.querySelector(
                '#form-otp input[name="csrfmiddlewaretoken"]'
            ).value;

            const resendUrl = resendCodeBtn.dataset.url;

            const response = await fetch(resendUrl, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            const data = await response.json();

            if (data.success) {


                formOtp.dataset.otpCreatedAt = data.otp_created_at;


                startOtpTimer();


                document.querySelectorAll('.otp-input').forEach(input => {
                    input.value = '';
                });


                document.querySelector('.otp-input')?.focus();

            } else {

                alert(data.message);
            }

        } catch (error) {

            console.error(error);

            alert('خطایی در ارسال مجدد کد رخ داد.');
        }
    });
}

// get otp verification code


const formOTP = document.getElementById('form-otp');
const otpInputHidden = document.getElementById('id_otp_code');

if (formOTP, otpInputHidden) {
    function updateOTP() {
        let otp = '';
        otpInputs.forEach(otpInput => {
            otp += otpInput.value;
        })
        otpInputHidden.value = otp;
    }

    formOTP.addEventListener('submit', () => {
        updateOTP()
    })
}


// filter doctor

const doctorInput = document.getElementById('doctor-input');
const specialtyInput = document.getElementById('specialty-input');
const cityInput = document.getElementById('city-input');
const specialtyItems = document.querySelectorAll('.specialty-item');
const doctorItems = document.querySelectorAll('.doctor-item');
const cityItems = document.querySelectorAll('.city-item');
const doctorsList = document.getElementById('doctors-list');
const filterBtn = document.getElementById('filter-btn');
const removeFilterBtn = document.getElementById('remove-filter-btn');
if (doctorInput, specialtyInput, cityInput, specialtyItems, doctorItems, cityItems, doctorsList, filterBtn) {
    specialtyItems.forEach(specialtyItem => {
        specialtyItem.addEventListener('click', () => {
            specialtyInput.value = specialtyItem.textContent.trim();
        })
    })
    doctorItems.forEach(doctorItem => {
        doctorItem.addEventListener('click', () => {
            doctorInput.value = doctorItem.textContent.trim();
        })
    })
    cityItems.forEach(cityItem => {
        cityItem.addEventListener('click', () => {
            cityInput.value = cityItem.textContent.trim();
        })
    })

    async function loadDoctorAjax() {

        const params = new URLSearchParams()

        if (doctorInput.value) {
            params.set('doctor', doctorInput.value);
        }
        if (specialtyInput.value) {
            params.set('specialty', specialtyInput.value);
        }
        if (cityInput.value) {
            params.set('city', cityInput.value);
        }

        const url = `/doctors-list?${params.toString()}`;
        const response = await fetch(url, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const html = await response.text();
        history.pushState({}, "", url)

        doctorsList.innerHTML = html;


    }

    removeFilterBtn.addEventListener('click', () => {

        doctorInput.value = '';
        specialtyInput.value = '';
        cityInput.value = '';

        loadDoctorAjax();
    });
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            loadDoctorAjax()
        })
    }
}


// send comment with ajax
function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
            cookie = cookie.trim();

            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieValue;
}

document.addEventListener('click', (event) => {
    const replyComment = event.target.closest('.reply-comment');

    if (!replyComment) return;

    const commentParent = document.getElementById('id_comment_parent');
    const commentId = replyComment.querySelector('.comment-id');

    if (!commentParent || !commentId) return;

    commentParent.value = commentId.value;

    const sendCommentBox = document.getElementById('send-comment-box');

    sendCommentBox.classList.remove(
        'invisible', 'opacity-0', 'pointer-events-none'
    );

    sendCommentBox.classList.add(
        'visible', 'opacity-100', 'pointer-events-auto', 'flex'
    );

    overlay.classList.remove(
        'invisible', 'opacity-0'
    );

    overlay.classList.add(
        'visible', 'opacity-100'
    );

    body.style.overflow = 'hidden';
});


async function sendCommentAjax() {
    const url = window.location.href;

    const formData = new FormData(sendCommentBox);


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    });
    const html = await response.json();


    const commentContainer = document.getElementById('comment-container');
    const navigationDetailDoctor = document.getElementById('navigation-detail-doctor');
    const ratingContainer = document.getElementById('rating-container');
    const commentCountBox = document.getElementById('comment-count-box');
    commentContainer.innerHTML = html.comments_html;
    navigationDetailDoctor.innerHTML = html.navigation;
    ratingContainer.innerHTML = html.rating;
    commentCountBox.innerHTML = html.count_comment;

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(navItem => {

        navItem.classList.remove('text-primary-special');
        navItem.classList.add('text-custom-black');

        const border = navItem.querySelector('.nav-item-border');

        if (border) {
            border.classList.remove('w-full');
            border.classList.add('w-0');
        }
    });


    const commentNav = document.querySelector(
        '.nav-item[data-content="comments"]'
    );

    if (commentNav) {

        commentNav.classList.add('text-primary-special');
        commentNav.classList.remove('text-custom-black');

        const borderComment = commentNav.querySelector('.nav-item-border');

        if (borderComment) {
            borderComment.classList.add('w-0');
            borderComment.classList.add('w-full');
        }
    }


    lucide.createIcons();
    sendCommentBox.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
    sendCommentBox.classList.add('invisible', 'opacity-0', 'pointer-events-none');
    overlay.classList.remove('visible', 'opacity-100');
    overlay.classList.add('invisible', 'opacity-0');
    body.style.overflow = 'auto'
    const parentId = document.querySelector('#id_comment_parent').value;
    console.log(parentId)

    if (parentId) {
        const parentComment = document.getElementById(`comment-${parentId}`);

        if (parentComment) {
            const replies = parentComment.querySelectorAll('.single-reply');
            const newReply = replies[replies.length - 1];

            if (newReply) {
                newReply.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    } else {
        const comments = commentContainer.querySelectorAll('.comment-item');
        const newComment = comments[0];

        if (newComment) {
            newComment.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    const commentParent = document.getElementById('id_comment_parent');
    commentParent.value = ""
}

const sendCommentBtn = document.getElementById('send-comment-btn');
if (sendCommentBtn) {
    sendCommentBtn.addEventListener('click', () => {
        sendCommentAjax();
    });
}


const loadMoreBtn = document.getElementById('load-more-comment-btn');
const commentContainer = document.getElementById('comment-container');

if (loadMoreBtn) {

    loadMoreBtn.addEventListener('click', function () {

        const pageUrl = this.dataset.page;

        fetch(pageUrl, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => {

                // اضافه کردن کامنت‌های جدید
                commentContainer.insertAdjacentHTML(
                    'beforeend',
                    data.comments_html
                );
                lucide.createIcons();

                // اگر صفحه بعدی وجود دارد
                if (data.has_next) {

                    this.dataset.page = `?page=${data.next_page}`;

                } else {

                    // اگر دیگر کامنتی نمانده
                    this.remove();
                }

            })
            .catch(error => {
                console.error(error);
            });

    });
}
const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
if (startTime && endTime) {
    flatpickr(startTime, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        allowInput: false,
    });
    flatpickr(endTime, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        allowInput: false,
    });
}


// set time for doctor available management

document.addEventListener('click', function (event) {

    const slot = event.target.closest('.booking-appoiment-item');

    if (!slot) {
        return;
    }

    document.querySelectorAll('.booking-appoiment-item').forEach(item => {
        item.classList.remove(
            'bg-primary-special',
            'border-primary-special'
        );

        item.querySelector('span')?.classList.remove('text-white');
    });


    slot.classList.add(
        'bg-primary-special',
        'border-primary-special'
    );

    slot.querySelector('span')?.classList.add('text-white');

    // دریافت شناسه Slot
    const slotId = slot.dataset.slotId;

    // انتقال به صفحه پرداخت
    window.location.href = `/payment/${slotId}`;
});

// payment
const paymentBtn = document.getElementById('payment-btn');

if (paymentBtn) {
    paymentBtn.addEventListener('click', function () {

        const slotId = this.dataset.slotId;
        const csrftoken = getCookie('csrftoken');

        fetch(`/payment/start/${slotId}/`, {
            method: 'POST',

            headers: {
                'X-CSRFToken': csrftoken,
            },
        })
            .then(response => response.json())
            .then(data => {

                if (!data.success) {
                    alert(data.message);
                    return;
                }

                console.log('Payment ID:', data.payment_id);
            })
            .catch(error => {
                console.error(error);
                alert('خطایی رخ داد.');
            });
    });
}



if (paymentBtn) {
    paymentBtn.addEventListener('click', function () {

        const button = this;
        const slotId = button.dataset.slotId;

        button.disabled = true;

        fetch(`/payment/start/${slotId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
        })
            .then(response => response.json())
            .then(data => {

                if (!data.success) {
                    alert(
                        `${data.message}\nکد خطا: ${data.error_code ?? 'نامشخص'}`
                    );

                    button.disabled = false;
                    return;
                }

                window.location.href = data.payment_url;
            })
            .catch(error => {

                console.error(error);

                alert('خطایی رخ داد.');

                button.disabled = false;
            });

    });
}

// تأیید لغو
// const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
// let selectedAppointment = null;
// confirmCancelBtn.addEventListener('click', function () {
//
//     if (!selectedAppointment) return;
//
//     confirmCancelBtn.disabled = true;
//     confirmCancelBtn.textContent = 'در حال لغو...';
//
//     fetch(selectedAppointment.url, {
//         method: 'POST',
//         headers: {
//             'X-CSRFToken': getCookie('csrftoken'),
//             'X-Requested-With': 'XMLHttpRequest',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//
//             if (data.success) {
//                 window.location.reload();
//                 return;
//             }
//
//             alert(data.message);
//
//             confirmCancelBtn.disabled = false;
//             confirmCancelBtn.textContent = 'بله، لغو کن';
//         })
//         .catch(() => {
//
//             alert('خطایی در لغو نوبت رخ داد.');
//
//             confirmCancelBtn.disabled = false;
//             confirmCancelBtn.textContent = 'بله، لغو کن';
//         });
// });