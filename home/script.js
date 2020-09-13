$(document).ready(function() 
{
  //Parallax
  setTimeout(function()
  {
    $('#parallax-background').parallax({imageSrc: 'img/bg.png'});
  }, 250);

  //Scroll para seções
  let btnScroll = $('.slow-scroll');

  let inicioPagina = $('#nav-container');
  let contactSection = $('#contact-area');
  let freeInfo = $('#informacao-free');
  let proInfo = $('#informacao-pro');

  let scrollTo = '';

  $(btnScroll).click(function()
  {
    let btnId = $(this).attr('id');
    if(btnId == 'contact-menu')
    {
      scrollTo = contactSection;
    }
    else if(btnId == 'free-info')
    {
      scrollTo = freeInfo;
    }
    else if(btnId == 'pro-info')
    {
      scrollTo = proInfo;
    }
    else if(btnId == 'inicio-menu')
    {
      scrollTo = inicioPagina;
    }
    
    $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(scrollTo).offset().top - 70
    }, 750);
  });

  $('img').on('dragstart', function(event) { event.preventDefault(); });
});