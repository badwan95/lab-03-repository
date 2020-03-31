'use strict';
$(document).ready(function() {
    // Constructor function for gallery items
    let existingKeywords = [];
    function Gallery(item) {
      this.image_url = item.image_url;
      this.title = item.title;
      this.description = item.description;
      this.keyword = item.keyword;
      this.horns = item.horns;
    }
    // To render the images and their title and description to the HTML
    Gallery.prototype.render = function() {
        let $galleryCopy = $('#photo-template').clone();
        $('#photo-template section').remove();
        $galleryCopy.find('h2').text(this.title);
        $galleryCopy.find('img').attr('src',this.image_url);
        $galleryCopy.removeAttr('id');
        $galleryCopy.find('p').text(this.description);
        // $galleryCopy.attr('id', this.keyword)
        $galleryCopy.attr('class', `${this.keyword} visible`);
        $('main').append($galleryCopy);
    }
    // To render the unique filter options depending on the keyword
    Gallery.prototype.renderFilter = function () {
        if (!existingKeywords.includes(this.keyword)) {
            existingKeywords.push(this.keyword);
            let $optionCopy = $('option:first').clone();
            $optionCopy.attr('value',this.keyword);
            $optionCopy.text(this.keyword);
            $('select').append($optionCopy);
        }
    }
    // TO GET THE INFO INSIDE JSON FILE
    const getJson = function(){
        $.ajax('./data/page-1.json', {method: 'get', dataType: 'JSON'}).then(data => {
            console.log(data);
            data.forEach(value => {
                let galleryPicture = new Gallery(value)
                console.log(galleryPicture);
                galleryPicture.render();
                galleryPicture.renderFilter();
            })
        })
    }
    getJson();
    //Event listener for the filter
    $('select').on('change', function(){
        $('section').removeClass('visible');
        let $buttonValue = $('select option:selected').val();
        $(`[class*=${$buttonValue}]`).addClass('visible');        
    })
});
