jQuery(document).ready(function($){

    $.BEMsyntax({
        elem: '__',
        modBefore: '--',
        modKeyVal: '_' 
    });

    $('.toggle-popup').click(function(e){
        $(e.currentTarget.parentElement).children(".popup").setMod('popup', 'active', true);
    });

    $('.popup__close').click(function(e){
        $(e.currentTarget.parentElement.parentElement).setMod('popup', 'active', false);
    })
});