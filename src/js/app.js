// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import dotsEffect from './modules/dots';

(($) => {
  // When DOM is ready
  $(() => {
    dotsEffect.init();
  });
})(jQuery);


require('datatables.net')(window, $);

$(() => {
  $('#table').DataTable({
    bLengthChange: false,
    bFilter: false,
    searching: true,
    sDom: 'lrtp',
    language: {
      paginate: {
        next: '<span class="prevPag"></span>',
        previous: '<span class="nextPag"></span>',
      },
    },
  });

  $('#searchInTable').on('keyup', function searchInTable() {
    // search: https://datatables.net/reference/api/search()
    $('#table, #authorizeTable').DataTable().search(this.value).draw();
  });

  $('.checkboxTopFilter').on('change', () => {
    // build a filter string with an or(|) condition
    // Custodian Checkbox
    const custodian = $('.checkboxTopFilter[name="custodian"]:checked').map(function filterByCustodian() {
      return this.value;
    }).get().join('|');

    // now filter in column 2, with no regex, no smart filtering, not case sensitive
    // Example: word1|word2
    $('#table').DataTable().column(3).search(custodian, true, false, false)
      .draw(false);

    // Email checkbox
    const email = $('.checkboxTopFilter[name="email"]:checked').map(function filterByEmail() {
      return this.value;
    }).get().join('|');
    $('#table').DataTable().column(2).search(email, true, false, false)
      .draw(false);

    // Date Checkbox
    const date = $('.checkboxTopFilter[name="date"]:checked').map(function filterByDate() {
      return this.value;
    }).get().join('|');
    $('#table').DataTable().column(4).search(date, true, false, false)
      .draw(false);

    // Doc type Checkbox
    const docType = $('.checkboxTopFilter[name="docType"]:checked').map(function filterByDocType() {
      return this.value;
    }).get().join('|');
    $('#table').DataTable().column(0).search(docType, true, false, false)
      .draw(false);
  });
 
  // datatable for the authorize pages
  $('#authorizeTable').dataTable({
    pageLength: 50,
    bLengthChange: false,
    bSort: false,
    sDom: 'lrt',
  });

  // dropdown for filters
  $('.customCheckboxTrigger').click(function filtersDropdown() {
    $(this).parent().toggleClass('customCheckBoxesFiltersActive');
  });

  // collapse left menu
  $('#lMenuTrigger, #lMenuTriggerMobile').click(() => {
    $('body').toggleClass('leftMenuToggled');
  });

  // collapse left menu
  $('#profileTrigger').click(() => {
    $('.profileDropdown').fadeToggle();
  });

  // collapse left menu
  $('#notificationsTrigger').click(() => {
    $('#notificationsList').fadeToggle();
  });

  // hide left side filter dropdowns on click outside
  $(window).click(function() {
    $('body').removeClass('leftMenuToggled');
    $('.customCheckboxList').removeClass('customCheckBoxesFiltersActive');
    $('.profileDropdown').fadeOut();
    $('#notificationsList').fadeOut();
  });

  $('.leftArea, #lMenuTrigger, .customCheckboxList, #profileTrigger, .profileDropdown, #notificationsTrigger, #notificationsList').click(function(event){
      event.stopPropagation();
  });

  $('#loaderContaier').fadeOut();
});