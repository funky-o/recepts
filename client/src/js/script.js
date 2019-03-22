import $ from "jquery";


(function () {
  $(document).ready(function () {
    $('#cssmenu').prepend('<div id="menu-button">Menu</div>');
    $('#cssmenu #menu-button').on('click', function () {
      var menu = $(this).next('ul');
      if (menu.hasClass('open')) {
        menu.removeClass('open');
      }
      else {
        menu.addClass('open');
      }
    });

  });

  $('.js-link-show-items').on('click', function() {
    var info = $(this).attr('data-info');
    window.location.href = `recepts.html?show-recepts=${info}`;
  });

  var urlParams = new URLSearchParams(window.location.search);
  var showItems = urlParams.get('show-recepts');
  var localLink = 'http://localhost:5000';
  var webLink = 'https://warm-hollows-53332.herokuapp.com';
  
  var showItem = urlParams.get('id');

  if (showItem) {
    $.ajax({
      type: 'GET',
      url: `${webLink}/api/data/getRecept?find=${showItems}&id=${showItem}`,
      async: false,
      success: function(element) {
        console.log(element);
        var recept = element;
        console.log(recept);
        $('.item-img').attr('src', `images/${showItems}/${recept.src}`);
        $('.item-name').text(recept.name);
        $('.item-description').text(recept.description);
    
        var needItemsItem = $('.needItems-item').detach();
        var needForDoItem = $('.needForDo-item').detach();
    
        recept['needItems'].forEach(function(text) {
          var newItem = needItemsItem.clone();
          newItem.text(text);
          $('.needItems').append(newItem);
        });
    
        recept['needForDo'].forEach(function(text, i) {
          var newItem = needForDoItem.clone();
          newItem.html(`<strong>${i+1}</strong>: ${text}`);
        $('.needForDo').append(newItem);
        });
        
        
      },
      error: function(error){
        console.log("Ошибка", error);
      }
    });
  } else if (showItems) {
    $.ajax({
      type: 'GET',
      url: `${webLink}/api/data/getRecepts?find=${showItems}`,
      async: false,
      success: function(data) {
        console.log(data);
        var arrayRecepts = data;
        var block = $('.js-keep');
        var template = $('.js-save').detach();
        arrayRecepts.forEach(function(element) {
          var cloneTemplate = template.clone();
          cloneTemplate.attr('data-id', element.id);
          cloneTemplate.attr('data-recepts', showItems);
          cloneTemplate.find('.item-img').attr('src', `images/${showItems}/${element.src}`);
          cloneTemplate.find('.item-name').text(element.name);
          cloneTemplate.find('.item-description').text(element.description);
          block.append(cloneTemplate);
        });
      },
      error: function(error){
        console.log("Ошибка", error);
      }
    });
  }

  
  $(document).on('click', '.js-save', function() {
    var id = $(this).attr('data-id');
    window.location.href = `recept.html?show-recepts=${showItems}&id=${id}`;    
  });

  $('.js-btn-one').on('click', function() {
    window.location.href = `recept.html?show-recepts=snacks&id=7`;    

  });

  $('.js-btn-two').on('click', function() {
    window.location.href = `recept.html?show-recepts=salads&id=9`;    
  });


})();
