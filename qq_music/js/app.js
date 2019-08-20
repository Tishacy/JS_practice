// 由于音乐项目是动态创建的，因此每个音乐项中的事件都需要使用事件委托才能添加上
// 音乐选项
$('.content-list').delegate(".music-item", "mouseenter", function () {
    $(this).toggleClass('hovered');
    $(this).find('.item-menu').stop().show();
    $(this).find('.delete').stop().show();
    $(this).find('.item-time span').stop().hide();
});
$('.content-list').delegate(".music-item", "mouseleave", function () {
    $(this).toggleClass('hovered');
    $(this).find('.item-menu').stop().hide();
    $(this).find('.delete').stop().hide();
    $(this).find('.item-time span').stop().show();
})

// 复选框
$('.content-list').delegate('.music-item .item-check i', "click", function () {
    $(this).toggleClass('checked');
});

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

// 更新音乐序号
function updateMusicNumber() {
    $musicList = $('.music-item');
    for (let i=0; i<$musicList.length; i++) {
        console.log($musicList);
        $musicList.eq(i).find('.item-number').text(i+1);
    }
}

// 删除音乐
$('.content-list').delegate('.delete', "click", function () {
    let $musicItem = $(this).parents('.music-item'),
        $musicList = $('.music-item'),
        itemNumber = parseInt($musicItem.find('.item-number').text());
    if ($musicItem.hasClass("playing")) {
        stopMusic($musicItem);
        playMusic($musicItem.next());
    }
    $musicItem.remove();
    updateMusicNumber();
});
$('.toolbar .delete').click(function () {
    $('.item-check .checked').parents('.music-item').remove();
    $('.list-title .item-check i').removeClass('checked');
    updateMusicNumber();
})

// 清空列表
$('.toolbar .clear').click(function () {
    $('.music-item').remove();
})


function getPlayerList() {
    return $.ajax({
        url: "./source/musiclist.json",
        dataType: "json",
        success: function (data) {
            musicList = data;
            let $musicList = $('.content-list ul .mCSB_container');
            for (let i=0; i<data.length; i++) {
                let musicItem = data[i],
                    $musicItem = createMusicItem(i, musicItem);
                $musicList.append($musicItem);
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
}

// 创建一个音乐dom元素
function createMusicItem(index, elem) {
    return $(` <li class="content-item music-item">
            <div class="item-check sub-item"><i> </i></div>
            <div class="item-number sub-item">${index+1}</div>
            <div class="item-name sub-item">
                <div class="item-menu" style="display: none;">
                    <a href="javascript:;" class="option play" title="播放">▷</a>
                    <a href="javascript:;" class="option add" title="添加">╋</a>
                    <a href="javascript:;" class="option download" title="下载">⇩</a>
                    <a href="javascript:;" class="option share" title="分享">S</a>
                </div>
                <span title="${elem.name}">${elem.name}</span>
            </div>
            <div class="item-singer sub-item">
                <a href="javascript:;" class="singer">${elem.singer}</a>
            </div>
            <div class="item-time sub-item">
                <a href="javascript:;" class="option delete" title="删除" style="display: none;">✕</a>
                <span>${elem.time}</span>
            </div>
        </li>`);
}


// 播放音乐
function playMusic($musicItem) {
    let musicIndex = parseInt($musicItem.find('.item-number').text())-1,
        musicItem = musicList[musicIndex];
        musicName = musicItem.name;
        musicSinger = musicItem.singer,
        musicTime = musicItem.time,
        musicCover = musicItem.cover,
        musicAlbum = musicItem.album;

    // 音乐项中的变化
    $musicItem.find('.option.play').text("Ⅱ");
    $musicItem.addClass("playing");
    $musicItem.siblings().find('.option.play').text("▷");
    $musicItem.siblings().removeClass("playing");
    $('.content-item .item-check i').removeClass("checked");

    // 底部变化
    $('.footer-content .button.play').addClass("playing");
    $('.footer-content .music-info .music-name').text(musicName);
    $('.footer-content .music-info .music-singer').text(musicSinger);
    $('.footer-content .music-info .music-progress-time .totalTime').text(musicTime);

    // album变化
    $('.song-img').css('background-image', `url(${musicCover})`);

    // 歌曲信息和歌词变化
    $('.song-info .name').text(musicName);
    $('.song-info .singer').text(musicSinger);
    $('.song-info .album').text(musicAlbum);
    $('.lyric-list .lyric-item.current-lyric').text('此歌曲为没有填词的纯音乐，请您欣赏');
    
    // 背景变化
    $('.bg').css('background-image', `url(${musicCover})`);
}
// 音乐终止
function stopMusic($musicItem) {
    $musicItem.find(".option.play").text("▷");
    $musicItem.removeClass("playing");
    $('.footer-content .button.play').removeClass("playing");
}
// 音乐暂停
function pauseMusic($musicItem) {
    $musicItem.find(".option.play").text("▷");
    $musicItem.removeClass("playing");
    $musicItem.addClass("paused");
    $('.footer-content .button.play').removeClass("playing");
}


// 双击播放
$('.content-list').delegate('.music-item', "dblclick", function () {
    playMusic($(this));
})

// 音乐项中的播放按钮
$('.content-list').delegate('.option.play', 'click', function () {
    let $musicItem = $(this).parents(".music-item");
    if ($(this).text() == "▷") {
        // 播放音乐
        playMusic($musicItem);
    }else {
        // 暂停音乐
        stopMusic($musicItem);
    }
});

// 底部的播放按钮
$('.footer-content .button.play').click(function () {
    // 播放选中的第一个音乐
    if (!$(this).hasClass("playing")) {
        let $selectedMusic = $('.music-item .item-check i.checked').eq(0).parents('.music-item');
        if ($selectedMusic.length === 0) {
            let $firstMusic = $('.music-item').eq(0);
            playMusic($firstMusic);
        }else {
            playMusic($selectedMusic);
        }
    }else {
        let $playingMusic = $('.music-item.playing');
        pauseMusic($playingMusic);
    }
})

// 上一首
$('.footer-content .button.prev').click(function () {
    let $playingMusic = $('.music-item.playing'),
        $playingMusicIndex = parseInt($playingMusic.find('.item-number').text()) - 1;
    if ($playingMusicIndex == 0) {
        let $lastMusic = $('.music-item').eq(musicList.length - 1);
        playMusic($lastMusic);
    }else {
        playMusic($playingMusic.prev());
    }
})

// 下一首
$('.footer-content .button.next').click(function () {
    let $playingMusic = $('.music-item.playing'),
        $playingMusicIndex = parseInt($playingMusic.find('.item-number').text()) - 1;
    if ($playingMusicIndex == musicList.length - 1) {
        let $firstMusic = $('.music-item').eq(0);
        playMusic($firstMusic);
    }else {
        playMusic($playingMusic.next());
    }
})

// 加载歌曲
var musicList;
getPlayerList();