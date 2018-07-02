/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements.It ensures
 * that they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
    * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* it tests to make sure that the allFeeds variable has 
         * been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object */
         it ('should loop through allFeeds url', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined(); //ensures it has a URL defined
                expect(feed.url).not.toBe(''); //the URL is not empty
            });
         });

        /* loops through each feed in the allFeeds object
         */
         it ('should loop through allFeeds name', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined(); //ensures it has a name defined
                expect(feed.name).not.toBe(''); //the name is not empty
            });
         });
    });


    describe('The menu', function() {

        /*it ensures the menu element is hidden by default. */
         it ('should have menu element hidden by default', function(){
                expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* it ensures the menu changes visibility when the menu icon
          * is clicked. 
          */
          it ('should change its visibility when clicked', function(){
            $('.menu-icon-link').click(); //the menu displays when clicked
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').click(); //the menu hides when clicked
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* test suite "Initial Entries" */
    describe('Initial Entries', function(){


        /* it ensures when the loadFeed function is called
         * and completes its work,
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0,done);
         });

        //there is at least a single .entry element within the .feed container.
        it('should have at least one element', function(done){
        expect($('.feed, .entry').length).not.toBe(0);
            done();
        });
    });
    
    /* test suite "New Feed Selection" */
    
    describe('New Feed Selection', function() {

        let initialFeeds;

        //loadFeed() is asynchronous.
        beforeEach(function(done){
            //it loads feeds for the first time and save in variable the html content 
            loadFeed(0, function(){
               initialFeeds = $('.feed').html();
                //load for the second time and goes to the expectation
                loadFeed(1, function(){
                done();
                });
            });
        });

        it('changes feeds when loaded each time', function(done){
            //second round of the feeds load saves the content in the newFeeds var
            let newFeeds = $('.feed').html();
            // here we compare the content
            expect(newFeeds).not.toBe(initialFeeds);
            done();
        });
    });
}());
