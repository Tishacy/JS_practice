// 音乐选项
$('.music-item').hover(function () {
    $(this).toggleClass('hovered');
    $(this).find('.item-menu').stop().show();
    $(this).find('.delete').stop().show();
    $(this).find('.item-time span').stop().hide();
}, function () {
    $(this).toggleClass('hovered');
    $(this).find('.item-menu').stop().hide();
    $(this).find('.delete').stop().hide();
    $(this).find('.item-time span').stop().show();
})

// 复选框
$('.music-item .item-check i').click(function () {
    $(this).toggleClass('checked');
})

$('.list-title .item-check i').click(function () {
    let itemCheckList = $('.content-item .item-check i'),
        len = itemCheckList.length,
        existEmpty = false;
    for (let i=0; i<len; i++) {
        let itemCheck = $(itemCheckList[i]);
        if (!itemCheck.hasClass('checked')) {
            existEmpty = true;
            break;
        }
    }
    if (existEmpty) {
        itemCheckList.addClass("checked");
    }else {
        itemCheckList.removeClass("checked");
    }
})

// 滚动
$('.content-list ul').mCustomScrollbar({
    alwaysShowScrollbar: 1,
    callbacks: {
        // onOverflowY: function () {
        //     $("div.list-title").show();
        // },
    }
});

// 删除
$('.delete').click(function () {
    $(this).parents('.music-item').remove();
})
$('.toolbar .delete').click(function () {
    $('.item-check .checked').parents('.music-item').remove();
    $('.list-title .item-check i').removeClass('checked');
})

// 清空列表
$('.toolbar .clear').click(function () {
    $('.music-item').remove();
})