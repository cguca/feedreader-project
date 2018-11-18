/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has an non empty URL', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
         });

        /* This test loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has an non empty name', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
         });
    });


    /* The Menu Test Suite*/
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. 
         */
         it('hides the menu by default', function() {
            const bodyEl = document.querySelector('body');
            expect(bodyEl.classList.contains('menu-hidden')).toBe(true);
         });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: 1) does the menu display when
          * clicked and 2) does it hide when clicked again.
          */

        it('should unhide and hide menu', function () {
            const bodyEl = document.querySelector('body');
            const iconMenu = document.querySelector('.menu-icon-link');

            iconMenu.click();
            expect(bodyEl.classList.contains('menu-hidden')).toBe(false);

            iconMenu.click();
            // Using double negative to ensure that the 'click' triggered event
            // and reverses the previous value
            expect(bodyEl.classList.contains('menu-hidden')).not.toBe(false); 
        });
    });

    /* Initial Entries Test Suite */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                loadFeed(i, function() {
                    done();
                });
            }
        });

        it('should contain at least one entry', function() {
            let feedEl = document.querySelectorAll('.feed .entry');
            expect(feedEl.length).not.toBe(0);
         });
    });

    /* New Feed Selection Test Suite */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        
        let previous;
        let next;
        beforeEach(function(done) {
            loadFeed(0, function() {
                let entryLink = document.querySelector('.feed').firstElementChild;
                let entry = entryLink.firstElementChild;
                previous = (entry.innerText);
                loadFeed(1, function() {
                    let entryLink2 = document.querySelector('.feed').firstElementChild;
                    let entry2 = entryLink.firstElementChild;
                    next = (entry.innerText);
                    done();
                }); 
            });
        });

        it('changes content when loading feeds', function() {
            expect(previous).not.toBe(next);
        });
    });
}());
