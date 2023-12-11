document.addEventListener('DOMContentLoaded', function(){
  const toggleMenu = document.querySelector('#toggle-menu');
  const headerMenu = document.querySelector('#header-menu');
  const bodyLock = document.body;

  // Mobile nav
  toggleMenu.addEventListener('click', function(){
    if (this.classList.contains('toggle-menu--active')) {
      this.classList.remove('toggle-menu--active');
      headerMenu.classList.remove('header-menu--active');
      bodyLock.classList.remove('lock');
    } else {
      this.classList.add('toggle-menu--active');
      headerMenu.classList.add('header-menu--active');
      bodyLock.classList.add('lock');
    }
  });

  headerMenu.addEventListener('click', function(){
    this.classList.remove('header-menu--active');
    toggleMenu.classList.remove('toggle-menu--active');
    bodyLock.classList.remove('lock');
  });

  //Receive button info
  const receiveInfo = document.querySelector('.receive-info');
  const receiveButton = document.querySelector('#receive-button');
  receiveButton.addEventListener('click', function(){
    receiveInfo.classList.toggle('receive-info--active');
  });

  //Плавная анимация скролла
  $(".header, .header-top, .package").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 600);
  });

  // Swiper
  const swiper = new Swiper('.swiper', {
      loop: false,
      speed: 1000,
      slidesPerView: 'auto',
      spaceBetween: 40,
      grabCursor: true,

      breakpoints: {
        768: {
          spaceBetween: 40
        },

        0: {
          spaceBetween: 20
        },
      },

      navigation: {
        nextEl: '#sliderNext',
        prevEl: '#sliderPrev',
      },
      
      scrollbar: {
        el: '.scrollbar',
      },
    });

  //Modals
  MicroModal.init({
    disableScroll: true,
    disableFocus: false,
    awaitOpenAnimation: true, // [8]
    awaitCloseAnimation: true, // [9]
    }); 
    
  //Tabs
  const tabs = document.querySelectorAll('[data-control="tab"]');
  tabs.forEach(function(tab){
    const tabButtons = tab.querySelectorAll('[data-control="tab-button"]');
    const tabBlocks = tab.querySelectorAll('[data-control="tab-block"]');
      
    tabButtons.forEach(function(item, index){
      item.addEventListener('click', function(){
        const contentBlocks = tab.querySelectorAll('[data-control="tab-block"]');
        const currentBlock = contentBlocks[index];
        if (!item.classList.contains('tab__nav-button--active')) {
          tabButtons.forEach(function(item){
            item.classList.remove('tab__nav-button--active');
          });

          tabBlocks.forEach(function(item){
            item.classList.remove('tab__block--active');
          });

          item.classList.add('tab__nav-button--active');
          currentBlock.classList.add('tab__block--active');
        }
      });
    });
  });

  //DropDown
  document.querySelectorAll('.dropdown').forEach(function(dropDownWrapper){
    const buttonMobile = dropDownWrapper.querySelector('.tab__nav-button-mobile');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItem = dropDownWrapper.querySelectorAll('.dropdown__list-item');

    buttonMobile.addEventListener('click', function() {
      dropDownList.classList.toggle('dropdown__list--visible');
    });

    dropDownListItem.forEach(function(item){
      item.addEventListener('click', function(event){
        event.stopPropagation();
        dropDownList.classList.remove('dropdown__list--visible');
        buttonMobile.innerHTML = `<span>${this.innerText}
        <svg class="arrow-down">
          <use href="./img/svgSprite.svg#arrow-down"></use>
        </svg>
      </span>`;
      });
    });

    document.addEventListener('click', function(event){
      if (event.target !== buttonMobile){
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });
  });
});