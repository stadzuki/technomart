function addBookmark(obj) {
    const bookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
    bookmark.push(obj)
    localStorage.setItem('bookmark', JSON.stringify(bookmark))
    loadBookmark();
}

function loadBookmark() {
    let bookmarkItemsCount;
    
    if(localStorage.getItem('bookmark') === null) {
        bookmarkItemsCount = 0;
    } else {
        bookmarkItemsCount = JSON.parse(localStorage.getItem('bookmark')).length;
    }

    document.querySelector('.bookmarks > span').textContent = bookmarkItemsCount;
}

export {addBookmark, loadBookmark}