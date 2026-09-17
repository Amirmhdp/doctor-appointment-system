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
document.addEventListener('click', (event) => {

    const dropdown = event.target.closest('.dropdown');

    // اگر کلیک مربوط به هیچ Dropdownی نیست
    if (!dropdown) {
        document.querySelectorAll('.dropdown-list').forEach(list => {
            list.classList.remove('opacity-100', 'visible');
            list.classList.add('opacity-0', 'invisible');
        });

        return;
    }


    // دکمه Dropdown
    const button = event.target.closest('.dropdown-button');

    if (button) {

        event.stopPropagation();

        const list = dropdown.querySelector('.dropdown-list');

        // بستن Dropdownهای دیگر
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {

            if (otherDropdown !== dropdown) {

                const otherList =
                    otherDropdown.querySelector('.dropdown-list');

                if (otherList) {
                    otherList.classList.remove(
                        'opacity-100',
                        'visible'
                    );

                    otherList.classList.add(
                        'opacity-0',
                        'invisible'
                    );
                }
            }
        });

        // باز / بسته کردن Dropdown فعلی
        list.classList.toggle('opacity-0');
        list.classList.toggle('invisible');

        list.classList.toggle('opacity-100');
        list.classList.toggle('visible');

        return;
    }


    // آیتم Dropdown
    const item = event.target.closest('.dropdown-item');

    if (item) {

        const selectedText =
            dropdown.querySelector('.selected-text');

        const list =
            dropdown.querySelector('.dropdown-list');

        if (selectedText) {
            selectedText.textContent = item.textContent.trim();
        }

        if (list) {
            list.classList.remove(
                'opacity-100',
                'visible'
            );

            list.classList.add(
                'opacity-0',
                'invisible'
            );
        }

        return;
    }

});


// apponent date 
const apponentDate = document.getElementById('appointment-date');
const apponentBtnDate = document.getElementById('btn-date-calendar');
const idDate = document.getElementById('id_date');

if (apponentDate) {
    $('#appointment-date').persianDatepicker({
        format: 'YYYY/MM/DD',
        minDate: new persianDate().valueOf(),
    });
}
if (idDate) {
    $('#id_date').persianDatepicker({
        format: 'YYYY/MM/DD',
        minDate: new persianDate().valueOf(),
        onSelect: function (unix) {
            const date = new persianDate(unix);

            const gregorianDate = date
                .toCalendar('gregorian')
                .format('YYYY-MM-DD');

            document.getElementById('id_date_hidden').value = gregorianDate;
        }
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

if (
    todayModal &&
    upcomingModal &&
    exceptionModal &&
    patientDetailsModal &&
    editStatusModal &&
    dayModal
) {

    function openModal(modal) {
        modal.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
        modal.classList.add('visible', 'opacity-100', 'pointer-events-auto');
        overlay.classList.remove('invisible', 'opacity-0');
        overlay.classList.add('visible', 'opacity-100');
        body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');

        modal.classList.add('invisible', 'opacity-0', 'pointer-events-none');

        overlay.classList.remove('visible', 'opacity-100');

        overlay.classList.add('invisible', 'opacity-0');

        body.style.overflow = 'auto';
    }


    document.addEventListener('click', (event) => {

        if (event.target.closest('#open-today-appoiment')) {
            openModal(todayModal);
        }

        if (event.target.closest('#open-next-appoiment')) {
            openModal(upcomingModal);
        }

        if (event.target.closest('#openExceptionModal')) {
            openModal(exceptionModal);
        }

        if (event.target.closest('.detail-patient')) {
            openModal(patientDetailsModal);
        }

        if (event.target.closest('.open-edit-state')) {
            openModal(editStatusModal);
        }

        if (event.target.closest('.edit-appoiment-day')) {
            openModal(dayModal);
        }

        if (event.target.closest('#closeTodayModal')) {
            closeModal(todayModal);
        }

        if (event.target.closest('#closeupcomingModal')) {
            closeModal(upcomingModal);
        }

        if (
            event.target.closest('#closeExceptionModal') ||
            event.target.closest('#closeexceptionModal2')
        ) {
            closeModal(exceptionModal);
        }

        if (
            event.target.closest('#closePatientDetailsModal') ||
            event.target.closest('#closePatientDetailsModal2')
        ) {
            closeModal(patientDetailsModal);
        }

        if (
            event.target.closest('#closeEditStatusModal') ||
            event.target.closest('#closeEditStatusModal2')
        ) {
            closeModal(editStatusModal);
        }


        // بستن مودال ویرایش روز
        if (event.target.closest('.closeDayModal')) {
            closeModal(dayModal);
        }


        // بستن مودال با کلیک روی Overlay
        if (event.target === overlay) {
            closeModal(todayModal);
            closeModal(upcomingModal);
            closeModal(exceptionModal);
            closeModal(patientDetailsModal);
            closeModal(editStatusModal);
            closeModal(dayModal);
        }

    });

}

// active or inactive day appoiment

document.addEventListener('click', async (event) => {

    const actInactAppoimentDay =
        event.target.closest('.active-day-appoiment');

    if (!actInactAppoimentDay) return;

    const editAppointmentDayContainer =
        actInactAppoimentDay.closest(
            '.edit-appoiment-day-container'
        );

    const dayId =
        editAppointmentDayContainer.dataset.dayId;

    try {

        const response = await fetch(
            '/active-inactive-appointment-day/' + dayId,
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        );

        const result = await response.json();

        if (!result.success) {
            return;
        }

        const isActive = result.is_active;

        actInactAppoimentDay.dataset.actInact =
            String(isActive);

        const innerSpan =
            actInactAppoimentDay.querySelector('span');

        const parentBtn =
            actInactAppoimentDay.parentElement;

        const getSpans =
            parentBtn.querySelectorAll('span');

        const timeWork =
            editAppointmentDayContainer.querySelector(
                '.time-work'
            );

        const timeWorkSpans =
            timeWork.querySelectorAll('span');

        const editAppoimentDays =
            editAppointmentDayContainer.querySelectorAll(
                '.edit-appoiment-day'
            );

        if (isActive) {

            actInactAppoimentDay.classList.remove(
                'bg-slate-300'
            );

            actInactAppoimentDay.classList.add(
                'bg-blue-600'
            );

            innerSpan.classList.remove(
                'right-0.5'
            );

            innerSpan.classList.add(
                'left-0.5'
            );

            parentBtn.classList.remove(
                'bg-slate-50/50'
            );

            parentBtn.classList.add(
                'bg-slate-50'
            );

            getSpans.forEach(span => {
                span.classList.remove(
                    'text-slate-400'
                );

                span.classList.add(
                    'text-slate-600'
                );
            });

            editAppoimentDays.forEach(button => {
                button.classList.remove(
                    'text-slate-300'
                );

                button.classList.add(
                    'text-slate-400'
                );
            });

            timeWorkSpans.forEach(span => {
                span.classList.remove(
                    'text-slate-400'
                );

                span.classList.add(
                    'text-slate-600'
                );
            });

        } else {

            actInactAppoimentDay.classList.remove(
                'bg-blue-600'
            );

            actInactAppoimentDay.classList.add(
                'bg-slate-300'
            );

            innerSpan.classList.remove(
                'left-0.5'
            );

            innerSpan.classList.add(
                'right-0.5'
            );

            parentBtn.classList.remove(
                'bg-slate-50'
            );

            parentBtn.classList.add(
                'bg-slate-50/50'
            );

            getSpans.forEach(span => {
                span.classList.remove(
                    'text-slate-600'
                );

                span.classList.add(
                    'text-slate-400'
                );
            });

            editAppoimentDays.forEach(button => {
                button.classList.remove(
                    'text-slate-400'
                );

                button.classList.add(
                    'text-slate-300'
                );
            });

            timeWorkSpans.forEach(span => {
                span.classList.remove(
                    'text-slate-600'
                );

                span.classList.add(
                    'text-slate-400'
                );
            });
        }

    } catch (error) {

        console.error(
            'Error while changing appointment day:',
            error
        );
    }
});


// go to oppoiment list

document.addEventListener('click', (event) => {

    const seeAllAppoiment = event.target.closest('.see-all-appoiment');

    if (!seeAllAppoiment) {
        return;
    }

    const itemNavPanels = document.querySelectorAll('.item-nav-panel');

    itemNavPanels.forEach(itemNavPanel => {
        itemNavPanel.classList.remove(
            'bg-blue-600',
            'text-white'
        );

        itemNavPanel.classList.add('text-slate-500');
    });


    const appoimentBtn = document.getElementById('appoiment-btn');
    const appoimentSvg = document.getElementById('appoiment-svg');

    appoimentBtn.classList.remove(
        'bg-white',
        'text-slate-500'
    );

    appoimentBtn.classList.add(
        'bg-blue-600',
        'text-white'
    );


    const iconDocotrPanels =
        document.querySelectorAll('.icon-docotr-panel');

    iconDocotrPanels.forEach(iconDocotrPanel => {
        iconDocotrPanel.classList.remove('text-white');
        iconDocotrPanel.classList.add('text-slate-500');
    });


    appoimentSvg.classList.remove('text-slate-500');
    appoimentSvg.classList.add('text-white');


    const doctorInfoPanels =
        document.querySelectorAll('.doctor-info-panel');

    const appoiment =
        document.getElementById('appoiment');

    doctorInfoPanels.forEach(doctorInfoPanel => {
        doctorInfoPanel.classList.add('hidden');
    });

    appoiment.classList.remove('hidden');


    const myAppoimentTaps =
        document.querySelectorAll('.my-appoiment-taps');

    const getAttSeeAllBtn =
        seeAllAppoiment.dataset.getTimeAppoiment;


    // ابتدا همه تب‌ها را غیرفعال کن
    myAppoimentTaps.forEach(item => {
        item.classList.remove(
            'bg-blue-600',
            'text-white'
        );

        item.classList.add('text-slate-500');
    });


    // تب موردنظر را فعال کن
    const selectedTap =
        document.querySelector(
            `.my-appoiment-taps[data-time-appoiment="${getAttSeeAllBtn}"]`
        );

    if (selectedTap) {

        selectedTap.classList.remove('text-slate-500');

        selectedTap.classList.add(
            'bg-blue-600',
            'text-white'
        );
    }


    // همه لیست‌ها را مخفی کن
    const listAppoimentTimes =
        document.querySelectorAll('.list-appoiment-time');

    listAppoimentTimes.forEach(listAppoimentTime => {
        listAppoimentTime.classList.add('hidden');
    });


    // لیست مربوط به تب انتخاب‌شده را نمایش بده
    const timeAppoimentContent =
        document.getElementById(getAttSeeAllBtn);

    if (timeAppoimentContent) {
        timeAppoimentContent.classList.remove('hidden');
    }

});


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

document.addEventListener('click', (event) => {

    const myAppoimentTap =
        event.target.closest('.my-appoiment-taps');

    if (!myAppoimentTap) {
        return;
    }


    // غیرفعال کردن تمام تب‌ها
    const myAppoimentTaps =
        document.querySelectorAll('.my-appoiment-taps');

    myAppoimentTaps.forEach(item => {
        item.classList.remove(
            'bg-blue-600',
            'text-white'
        );

        item.classList.add('text-slate-500');
    });


    // فعال کردن تب انتخاب شده
    myAppoimentTap.classList.remove('text-slate-500');

    myAppoimentTap.classList.add(
        'bg-blue-600',
        'text-white'
    );


    // مخفی کردن تمام لیست‌ها
    const listAppoimentTimes =
        document.querySelectorAll('.list-appoiment-time');

    listAppoimentTimes.forEach(listAppoimentTime => {
        listAppoimentTime.classList.add('hidden');
    });


    // پیدا کردن محتوای تب
    const getAtt =
        myAppoimentTap.dataset.timeAppoiment;

    const timeAppoimentContent =
        document.getElementById(getAtt);


    // نمایش محتوای تب
    if (timeAppoimentContent) {
        timeAppoimentContent.classList.remove('hidden');
    }

});

document.addEventListener('click', (event) => {

    // دکمه باز کردن مودال لغو
    const cancelAppoimentBtn =
        event.target.closest('.cancel-appoiment-btn');

    if (cancelAppoimentBtn) {

        const cancelModal =
            document.getElementById('cancelModal');

        cancelModal.classList.remove(
            'invisible',
            'opacity-0',
            'pointer-events-none'
        );

        cancelModal.classList.add(
            'visible',
            'opacity-100',
            'pointer-events-auto'
        );

        overlay.classList.remove(
            'invisible',
            'opacity-0'
        );

        overlay.classList.add(
            'visible',
            'opacity-100'
        );

        body.style.overflow = 'hidden';

        return;
    }


    // دکمه بستن مودال
    const closeCancleModal =
        event.target.closest('#close-cancle-modal');

    if (closeCancleModal) {

        const cancelModal =
            document.getElementById('cancelModal');

        cancelModal.classList.remove(
            'visible',
            'opacity-100',
            'pointer-events-auto'
        );

        cancelModal.classList.add(
            'invisible',
            'opacity-0',
            'pointer-events-none'
        );

        overlay.classList.remove(
            'visible',
            'opacity-100'
        );

        overlay.classList.add(
            'invisible',
            'opacity-0'
        );

        body.style.overflow = 'auto';

        return;
    }


    // کلیک روی Overlay
    if (event.target === overlay) {

        const cancelModal = document.getElementById('cancelModal');
        if (!cancelModal){
            return;
        }

        cancelModal.classList.remove(
            'visible',
            'opacity-100',
            'pointer-events-auto'
        );

        cancelModal.classList.add(
            'invisible',
            'opacity-0',
            'pointer-events-none'
        );

        overlay.classList.remove(
            'visible',
            'opacity-100'
        );

        overlay.classList.add(
            'invisible',
            'opacity-0'
        );

        body.style.overflow = 'auto';
    }

});


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
const provinceInput = document.getElementById('province-input');
const specialtyItems = document.querySelectorAll('.specialty-item');
const doctorItems = document.querySelectorAll('.doctor-item');
const provinceItems = document.querySelectorAll('.province-item');
const orderByItems = document.querySelectorAll('.order-by-filter');
const orderByInput = document.getElementById('order-by-input');
const doctorsList = document.getElementById('doctors-list');
const filterBtn = document.getElementById('filter-btn');
const filterBtn2 = document.getElementById('filter-btn-2');
const removeFilterBtn = document.getElementById('remove-filter-btn');
const genderItems = document.querySelectorAll('.gender-item');
const genderInput = document.getElementById('gender-input');
const timeItems = document.querySelectorAll('input[name="time"]');
const pageItems = document.querySelectorAll('.page-item');
const pageInput = document.getElementById('page-input');
const filterDoctor = document.getElementById('filter-doctor');
if (specialtyItems) {
    specialtyItems.forEach(specialtyItem => {
        specialtyItem.addEventListener('click', () => {
            specialtyInput.value = specialtyItem.textContent.trim();
        })
    })
    document.addEventListener('click', (event) => {
        const doctorItem = event.target.closest('.doctor-item');
        if (!doctorItem) {
            return;
        }
        doctorInput.value = doctorItem.textContent.trim();
    })

    provinceItems.forEach(provinceItem => {
        provinceItem.addEventListener('click', () => {
            provinceInput.value = provinceItem.textContent.trim();
        })
    })

}
if (doctorInput && specialtyInput && provinceInput && specialtyItems && doctorItems && provinceItems && doctorsList && filterBtn) {


    orderByItems.forEach(orderByItem => {
        orderByItem.addEventListener('click', () => {
            orderByInput.value = orderByItem.dataset.orderBy;
        })
    })
    genderItems.forEach(genderItem => {
        genderItem.addEventListener('click', () => {
            genderInput.value = genderItem.querySelector('input').value;
        })
    })
    document.addEventListener('click', (event) => {
        const pageItem = event.target.closest('.page-item');

        if (!pageItem) {
            return;
        }

        pageInput.value = pageItem.dataset.page;
        loadDoctorAjax()
    });
    document.addEventListener('click', (event) => {
        const pageItem = event.target.closest('#previous-btn-page');

        if (!pageItem) {
            return;
        }

        pageInput.value = pageItem.dataset.pagePrevious;
        loadDoctorAjax()
    });
    document.addEventListener('click', (event) => {
        const pageItem = event.target.closest('#next-btn-page');

        if (!pageItem) {
            return;
        }

        pageInput.value = pageItem.dataset.pageNext;
        loadDoctorAjax()
    });


    async function loadDoctorAjax() {

        const params = new URLSearchParams()

        if (doctorInput.value) {
            params.set('doctor', doctorInput.value);
        }
        if (specialtyInput.value) {
            params.set('specialty', specialtyInput.value);
        }
        if (provinceInput.value) {
            params.set('province', provinceInput.value);
        }
        if (orderByInput.value) {
            params.set('order-by', orderByInput.value);
        }
        if (genderInput.value) {
            params.set('gender', genderInput.value);
        }
        if (pageInput) {
            params.set('page', pageInput.value);
        }
        const selectedTimes = [];

        timeItems.forEach(timeItem => {
            if (timeItem.checked) {
                selectedTimes.push(timeItem.value);
            }
        });

        selectedTimes.forEach(time => {
            params.append('time', time);
        });

        const url = `/doctors-list?${params.toString()}`;
        const response = await fetch(url, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const html = await response.json();
        history.pushState({}, "", url)

        doctorsList.innerHTML = html.doctors;
        filterDoctor.innerHTML = html.filter_doctors
        lucide.createIcons();


    }

    removeFilterBtn.addEventListener('click', () => {

        doctorInput.value = '';
        specialtyInput.value = '';
        provinceInput.value = '';
        orderByInput.value = '';
        genderInput.value = '';
        if (pageInput) {
            pageInput.value = '';
        }
        timeItems.forEach(timeItem => {
            timeItem.checked = false;
        });
        loadDoctorAjax();
    });
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            loadDoctorAjax()
        })
    }
    if (filterBtn2) {
        filterBtn2.addEventListener('click', () => {
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
const startTime = document.getElementById('id_start_time');
const endTime = document.getElementById('id_end_time');
const idEditEndTime = document.getElementById('id_edit_end_time');
const idEditStartTime = document.getElementById('id_edit_start_time');
const exception_end_time = document.getElementById('id_exception_end_time');
const exception_start_time = document.getElementById('id_exception_start_time');
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
    flatpickr(idEditEndTime, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        allowInput: false,
    });
    flatpickr(idEditStartTime, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        allowInput: false,
    });
    flatpickr(exception_start_time, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        allowInput: false,
    });
    flatpickr(exception_end_time, {
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

// management working hour ajax

async function loadedScheduleWorkAjax() {
    const managementHoursWorkForm = document.getElementById('management-hours-work-form');
    const listManagementWorking = document.getElementById('list-management-working');
    const formData = new FormData(managementHoursWorkForm);
    const response = await fetch('/doctor-panel', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    });
    const html = await response.json()
    listManagementWorking.innerHTML = html.list_management_working

}

// const sendManagementHours = document.getElementById('');

document.addEventListener('click', (event) => {
    const sendManagementHours = event.target.closest('#send-management-hours');
    if (!sendManagementHours) {
        return
    }
    loadedScheduleWorkAjax();

})

// edit working hours
const editPeriodBtn = document.getElementById('edit-period-btn');

let periodId = null;
let currentDayId = null;

document.addEventListener('click', (event) => {

    const editAppoimentDay = event.target.closest('.edit-appoiment-day');

    if (!editAppoimentDay) {
        return;
    }

    periodId = editAppoimentDay.dataset.period;
    currentDayId = editAppoimentDay.dataset.dayId;

    dayModal.classList.remove(
        'invisible',
        'opacity-0',
        'pointer-events-none'
    );

    dayModal.classList.add(
        'visible',
        'opacity-100',
        'pointer-events-auto'
    );
});

function closeDayModalEdit() {

    dayModal.classList.remove(
        'visible',
        'opacity-100',
        'pointer-events-auto'
    );

    dayModal.classList.add(
        'invisible',
        'opacity-0',
        'pointer-events-none'
    );

    body.style.overflow = 'auto';

    if (typeof overlay !== 'undefined' && overlay) {

        overlay.classList.remove(
            'visible',
            'opacity-100',
            'pointer-events-auto'
        );

        overlay.classList.add(
            'invisible',
            'opacity-0',
            'pointer-events-none'
        );
    }
}

if (editPeriodBtn) {

    editPeriodBtn.addEventListener('click', async () => {

        if (!periodId) {
            return;
        }

        const formEl = dayModal.tagName === 'FORM'
            ? dayModal
            : dayModal.querySelector('form');

        if (!formEl) {
            return;
        }

        const formData = new FormData(formEl);

        try {

            const response = await fetch(
                `/edite-period-appointment/${periodId}`,
                {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: formData,
                }
            );

            const result = await response.json();

            if (result.success) {

                const container = document.getElementById(
                    `period-container-${result.day_id}`
                );

                if (container) {
                    container.innerHTML = result.list_management_working;
                }

                closeDayModalEdit();

                periodId = null;
                currentDayId = null;

            } else {

                alert(result.message || 'خطایی رخ داد');

            }

        } catch (error) {

            console.error('Error:', error);
            alert('ارتباط با سرور برقرار نشد');

        }
    });
}


// add exception day

async function addExceptionDay() {
    const formData = new FormData(exceptionModal);

    const response = await fetch('/exception-day', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    });

    const result = await response.json();
    lucide.createIcons();


    const exceptionDayContainer = document.getElementById('exception-day-container');

    if (result.success) {
        exceptionDayContainer.innerHTML = result.exception_day;
    }
}


document.addEventListener('click', (event) => {
    const saveExceptionDayBtn = event.target.closest('#save-exception-day-btn');
    if (!saveExceptionDayBtn) {
        return;
    }
    addExceptionDay();
    exceptionModal.classList.remove('visible', 'opacity-100', 'pointer-events-auto');
    exceptionModal.classList.add('invisible', 'opacity-0', 'pointer-events-none');
    overlay.classList.remove('visible', 'opacity-100');
    overlay.classList.add('invisible', 'opacity-0');
    body.style.overflow = 'auto';
});

// delete exception day
async function deleteException(deleteExceptionIcon) {

    const exceptionId = deleteExceptionIcon.dataset.exceptionId;

    const response = await fetch('/delete-exception-day/' + exceptionId, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    const result = await response.json();

    const exceptionDayContainer =
        document.getElementById('exception-day-container');

    exceptionDayContainer.innerHTML = result.exception_day;
    lucide.createIcons();

}

document.addEventListener('click', (event) => {
    const deleteExceptionIcon = event.target.closest('.delete-exception-icon');

    if (!deleteExceptionIcon) {
        return;
    }
    deleteException(deleteExceptionIcon);
});

//edit profile with ajax request
async function editProfileAjax() {
    const profileForm = document.getElementById('profile-form');
    const formData = new FormData(profileForm);

    const response = await fetch('/edit-profile-doctor', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    })
    const result = await response.json()
    const doctorProfile = document.getElementById('doctor-profile');
    doctorProfile.innerHTML = result.profile_doctor;
    console.log(result.profile_doctor)
}

document.addEventListener('click', (event) => {
    const changeProfileBtn = event.target.closest('#change-profile-btn')
    if (!changeProfileBtn) {
        return
    }
    editProfileAjax()
})

//pagination for appointment

document.addEventListener('click', async (event) => {

    const rangePageAppointment =
        event.target.closest('.range-page-appointment');

    if (!rangePageAppointment) {
        return;
    }

    const page = rangePageAppointment.dataset.pageAppointment;

    const response = await fetch('/doctor-panel?page=' + page, {
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    const result = await response.json();

    const appointmentList = document.getElementById('appoiment');

    appointmentList.innerHTML = result.appointment_list;

    lucide.createIcons();
});

document.addEventListener('click', async (event) => {

    const editButton = event.target.closest('.open-edit-state');

    if (!editButton) {
        return;
    }

    const appointmentId = editButton.dataset.appointmentId;

    const response = await fetch(
        `/appointment/${appointmentId}/`,
        {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        }
    );

    const result = await response.json();

    if (!result.success) {
        return;
    }

    const appointment = result.appointment;

    document.getElementById('sm-name').textContent =
        appointment.name;

    document.getElementById('sm-meta').textContent =
        `${appointment.date}، ${appointment.start_time} — ویزیت حضوری`;

    const statusInputs =
        document.querySelectorAll('#editStatusModal input[name="status"]');

    statusInputs.forEach(input => {
        input.checked = input.value === appointment.status;
    });

    const editStatusModal =
        document.getElementById('editStatusModal');

    editStatusModal.classList.remove(
        'invisible',
        'opacity-0',
        'pointer-events-none'
    );

    editStatusModal.dataset.appointmentId = appointment.id;
});


document.addEventListener('click', (event) => {

    if (
        event.target.closest('#closeEditStatusModal') ||
        event.target.closest('#closeEditStatusModal2')
    ) {
        editStatusModal.classList.add(
            'invisible',
            'opacity-0',
            'pointer-events-none'
        );
    }

});

document.addEventListener('click', async (event) => {

    const saveButton = event.target.closest('#saveAppointmentStatus');

    if (!saveButton) {
        return;
    }

    const editStatusModal = document.getElementById('editStatusModal');

    const appointmentId = editStatusModal.dataset.appointmentId;

    const selectedStatus = document.querySelector(
        '#editStatusModal input[name="status"]:checked'
    );

    if (!selectedStatus) {
        return;
    }

    const formData = new FormData();
    formData.append('status', selectedStatus.value);

    const response = await fetch(
        `/appointment/${appointmentId}/update-status/`,
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: formData,
        }
    );

    const result = await response.json();

    if (!result.success) {
        console.log(result.errors);
        return;
    }

    // آپدیت وضعیت همان ردیف جدول
const appointmentRow = document.querySelector(
    `[data-appointment-row="${appointmentId}"]`
);

if (!appointmentRow) {
    console.log('Appointment row not found:', appointmentId);
    return;
}

const statusElement =
    appointmentRow.querySelector('.appointment-status');

if (!statusElement) {
    console.log('Status element not found:', appointmentId);
    return;
}

statusElement.textContent =
    result.appointment.status_display;

    // بستن Modal
    editStatusModal.classList.add(
        'invisible',
        'opacity-0',
        'pointer-events-none'
    );
});

// show detail patient
document.addEventListener('click', (event) => {

    const detailPatientBtn =
        event.target.closest('.detail-patient');

    if (!detailPatientBtn) {
        return;
    }

    async function detailPatientAjax() {

        const getPatientId =
            detailPatientBtn.dataset.patientId;

        const response = await fetch(
            '/detail-patient/' + getPatientId,
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        );

        const result = await response.json();

        const patientDetailsModal =
            document.getElementById('patientDetailsModal');

        patientDetailsModal.innerHTML =
            result.detail_patient;
    }

    detailPatientAjax();
});


document.addEventListener('click', async (event) => {

    // نمایش جزئیات نوبت برای لغو
    const cancelAppoimentBtn =
        event.target.closest('.cancel-appoiment-btn');

    if (cancelAppoimentBtn) {

        const appointmentId =
            cancelAppoimentBtn.dataset.appointmentId;

        const response = await fetch(
            '/show-canceld-detail/' + appointmentId,
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        );

        const result = await response.json();

        const cancelModal =
            document.getElementById('cancelModal');

        cancelModal.innerHTML =
            result.detail_cancel;

        return;
    }


    // تایید لغو نوبت
    const confirmCancelBtn =
        event.target.closest('#confirm-cancel-btn');

    if (confirmCancelBtn) {

        const appointmentId =
            confirmCancelBtn.dataset.deleteAppointmentId;

        const response = await fetch(
            '/delete-appointment/' + appointmentId,
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        );

        const result = await response.json();

        if (!result.success) {
            return;
        }

        // بروزرسانی لیست نوبت‌ها
        const appointmentList =
            document.getElementById('appoiment');

        appointmentList.innerHTML =
            result.list_appointment;


        // بستن مودال
        const cancelModal =
            document.getElementById('cancelModal');

        cancelModal.classList.remove(
            'visible',
            'opacity-100',
            'pointer-events-auto'
        );

        cancelModal.classList.add(
            'invisible',
            'opacity-0',
            'pointer-events-none'
        );

        overlay.classList.remove(
            'visible',
            'opacity-100'
        );

        overlay.classList.add(
            'invisible',
            'opacity-0'
        );

        body.style.overflow = 'auto';
    }

});

// edit profile user panel

async function editProfileUserPanelAjax() {
    const profileForm = document.getElementById('user-panel-profile-form');
    const formData = new FormData(profileForm);

    const response = await fetch('/edit-profile-user', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    })
    const result = await response.json()
    const userProfile = document.getElementById('manage-visit-time');
    userProfile.innerHTML = result.profile_user;
}

document.addEventListener('click', (event) => {
    const changeProfileBtn = event.target.closest('#change-profile-user-btn')
    if (!changeProfileBtn) {
        return
    }
    editProfileUserPanelAjax()
})

// add remove a doctor from favorite list

document.addEventListener('click', (event)=>{
    const addRemoveFavorite = event.target.closest('.add-remove-favorite');
    if (!addRemoveFavorite) {
        return;
    }
    async function favoriteDoctorAjax(){
        const doctorId = addRemoveFavorite.dataset.doctorId;
        const response = await fetch('/add-remove-favorite/' + doctorId, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const result = await response.json();
        const textFavorite = document.getElementById('text-favorite');
        textFavorite.textContent = result.message;
    }
    favoriteDoctorAjax();
})

document.addEventListener('click', (event)=>{
    const RemoveFavorite = event.target.closest('#remove-favorite-btn');
    if (!RemoveFavorite) {
        return;
    }
    async function favoriteDoctorAjax(){
        const favoriteId = RemoveFavorite.dataset.favoriteId;
        const response = await fetch('/remove-favorite/' + favoriteId, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const result = await response.json();
        const favoriteList = document.getElementById('favorite-list');
        favoriteList.innerHTML = result.favorite_list;
        lucide.createIcons();

    }
    favoriteDoctorAjax();
})