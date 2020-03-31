'use strict';
let contentArray = [];
$(document).ready(function() {
    // Constructor function for gallery items
    let existingKeywords = [];
    contentArray = [];
    function Gallery(item) {
      this.image_url = item.image_url;
      this.title = item.title;
      this.description = item.description;
      this.keyword = item.keyword;
      this.horns = item.horns;
      contentArray.push(this);
    }
    // To render the images and their title and description to the HTML
    Gallery.prototype.render = function() {
        let $galleryCopy = $('#photo-template').html();
        let renderHorns = Mustache.render($galleryCopy,this);
        $('main').append(renderHorns);
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
    // TO GET THE INFO INSIDE THE FIRST JSON FILE
    const getJsonFirst = function(){
        $.ajax('./data/page-1.json', {method: 'get', dataType: 'JSON'}).then(data => {
            // console.log(data);
            data.forEach(value => {
                let galleryPictureOne = new Gallery(value)
                // console.log(galleryPictureOne);
                galleryPictureOne.render();
                galleryPictureOne.renderFilter();
            })
        })
    }
    getJsonFirst();

    // TO GET THE INFO INSIDE THE SECOND JSON FILE
    const getJsonSecond = function(){
        $.ajax('./data/page-2.json', {method: 'get', dataType: 'JSON'}).then(data => {
            console.log(data);
            data.forEach(value => {
                let galleryPictureTwo = new Gallery(value)
                // console.log(galleryPictureTwo);
                galleryPictureTwo.render();
                galleryPictureTwo.renderFilter();
            })
        })
    }
    //Event listener for page one button
    $('#firstPageButton').on('click',() =>{
        $('section').remove();
        $('option:not(:first)').remove();
        existingKeywords = [];
        contentArray = [];
        getJsonFirst();
    })

    //Event listener for page two button
    $('#secondPageButton').on('click',() =>{
        $('section').remove();
        $('option:not(:first)').remove();
        existingKeywords = [];
        contentArray = [];
        getJsonSecond();
    })


    //Event listener for the filter
    $('select').on('change', () =>{
        $('section').removeClass('visible');
        let $buttonValue = $('select option:selected').val();
        if ($buttonValue === 'default'){
            $('section').addClass('visible');
        }
        $(`[class*=${$buttonValue}]`).addClass('visible');
    })
    // Sort by number of horns
    $('#sortByHorns').on('click',()=>{
        $('section').remove();
        contentArray.sort((a,b)=>{
            return a.horns - b.horns;
        });
        contentArray.forEach(value =>{
            value.render();
        });
    })

});
