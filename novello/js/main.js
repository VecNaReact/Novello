
//! Scroll для ссылок 
$('.intro__scroll-down a ').on('click', function (e) {
    e.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top - 120;
    $('body, html').animate({scrollTop: top}, 1000);
  })
  
$('.career__tabs-btn').on('click', function (e) {
    e.preventDefault();
    setTimeout(() => {
        var id  = $(this).attr('data-tab'),
        top = $(id).offset().top - 120;
        $('body,html').animate({scrollTop: top}, 1000);
    }, 500);
  })

//???? Функции убирающие дергание при открытие модалок и всего что касается скрола
let fixBlocks = document.querySelectorAll('.fix-block');
let body = document.body;

let disableScroll = function () {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	fixBlocks.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	});
	body.style.paddingRight = paddingOffset;
    body.classList.add('disable-scroll');
}

let enableScroll = function () {
	body.classList.remove('disable-scroll');
	fixBlocks.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.style.paddingRight = '0px';
}

//! Swiper иницилизация и первоначальные настройки ---------------------------------->>>>
if (document.querySelectorAll('.swiper-container.card-product__slider-container').length > 0) {
    const mySwiper = new Swiper('.swiper-container.card-product__slider-container', {
        loop: true,
        // autoplay: true,
        observer:true,
        slidesPerView: 1,
        observeSlideChildren: true,
        observeParents: true,
        resizeObserver: true,
        navigation: {
            nextEl: '.swiper-button-next.card-product__button-next',
            prevEl: '.swiper-button-prev.card-product__button-prev',
          },
    });
}

//!!!!! Аккардион -------------------------------------------------->>>>>>>
var acc = document.getElementsByClassName("collupse");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function(e) {
      e.preventDefault();
    var panel = this.nextElementSibling;
    var coursePanel = document.getElementsByClassName("collupse-content");
    var courseAccordionActive = document.getElementsByClassName("collupse active");
    if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        this.classList.remove("active");
    } else { 
        for (var ii = 0; ii < courseAccordionActive.length; ii++) {
            courseAccordionActive[ii].classList.remove("active");
        }
        for (var iii = 0; iii < coursePanel.length; iii++) {
          this.classList.remove("active");
          coursePanel[iii].style.maxHeight = null;
        }
        panel.style.maxHeight = panel.scrollHeight + "px";
        this.classList.add("active");
    } 
  }
}
let collupseBtn = document.querySelectorAll('.footer__collupse-btn');
collupseBtn.forEach(el => {
    el.addEventListener('click', () => {
        if (!el.classList.contains('active')) {
            el.classList.remove('active')
        } else {
            el.classList.add('active')
        }
    })
})

$("[colopen-parent]").on("click", function(e){
    e.preventDefault();
    var parent = $(this).attr("colopen-parent");
    var link = $(this).attr("colopen-link");
    if($(this).closest(parent).find(link).hasClass("colopen")){
        $(this).closest(parent).find(link).removeClass("colopen");
    }
    else{
        $(link).removeClass("colopen")
        $(this).closest(parent).find(link).addClass("colopen");
    }    
})

//!!!! LANGUAGE ----------------------------------------->
let languageBtn = document.querySelectorAll('.js-language-btn');
let languageContent = document.querySelectorAll('.language__content');
languageBtn.forEach(el => {
    el.addEventListener('click', (e) => {
        languageContent.forEach(item => {
            item.classList.toggle('show');
        })
    })
})


//!!!!!! Burger start ------------------------------------------------>>>>>>
const $list = document.querySelectorAll('.js-menu-item')
const $menuIconDownMenu = document.querySelectorAll(".js-arrow-down-collupse");
const $menuShow = document.querySelectorAll(".catalog__menu-show");
$list.forEach(el =>  {
    el.addEventListener('click', function () {
        if (!el.classList.contains('active')) {
            $list.forEach(item => {item.classList.remove('active')})
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
     
    })
})

$menuIconDownMenu.forEach((el, index) => {
    el.addEventListener('click', (e) =>  {
      $menuShow.forEach(elem => {
        if (elem !== $menuShow[index]) {
          elem.classList.remove('active');
        }
        });
    if ($menuShow[index].classList.contains('active')) {
            $menuShow[index].classList.remove('active');
    } else {
            $menuShow[index].classList.add('active');
        }
    });
  });


// //!!!!!! Бургер меню ------------------------------------------------>>>>>>
if (document.querySelectorAll(".burger").length > 0) {
  const $body = document.querySelector("body"),
      $menuButton = document.querySelector(".burger"),
      $menu = document.querySelector(".menu__catalog"),
      $menuShow = document.querySelectorAll(".menu__show");

  $menuButton.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        $menu.classList.remove("active");
        $body.style.overflow = "";
        let checkWidth = window.innerWidth + 'px';
        console.log(checkWidth);
        
        enableScroll();

      } else if (!this.classList.contains("active")) {
          disableScroll();
          this.classList.add("active");
          $menu.classList.add("active");
          $body.style.overflow = "hidden";
          $menuShow.forEach((el) => {
              el.classList.remove("active");
          });
      }
  });
}

//!!!!!! Burger end------------------------------------------------>>>>>>

//!!!!!!!! Popup -------------------------------------------->>>>>>>4

;(function() {
    var body = document.querySelector('body');
    var closestItemByClass = function(item, className) {
        var node = item;
        while(node) {
            if (node.classList.contains(className)) {
                return node;
            }
            node = node.parentElement;
        }
        return null;
    };
    var closestAttr = function(item, attr) {
        var node = item;
        while(node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }
            node = node.parentElement;
        }
        return null;
    };
  
  
    //! Открытие попапа
    var showPopup = function (target) {
        target.classList.add('active');
    }
  
    //! Закрытие попапа
    var closePopup = function (target) {
        target.classList.remove('active');
    }
   
    body.addEventListener('click', function (e) {
        var target = e.target;
        var popupClass =  closestAttr(target, 'data-popup');
        if (popupClass === null) {
            return;
        }
        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);
  
        if (popup) {
            disableScroll();
            showPopup(popup);
            body.style.overflow = 'hidden'
        } 
    })
    
    //! Закрытие по ESQ
    body.addEventListener('keydown', function (e) {
       if (e.keyCode !==27) {
           return;
       }
       var popup = document.querySelector('.popup.active')
       if (popup)  {
           enableScroll();
           closePopup(popup);
           body.style.overflow = '';
       }
    })
    
    //! Закрытие вне contenta (по крестики и по области)
    body.addEventListener('click', function (e) {
       var target = e.target;
  
       if (target.classList.contains('popup__btn-close') ||
            target.classList.contains('popup__inner') 
       ) {
            var  popup  = closestItemByClass(target, 'popup');
            enableScroll();
            closePopup(popup);
            body.style.overflow = '';
       }
     })
  }) ();
//!!!!!!!! Popup end -------------------------------------------->>>>>>>

//! Tabs  -------------------------------------->>>>>>
const $tabsBtn = document.querySelectorAll('.tabs__btn');
const $tabsItem = document.querySelectorAll('.tabs__content');
if (document.querySelectorAll('.tabs__btn').length > 0) {
    const onTabClick = (item) => {
        item.addEventListener('click', () => {
            let curentBtn = item;
            let tabId = curentBtn.getAttribute('data-tab');
            let currentTab = document.querySelector(tabId);
            
            if (!curentBtn.classList.contains('active')){
                $tabsBtn.forEach((item) => {
                    
                    item.classList.remove('active');
                })
                $tabsItem.forEach((item) => {
                    item.classList.remove('active');
                })
        
                curentBtn.classList.add('active');
                currentTab.classList.add('active');
            }
           
        })
    }
    
    $tabsBtn.forEach(onTabClick);
    document.querySelector('.tabs__btn').click();
    
}
//! Tabs end  -------------------------------------->>>>>>
jQuery(document).ready(function () {
    jQuery('.questions__aside, .card-product__left, .cabinet__aside, .order__info, .cart__right').theiaStickySidebar({
        additionalMarginTop: 20
    });
  });

// Basket
  $('.shop__basket').click(function(e){
    e.preventDefault();
    disableScroll();
	$('body').css('overflow', 'hidden');
	$('body,html').animate({scrollTop: top});
	$('#cartIcon').fadeToggle();
})

$('.overlay-close').click(function (e){
	$('body').css('overflow', '');
    $('#cartIcon').fadeToggle(); 
    enableScroll();
})

$('.basket-close').click(function() {
    enableScroll();
	$('body').css('overflow', '');
     $('#cartIcon').fadeToggle();  
})


var passwordEnter = document.querySelectorAll('.password-enter');

function toggleShowing(input) {
    input.getAttribute('type') === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
}

//TODO JS под логику инпутов и форм

//! Пароль скрыть показать
let seePasswored = document.querySelectorAll('.see-password');
seePasswored.forEach(el => {
  el.addEventListener('click', function () {
    el.classList.toggle('active');
    const parent = el.closest('.autification__form-group, .form-main__group, .main-form__group');
    const input = parent.querySelector('.password-enter');
    toggleShowing(input);
  })
}, false)
//! Пароль скрыть показать end

//! Показать, удалить форму
let addFormBtn = document.getElementById('addForm');
let formAdd = document.querySelector('.main-form__add-new-form');
if (document.querySelectorAll('.main-form__add-new-form').length > 0) {
    addForm.addEventListener('click', function (e) {
        e.preventDefault();
        if (addFormBtn.classList.contains('active')) {
            addFormBtn.classList.remove('active');
            addFormBtn.textContent = 'Добавить'
          
        } else {
            addFormBtn.textContent = 'Удалить'
            addFormBtn.classList.add('active');
        }
        formAdd.classList.toggle('show')
    })
}

//! Показать, удалить форму end 

//! ChangeBTN readOnly
let changeBtn = document.querySelectorAll('.main-form__item-edit');
let changeInput = document.querySelectorAll('.change-input');

changeBtn.forEach((el, index) => {
    el.addEventListener('click', (e) =>  {
        e.preventDefault();
        el.innerHTML = 'Применить'
    if (changeInput[index].hasAttribute('readOnly')) {
        changeInput[index].removeAttribute('readOnly');
        
    } else {
        changeInput[index].setAttribute('readOnly', '');
         el.innerHTML = 'Редактировать'
        }
    });
  });
 //! ChangeBTN readOnly end

