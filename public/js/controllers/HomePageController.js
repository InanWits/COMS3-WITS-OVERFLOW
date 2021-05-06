$(window).on('load', () => {

    let currentlySelected = null;
    let isNavOpen = false;

    const iFrame = $('#content-holder');
    const asideItems = $('.aside-item');
    const header = $('header');
    const section = $('section');

    const openNav = () => {
        isNavOpen = true;
        nav.width(250);
        header.css('margin-left', "250px");
        section.css('margin-left', "250px");
    };

    const closeNav = () => {
        isNavOpen = false;
        nav.width(0);
        header.css('margin-left', "0");
        section.css('margin-left', "0");
    };

    //gets the base URL
    const getAppBaseUrl = () => {
        let baseUrl = window.location.origin; //gets base url e.g.http://localhost:63343
        let pathName = window.location.pathname; //gets the path from root to current folder e.g. /COMS3-WITS-OVERFLOW/public/html/HomePage.html

        /*the main thing we care about from the path name
        * is the path from the root to the html folder*/
        pathName = pathName.split('html');
        pathName = pathName[0]; ///COMS3-WITS-OVERFLOW/public/

        baseUrl = `${baseUrl}${pathName}`;
        return baseUrl;
    };

    asideItems.on('click', (e) => {
        if (currentlySelected != null){
            currentlySelected.classList = ['aside-item'];
        }
        e.currentTarget.classList = ['aside-item-selected'];
        currentlySelected = e.currentTarget;

        //get the attached URL
        const attachedUrl = e.currentTarget.getAttribute('data-target-url');
        const targetUrl = `${getAppBaseUrl()}${attachedUrl}`;

        //console.log(targetUrl);
        //open the target page in the iFrame
        iFrame.attr('src', targetUrl);
    });

    //select the first item by default
    asideItems[0].click();

    //create a reference to navigation and close button
    const nav = $('#nav');
    const closeNavBtn = $('#aside-back');

    closeNavBtn.on('click', () => {
        closeNav();
    });

    //create a reference to navigation button
    const navButton = $('#nav-button');
    navButton.on('click', () => {
        if (isNavOpen){
            closeNav();
        }
        else{
            openNav();
        }
    });

    //have the navigation open by default
    openNav();


});
